import React from 'react';

// @material-ui theme
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './config/theme';

//@material-ui components
import CssBaseline from "@material-ui/core/CssBaseline";

// notistack untuk mempermudah penggunaan @material-ui/core/Snackbar
import { SnackbarProvider } from "notistack";

// auth context provider
import AuthProvider from './components/AuthProvider';

// react router
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// komponen wrapper Route untuk halaman private
import EmployerRoute from './components/EmployerRoute';
import AdminRoute from './components/AdminRoute';

// komponen halaman
import SignUp from './pages/signup';
import Login from './pages/login';
import EmployerDashboard from './pages/employer';
import AdminDashboard from './pages/admin';
import Home from './pages/home';
import Detail from './pages/detail';
import NotFound from './pages/404';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>
        <AuthProvider>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/lokasi/:Lokasi" component={Home} />
              <Route path="/detail/:Username/:LokerId" component={Detail} />
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={Login} />
              <EmployerRoute path="/employer" component={EmployerDashboard} />
              <AdminRoute path="/admin" component={AdminDashboard} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </AuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
