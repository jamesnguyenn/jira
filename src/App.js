import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import ProtectRoute from './page/ProtectRoute';
import Auth from './page/Auth';
import HomeScreen from './page/HomeScreen';
import LayoutMain from './layout/LayoutMain';
import CreateProject from './page/CreateProject';
import UserManagement from './page/UserManagement';
import NotFoundPage from './page/NotFoundPage';
import ProjectDetail from './page/ProjectDetail';
import Loading from './component/Loading';

import { ACCESSTOKEN } from './axios';
import { checkTokenThunk } from './redux/thunk';
import { getUserInfo } from './redux/selectors';
import { checkTokenRequest } from './redux/reducer/userSlice';

function App() {
    const dispatch = useDispatch();
    const { isCheckToken } = useSelector(getUserInfo);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem(ACCESSTOKEN));
        if (userData) {
            dispatch(checkTokenRequest());
            const checkToken = checkTokenThunk(userData);
            dispatch(checkToken);
        }
    }, [dispatch]);

    return (
        <div className="App">
            {isCheckToken ? (
                <div className="view-center">
                    <Loading color="#000"></Loading>
                </div>
            ) : (
                <Routes>
                    <Route path="/auth" element={<Auth />} />
                    <Route element={<ProtectRoute />}>
                        <Route element={<LayoutMain />}>
                            {/* Screens */}
                            <Route path="/" element={<HomeScreen />} />
                            <Route
                                path="/create-project"
                                element={<CreateProject />}
                            />
                            <Route
                                path="/user-management"
                                element={<UserManagement />}
                            />
                            {/* Detail Screens */}
                            <Route
                                path="/project-detail/:id"
                                element={<ProjectDetail />}
                            />
                        </Route>
                    </Route>
                    {/* Not Found Page */}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            )}
            <ToastContainer />
        </div>
    );
}
export default App;
