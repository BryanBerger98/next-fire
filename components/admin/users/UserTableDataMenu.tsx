import { useState } from 'react';
import { FiEdit, FiKey, FiLock, FiSend, FiTrash, FiUnlock, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
// import useUsersApi from '../../packages/api/users';
import { bool, shape, string } from 'prop-types';
import DropdownItem from '../ui/DropdownMenu/DropdownItem';
import DropdownMenu from '../ui/DropdownMenu/DropdownMenu';
import Toast from '../ui/Toast';
import { CurrentUser } from '../../../services/auth/types/current-user.type';
import { User } from '../../../services/users/types/user.type';
// import SwitchDisableUserModal from './SwitchDisableUserModal';
// import DeleteUserModal from './DeleteUserModal';

type UserTableDataMenuProperties = {
	user: User,
	currentUser: CurrentUser;
}

const UserTableDataMenu = ({ user, currentUser }: UserTableDataMenuProperties) => {

    const router = useRouter();
    // const { sendResetPasswordEmailToUser } = useUsersApi();

    const [ isSwitchDisableUserModalOpen, setIsSwitchDisableUserModalOpen ] = useState(false);
    const [ isDeleteUserModalOpen, setIsDeleteUserModalOpen ] = useState(false);

    const onSendResetPasswordEmail = () => {
        // sendResetPasswordEmailToUser(user._id)
        //     .then(() => {
        //         toast.custom(<Toast><FiSend /><span>Email envoyé !</span></Toast>);
        //     })
        //     .catch(error => {
        //         toast.custom(<Toast variant='danger'><FiX /><span>Une erreur est survenue</span></Toast>);
        //         console.error(error);
        //     });
    };

    return (
        <>
            <DropdownMenu>
                {/* <div className="p-1">
                    <DropdownItem
                        icon={ <FiEdit /> }
                        name='Modifier'
                        onClick={ () => router.push(`/admin/users/edit/${ user._id }`) }
                    />
                    { user && !user.disabled &&
						<>
						    <DropdownItem
						        icon={ <FiKey /> }
						        name='Réinitialiser le mot de passe'
						        onClick={ onSendResetPasswordEmail }
						    />
						    {
						        currentUser && currentUser._id !== user._id &&
								<DropdownItem
								    icon={ <FiLock /> }
								    name='Suspendre le compte'
								    onClick={ () => setIsSwitchDisableUserModalOpen(true) }
								    variant='warning'
								/>
						    }
						</>
                    }
                    { user && user.disabled && <DropdownItem
                        icon={ <FiUnlock /> }
                        name='Débloquer le compte'
                        onClick={ () => setIsSwitchDisableUserModalOpen(true) }
                        variant='warning'
                    /> }
                </div> */}
                {
                    currentUser && currentUser.uid !== user.uid &&
					<div className="p-1">
					    <DropdownItem
					        icon={ <FiTrash /> }
					        name='Supprimer'
					        variant='danger'
					        onClick={ () => setIsDeleteUserModalOpen(true) }
					    />
					</div>
                }
            </DropdownMenu>
            {/* <SwitchDisableUserModal
                isOpen={ isSwitchDisableUserModalOpen }
                setIsOpen={ setIsSwitchDisableUserModalOpen }
                user={ user }
            />
            <DeleteUserModal
                isOpen={ isDeleteUserModalOpen }
                setIsOpen={ setIsDeleteUserModalOpen }
                user={ user }
            /> */}
        </>
    );
};

export default UserTableDataMenu;

UserTableDataMenu.propTypes = {
    user: shape({
        _id: string,
        disabled: bool,
    }),
    currentUser: shape({ _id: string }),
};

UserTableDataMenu.defaultProps = {
    user: null,
    currentUser: null,
};
