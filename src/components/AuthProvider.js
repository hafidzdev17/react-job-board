import React, { useEffect, useState, useCallback, useContext } from 'react';

// cognito user pool 
import Auth from '@aws-amplify/auth';
import cognitoConfig from '../config/cognito';

// app components
import AppLoading from './AppLoading';

//utils
import { useSnackbar } from 'notistack';

Auth.configure(cognitoConfig);

const AuthContext = React.createContext();

// custom hook untuk mengakses AuthContext
export function useAuth() {

    return useContext(AuthContext);
}

// AuthContext Provider
export default function AuthProvider(props) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setAdmin] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {

        const getUserInfo = async () => {
            setLoading(true);
            try {
                const userInfo = await Auth.currentUserPoolUser();

                const usergroups = userInfo?.signInUserSession?.accessToken?.payload?.['cognito:groups'] ?? '';
                setAdmin(usergroups.includes('Admin'));
                setUser(userInfo);
            } catch (e) {
                console.log(e)

            }
            setLoading(false);
        }

        getUserInfo();

    }, [enqueueSnackbar])

    const setUserCallback = useCallback((user) => {
        const usergroups = user?.signInUserSession?.accessToken?.payload?.['cognito:groups'] ?? '';
        setAdmin(usergroups.includes('Admin'));
        setUser(user);
    }, [])

    const handleLogout = useCallback(async () => {

        try {
            await Auth.signOut();
            setUser(null);
            setAdmin(false);
        } catch (e) {
            enqueueSnackbar(`Gagal Sign Out: ${e.message}`, { variant: "error" })
        }
    }, [enqueueSnackbar])

    if (loading) {
        return <AppLoading text="Auth Loading..." />
    }

    return <AuthContext.Provider value={{
        user,
        setUser: setUserCallback,
        handleLogout,
        isAdmin,
        loading
    }}>
        {props.children}
    </AuthContext.Provider>
}