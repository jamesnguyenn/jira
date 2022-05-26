import React, { memo } from 'react';

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
    return (
        <div className="text-field">
            <label htmlFor={id}>{labelName}</label>
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
