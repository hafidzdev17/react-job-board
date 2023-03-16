import React, { useEffect, useState } from 'react';
// @material-ui components
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
//@material-ui icons
import PostAdd from '@material-ui/icons/PostAdd';
import LocationOn from '@material-ui/icons/LocationOn';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
//data kota
import kota from '../../data/kota.json';

//app components
import Header from '../../components/Header';


//page styles
import useStyles from './styles';

// http api services
import api from '../../services/api';

// utils
import { useParams, useHistory, Link } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import LokerSkeleton from '../../components/LokerSkeleton';
import { formatDate } from '../../utils/formatter';
import { useSnackbar } from 'notistack';
import { Helmet } from 'react-helmet';

export default function Home() {
    const classes = useStyles();
    const params = useParams();
    const history = useHistory();
    const theme = useTheme();
    const match = useMediaQuery(theme.breakpoints.up('sm'));
    const [loker, setLoker] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [lastSortKey, setLastSortKey] = useState(null);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        let path = `/published-loker`;
        if (params.Lokasi) {
            path = `/published-loker/${params.Lokasi}`;
        }

        async function fetchLoker() {
            setLoading(true);
            setLoker([]);
            try {
                const response = await api.get(path);
                setLoker(response.data.Items);
                if (response.data.LastEvaluatedKey) {
                    setLastSortKey(response.data.LastEvaluatedKey);
                } else {
                    setLastSortKey(null);
                }
            } catch (e) {
                enqueueSnackbar(`Terjadi kesalahan: ${e.message}`, { variant: "error" })
            }
            setLoading(false);
        }

        fetchLoker();
    }, [params.Lokasi, enqueueSnackbar]);

    const loadMore = async () => {
        if (loadingMore) {
            return false;
        }

        setLoadingMore(true);
        try {

            let path = `/published-loker`;
            let queryParams = {};

            if (lastSortKey) {
                queryParams.LastEvaluatedSortKey = lastSortKey;
            }

            if (params.Lokasi) {
                path = `/published-loker/${params.Lokasi}`;
            }


            const response = await api.get(path, { params: queryParams });
            setLoker([...loker, ...response.data.Items]);
            if (response.data.LastEvaluatedKey) {
                setLastSortKey(response.data.LastEvaluatedKey);
            } else {
                setLastSortKey(null);
            }

        } catch (e) {
            enqueueSnackbar(`Terjadi kesalahan: ${e.message}`, { variant: "error" })
        }
        setLoadingMore(false);
    }

    const lokasi = params?.Lokasi ?? 'Indonesia';

    return <>
        <Helmet>
            <title>JagoReact Job Board</title>
            <meta name="description" content={`Situs Daftar Lowongan Kerja React di ${lokasi}`} />
        </Helmet>
        <main>

            <Header lokasi={lokasi}>
                <Button
                    color="primary"
                    variant="contained"
                    className={classes.buttonPostLoker}
                    component={Link}
                    to="/employer/loker/new"
                >
                    <PostAdd className={classes.iconLeft} />
                Post Lowongan Kerja
            </Button>

            </Header>
            <Container maxWidth="sm">
                <Grid container spacing={4} justify="center" className={classes.pilihLokasiContainer}>
                    <Grid container item xs={6} sm={4} alignItems="center" >
                        <LocationOn className={classes.iconLeft} />
                        <Typography >Pilih Lokasi</Typography>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Autocomplete
                            id="pilih-lokasi"
                            options={['Indonesia', 'Remote', ...kota]}
                            value={lokasi}
                            onChange={(event, value) => {
                                const path = value === 'Indonesia' ? '/' : `/lokasi/${value}`;
                                history.push(path);

                            }}
                            disableClearable
                            renderInput={(params) => (
                                <TextField
                                    {...params}

                                    size="small"
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'new-password', // disable autocomplete and autofill
                                    }}


                                />
                            )}
                        />
                    </Grid>

                    {loading && [...new Array(4)].map((value, index) => {

                        return <LokerSkeleton key={index} />
                    })}

                    {(loker.length <= 0 && !loading) && <Grid item container xs={12} justify="center">
                        <Typography align="center" color="textSecondary">Belum Ada Lowongan Kerja Untuk di {lokasi}</Typography>
                    </Grid>}

                    {
                        loker.map((lokerItem) => {

                            return <Grid key={lokerItem.LokerId} item xs={12}>
                                <Paper className={classes.lokerItem} elevation={3}>
                                    <Grid container alignItems="center" justify="space-between">
                                        <Grid item xs={2}>
                                            <Avatar className={classes.logo} alt="Logo" src={lokerItem.Perusahaan?.Logo} variant="rounded" />
                                        </Grid>
                                        <Grid container item xs={8} direction="column">
                                            <Typography className={classes.fullWidth} variant="h6" component="h4" noWrap>{lokerItem.Posisi}</Typography>
                                            <Typography className={classes.fullWidth} noWrap>{lokerItem.Perusahaan?.Nama}</Typography>
                                            <Typography className={classes.fullWidth} variant="caption" noWrap>{lokerItem.Lokasi || params.Lokasi}, {formatDate(lokerItem.GSI1SK || lokerItem.GSI2SK)}</Typography>
                                        </Grid>
                                        <Grid container item xs={match ? 2 : 1} justify="flex-end">
                                            {match ?
                                                <Button component={Link} to={`/detail/${lokerItem.Username}/${lokerItem.LokerId}`}>Detail <ChevronRightIcon /></Button>
                                                :
                                                <IconButton component={Link} to={`/detail/${lokerItem.Username}/${lokerItem.LokerId}`}><ChevronRightIcon /></IconButton>}
                                        </Grid>
                                    </Grid>
                                </Paper>

                            </Grid>
                        })
                    }




                    {lastSortKey && <Grid container item xs={12} sm={8} justify="center">
                        <div className={classes.btnWrapper}>
                            <Button variant="outlined" disabled={loadingMore} onClick={loadMore}>Load More...</Button>
                            {loadingMore && <CircularProgress size={24} className={classes.buttonProgress} />}
                        </div>
                    </Grid>}


                </Grid>
            </Container>

        </main>
    </>
}

