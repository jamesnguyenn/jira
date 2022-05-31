import React, { useCallback, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { getUserInfo } from '../../redux/selectors';
import { useSelector } from 'react-redux';
import { updateUserManage } from '../../axios/apiURL';
import { ACCESSTOKEN, http } from '../../axios';
import { toast } from 'react-toastify';
import { loginSuccess } from '../../redux/reducer/userSlice';
import { useDispatch } from 'react-redux';

const schemaValidations = Yup.object({
    email: Yup.string()
        .email('Email is not valid type')
        .required('Email  is required !'),
    passWord: Yup.string()
        .required('Password is require !')
        .matches(/(?=.{8,})/, 'Password must be at least 8 characters !')
        .matches(/[A-Z]/, 'Password must have at least 1 uppercase character !')
        .matches(
            /(?=.*[0-9])/,
            'Password must have at least 1 number character !'
        )
        .matches(
            /(?=.*[!@#\$%\^&\*])/,
            'Password must have at least 1 special character !'
        ),
    confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('passWord')], 'Passwords must match'),
});

function AccountSetting() {
    const {
        email,
        name,
        phoneNumber,
        id,
        isLoading,
        isCheckToken,
        accessToken,
        avatar,
    } = useSelector(getUserInfo);
    const dispatch = useDispatch();
    const { register, formState, handleSubmit } = useForm({
        mode: 'all',
        resolver: yupResolver(schemaValidations),
        defaultValues: {
            email: email,
            name: name,
            phoneNumber: phoneNumber,
        },
    });
    const [eyePassword, setEyePassword] = useState({
        passWord: true,
        confirmPassword: true,
    });

    const { errors } = formState;

    const handleChangePasswordEyes = useCallback(
        (e) => {
            setEyePassword({
                ...eyePassword,
                [e.target.dataset.name]: !eyePassword[e.target.dataset.name],
            });
        },
        [eyePassword]
    );

    const onSubmiting = async (data) => {
        try {
            const { email, passWord, phoneNumber, name } = data;
            const newUserInfoUpdate = {
                id,
                email,
                passWord,
                phoneNumber,
                name,
            };
            await http.put(updateUserManage, newUserInfoUpdate);
            toast.success('Update your profile successfully!', {
                autoClose: 1000,
            });
            localStorage.setItem(
                ACCESSTOKEN,
                JSON.stringify({
                    ...newUserInfoUpdate,
                    isLoading,
                    isCheckToken,
                    accessToken,
                    avatar,
                })
            );
            dispatch(
                loginSuccess({
                    ...newUserInfoUpdate,
                    isLoading,
                    isCheckToken,
                    accessToken,
                    avatar,
                })
            );
        } catch (err) {
            toast.error('Cannot update your profile', { autoClose: 1000 });
        }
    };
    return (
        <section
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <form className="register" onSubmit={handleSubmit(onSubmiting)}>
                <div className="register__container">
                    <h2>Edit Your Profile</h2>

                    <div className="register__field">
                        <div className="register__field__input">
                            <label htmlFor="email">Email</label>
                            <input
                                autoComplete="off"
                                type="text"
                                id="email"
                                placeholder="Enter your email"
                                {...register('email')}
                            />
                        </div>
                        {errors.email && (
                            <div className="register__field-error">
                                {errors.email.message}
                            </div>
                        )}
                    </div>
                    <div className="register__field">
                        <div className="register__field__input">
                            <label htmlFor="password">Password</label>
                            <input
                                autoComplete="off"
                                type={
                                    eyePassword.passWord ? 'password' : 'text'
                                }
                                id="password"
                                placeholder="Enter your password"
                                {...register('passWord')}
                            />
                            <div
                                data-name="passWord"
                                className="register__field-eyes"
                                onClick={handleChangePasswordEyes}
                            >
                                {eyePassword.passWord ? (
                                    <i className="fa fa-eye-slash"></i>
                                ) : (
                                    <i className="fa fa-eye"></i>
                                )}
                            </div>
                        </div>
                        {errors.passWord && (
                            <div className="register__field-error">
                                {errors.passWord.message}
                            </div>
                        )}
                    </div>
                    <div className="register__field">
                        <div className="register__field__input">
                            <label htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <input
                                autoComplete="off"
                                type={
                                    eyePassword.confirmPassword
                                        ? 'password'
                                        : 'text'
                                }
                                id="confirmPassword"
                                placeholder="Confirm Your Password"
                                {...register('confirmPassword')}
                            />
                            <div
                                data-name="confirmPassword"
                                className="register__field-eyes"
                                onClick={handleChangePasswordEyes}
                            >
                                {eyePassword.confirmPassword ? (
                                    <i className="fa fa-eye-slash"></i>
                                ) : (
                                    <i className="fa fa-eye"></i>
                                )}
                            </div>
                        </div>
                        {errors.confirmPassword && (
                            <div className="register__field-error">
                                {errors.confirmPassword.message}
                            </div>
                        )}
                    </div>
                    <div className="register__field">
                        <div className="register__field__input">
                            <label htmlFor="name">Name</label>
                            <input
                                autoComplete="off"
                                type="name"
                                id="name"
                                placeholder="Enter your name"
                                {...register('name')}
                            />
                        </div>
                    </div>
                    <div className="register__field">
                        <div className="register__field__input">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input
                                autoComplete="off"
                                type="number"
                                id="phoneNumber"
                                placeholder="Enter your phone number"
                                {...register('phoneNumber')}
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Edit Your Profile
                    </button>
                </div>
            </form>
        </section>
    );
}

export default AccountSetting;
