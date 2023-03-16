import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from '@material-ui/core/useMediaQuery';


const useStyles = makeStyles(theme => ({
    lokerItem: {
        padding: theme.spacing(1)
    },
    logo: {
        width: theme.spacing(6),
        height: theme.spacing(6),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
            height: theme.spacing(9)
        }
    },
    fullWidth: {
        width: '100%'
    }
}))

export default function LokerSkeleton() {
    const classes = useStyles();
    const theme = useTheme();
    const match = useMediaQuery(theme.breakpoints.up('sm'));

    return <Grid item xs={12}>
        <Paper className={classes.lokerItem} elevation={3}>
            <Grid container alignItems="center" justify="space-between">
                <Grid item xs={2}>
                    <Skeleton variant="rect"> <Avatar className={classes.logo} alt="Logo" variant="rounded" >L</Avatar></Skeleton>
                </Grid>
                <Grid container item xs={8} direction="column">
                    <Skeleton><Typography className={classes.fullWidth} variant="h6" component="h4" noWrap>Senior Frontend Developer</Typography></Skeleton>
                    <Skeleton><Typography className={classes.fullWidth} noWrap>PT Jago React</Typography></Skeleton>
                    <Skeleton><Typography className={classes.fullWidth} variant="caption" noWrap>Kota Bandung, 2 hari yang lalu</Typography></Skeleton>
                </Grid>
                <Grid container item xs={match ? 2 : 1} justify="flex-end">
                    <Skeleton>
                        {match ?
                            <Button>Detail</Button>
                            :
                            <IconButton />}
                    </Skeleton>
                </Grid>
            </Grid>
        </Paper>

    </Grid>
}