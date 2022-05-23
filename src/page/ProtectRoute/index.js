import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getUserInfo } from '../../redux/selectors';

function ProtectRoute() {
    const { accessToken } = useSelector(getUserInfo);
    const location = useLocation();
    if (!accessToken) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }
    return <Outlet />;
}

export default ProtectRoute;
