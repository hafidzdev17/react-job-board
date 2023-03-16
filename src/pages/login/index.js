import React, { useState } from 'react';

// @material-ui components
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// @material-ui icons
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

// app components
import Header from '../../components/Header';

// @aws-amplify/auth cognito user pool
import Auth from '@aws-amplify/auth';

// page styles
import useStyles from './styles';

// react router
import { Link, Redirect, useLocation } from 'react-router-dom';


// auth context hook
import { useAuth } from '../../components/AuthProvider';

// react helmet
import { Helmet } from 'react-helmet';


export default function Login() {

    const classes = useStyles();
    const location = useLocation();
    const [form, setForm] = useState({
        username: "",
        password: ""
    });

    const [errors, setErrors] = useState({});

    const { user, setUser, isAdmin } = useAuth();

    const [isSubmitting, setSubmitting] = useState(false);

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        setErrors({

        })
    };

    const validate = () => {
        let newErrors = {};

        if (!form.username) {
            newErrors.username = "Nama wajib diisi";
        }

        if (!form.password) {
            newErrors.password = "Password wajib diisi";
        } else if (form.password.length < 8) {
            newErrors.password = "Password minimal 8 karakter";
        }

        return newErrors;
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const findErrors = validate();


        if (Object.values(findErrors).some(message => message !== "")) {
            setErrors(findErrors);
        } else {
            setSubmitting(true);
            try {

                const user = await Auth.signIn(form.username, form.password);

                setUser(user);



            } catch (e) {
                setSubmitting(false);
                let newErrors = {};
                switch (e.code) {

                    case "NotAuthorizedException":
                        newErrors.username = "Username atau Password salah"
                        break;
                    default:
                        newErrors.username = "Terjadi kesalahan silakan coba lagi"
                        break;
                }

                setErrors(newErrors);
            }

        }
    };

    if (user) {

        const defaultRedirect = isAdmin ? '/admin' : '/employer';

        const redirectTo = location?.state?.from?.pathname ?? defaultRedirect;
        return <Redirect to={redirectTo} />
    }

    return <>
        <Helmet>
            <title>Login - JagoReact Job Board</title>
        </Helmet>
        <main>
            <Header lokasi="Indonesia" >

                <Button className={classes.buttonBack} color="primary" variant="outlined" component={Link} to="/"> <ChevronLeftIcon className={classes.iconLeft} /> Kembali ke Daftar Loker</Button>
            </Header>
            <Container maxWidth="xs">
                <Typography variant="h4" component="h3" align="center">Login</Typography>
                <Paper className={classes.content} elevation={3}>
                    <form onSubmit={handleSubmit} noValidate>
                        <TextField
                            variant="outlined"
                            label="Username"
                            name="username"
                            margin="normal"
                            fullWidth
                            autoComplete="new-password"
                            required
                            value={form.username}
                            onChange={handleChange}
                            error={errors.username ? true : false}
                            helperText={errors.username}
                            disabled={isSubmitting}
                        />
                        <TextField
                            variant="outlined"
                            label="Password"
                            name="password"
                            type="password"
                            margin="normal"
                            fullWidth
                            autoComplete="new-password"
                            required
                            value={form.password}
                            onChange={handleChange}
                            error={errors.password ? true : false}
                            helperText={errors.password}
                            disabled={isSubmitting}

                        />

                        <Grid container spacing={2} className={classes.buttons}>
                            <Grid item xs>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    size="large"
                                    type="submit"
                                    disabled={isSubmitting}
                                >Login</Button>
                            </Grid>
                            <Grid item>
                                <Button

                                    component={Link}
                                    to="/signup"
                                    variant="outlined"
                                    size="large"
                                    disabled={isSubmitting}
                                >Daftar</Button>
                            </Grid>

                        </Grid>

                    </form>
                </Paper>
            </Container>
        </main>
    </>
}