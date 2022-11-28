import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import * as Yup from 'yup';
import { FiSave } from 'react-icons/fi';
import { useRouter } from 'next/router';
import ButtonWithLoader from '../ui/Button/ButtonWithLoader';
import TextField from '../forms/TextField';
import SelectField from '../forms/fields/SelectField';
import PhoneField from '../forms/PhoneField';
import { format } from 'libphonenumber-js';
import { User } from '../../../services/users/types/user.type';
import useUsersClientService from '../../../services/users/users.client.service';

type EditUserFormProperties = {
	user?: User | null;
	setUser: Dispatch<SetStateAction<User | null>>;
}

const defaultUser = null;

const EditUserForm = ({ user = defaultUser, setUser }: EditUserFormProperties) => {

    const router = useRouter();
    const { createUser } = useUsersClientService();

    const [ saving, setSaving ] = useState(false);
    const [ errorCode, setErrorCode ] = useState(null);
    const [ phoneNumberValues, setPhoneNumberValues ] = useState({});

    const UserFormSchema = Yup.object().shape({
        username: Yup.string(),
        email: Yup.string().email('Email invalide').required('Champs requis'),
        phone_number: Yup.string(),
        role: Yup.string(),
    });

    const handleSubmit = useCallback(async (values) => {
        setSaving(true);
        setErrorCode(null);

        try {
            if (user) {
                const userDataToUpdate = {
                    ...user,
                    ...values,
                    phone_number: phoneNumberValues.number,
                };
                // await updateUser(userDataToUpdate);
                setUser(userDataToUpdate);
            } else {
                const response = await createUser({
                    ...values,
                    phone_number: phoneNumberValues.number,
                });
                // router.push(`edit/${ response._id }`);
            }
            setSaving(false);
        } catch (error) {
            setSaving(false);
            if (error.response && error.response.data && error.response.data.code) {
                setErrorCode(error.response.data.code);
                return;
            }
            console.error(error);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ user, setSaving, setErrorCode, router, setUser, phoneNumberValues ]);

    const onChangePhoneNumber = (values) => {
        setPhoneNumberValues(values);
    };

    return (
        <Formik
            initialValues={ {
                username: user && user.username ? user.username : '',
                email: user && user.email ? user.email : '',
                phone_number: user && user.phone_number ? format(user.phone_number, 'NATIONAL') : '',
                role: user && user.role ? user.role : 'user',
            } }
            validationSchema={ UserFormSchema }
            onSubmit={ handleSubmit }
            enableReinitialize={ true }
            validateOnChange={ false }
            validateOnBlur={ false }
            validateOnMount={ false }
        >
            {({ errors, touched, handleChange, values }) => (
                <Form className="text-sm">
                    <TextField
                        name='username'
                        value={ values.username }
                        onChange={ handleChange }
                        label={ 'Nom d\'utilisateur' }
                        placeholder={ 'Nom d\'utilisateur' }
                        touched={ touched }
                        errors={ errors }
                    />
                    <div className="flex gap-2 flex-wrap">
                        <div className='grow'>
                            <TextField
                                name='email'
                                value={ values.email }
                                type='email'
                                onChange={ handleChange }
                                label={ 'Adresse email' }
                                placeholder={ 'example@example.com' }
                                required={ true }
                                touched={ touched }
                                errors={ errors }
                                inputStyle={ { className: 'grow' } }
                            />
                        </div>
                        <div className="grow">
                            <PhoneField
                                name='phone_number'
                                value={ values.phone_number }
                                onChange={ handleChange }
                                onChangePhoneNumber={ onChangePhoneNumber }
                                label={ 'Téléphone' }
                                placeholder={ '+33 6 01 02 03 04' }
                                touched={ touched }
                                errors={ errors }
                            />
                        </div>
                    </div>
                    <div className="mb-5">
                        <SelectField
                            name='role'
                            value={ values.role }
                            onChange={ handleChange }
                            label={ 'Role' }
                            required={ true }
                            touched={ touched }
                            errors={ errors }
                            options={ [ {
                                value: 'admin',
                                label: 'Administrateur',
                            }, {
                                value: 'user',
                                label: 'Utilisateur',
                            } ] }
                        />
                    </div>
                    <ButtonWithLoader
                        variant={ 'success' }
                        type='submit'
                        saving={ saving }
                        loaderOrientation={ 'right' }
                        error={ errorCode }
                        displayErrorMessage={ true }
                    >
                        <FiSave />
                        <span>Enregistrer</span>
                    </ButtonWithLoader>
                </Form>
            )}
        </Formik>
    );
};

export default EditUserForm;
