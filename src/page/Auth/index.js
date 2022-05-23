import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Login from '../../component/Login';
import Register from '../../component/Register';
import { getUserInfo } from '../../redux/selectors';

function Auth() {
    const [auth, setAuth] = useState(true);

    let location = useLocation();
    let from = location.state?.from?.pathname || '/';

    const { accessToken } = useSelector(getUserInfo);

    const handleOnClick = useCallback(() => {
        setAuth(!auth);
    }, [auth]);
    if (accessToken) {
        return <Navigate to={from} replace />;
    }

    return (
        <div className="auth">
            <div className="auth__left">
                <div className="auth__left-container">
                    <h2>Project Bug & Task Management </h2>
                    <p>
                        Project Owner: Nguyen Quang Thien & Hoang Minh Khoa
                        (BC23 - CyberSoft)
                    </p>
                    <img
                        className="auth__left__image"
                        src="https://wiki.tino.org/wp-content/uploads/2021/07/word-image-1272.png"
                        alt="jira-background"
                    />
                </div>
            </div>
            <div className="auth__right">
                {auth ? (
                    <Login onClick={handleOnClick} />
                ) : (
                    <Register onClick={handleOnClick} />
                )}
            </div>
        </div>
    );
}

export default Auth;
