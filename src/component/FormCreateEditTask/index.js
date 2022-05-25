import React from 'react';

import { useForm } from 'react-hook-form';

function FormCreateEditTask() {
    const { register, handleSubmit, formState } = useForm({
        mode: 'all',
    });
    return <form></form>;
}

export default FormCreateEditTask;
