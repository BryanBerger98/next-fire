import Image from 'next/image';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FiUser } from 'react-icons/fi';
import { User } from '../../../services/users/types/user.type';
import useUsersClientService from '../../../services/users/users.client.service';

type UserProfilePhotoInputProperties = {
	user: User;
	setUser: Dispatch<SetStateAction<User | null>>;
};

const UserProfilePhotoInput = ({ user, setUser }: UserProfilePhotoInputProperties) => {

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [ saving, setSaving ] = useState(false);

    const { updateUserAvatar } = useUsersClientService();

    const handleFileChange = async () => {
        try {
            setSaving(true);
            const files = fileInputRef?.current?.files ?? [ null ];
            const [ file ] = Array.from(files);
            if (!file) {
                return;
            }
            const fileData = await updateUserAvatar(user.uid, file);
            setUser({
                ...user,
                photoURL: fileData.path,
            });
            setSaving(false);
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <div className="bg-light-50 rounded-full h-32 w-32 lg:h-20 lg:w-20 flex items-center justify-center text-3xl text-secondary-dark-default my-auto relative overflow-hidden group">
            {
                user && user.photoURL && user.photoURL !== ''
                    ? <Image
                        src={ `/${ user.photoURL }` }
                        alt={ `${ user.displayName } profile photo` }
                        layout='fill'
                    />
                    : <FiUser />
            }
            {
                saving &&
                <div className="bg-secondary-dark-default/50 flex items-center justify-center absolute inset-0 z-10">
                    <AiOutlineLoading3Quarters className={ `text-2xl text-light-50 ${ saving && 'animate-spin' }` } />
                </div>
            }
            {
                !saving &&
                <label
                    htmlFor="updateProfilePhotoInput"
                    className="absolute inset-0 text-xs items-end justify-center hidden group-hover:flex group-hover:cursor-pointer"
                >
                    <small className="text-light-50 bg-secondary-dark-default/75 pb-1 w-full text-center">MODIFIER</small>
                </label>
            }
            <input
                type="file"
                id="updateProfilePhotoInput"
                onChange={ handleFileChange }
                ref={ fileInputRef }
                hidden
            />
        </div>
    );
};

export default UserProfilePhotoInput;
