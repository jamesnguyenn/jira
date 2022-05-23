import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Auth from './page/Auth';
import HomeScreen from './page/HomeScreen';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ACCESSTOKEN } from './axios';
import { checkTokenThunk } from './redux/thunk';
import { useDispatch, useSelector } from 'react-redux';
import LayoutMain from './layout/LayoutMain';

import CreateProject from './page/CreateProject';
import UserManagement from './page/UserManagement';

import 'antd/dist/antd.min.css';
import NotFoundPage from './page/NotFoundPage';
import ProjectDetail from './page/ProjectDetail';
import { getUserInfo } from './redux/selectors';

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem(ACCESSTOKEN));
        if (userData) {
            const checkToken = checkTokenThunk(userData);
            dispatch(checkToken);
        }
    }, [dispatch]);
    const { accessToken } = useSelector(getUserInfo);

    return (
        <div className="App">
            {!accessToken ? (
                <Auth></Auth>
            ) : (
                <Routes>
                    {/* Screens */}
                    <Route
                        path="/"
                        element={
                            <LayoutMain>
                                <HomeScreen />
                            </LayoutMain>
                        }
                    />
                    <Route
                        path="/create-project"
                        element={
                            <LayoutMain>
                                <CreateProject />
                            </LayoutMain>
                        }
                    />
                    <Route
                        path="/user-management"
                        element={
                            <LayoutMain>
                                <UserManagement />
                            </LayoutMain>
                        }
                    />
                    {/* Detail Screens */}
                    <Route
                        path="/project-detail"
                        element={
                            <LayoutMain>
                                <ProjectDetail />
                            </LayoutMain>
                        }
                    />
                    {/* Not Found Page */}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            )}

            <ToastContainer />
        </div>
    );
}

export default App;
