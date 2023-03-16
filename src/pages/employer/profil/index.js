import React, { useState, useCallback } from 'react';

// @material-ui components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
//@material-ui icons
import SaveIcon from '@material-ui/icons/Save';

// page styles
import useStyles from './styles';
//data kota
import kota from '../../../data/kota.json';

// api service
import api from '../../../services/api';

// employer data context provider
import { useEmployerData } from '../../../components/EmployerDataProvider';

// utils
import isURL from 'validator/lib/isURL';
import isNumeric from 'validator/lib/isNumeric';
import { useSnackbar } from 'notistack';
import { Prompt } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// page components
import UploadLogo from './logo';

export default function Profil() {
    const classes = useStyles();

    const { profil, setProfil } = useEmployerData();

    const [form, setForm] = useState({
        Nama: "",
        Headquarter: "Kota Bandung",
        JumlahKaryawan: "",
        Website: "",
        Telp: "",
        ...profil
    });

    const [errors, setErrors] = useState({});

    const [isSomethingChange, setSomethingChange] = useState(false);
    const [isSubmitting, setSubmitting] = useState(false);

    const { enqueueSnackbar } = useSnackbar();
    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        setErrors({
            ...errors,
            [e.target.name]: ''
        })
        setSomethingChange(true);
    };

    const validate = () => {
        let newErrors = {};

        if (!form.Nama) {
            newErrors.Nama = "Nama Perusahaan wajib diisi";
        }

        if (!form.Headquarter) {
            newErrors.Headquarter = "Lokasi Headquarter wajib diisi";
        }

        if (!form.JumlahKaryawan) {
            newErrors.JumlahKaryawan = "Jumlah Karyawan wajib diisi";
        }

        if (!form.Website) {
            newErrors.Website = "Website wajib diisi";
        } else if (!isURL(form.Website, { protocols: ['http', 'https'], require_protocol: true })) {
            newErrors.Website = "Website URL tidak valid, gunakan protokol http atau https"
        }

        if (!form.Logo) {
            newErrors.Logo = "Logo wajib diisi";
        }

        if (!form.Telp) {
            newErrors.Telp = "No Telp wajib diisi";
        } else if (!isNumeric(form.Telp)) {
            newErrors.Telp = "No Telp tidak valid";
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

                const response = await api.put('/profil', form);

                setProfil(response.data);
                setSomethingChange(false);

                enqueueSnackbar("Profil Perushaan berhasil disimpan!", { variant: "success" })


            } catch (e) {

                setErrors(e.response.data);
            }
            setSubmitting(false);

        }
    };



    return <>
        <Helmet>
            <title>Profil Perusahaan - JagoReact Job Board</title>
        </Helmet>
        <Typography className={classes.title} variant="h4" component="h3" paragraph>Profil Perusahaan</Typography>
        <Paper className={classes.content} elevation={3}>

            <Grid container justify="center" direction="column" alignItems="center" >
                <UploadLogo
                    profil={form}
                    handleChange={useCallback((Logo) => {
                        setForm(form => ({
                            ...form,
                            Logo
                        }))
                        setSomethingChange(true);
                    }, [])}

                    setError={useCallback((message) => {

                        setErrors(errors => ({
                            ...errors,
                            Logo: message
                        }))
                    }, [])}

                    error={errors.Logo}
                />

                <Typography >Logo Perusahaan</Typography>

            </Grid>

            <form onSubmit={handleSubmit} noValidate>
                <TextField
                    variant="outlined"
                    label="Nama Perusahaan"
                    name="Nama"
                    margin="normal"
                    fullWidth
                    autoComplete="new-password"
                    required
                    value={form.Nama}
                    onChange={handleChange}
                    error={errors.Nama ? true : false}
                    helperText={errors.Nama}
                    disabled={isSubmitting}
                />

                <Autocomplete
                    id="pilih-lokasi"
                    options={kota}
                    value={form.Headquarter}
                    onChange={(event, value) => {
                        handleChange({ target: { value, name: 'Headquarter' } })

                    }}
                    disabled={isSubmitting}
                    disableClearable
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Lokasi Headquarter"
                            variant="outlined"
                            margin="normal"
                            error={errors.Headquarter ? true : false}
                            helperText={errors.Headquarter}
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }}

                        />
                    )}
                />
                <TextField
                    variant="outlined"
                    label="Jumlah Karyawan"
                    name="JumlahKaryawan"
                    margin="normal"
                    type="number"
                    inputProps={{
                        min: 0
                    }}
                    fullWidth
                    autoComplete="new-password"
                    required
                    value={form.JumlahKaryawan}
                    onChange={handleChange}
                    error={errors.JumlahKaryawan ? true : false}
                    helperText={errors.JumlahKaryawan}
                    disabled={isSubmitting}
                />

                <TextField
                    variant="outlined"
                    label="Website URL"
                    name="Website"
                    margin="normal"
                    fullWidth
                    autoComplete="new-password"
                    required
                    value={form.Website}
                    onChange={handleChange}
                    error={errors.Website ? true : false}
                    helperText={errors.Website || 'Contoh: https://jagoreact.com'}
                    disabled={isSubmitting}
                />
                <TextField
                    variant="outlined"
                    label="No Telp"
                    name="Telp"
                    margin="normal"
                    fullWidth
                    autoComplete="new-password"
                    required
                    value={form.Telp}
                    onChange={handleChange}
                    error={errors.Telp ? true : false}
                    helperText={errors.Telp}
                    disabled={isSubmitting}
                />

                <Grid container spacing={2} justify="center" className={classes.buttons}>
                    <Grid item xs={12} sm={6}>
                        <Button
                            color="primary"
                            variant="contained"
                            size="large"
                            type="submit"
                            fullWidth
                            disabled={isSubmitting || !isSomethingChange}
                        ><SaveIcon className={classes.iconLeft} /> Simpan Profil</Button>
                    </Grid>


                </Grid>
            </form>
        </Paper>

        <Prompt
            when={isSomethingChange}
            message="Ada perubahan yang belum disimpan, anda yakin ingin meninggalkan halaman ini?"
        />
    </>
}