import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { getViewPort } from '../../redux/selectors';

function Input({
    defaultValue,
    register,
    registerName,
    errors,
    errorsMessage,
    id,
    labelName,
    placeholder,
    type,
    disabled,
}) {
    const viewPort = useSelector(getViewPort);
    const { width } = viewPort.data;
    return (
        <div className="text-field" style={{ width: '100%' }}>
            <label htmlFor={id} style={{ fontSize: width <= 1023 && '9px' }}>
                {labelName}
            </label>
            <input
                defaultValue={defaultValue || ''}
                autoComplete="off"
                type={type}
                id={id}
                placeholder={placeholder}
                {...register(registerName)}
                disabled={disabled}
            />
            {errors && (
                <span className="text-field-error">{errorsMessage}</span>
            )}
        </div>
    );
}

export default memo(Input);
