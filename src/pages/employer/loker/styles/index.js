import { makeStyles } from "@material-ui/core/styles";
export default makeStyles(theme => ({

    gridContainer: {
        marginTop: theme.spacing(2)
    },
    lokerItem: {
        padding: theme.spacing(2)
    },
    DRAFT: {
        border: "2px solid",
        borderColor: theme.palette.grey[500]
    },
    PUBLISHED: {
        border: "2px solid",
        borderColor: theme.palette.success.main
    },
    MODERATION: {
        border: "2px solid",
        borderColor: theme.palette.warning.main
    },
    REJECTED: {
        border: "2px solid",
        borderColor: theme.palette.error.main
    },
    deleteBtnWrapper: {
        position: "relative"
    },
    buttonProgress: {
        color: theme.palette.error.main,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -20,
        marginLeft: -20,
    },
    fullWidth: {
        width: "100%"
    }

}))