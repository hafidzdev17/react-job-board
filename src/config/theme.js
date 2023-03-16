import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#2196F3"
        },
        secondary: {
            main: "#ffffff"
        }
    }
})

export default responsiveFontSizes(theme);