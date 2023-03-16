import React, { useEffect, useState, useCallback, useContext } from 'react';

import api from '../services/api';

import AppLoading from './AppLoading';

const AdminDataContext = React.createContext();

export function useAdminData() {

    return useContext(AdminDataContext);
}

export default function AdminDataProvider(props) {

    const [loker, setLoker] = useState([]);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        let LastEvaluatedKey;
        let items = [];
        setLoading(true);
        async function fetchAdminData() {

            let response;
            if (LastEvaluatedKey) {

                response = await api.get('/admin-dashboard', { params: { LastEvaluatedSortKey: LastEvaluatedKey.SK } });
            } else {
                response = await api.get('/admin-dashboard');
            }

            if (response.data.LastEvaluatedKey) {
                LastEvaluatedKey = response.data.LastEvaluatedKey;
                items = [...items, ...response.data.Items]
                await fetchAdminData();
            } else {
                items = [...items, ...response.data.Items];

                setLoker(items);
                setLoading(false)
                //response.data.Items
            }
        }

        fetchAdminData();

    }, []);


    const setLokerCallback = useCallback((loker) => {
        setLoker(loker);
    }, []);

    if (loading) {
        return <AppLoading text="Loading Admin Data..." />
    }

    return <AdminDataContext.Provider
        value={{
            loker,
            loading,
            setLoker: setLokerCallback
        }}
    >{props.children}</AdminDataContext.Provider>
}