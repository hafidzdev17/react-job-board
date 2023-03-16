import React, { useEffect, useState } from 'react';
// @material-ui components
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import Url from '@material-ui/core/Link';
//@material-ui icons
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import LocationOn from '@material-ui/icons/LocationOn';
import CalendarIcon from '@material-ui/icons/Today';
import BusinessIcon from '@material-ui/icons/Business';
import PeopleIcon from '@material-ui/icons/People';
import PhoneIcon from '@material-ui/icons/Phone';
import LinkIcon from '@material-ui/icons/Link';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

//app components
import Header from '../../components/Header';


// hooks
import useStyles from './styles'
import { useParams, useHistory, Link } from 'react-router-dom';
import { formatDate } from '../../utils/formatter';
import { useSnackbar } from 'notistack';

// http api service
import api from '../../services/api';

// utils
import { Helmet } from 'react-helmet';

export default function Detail() {
    const classes = useStyles();
    const params = useParams();
    const history = useHistory();

    const [loker, setLoker] = useState({});
    const [profil, setProfil] = useState({});
    const [loading, setLoading] = useState(true);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {

        if (!params.Username || !params.LokerId) {

            history.push("/")
        }
        async function fetchLoker() {
            setLoading(true);
            setLoker({});
            try {
                const response = await api.get(`/published-loker-detail/${params.Username}/${params.LokerId}`);
                setLoker(response.data?.Loker ?? {});
                setProfil(response.data?.ProfilPerusahaan ?? {});
                setLoading(false);
            } catch (e) {
                enqueueSnackbar(`Terjadi kesalahan: ${e.message}`, { variant: "error" })
                history.push("/")
            }

        }

        fetchLoker();
    }, [params.Username, params.LokerId, history, enqueueSnackbar]);


    return <>
        <Helmet>
            <title>{loading ? "JagoReact Job Board" : `${loker.Posisi} - ${profil.Nama}`}</title>
        </Helmet>
        <main>
            <Header lokasi="Indonesia">
                <Button className={classes.buttonBack} color="primary" variant="outlined" component={Link} to="/"> <ChevronLeftIcon className={classes.iconLeft} /> Kembali ke Daftar Loker</Button>

            </Header>
            <Container className={classes.container} maxWidth="sm">

                {loading ?
                    <Skeleton width="50%" height={36} /> : <Typography variant="h4" component="h1"> {loker.Posisi}</Typography>
                }
                <Grid container>
                    <Grid item xs={12} container direction="row">

                        {loading ?
                            <Skeleton width={100} /> :
                            <>
                                <LocationOn className={classes.icon} />
                                <Typography className={classes.caption} variant="caption">{loker.Lokasi}</Typography>
                            </>
                        }

                        {loading ?
                            <Skeleton width={100} /> :
                            <>
                                <CalendarIcon className={classes.icon} /> <Typography className={classes.caption} variant="caption">{formatDate(loker.GSI1SK)}</Typography>
                            </>
                        }

                    </Grid>

                </Grid>
                <Paper className={classes.content} elevation={3}>
                    {loading ?
                        <Box marginBottom={2}> <Skeleton component="div" variant="rect" width="100%" height={300} /></Box> :
                        <Typography component="div" dangerouslySetInnerHTML={{ __html: loker.Deskripsi }} />
                    }

                    <Grid container spacing={2} alignItems="center">

                        <Grid container item xs={12} justify="center">
                            {loading ?
                                <Skeleton variant="rect" width={120} height={58} /> :
                                <Button size="large" rel="noopener" target="_blank" href={loker.Url} variant="contained" color="primary"><CheckCircleOutlineIcon className={classes.applyIcon} /> Apply</Button>
                            }
                        </Grid>

                        <Grid item xs={12}>
                            {loading ?
                                <Skeleton width="35%" height={35} /> :
                                <Typography variant="h6">Tentang Perusahaan</Typography>
                            }
                            {loading ?
                                <Skeleton width="30%" height={35} /> :
                                <Typography variant="h6">{profil.Nama}</Typography>
                            }
                        </Grid>
                        <Grid item xs={4} sm={2}>
                            {loading ?
                                <Skeleton variant="rect">
                                    <Avatar className={classes.logo} alt="Logo" />
                                </Skeleton> :
                                <Avatar className={classes.logo} alt="Logo" src={profil.Logo} variant="rounded" >L</Avatar>
                            }
                        </Grid>
                        <Grid item xs={8} sm={10}>
                            <Grid container item xs={12} direction="row">
                                <Box padding={.5} display="flex" alignItems="center">
                                    {loading ?
                                        <Skeleton width={100} /> :
                                        <>
                                            <BusinessIcon className={classes.iconLeft} />
                                            <Typography variant="body2">{profil.Headquarter}</Typography>
                                        </>
                                    }
                                </Box>
                                <Box padding={.5} display="flex" alignItems="center">
                                    {loading ?
                                        <Skeleton width={100} /> :
                                        <>
                                            <PeopleIcon className={classes.iconLeft} />
                                            <Typography variant="body2" >{profil.JumlahKaryawan} Orang</Typography>
                                        </>
                                    }
                                </Box>
                            </Grid>
                            <Grid container item xs={12} direction="row">
                                <Box padding={.5} display="flex" alignItems="center">
                                    {loading ?
                                        <Skeleton width={100} /> :
                                        <>
                                            <PhoneIcon className={classes.iconLeft} />
                                            <Typography variant="body2"> {profil.Telp}</Typography>
                                        </>
                                    }
                                </Box>
                                <Box padding={.5} display="flex" alignItems="center">
                                    {loading ?
                                        <Skeleton width={100} /> :
                                        <>
                                            <LinkIcon className={classes.iconLeft} />
                                            <Url rel="noopener" target="_blank" variant="body2" href={profil.Website}>{profil.Website}</Url>
                                        </>
                                    }
                                </Box>
                            </Grid>
                        </Grid>

                    </Grid>
                </Paper>

            </Container>

        </main>
    </>
}

