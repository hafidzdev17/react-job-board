import { makeStyles } from "@material-ui/core/styles";
export default makeStyles(theme => ({
    title: {
        marginTop: theme.spacing(2),
    },
    content: {
        padding: theme.spacing(2)
    },
    buttons: {
        marginTop: theme.spacing(2),
    },
    iconLeft: {
        marginRight: theme.spacing(1)
    },
    editorBox: {

        height: 250,
        overflow: 'auto',
        padding: 6
    },
    toolbarBox: {
        borderTop: "none",
        borderLeft: "none",
        borderRight: "none"
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