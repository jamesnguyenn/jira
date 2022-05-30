import React, { memo } from 'react';

function Select({
    register,
    registerName,
    id,
    name,
    children,
    defaultValue,
    style,
}) {
    return (
        <div className="selectCategory">
            <select
                className="selectCategory__select"
                name={name}
                id={id}
                defaultValue={defaultValue}
                {...register(registerName)}
            >
                {children}
            </select>
        </div>
    );
}

export default memo(Select);
