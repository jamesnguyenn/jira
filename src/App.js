import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './component/Login';
import Register from './component/Register';
import Auth from './page/Auth';
import ProtectedRoute from './page/ProtectedRoute';
import HomeScreen from './page/HomeScreen';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ACCESSTOKEN } from './axios';
import { checkTokenThunk } from './redux/thunk';
import { useDispatch } from 'react-redux';

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem(ACCESSTOKEN));
        if (userData) {
            const checkToken = checkTokenThunk(userData);
            dispatch(checkToken);
        }
    }, [dispatch]);
    return (
        <div className="App">
            <Routes>
                {/* Authentication */}
                <Route
                    path="/auth/login"
                    element={
                        <Auth>
                            <Login></Login>
                        </Auth>
                    }
                ></Route>
                <Route
                    path="/auth/register"
                    element={
                        <Auth>
                            <Register></Register>
                        </Auth>
                    }
                ></Route>
                {/* App */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <HomeScreen />
                        </ProtectedRoute>
                    }
                />
            </Routes>
            <ToastContainer />
        </div>
    );
}

export default App;
