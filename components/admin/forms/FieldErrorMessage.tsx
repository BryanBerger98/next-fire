import { CSSProperties } from 'react';
import { FiAlertCircle } from 'react-icons/fi';

const DEFAULT_STYLE = {
    className: 'mt-2 text-sm flex items-center text-red-500 dark:text-red-400',
    style: {},
};

export type FieldErrorMessageProperties = {
	message: string;
	messageStyle?: {
		className: string;
		style: CSSProperties;
	},
	iconOnly?: boolean;
};

const defaultMessage = '';
const defaultMessageStyle = {
    className: '',
    style: {},
};
const defaultIconOnly = false;

const FieldErrorMessage = ({ message= defaultMessage, messageStyle = defaultMessageStyle, iconOnly = defaultIconOnly }: FieldErrorMessageProperties) => {

    const mergedMessageStyle = messageStyle ? {
        className: `${ DEFAULT_STYLE.className } ${ messageStyle.className }`,
        style: {
            ...DEFAULT_STYLE.style,
            ...messageStyle.style,
        },
    } : DEFAULT_STYLE;

    return (
        <span
            className={ mergedMessageStyle.className }
            style={ mergedMessageStyle.style }
            title={ message }
        >
            <FiAlertCircle className='mr-1' />
            {!iconOnly && <span>{ message }</span>}
        </span>
    );
};

export default FieldErrorMessage;
