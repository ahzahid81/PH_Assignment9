import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return(
            <div className='min-h-[60vh] flex justify-center items-center'>
                <span className='loading loading-spinner loading-lg'></span>
            </div>
        )
    }

    if(!user){
        return(
            <Navigate to="/login" state={{from: location}} ></Navigate>
        )  
    }

    return children;
};

export default PrivateRoute;