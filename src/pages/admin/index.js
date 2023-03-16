import React from 'react';
//@material-ui components
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core/styles";

// @material-ui icons
import ExitToApp from '@material-ui/icons/ExitToApp';
import ListAlt from '@material-ui/icons/ListAlt';

// app components
import Header from '../../components/Header';

// page components
import Moderasi from './moderasi';

// react router
import { Link, useRouteMatch, Switch, Route, Redirect } from 'react-router-dom';

// app hooks
import { useAuth } from '../../components/AuthProvider';

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

export default function AdminDashboard() {
    const classes = useStyles();
    const { user, handleLogout } = useAuth();

    const matchModerasiLoker = useRouteMatch('/admin/moderasi');



    return <main>
        <Header lokasi="Indonesia" >
            <Typography className={classes.halo}>Halo, {user.username}!</Typography>
            <nav >
                <Button
                    className={classes.navItem}
                    color={matchModerasiLoker ? "primary" : "inherit"}
                    component={Link}
                    to="/admin/moderasi">
                    <ListAlt className={classes.iconLeft} />
                        Moderasi Lowongan Kerja</Button>

                <Button
                    className={classes.navItem}
                    color="inherit"
                    onClick={handleLogout}>
                    <ExitToApp className={classes.iconLeft} />Logout</Button>
            </nav>
        </Header>
        <Container maxWidth="sm" className={classes.container}>
            <Switch>
                <Route exact path="/admin/moderasi" component={Moderasi} />
                <Redirect to="/admin/moderasi" />
            </Switch>
        </Container>
    </main>
}