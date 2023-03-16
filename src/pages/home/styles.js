import { makeStyles } from "@material-ui/core/styles";
export default makeStyles(theme => ({
    iconLeft: {
        marginRight: theme.spacing(1)
    },
    buttonPostLoker: {
        margin: theme.spacing(2)
    },
    pilihLokasiContainer: {
        marginTop: theme.spacing(2)
    },
    lokerItem: {
        padding: theme.spacing(1)
    },
    logo: {
        width: theme.spacing(6),
        height: theme.spacing(6),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
            height: theme.spacing(9)
        }
    },
    fullWidth: {
        width: "100%"
    },
    btnWrapper: {
        position: "relative",
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    }
}))