import React from 'react';
//@material-ui components
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";

// styles hook
const useStyles = makeStyles(theme => ({
    header: {
        backgroundColor: '#1e1e1e',
        color: '#ffffff',
        textAlign: 'center',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(1),
        background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364);'
    }
}))

export default function Header(props) {
    const classes = useStyles();

    return <header className={classes.header}>
        <Container maxWidth="md">
            <Typography variant="h3" component="h1">JagoReact Job Board</Typography>
            <Typography variant="h6" component="h2">Situs Daftar Lowongan Kerja React di {props.lokasi}</Typography>
            {props.children}
        </Container>
    </header>
}