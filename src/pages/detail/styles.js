import { makeStyles } from "@material-ui/core/styles";
export default makeStyles(theme => ({
    buttonBack: {
        margin: theme.spacing(2)
    },
    container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    },
    content: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(2),
        paddingBottom: theme.spacing(4)

    },
    icon: {
        width: "1rem",
        height: "1rem",
        marginRight: 4
    },
    caption: {
        marginRight: 4
    },
    logo: {
        width: theme.spacing(9),
        height: theme.spacing(9),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
            height: theme.spacing(9)
        }
    },
    iconLeft: {
        width: "1rem",
        height: "1rem",
        marginRight: theme.spacing(1)
    },
    applyIcon: {
        marginRight: theme.spacing(1),
    }
}))