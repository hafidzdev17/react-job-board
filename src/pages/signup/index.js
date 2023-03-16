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
// @material-ui snackbar utils
import { useSnackbar } from 'notistack';

// app components
import Header from '../../components/Header';

// @aws-amplify/auth untuk mengakses cognito user pool
import Auth from '@aws-amplify/auth';

// page styles
import useStyles from './styles'

// react router
import { Link, useHistory } from 'react-router-dom';

//validator
import isEmail from 'validator/lib/isEmail';
import isAlphanumeric from 'validator/lib/isAlphanumeric';

// react helmet
import { Helmet } from 'react-helmet';



export default function SignUp() {

    const classes = useStyles();
    const history = useHistory();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        ulangi_password: ""
    });

    const [errors, setErrors] = useState({});

    const { enqueueSnackbar } = useSnackbar();

    const [isSubmitting, setSubmitting] = useState(false);

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        setErrors({
            ...errors,
            [e.target.name]: ''
        })
    };

    const validate = () => {
        let newErrors = {};

        if (!form.username) {
            newErrors.username = "Nama wajib diisi";
        } else if (!isAlphanumeric(form.username)) {
            newErrors.username = "Username tidak valid, hanya huruf dan angka yang diperbolehkan";
        }

        if (!form.email) {
            newErrors.email = "Email wajib diisi";
        } else if (!isEmail(form.email)) {
            newErrors.email = "Email tidak valid";
        }

        if (!form.password) {
            newErrors.password = "Password wajib diisi";
        } else if (form.password.length < 8) {
            newErrors.password = "Password minimal 8 karakter";
        }

        if (!form.ulangi_password) {
            newErrors.ulangi_password = "Ulangi Password wajib diisi";
        } else if (form.ulangi_password !== form.password) {
            newErrors.ulangi_password = "Ulangi Password tidak sama dengan Password";
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

                await Auth.signUp({
                    username: form.username,
                    password: form.password,
                    attributes: {
                        email: form.email
                    }
                });

                enqueueSnackbar(`Sebuah link verifikasi telah di kirim ke ${form.email}, silahkan cek kotak masuk email tersebut!`, { variant: "success" });

                history.push('/login');


            } catch (e) {
                setSubmitting(false);
                let newErrors = {};

                switch (e.code) {
                    case "UsernameExistsException":
                        newErrors.username = "Username tidak tersedia"
                        break;
                    default:
                        newErrors.username = "Terjadi kesalahan silahkan coba lagi"
                        break;
                }

                setErrors(newErrors);
            }

        }
    };

    return <>
        <Helmet>
            <title>Sign Up - JagoReact Job Board</title>
        </Helmet>
        <main>
            <Header lokasi="Indonesia" >

                <Button className={classes.buttonBack} color="primary" variant="outlined" component={Link} to="/"> <ChevronLeftIcon className={classes.iconLeft} /> Kembali ke Daftar Loker</Button>
            </Header>
            <Container maxWidth="xs">
                <Typography variant="h4" component="h3" align="center">Buat Akun Baru</Typography>
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
                            label="Email"
                            name="email"
                            type="email"
                            margin="normal"
                            fullWidth
                            required
                            value={form.email}
                            onChange={handleChange}
                            error={errors.email ? true : false}
                            helperText={errors.email}
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
                        <TextField
                            variant="outlined"
                            label="Ulangi Password"
                            name="ulangi_password"
                            type="password"
                            margin="normal"
                            fullWidth
                            required
                            value={form.ulangi_password}
                            onChange={handleChange}
                            error={errors.ulangi_password ? true : false}
                            helperText={errors.ulangi_password}
                            disabled={isSubmitting}

                        />

                        <Grid container spacing={2} className={classes.buttons}>
                            <Grid item xs>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    size="large"
                                    type="submit"
                                >Sign Up</Button>
                            </Grid>
                            <Grid item>
                                <Button

                                    component={Link}
                                    to="/login"
                                    variant="outlined"
                                    size="large"
                                >Login</Button>
                            </Grid>

                        </Grid>

                    </form>
                </Paper>
            </Container>
        </main>
    </>
}