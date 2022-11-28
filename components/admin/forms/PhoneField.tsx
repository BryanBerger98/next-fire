import { AsYouType, CountryCode, getCountries, PhoneNumber } from 'libphonenumber-js';
import PropTypes from 'prop-types';
import { CSSProperties, HTMLInputTypeAttribute, useId, useState } from 'react';
import { DeepMap, FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';
import FieldErrorMessage from './FieldErrorMessage';

const DEFAULT_LABEL_STYLE = {
    className: 'text-gray-600 dark:text-gray-300 mb-1 ml-1',
    style: {},
};

const DEFAULT_INPUT_STYLE = {
    className: 'p-2 rounded-r-md bg-gray-100 dark:bg-gray-700 dark:text-gray-50 grow shadow-inner',
    style: {},
};

type PhoneFieldProperties<TFormValues> = {
	name: Path<TFormValues>;
	type: HTMLInputTypeAttribute;
	label: string;
	inputStyle?: {
		className?: string;
		style?: CSSProperties;
	};
	labelStyle?: {
		className?: string;
		style?: CSSProperties;
	};
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	errors?: DeepMap<TFormValues, FieldError>;
	register: UseFormRegister<TFormValues & FieldValues>,
	onChangePhoneNumber: (phoneNumber: PhoneNumber | undefined) => void;
}

const defaultRequired = false;
const defaultDisabled = false;
const defaultInputStyle = {
    className: '',
    style: {},
};
const defaultLabelStyle = {
    className: '',
    style: {},
};

const PhoneField = <TFormValues extends Record<string, unknown>>({ name, label, inputStyle = defaultInputStyle, labelStyle = defaultLabelStyle, onChangePhoneNumber, placeholder, required = defaultRequired, disabled = defaultDisabled, errors, register }: PhoneFieldProperties<TFormValues>) => {

    const id = useId();

    const [ countrySelectValue, setCountrySelectValue ] = useState<CountryCode>('FR');

    const mergedInputStyle = {
        className: `${ DEFAULT_INPUT_STYLE.className } ${ inputStyle.className }`,
        style: {
            ...DEFAULT_INPUT_STYLE.style,
            ...inputStyle.style,
        },
    };

    const mergedLabelStyle = {
        className: `${ DEFAULT_LABEL_STYLE.className } ${ labelStyle.className }`,
        style: {
            ...DEFAULT_LABEL_STYLE.style,
            ...labelStyle.style,
        },
    };

    if (errors && errors[ name ] ) {
        mergedInputStyle.className = `${ mergedInputStyle.className } outline-1 outline-danger-light-default/50 dark:outline-danger-dark-default/50 border-danger-light-default dark:border-danger-dark-default`;
    }

    const handleChange = (event) => {
        const { value } = event.target;

        if (!value) {
            // return onChange(event);
        }
        if (value) {
            const asYouType = new AsYouType(countrySelectValue);
            const input = asYouType.input(value);
            event.target.value = input;
            // onChange(event);
            onChangePhoneNumber(asYouType.getNumber());
        }
    };

    return (
        <div className='relative mb-3 flex flex-col text-sm'>
            { label &&
                <label
                    htmlFor={ `${ id }-${ name }` }
                    className={ mergedLabelStyle.className }
                    style={ mergedLabelStyle.style }
                >
                    {label}
                    {required && <span className="text-red-500 dark:text-red-400"> *</span>}
                </label>
            }
            <div className='flex w-full gap-0'>
                <select
                    value={ countrySelectValue }
                    onChange={ (event) => setCountrySelectValue(event.target.value) }
                    className='appearance-none p-2 px-3 rounded-none rounded-l-md shadow-inner bg-light-100 dark:bg-light-800'
                >
                    {
                        getCountries().map(countryCode => {
                            return <option
                                key={ countryCode }
                                value={ countryCode }
                            >{ countryCode }</option>;
                        })
                    }
                </select>
                <input
                    type='tel'
                    id={ `${ id }-${ name }` }
                    placeholder={ `${ placeholder } ${ required && !label ? '*' : '' }` }
                    className={ mergedInputStyle.className }
                    disabled={ disabled }
                    style={ mergedInputStyle.style }
                    { ...register(name, {
                        required,
                        disabled,
                        value,
                        onChange: handleChange,
                    }) }
                />
            </div>
            { errors && errors[ name ] && <FieldErrorMessage message={ errors[ name ] } /> }
        </div>
    );
};

export default PhoneField;
