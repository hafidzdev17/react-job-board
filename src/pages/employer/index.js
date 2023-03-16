import React from 'react';
//@material-ui components
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core/styles";

// @material-ui icons
import ExitToApp from '@material-ui/icons/ExitToApp';
import Business from '@material-ui/icons/Business';
import ListAlt from '@material-ui/icons/ListAlt';


// react router
import { Link, useRouteMatch, Switch, Route, Redirect } from 'react-router-dom';

// app hooks
import { useAuth } from '../../components/AuthProvider';

// app components
import Header from '../../components/Header';

// page components
import Profil from './profil';
import LokerBaru from './loker/new';
import LokerEdit from './loker/edit';
import LokerList from './loker';

const useStyles = makeStyles(theme => ({
    halo: { marginTop: theme.spacing(1) },
    navItem: {
        textTransform: 'none'
    },
    iconLeft: {
        marginRight: theme.spacing(1)
    },
    container: {
        paddingBottom: theme.spacing(4)
    }
}))

export default function EmployerDashboard() {
    const classes = useStyles();
    const { user, handleLogout } = useAuth();

    const matchDaftarLoker = useRouteMatch('/employer/loker');
    const matchProfil = useRouteMatch('/employer/profil');



    return <main>
        <Header lokasi="Indonesia" >
            <Typography className={classes.halo}>Halo, {user.username}!</Typography>
            <nav >
                <Button
                    className={classes.navItem}
                    color={matchDaftarLoker ? "primary" : "inherit"}
                    component={Link}
                    to="/employer/loker">
                    <ListAlt className={classes.iconLeft} />
                        Daftar Lowongan Kerja</Button>
                <Button
                    className={classes.navItem}
                    color={matchProfil ? "primary" : "inherit"}
                    component={Link}
                    to="/employer/profil">
                    <Business className={classes.iconLeft} />
                        Profil Perusahaan</Button>
                <Button
                    className={classes.navItem}
                    color="inherit"
                    onClick={handleLogout}>
                    <ExitToApp className={classes.iconLeft} />Logout</Button>
            </nav>
        </Header>
        <Container maxWidth="sm" className={classes.container}>
            <Switch>
                <Route exact path="/employer/loker" component={LokerList} />
                <Route path="/employer/loker/new" component={LokerBaru} />
                <Route path="/employer/loker/edit/:LokerId" component={LokerEdit} />
                <Route path="/employer/profil" component={Profil} />
                <Redirect to="/employer/loker" />
            </Switch>
        </Container>
    </main>
}