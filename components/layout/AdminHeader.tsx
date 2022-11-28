import { FiLogIn, FiMenu } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import AccountDropDownMenu from '../admin/account/AccountDropdownMenu';
import useTranslate, { TranslateTitle } from '../../packages/hooks/useTranslate';
import ThemeToggleSwitch from '../admin/ui/ThemeToggleSwitch';
import { bool, func, shape, string } from 'prop-types';
import Button from '../admin/ui/Button/Button';
import { User } from '../../services/auth.service';

type AdminHeaderProperties = {
	currentUser: User | null;
	isSidebarOpen: boolean;
	setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const AdminHeader = ({ currentUser, isSidebarOpen, setIsSidebarOpen }: AdminHeaderProperties) => {

    const [ pageTitle, setPageTitle ] = useState('');
    const { getTranslatedTitle } = useTranslate({ locale: 'fr' });

    const router = useRouter();

    useEffect(() => {
        if (currentUser) {
            const path = router.pathname;
            const pathArray = path.split('/').filter(el => el !== '') as TranslateTitle[];
            const title = pathArray.length === 0 ? 'Next-Base' : getTranslatedTitle(pathArray[ 1 ] ? pathArray[ 1 ] : pathArray[ 0 ]);
            setPageTitle(title);
        } else {
            setPageTitle('Next-Base');
        }
    }, [ router, getTranslatedTitle, currentUser ]);

    return(
        <div className="w-full bg-white dark:bg-light-700 drop-shadow p-3 flex gap-2 text-sm relative z-10">
            <button
                className="lg:hidden text-xl text-light-400 dark:text-light-50"
                onClick={ () => setIsSidebarOpen(!isSidebarOpen) }
            ><FiMenu /></button>
            <p className="my-auto lg:block text-light-400 dark:text-light-50">{ pageTitle.toUpperCase() }</p>
            <div className="ml-auto flex justify-end gap-4 items-center lg:gap-8">
                <div className="">
                    <ThemeToggleSwitch />
                </div>
                { currentUser && <AccountDropDownMenu currentUser={ currentUser } /> }
                { !currentUser &&
					<Button
					    href='/auth/signin'
					    variant='primary'
					>
					    <FiLogIn />
					    <span>Connexion</span>
					</Button>
                }
            </div>
        </div>
    );
};

export default AdminHeader;

AdminHeader.propTypes = {
    currentUser: shape({
        username: string,
        photo_url: string,
    }),
    isSidebarOpen: bool,
    setIsSidebarOpen: func.isRequired,
};

AdminHeader.defaultProps = {
    user: null,
    isSidebarOpen: false,
};
