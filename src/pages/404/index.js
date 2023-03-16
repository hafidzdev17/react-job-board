import React from 'react';

// @material-ui/core 
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

// app components
import Header from '../../components/Header';

// utils
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
    iconLeft: {
        marginRight: theme.spacing(1)
    },
    buttonBack: {
        margin: theme.spacing(2)
    },
}))



export default function NotFound() {
    const classes = useStyles();
    return <>
        <Helmet>
            <title>Not Found - JagoReact Job Board</title>
        </Helmet>
        <main>
            <Header lokasi="Indonesia">
                <Button className={classes.buttonBack} color="primary" variant="outlined" component={Link} to="/"> <ChevronLeftIcon className={classes.iconLeft} /> Kembali ke Daftar Loker</Button>
            </Header>
            <Container maxWidth="xs">
                <Typography variant="h1" align="center">404</Typography>
                <Typography variant="h4" component="h3" align="center">Halaman Tidak Ditemukan</Typography>
            </Container>
        </main>
    </>
}