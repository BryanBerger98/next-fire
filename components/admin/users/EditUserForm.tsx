import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import * as yup from 'yup';
import { FiSave } from 'react-icons/fi';
import { useRouter } from 'next/router';
import ButtonWithLoader from '../ui/Button/ButtonWithLoader';
import TextField from '../forms/TextField';
import SelectField from '../forms/SelectField';
import PhoneField from '../forms/PhoneField';
import { format } from 'libphonenumber-js';
import { User } from '../../../services/users/types/user.type';
import useUsersClientService from '../../../services/users/users.client.service';
import { DeepMap, FieldError, FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export type EditUserFormInputs = {
	email: string;
	displayName: string;
	phoneNumber: string;
	role: string;
} & FieldValues;

type EditUserFormProperties = {
	user?: User | null;
	setUser: Dispatch<SetStateAction<User | null>>;
	onSubmit: (values: EditUserFormInputs) => void;
};

const defaultUser = null;

const EditUserForm = ({ user = defaultUser, setUser, onSubmit }: EditUserFormProperties) => {

    const router = useRouter();
    const { createUser } = useUsersClientService();

    const [ saving, setSaving ] = useState(false);
    const [ errorCode, setErrorCode ] = useState(null);
    const [ phoneNumberValues, setPhoneNumberValues ] = useState({});

    const userFormSchema = yup.object({
        displayName: yup.string(),
        email: yup.string().email('Merci de saisir une adresse valide.').required('Ce champs est requis.'),
        phoneNumber: yup.string(),
        role: yup.string(),
    }).required();

    const { register, handleSubmit, formState: { errors } } = useForm<EditUserFormInputs>({
        resolver: yupResolver(userFormSchema),
        mode: 'onTouched',
    });

    const handleSubmit_OLD = useCallback(async (values: EditUserFormInputs) => {
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
        <>
            <form
                className='text-sm'
                onSubmit={ handleSubmit(onSubmit) }
            >
                <TextField
                    name='displayName'
                    type='text'
                    register={ register }
                    label="Nom d'utilisateur"
                    placeholder='Ex: John DOE'
                    errors={ errors as DeepMap<EditUserFormInputs, FieldError> }
                    required
                />
                <div className="flex gap-2 flex-wrap">
                    <div className='grow'>
                        <TextField
                            name='email'
                            type='email'
                            label={ 'Adresse email' }
                            placeholder={ 'example@example.com' }
                            required
                            register={ register }
                            errors={ errors as DeepMap<EditUserFormInputs, FieldError> }
                            inputStyle={ { default: { className: 'grow' } } }
                        />
                    </div>
                    <div className="grow">
                        <PhoneField
                            name='phoneNumber'
                            onChangePhoneNumber={ onChangePhoneNumber }
                            label={ 'Téléphone' }
                            placeholder={ '+33 6 01 02 03 04' }
                            register={ register }
                            errors={ errors as DeepMap<EditUserFormInputs, FieldError> }
                        />
                    </div>
                </div>
                <div className="mb-5">
                    <SelectField
                        name='role'
                        label={ 'Role' }
                        required={ true }
                        errors={ errors as DeepMap<EditUserFormInputs, FieldError> }
                        options={ [ {
                            value: 'admin',
                            label: 'Administrateur',
                        }, {
                            value: 'user',
                            label: 'Utilisateur',
                        } ] }
                        register={ register }
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
            </form>
        </>
    );
};

export default EditUserForm;
