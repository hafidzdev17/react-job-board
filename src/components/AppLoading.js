import React from 'react';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({

    fullHeight: {
        height: '100vh'
    }

}))

export default function AppLoading({ text }) {
    const classes = useStyles();
    return <Grid className={classes.fullHeight} container justify="center" alignItems="center" direction="column">

        <CircularProgress />
        {text && <Typography>{text}</Typography>}

    </Grid>
}