import useTranslate from '../../../packages/hooks/useTranslate';
import { func, shape, string } from 'prop-types';
import UserProfilePhotoInput from './UserProfilePhotoInput';
import DropdownMenu from '../ui/DropdownMenu/DropdownMenu';
import DropdownItem from '../ui/DropdownMenu/DropdownItem';
import { FiKey, FiLock, FiSend, FiTrash, FiUnlock, FiX } from 'react-icons/fi';
import { Dispatch, SetStateAction, useState } from 'react';
import toast from 'react-hot-toast';
import Toast from '../ui/Toast';
import SwitchDisableUserModal from './SwitchDisableUserModal';
import DeleteUserModal from './DeleteUserModal';
import { User } from '../../../services/users/types/user.type';
import { CurrentUser } from '../../../services/auth/types/current-user.type';
import useUsersClientService from '../../../services/users/users.client.service';

type EditUserInformationsSectionProperties = {
	user: User | null;
	setUser: Dispatch<SetStateAction<User | null>>;
	currentUser: CurrentUser;
}

const EditUserInformationsSection = ({ user, setUser, currentUser }: EditUserInformationsSectionProperties) => {

    const { getTranslatedRole } = useTranslate({ locale: 'fr' });

    const { sendResetPasswordEmailToUser } = useUsersClientService();

    const [ isSwitchDisableUserModalOpen, setIsSwitchDisableUserModalOpen ] = useState(false);
    const [ isDeleteUserModalOpen, setIsDeleteUserModalOpen ] = useState(false);

    const onSendResetPasswordEmail = () => {
        if (user) {
            sendResetPasswordEmailToUser(user.uid)
                .then(() => {
                    toast.custom(<Toast variant='success'><FiSend /><span>Email envoyé !</span></Toast>);
                })
                .catch(error => {
                    toast.custom(<Toast variant='danger'><FiX /><span>Une erreur est survenue</span></Toast>);
                    console.error(error);
                });
        }
    };

    return(
        <>
            <div className="bg-primary-light-default dark:bg-primary-dark-default rounded-md p-6 text-secondary-light-tint dark:text-secondary-dark-default mb-4 flex flex-wrap gap-4">
                {
                    user &&
					<UserProfilePhotoInput
					    user={ user }
					    setUser={ setUser }
					/>
                }
                <div className="my-auto">
                    <h2 className="text-2xl">{user && user.displayName ? user.displayName : <span className="italic">Sans nom</span>}</h2>
                    <p className="text-primary-lighter dark:text-secondary-dark-tint">{user && user.role && getTranslatedRole(user.role)}</p>
                </div>
                <div className="ml-auto mb-auto">
                    <DropdownMenu name={ null }>
                        <div className="p-1">
                            { user && !user.disabled &&
								<>
								    <DropdownItem
								        icon={ <FiKey /> }
								        name='Réinitialiser le mot de passe'
								        onClick={ onSendResetPasswordEmail }
								    />
								    {
								        currentUser && currentUser.uid !== user.uid &&
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
                        </div>
                        {
                            currentUser && user && currentUser.uid !== user.uid &&
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
                </div>
            </div>
            {
                user &&
				<SwitchDisableUserModal
				    isOpen={ isSwitchDisableUserModalOpen }
				    setIsOpen={ setIsSwitchDisableUserModalOpen }
				    user={ user }
				    setUser={ setUser }
				/>
            }
            {
                user &&
				<DeleteUserModal
                	isOpen={ isDeleteUserModalOpen }
				    setIsOpen={ setIsDeleteUserModalOpen }
				    user={ user }
				/>
            }
        </>
    );
};

export default EditUserInformationsSection;
