import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk, signInFacebook } from '../../redux/thunk';
import { ToastContainer, toast } from 'react-toastify';
import { getUserInfo } from '../../redux/selectors';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { loginRequest } from '../../redux/reducer/userSlice';
import Loading from '../Loading';

const schemaValidations = Yup.object({
    email: Yup.string()
        .email('Email is not valid type')
        .required('Email is required'),
    passWord: Yup.string().required('Password is require !'),
});

function Login({ onClick }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(getUserInfo);

    const { isLoading } = user;

    const { register, handleSubmit, formState } = useForm({
        mode: 'all',
        resolver: yupResolver(schemaValidations),
    });

    const { errors } = formState;

    // const responseFacebook = (response) => {
    //     // const { accessToken } = response;
    //     // const actionThunk = signInFacebook(accessToken);
    //     // //dispatch action thực thi
    //     // dispatch(actionThunk);
    // };

    // const componentClicked = (data) => {
    //     // console.warn(data);
    //     toast.warn(
    //         '🦄 This feature is building. Please help us login by your email and password!. Thanks you',
    //         {
    //             position: 'top-right',
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //         }
    //     );
    // };

    const onSubmit = (data) => {
        const loginApi = loginThunk(data, navigate);
        dispatch(loginRequest());
        dispatch(loginApi);
    };

    return (
        <form className="login" onSubmit={handleSubmit(onSubmit)}>
            <div className="login__container">
                <h2>Login</h2>

                <div className="login__field">
                    <div className="login__field__input">
                        <label htmlFor="email">Email</label>
                        <input
                            autoComplete="off"
                            type="text"
                            id="email"
                            placeholder="Enter your email"
                            defaultValue={user?.email}
                            {...register('email')}
                        />
                    </div>
                    {errors.email && (
                        <div className="login__field-error">
                            {errors.email.message}
                        </div>
                    )}
                </div>
                <div className="login__field">
                    <div className="login__field__input">
                        <label htmlFor="password">Password</label>
                        <input
                            autoComplete="off"
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            {...register('passWord')}
                        />
                    </div>
                    {errors.passWord && (
                        <div className="login__field-error">
                            {errors.passWord.message}
                        </div>
                    )}
                </div>
                <div className="forgotPassword">Forgot password?</div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading}
                >
                    {isLoading ? <Loading /> : 'Log in'}
                </button>
                <button className="btn btn-secondary" onClick={onClick}>
                    Register account
                </button>

                {/* <div className="login__social">
                    <FacebookLogin
                        appId="5477025092310466"
                        autoLoad={true}
                        fields="name,email,picture"
                        callback={responseFacebook}
                        cssClass="my-facebook-button-class"
                        onClick={componentClicked}
                        icon="fa-facebook"
                    />
                </div> */}
            </div>
        </form>
    );
}

export default memo(Login);
