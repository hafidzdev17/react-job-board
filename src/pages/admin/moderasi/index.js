import React, { useState } from 'react';

// @material-ui components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
//@material-ui icons
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

// page styles
import useStyles from './styles';
// react router
import { Prompt } from 'react-router-dom';
// app hook
import { useAdminData } from '../../../components/AdminDataProvider';

// http api services
import api from '../../../services/api';

//utils
import clsx from 'clsx';
import { useSnackbar } from 'notistack';
import { formatDateTime } from '../../../utils/formatter';
import { Helmet } from 'react-helmet';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

export default function Moderasi() {
    const classes = useStyles();
    const { loker, setLoker } = useAdminData();
    const [loading, setLoading] = useState(false);
    const [action, setAction] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    const theme = useTheme();
    const match = useMediaQuery(theme.breakpoints.up('sm'));

    const handleModerasi = (lokerItem, action) => async (e) => {
        setAction(action);
        if (window.confirm(`Anda yakin ingin ${action} lowongan kerja ${lokerItem.Posisi} ?`)) {
            const { LokerId, Username, Lokasi } = lokerItem;
            setLoading(LokerId);

            try {
                await api.post(`/admin-loker/${action}`, {
                    LokerId,
                    Username,
                    Lokasi

                });

                setLoker(loker.filter(i => i.LokerId !== LokerId))
                enqueueSnackbar(`Loker berhasil di${action}`, { variant: "success" })
            } catch (e) {
                enqueueSnackbar(`Gagal memoderasi loker: ${e.message}`, { variant: "error" })
            }
            setLoading(false);
        }
    }

    return <>
        <Helmet>
            <title>Moderasi Loker - JagoReact Job Board</title>
        </Helmet>
        <Grid container spacing={2} justify="center" className={classes.gridContainer}>
            <Grid container item xs={12} justify="center" >

                <Typography variant="h4" component="h3">Moderasi Lowongan Kerja</Typography>
            </Grid>

            {loker.length <= 0 &&
                <Grid container item xs={12} justify="center"  >

                    <Typography align="center" color="textSecondary">Belum Ada Lowongan Kerja Untuk di Moderasi</Typography>
                </Grid>}

            {
                loker.map((lokerItem) => {
                    return <Grid key={lokerItem.LokerId} item xs={12}>
                        <Paper className={clsx(classes.lokerItem, classes[lokerItem.Status])} elevation={3}>
                            <Grid container alignItems="center" justify="space-between">
                                <Grid item xs={2}>
                                    <Avatar className={classes.logo} alt="Logo" src={lokerItem.Perusahaan?.Logo} variant="rounded" />
                                </Grid>
                                <Grid container item xs={8} direction="column">
                                    <Typography className={classes.fullWidth} variant="h6" component="h4" noWrap>{lokerItem.Posisi}</Typography>
                                    <Typography className={classes.fullWidth} noWrap>{lokerItem.Perusahaan?.Nama}</Typography>
                                    <Typography className={classes.fullWidth} variant="caption" noWrap>{lokerItem.Lokasi}, {formatDateTime(lokerItem.GSI1SK)}</Typography>
                                </Grid>
                                <Grid container item xs={match ? 2 : 1} justify="flex-end">
                                    <div className={classes.deleteBtnWrapper}>
                                        <IconButton
                                            disabled={loading !== false}
                                            onClick={handleModerasi(lokerItem, 'publish')}
                                        ><CheckIcon color="primary" /></IconButton>
                                        {(loading === lokerItem.LokerId && action === 'publish') && <CircularProgress className={classes.buttonProgress} />}
                                    </div>
                                    <div className={classes.deleteBtnWrapper}>
                                        <IconButton
                                            onClick={handleModerasi(lokerItem, 'reject')}
                                            disabled={loading !== false}

                                        ><CloseIcon color="error" /></IconButton>

                                        {(loading === lokerItem.LokerId && action === 'reject') && <CircularProgress className={clsx(classes.buttonProgress, classes.buttonProgressRed)} />}
                                    </div>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                })
            }

        </Grid>
        <Prompt
            when={loading !== false}
            message="Ada perubahan yang belum disimpan, anda yakin ingin meninggalkan halaman ini?"
        />
    </>
}