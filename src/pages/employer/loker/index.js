import React, { useState } from 'react';

// @material-ui components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
//@material-ui icons
import Add from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

// page styles
import useStyles from './styles';
import { Link, Prompt } from 'react-router-dom';
import { useEmployerData } from '../../../components/EmployerDataProvider';

//utils
import clsx from 'clsx';
import api from '../../../services/api';
import { useSnackbar } from 'notistack';
import { formatDateTime } from '../../../utils/formatter';
import { Helmet } from 'react-helmet';

export default function LokerList() {
    const classes = useStyles();
    const { loker, setLoker } = useEmployerData();
    const [deleting, setDeleting] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const handleDelete = lokerItem => async (e) => {

        if (window.confirm(`Anda yakin ingin menghapus lowongan kerja ${lokerItem.Posisi} ?`)) {
            const { LokerId } = lokerItem;
            setDeleting(LokerId);

            try {
                await api.delete(`/loker/${LokerId}`);

                setLoker(loker.filter(i => i.LokerId !== LokerId))
                enqueueSnackbar('Loker berhasil dihapus', { variant: "success" })
            } catch (e) {
                enqueueSnackbar(`Gagal menghapus loker: ${e.message}`, { variant: "error" })
            }
            setDeleting(false);
        }
    }

    return <>
        <Helmet>
            <title>Daftar Lowongan Kerja - JagoReact Job Board</title>
        </Helmet>
        <Grid container spacing={2} justify="center" className={classes.gridContainer}>
            <Grid container item xs={12} sm={8} alignItems="center" >

                <Typography variant="h4" component="h3">Daftar Lowongan Kerja</Typography>
            </Grid>
            <Grid item xs={12} sm={4} >
                <Button
                    component={Link}
                    to="/employer/loker/new"
                    variant="outlined" color="primary" fullWidth><Add /> Buat Loker</Button>
            </Grid>

            {
                loker.map((lokerItem) => {
                    return <Grid key={lokerItem.LokerId} item xs={12}>
                        <Paper className={clsx(classes.lokerItem, classes[lokerItem.Status])} elevation={3}>
                            <Grid container alignItems="center" justify="space-between">

                                <Grid container item xs={8} direction="column">
                                    <Typography className={classes.fullWidth} variant="h6" component="h4" noWrap>{lokerItem.Posisi}</Typography>
                                    <Typography className={classes.fullWidth} noWrap>{lokerItem.Status}</Typography>
                                    <Typography className={classes.fullWidth} variant="caption" noWrap>{lokerItem.Lokasi}, {formatDateTime(lokerItem.CreatedAt)}</Typography>
                                </Grid>
                                <Grid container item xs={4} justify="flex-end">
                                    <IconButton
                                        disabled={deleting !== false}
                                        component={Link}
                                        to={`/employer/loker/edit/${lokerItem.LokerId}`}
                                    ><EditIcon color="primary" /></IconButton>
                                    <div className={classes.deleteBtnWrapper}>
                                        <IconButton
                                            onClick={handleDelete(lokerItem)}
                                            disabled={deleting !== false}

                                        ><DeleteIcon color="error" /></IconButton>

                                        {deleting === lokerItem.LokerId && <CircularProgress className={classes.buttonProgress} />}
                                    </div>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                })
            }

        </Grid>
        <Prompt
            when={deleting !== false}
            message="Ada perubahan yang belum disimpan, anda yakin ingin meninggalkan halaman ini?"
        />
    </>
}