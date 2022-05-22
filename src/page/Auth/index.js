import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import loginLogo from '../../assets/img/Brazuca.png';
import { getUserInfo } from '../../redux/selectors';

function Auth({ children }) {
    const { accessToken } = useSelector(getUserInfo);

    if (accessToken) {
        return <Navigate to="/" />;
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
            <div className="auth__right">{children}</div>
        </div>
    );
}

export default Auth;
