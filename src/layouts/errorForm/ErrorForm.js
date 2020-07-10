import React, { Component } from 'react';

const ErrorForm = ({ errors }) => {
    const errorItems = Object.keys(errors).map((key, i) => {
        const error = errors[key][0];
        return (
            <li key={ key }>
                {error}
            </li>
        )
    });

    return (
        <div className="alert alert-danger">
            <ul>
                {errorItems}
            </ul>
        </div>
    )
};

export default ErrorForm;
