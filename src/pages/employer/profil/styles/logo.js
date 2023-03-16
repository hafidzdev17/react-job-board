import { makeStyles } from "@material-ui/core/styles";
export default makeStyles(theme => ({
    avatarWrap: {
        width: 100,
        height: 100,
        position: "relative",
    },
    avatar: {
        position: "absolute",
        width: 100,
        height: 100,
    },
    fab: {
        position: "absolute",
        bottom: 2,
        right: 2,
        opacity: .7
    }

}));
