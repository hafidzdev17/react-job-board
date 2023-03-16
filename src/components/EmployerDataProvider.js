import React, { useEffect, useState, useCallback, useContext } from 'react';

import api from '../services/api';

import AppLoading from './AppLoading';

const EmployerDataContext = React.createContext();

export function useEmployerData() {

    return useContext(EmployerDataContext);
}

export default function EmployerDataProvider(props) {

    const [loker, setLoker] = useState([]);
    const [profil, setProfil] = useState({});

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        let LastEvaluatedKey;
        let items = [];
        setLoading(true);
        async function fetchEmployerData() {

            let response;
            if (LastEvaluatedKey) {

                response = await api.get('/employer-dashboard', { params: { LastEvaluatedSortKey: LastEvaluatedKey.SK } });
            } else {
                response = await api.get('/employer-dashboard');
            }

            if (response.data.LastEvaluatedKey) {
                LastEvaluatedKey = response.data.LastEvaluatedKey;
                items = [...items, ...response.data.Items]
                await fetchEmployerData();
            } else {
                items = [...items, ...response.data.Items];


                const [profil, ...loker] = items;
                setProfil(profil);
                setLoker(loker.sort((a, b) => b.CreatedAt - a.CreatedAt));
                setLoading(false)
                //response.data.Items
            }
        }

        fetchEmployerData();

    }, []);

    const setProfilCallback = useCallback((profil) => {
        setProfil(profil);
    }, []);
    const setLokerCallback = useCallback((loker) => {
        setLoker(loker);
    }, []);

    if (loading) {
        return <AppLoading text="Loading Employer Data..." />
    }

    return <EmployerDataContext.Provider
        value={{
            loker,
            profil,
            loading,
            setLoker: setLokerCallback,
            setProfil: setProfilCallback
        }}
    >{props.children}</EmployerDataContext.Provider>
}