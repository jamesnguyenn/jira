import React, { useCallback, useState } from 'react';
import Input from '../../utils/Input';

import { useForm } from 'react-hook-form';

function AccountSetting() {
    const { register, formState, handleSubmit, reset } = useForm({
        mode: 'all',
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

    const onSubmiting = () => {};
    return (
        <section className="formCreateEditProject">
            <form className="register" onSubmit={handleSubmit(onSubmiting)}>
                <div className="register__container">
                    <h2>Account Setting</h2>

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
                        Edit
                    </button>
                </div>
            </form>
        </section>
    );
}

export default AccountSetting;
