import React from 'react';

//Control de Inputs
const InputField = ({ id, type, value, onChange, placeholder, required, pattern}) => (
    <div className="mb-4 flex justify-center">
        <div className="w-2/4">
            <input
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                id={id}
                name={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                pattern={pattern}
            />
        </div>
    </div>
);

export default InputField;
