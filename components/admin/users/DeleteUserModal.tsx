import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useState } from 'react';
import toast from 'react-hot-toast';
import { FiTrash, FiX } from 'react-icons/fi';
import { User } from '../../../services/users/types/user.type';
import useUsersClientService from '../../../services/users/users.client.service';
import Button from '../ui/Button/Button';
import Modal from '../ui/Modal';
import Toast from '../ui/Toast';

type DeleteUserModalProperties = {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	user: User;
}

const DeleteUserModal = ({ isOpen, setIsOpen, user }: DeleteUserModalProperties) => {

    const router = useRouter();
    const [ confirmDeleteUserInputValue, setConfirmDeleteUserInputValue ] = useState('');
    const { deleteUserById } = useUsersClientService();

    const onConfirmDeleteUser = async () => {
        try {
            await deleteUserById(user.uid);
            toast.custom(<Toast variant='success'><FiTrash /><span>Utilisateur supprimé</span></Toast>);
            router.push('/admin/users');
        } catch (error) {
            toast.custom(<Toast variant='danger'><FiX /><span>Une erreur est survenue</span></Toast>);
            console.error(error);
        }
        setIsOpen(false);
        setConfirmDeleteUserInputValue('');
    };

    const onCloseModal = () => {
        setIsOpen(false);
        setConfirmDeleteUserInputValue('');
    };

    return (
        <Modal
            isOpen={ isOpen }
            closeModal={ onCloseModal }
            title={ {
                text: <span className='flex items-center gap-2'><FiTrash /><span>Supprimer ce compte</span></span>,
                color: 'text-danger-light-default dark:text-danger-dark-default',
            } }
        >
            <div className="my-5">
                <p className="text-sm text-secondary-dark-tint dark:text-secondary-light-shade">
					Les données relatives à cet utilisateur seront définitivement supprimées.
                </p>
                <p className="text-sm text-secondary-dark-tint dark:text-secondary-light-shade mb-3">
					Pour confirmer la suppression de ce compte, veuillez écrire l'adresse email de l'utilisateur (<span className='font-bold select-none'>{user.email}</span>) ci-dessous:
                </p>
                <div className="flex text-sm">
                    <input
                        type="email"
                        value={ confirmDeleteUserInputValue }
                        onChange={ (e) => setConfirmDeleteUserInputValue(e.target.value) }
                        className="p-2 rounded-md border-[0.5px] border-secondary-light-shade dark:border-secondary-dark-tint bg-white dark:bg-secondary-dark-default w-full dark:text-light-50"
                        id="deleteUserEmailInput"
                        placeholder="example@example.com"
                    />
                </div>
            </div>

            <div className="mt-4 flex text-sm justify-end">
                <Button
                    variant={ 'danger' }
                    onClick={ onConfirmDeleteUser }
                    disabled={ !confirmDeleteUserInputValue || (confirmDeleteUserInputValue && confirmDeleteUserInputValue !== user.email) ? true : false }
                >
					Confirmer
                </Button>
            </div>
        </Modal>
    );
};

export default DeleteUserModal;
