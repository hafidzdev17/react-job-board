import React, { useState, useCallback } from "react";

import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import FAB from '@material-ui/core/Fab';
import ImageIcon from '@material-ui/icons/Image';
import AddPhotoIcon from '@material-ui/icons/AddAPhoto';

import { useDropzone } from "react-dropzone";
import useStyles from "./styles/logo";
import api from "../../../services/api";
import axios from 'axios';

export default function UploadLogo({ profil, error, setError, handleChange }) {

    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [accept] = useState(["image/png", "image/jpeg"]);
    const [maxSize] = useState("20971520");
    const [cacheBusting, setCacheBusting] = useState("");

    const onDropAccepted = useCallback(
        acceptedFiles => {
            setError("");

            const file = acceptedFiles[0];

            const reader = new FileReader();

            reader.onabort = () => {
                setError("Pembacaan file dibatalkan");
            };

            reader.onerror = () => {
                setError("Pembacaan file gagal/error");
            };

            reader.onload = ev => {
                const img = new Image();
                img.src = ev.target.result;

                img.onload = async () => {
                    setLoading(true);
                    try {
                        const elem = document.createElement("canvas");
                        const width = 250;
                        const ratio = img.width / img.height;
                        elem.width = width;
                        const height = width / ratio;
                        elem.height = height;

                        const ctx = elem.getContext("2d");
                        ctx.drawImage(img, 0, 0, width, height);

                        ctx.canvas.toBlob(async (blob) => {



                            const getResponse = await api.get('/upload-logo-url');
                            const UploadUrl = getResponse.data.UploadUrl;

                            await axios.put(
                                getResponse.data.UploadUrl,
                                blob,
                                {
                                    headers: {
                                        "x-amz-acl": "public-read",
                                        "Content-Type": "image/webp"
                                    }
                                })



                            const [LogoUrl] = UploadUrl.split("?");
                            setCacheBusting(Date.now());
                            handleChange(LogoUrl);
                            setLoading(false);

                        }, "image/webp", 0.75);


                    } catch (e) {
                        setLoading(false);
                        setError(e.message);
                    }

                };
            };

            reader.readAsDataURL(file);
        },
        [setError, handleChange]
    );

    const onDropRejected = useCallback(
        rejected => {
            if (!accept.includes(rejected[0].type)) {
                setError(`Tipe file tidak didukung : ${rejected[0].type} `);
            } else if (rejected[0].size >= maxSize) {
                setError(`Ukuran file terlalu besar > 20Mb`);
            }
        },
        [accept, maxSize, setError]
    );
    const { getInputProps, getRootProps } = useDropzone({
        accept,
        maxSize,
        onDropAccepted,
        onDropRejected,
        multiple: false
    });

    return (
        <>

            <div className={classes.avatarWrap} {...getRootProps()}>
                <input {...getInputProps()} />
                <Avatar
                    className={classes.avatar}
                    variant="rounded"
                    alt={profil.Nama}
                    src={`${profil.Logo}?${cacheBusting}`}
                ><ImageIcon /></Avatar>
                <FAB className={classes.fab} size="small"><AddPhotoIcon /></FAB>
                {loading && <CircularProgress className={classes.fab} />}
            </div>
            <Typography variant="caption" component="p" color="error">
                {error}
            </Typography>

        </>
    );
}
