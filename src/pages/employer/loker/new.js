import React, { useState } from 'react';

// @material-ui components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
//@material-ui icons
import SaveIcon from '@material-ui/icons/Save';

// page styles
import useStyles from './styles/form';
//data kota
import kota from '../../../data/kota.json';

// api service
import api from '../../../services/api';

// employer data context provider
import { useEmployerData } from '../../../components/EmployerDataProvider';

// validator
import isURL from 'validator/lib/isURL';

// hooks
import { useSnackbar } from 'notistack';

// react router
import { Prompt, Redirect, useHistory } from 'react-router-dom';

//Editor
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Helmet } from 'react-helmet';


const defaultEditorStyle = {
    border: 1,
    borderColor: "rgba(0, 0, 0, 0.23)",
    borderRadius: 4
};
const focusEditorStyle = {
    ...defaultEditorStyle,
    border: 2,
    borderColor: "#2196F3",
};

const errorEditorStyle = {
    ...defaultEditorStyle,
    borderColor: "#f44336"
}

export default function LokerBaru() {
    const classes = useStyles();
    const history = useHistory();
    const { profil, loker, setLoker } = useEmployerData();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [editorStyle, setEditorStyle] = useState(defaultEditorStyle)
    const [form, setForm] = useState({
        Posisi: "",
        Lokasi: "Kota Bandung",
        Url: "",
        Perusahaan: {
            Nama: profil?.Nama ?? '',
            Logo: profil?.Logo ?? '',
            UpdatedAt: profil?.UpdatedAt ?? ''
        }
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

    const handleEditorChange = newEditorState => {
        setEditorState(newEditorState);
        setErrors(errors => ({ ...errors, Deskripsi: '' }))
        setSomethingChange(true);
    }


    const validate = () => {
        let newErrors = {};

        if (!form.Posisi) {
            newErrors.Posisi = "Posisi wajib diisi";
        }

        const currentContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));

        if (currentContent.trim() === "<p></p>") {
            newErrors.Deskripsi = 'Deskripsi wajib diisi';
        }


        if (!form.Lokasi) {
            newErrors.Lokasi = "Lokasi wajib diisi";
        }


        if (!form.Url) {
            newErrors.Url = "Url wajib diisi";
        } else if (!isURL(form.Url, { protocols: ['http', 'https'], require_protocol: true })) {
            newErrors.Url = "URL tidak valid, gunakan protokol http atau https"
        }




        return newErrors;
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const findErrors = validate();


        if (Object.values(findErrors).some(message => message !== "")) {
            if (findErrors.Deskripsi) {
                setEditorStyle(errorEditorStyle)
            }
            setErrors(findErrors);
        } else {
            setSubmitting(true);
            try {

                const Deskripsi = draftToHtml(convertToRaw(editorState.getCurrentContent()));
                const response = await api.post('/loker', {
                    ...form,
                    Deskripsi
                });


                setLoker([response.data, ...loker]);
                setSomethingChange(false);

                enqueueSnackbar("Loker berhasil disimpan!", { variant: "success" })

                history.push(`/employer/loker/edit/${response.data?.LokerId}`)


            } catch (e) {
                setSubmitting(false);
                setErrors(e.response.data);
            }


        }
    };


    if (!profil?.Nama) {

        return <Redirect to="/employer/profil" />
    }

    return <>
        <Helmet>
            <title>Buat Loker Baru - JagoReact Job Board</title>
        </Helmet>
        <Typography className={classes.title} variant="h4" component="h3" paragraph>Buat Loker Baru</Typography>
        <Paper className={classes.content} elevation={3}>



            <form onSubmit={handleSubmit} noValidate>
                <TextField
                    variant="outlined"
                    label="Posisi"
                    name="Posisi"
                    margin="normal"
                    fullWidth
                    autoComplete="new-password"
                    required
                    value={form.Posisi}
                    onChange={handleChange}
                    error={errors.Posisi ? true : false}
                    helperText={errors.Posisi}
                    disabled={isSubmitting}
                />

                <Box {...editorStyle}>
                    <Editor
                        editorState={editorState}
                        // wrapperClassName="wrapper-class"
                        editorClassName={classes.editorBox}
                        toolbarClassName={classes.toolbarBox}

                        onEditorStateChange={handleEditorChange}
                        toolbar={{
                            options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'emoji', 'remove', 'history']
                        }}
                        placeholder="Deskripsi"
                        onFocus={() => {
                            setEditorStyle(focusEditorStyle)
                        }}
                        onBlur={() => {
                            setEditorStyle(defaultEditorStyle)
                        }}
                    />


                </Box>
                <Box padding={1}>
                    <Typography variant="caption" color="error">{errors.Deskripsi}</Typography>
                </Box>
                <TextField
                    variant="outlined"
                    label="URL Untuk Melamar"
                    name="Url"
                    margin="normal"
                    fullWidth
                    autoComplete="new-password"
                    required
                    value={form.Url}
                    onChange={handleChange}
                    error={errors.Url ? true : false}
                    helperText={errors.Url || 'Contoh: https://jagoreact.com/job/react'}
                    disabled={isSubmitting}
                />

                <Autocomplete
                    id="pilih-lokasi"
                    options={['Remote', ...kota]}
                    value={form.Lokasi}
                    onChange={(event, value) => {
                        handleChange({ target: { value, name: 'Lokasi' } })

                    }}
                    disabled={isSubmitting}
                    disableClearable
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Lokasi"
                            variant="outlined"
                            margin="normal"
                            error={errors.Lokasi ? true : false}
                            helperText={errors.Lokasi}
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }}

                        />
                    )}
                />

                <Grid container spacing={2} justify="center" className={classes.buttons}>
                    <Grid item xs={12} sm={6}>
                        <div className={classes.btnWrapper}>
                            <Button
                                color="primary"
                                variant="contained"
                                size="large"
                                type="submit"
                                fullWidth
                                disabled={isSubmitting || !isSomethingChange}
                            ><SaveIcon className={classes.iconLeft} /> Simpan Loker</Button>
                            {isSubmitting && <CircularProgress size={24} className={classes.buttonProgress} />}
                        </div>
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