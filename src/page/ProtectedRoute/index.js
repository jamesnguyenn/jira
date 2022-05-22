import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUserInfo } from '../../redux/selectors';

function ProtectedRoute({ children }) {
    const { accessToken } = useSelector(getUserInfo);

    if (!accessToken) {
        return <Navigate to="/auth/login" />;
    }
    return children;
}

export default ProtectedRoute;
