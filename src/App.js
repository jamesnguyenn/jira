import React, { useLayoutEffect, useState } from 'react';
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
import LayoutMain from './layout/LayoutMain';

import CreateProject from './page/CreateProject';
import UserManagement from './page/UserManagement';

import 'antd/dist/antd.min.css';
import NotFoundPage from './page/NotFoundPage';

function App() {
    const dispatch = useDispatch();
    useLayoutEffect(() => {
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
                {/* Screens */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <LayoutMain>
                                <HomeScreen />
                            </LayoutMain>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/create-project"
                    element={
                        <ProtectedRoute>
                            <LayoutMain>
                                <CreateProject />
                            </LayoutMain>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/user-management"
                    element={
                        <ProtectedRoute>
                            <LayoutMain>
                                <UserManagement />
                            </LayoutMain>
                        </ProtectedRoute>
                    }
                />
                {/* Detail Screens */}

                {/* Not Found Page */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <ToastContainer />
        </div>
    );
}

export default App;
