import React, { CSSProperties, HTMLInputTypeAttribute, useId } from 'react';
import FieldErrorMessage from './FieldErrorMessage';
import { UseFormRegister, FieldValues, Path, FieldError, DeepMap } from 'react-hook-form';

const DEFAULT_LABEL_STYLE = {
    className: 'text-gray-600 dark:text-gray-300 mb-1 ml-1',
    style: {},
};

const DEFAULT_INPUT_STYLE = {
    className: 'p-2 rounded-md bg-gray-100 dark:bg-gray-700 shadow-inner dark:text-gray-50 focus:outline outline-primary-light-default dark:outline-primary-dark-default',
    style: {},
};

type TextFieldProperties<TFormValues> = {
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
	register: UseFormRegister<TFormValues & FieldValues>
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

const TextField = <TFormValues extends Record<string, unknown>>({ name, type, label, inputStyle = defaultInputStyle, labelStyle = defaultLabelStyle, placeholder, required = defaultRequired, disabled = defaultDisabled, register, errors = undefined }: TextFieldProperties<TFormValues>) => {

    const id = useId();

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

    const errorMessage = errors && errors[ name as string ] && errors[ name as string ].message;
    const hasError = !!( errors && errorMessage );

    if (hasError) {
        mergedInputStyle.className = `${ mergedInputStyle.className } ring-1 ring-danger-light-default/50 dark:ring-danger-dark-default/50 ring-danger-light-default dark:ring-danger-dark-default`;
    }

    return (
        <div className='mb-3 flex flex-col text-sm'>
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
            <input
                type={ type }
                id={ `${ id }-${ name }` }
                placeholder={ `${ placeholder } ${ required && !label ? '*' : '' }` }
                className={ mergedInputStyle.className }
                disabled={ disabled }
                style={ mergedInputStyle.style }
                { ...register(name, {
                    required,
                    disabled,
                }) }
            />
            { hasError && <FieldErrorMessage message={ errorMessage } /> }
        </div>
    );
};

export default TextField;

// TextField.propTypes = {
//     name: PropTypes.string.isRequired,
//     value: PropTypes.string,
//     type: PropTypes.oneOf([
//         'text',
//         'email',
//         'password',
//         'tel',
//         'url',
//     ]),
//     label: PropTypes.string,
//     inputStyle: PropTypes.shape({
//         className: PropTypes.string,
//         style: PropTypes.object,
//     }),
//     labelStyle: PropTypes.shape({
//         className: PropTypes.string,
//         style: PropTypes.object,
//     }),
//     onChange: PropTypes.func,
//     placeholder: PropTypes.oneOfType([
//         PropTypes.string,
//         PropTypes.node,
//     ]),
//     required: PropTypes.bool,
//     disabled: PropTypes.bool,
//     touched: PropTypes.object,
//     errors: PropTypes.object,
// };

// TextField.defaultProps = {
//     value: undefined,
//     type: 'text',
//     label: '',
//     inputStyle: {
//         className: '',
//         style: {},
//     },
//     labelStyle: {
//         className: '',
//         style: {},
//     },
//     onChange: undefined,
//     placeholder: '',
//     required: false,
//     disabled: false,
//     touched: undefined,
//     errors: undefined,
// };
