import { Field } from 'formik';
import { func, string } from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const DebouncedField = ({ value, onChange, ...rest }) => {

    const [ innerValue, setInnerValue ] = useState('');

    useEffect(() => {
        if (value) {
            setInnerValue(value);
        } else {
            setInnerValue('');
        }
    }, [ value, setInnerValue ]);

    const debouncedHandleOnChange = useDebouncedCallback(
        (event) => {
            if (onChange) {
                onChange(event);
            }
        },
        250
    );

    const handleOnChange = useCallback((event) => {
        event.persist();
        const newValue = event.currentTarget.value;
        setInnerValue(newValue);
        debouncedHandleOnChange(event);
    }, [ debouncedHandleOnChange, setInnerValue ]);

    return (
        <Field
            { ...rest }
            value={ innerValue }
            onChange={ handleOnChange }
        />
    );
};

export default DebouncedField;

DebouncedField.propTypes = {
    value: string.isRequired,
    onChange: func.isRequired,
};