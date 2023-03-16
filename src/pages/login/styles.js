import { makeStyles } from "@material-ui/core/styles";
export default makeStyles(theme => ({
    iconLeft: {
        marginRight: theme.spacing(1)
    },
    iconRight: {
        marginLeft: theme.spacing(1)
    },
    buttonBack: {
        margin: theme.spacing(2)
    },
    content: {
        padding: theme.spacing(2),
        paddingBottom: theme.spacing(3),
        marginTop: theme.spacing(1)
    },
    buttons: {
        marginTop: theme.spacing(2),
    }
}))