import { makeStyles } from "@material-ui/core/styles";
export default makeStyles(theme => ({

    gridContainer: {
        marginTop: theme.spacing(2)
    },
    lokerItem: {
        padding: "0px 8px",
        [theme.breakpoints.up('sm')]: {
            padding: "8px 16px"
        }
    },
    deleteBtnWrapper: {
        position: "relative"
    },
    buttonProgress: {

        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -20,
        marginLeft: -20,
    },
    buttonProgressRed: {
        color: theme.palette.error.main,
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
        width: '100%'
    }

}))