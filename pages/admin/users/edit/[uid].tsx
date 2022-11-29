import { FiAlertTriangle, FiChevronLeft } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { shape, string, object } from 'prop-types';
import csrf from '../../../../utils/csrf';
import EditUserInformationsSection from '../../../../components/admin/users/EditUserInformationsSection';
// import { isUserAbleToWatch } from '../../../../utils/permissions';
import Button from '../../../../components/admin/ui/Button/Button';
import { GetServerSidePropsContextWithCsrf } from '../../../../types/ssr.types';
import { useCsrfContext } from '../../../../context/csrf.context';
import { User } from '../../../../services/users/types/user.type';
import EditUserForm from '../../../../components/admin/users/EditUserForm';
import { useAuthContext } from '../../../../context/auth.context';
import { CurrentUser } from '../../../../services/auth/types/current-user.type';

type EditUserPageProperties = {
	csrfToken: string;
}

const EditUserPage = ({ csrfToken }: EditUserPageProperties) => {

    const [ user, setUser ] = useState<User | null>(null);
    const [ saving, setSaving ] = useState<boolean>(false);
    const [ errorCode, setErrorCode ] = useState<string | null>(null);
    const { dispatchCsrfToken } = useCsrfContext();

    const { currentUser } = useAuthContext();

    useEffect(() => {
        dispatchCsrfToken(csrfToken);
    }, [ dispatchCsrfToken, csrfToken ]);

    const handleSubmit = () => {
        // TODO handle submit
    };

    return(
        <div className="container mx-auto my-10 px-5">
            <div className="flex mb-5 text-sm">
                <Button
                    variant='link-danger'
                    href='/admin/users'
                >
                    <FiChevronLeft />
                    <span>Retour</span>
                </Button>
            </div>
            <div className="grid grid-cols-12 gap-2">
                <div className="col-span 12 lg:col-span-10 xl:col-span-8 2xl:col-span-6">
                    <EditUserInformationsSection
                        user={ user }
                        setUser={ setUser }
                        currentUser={ currentUser as CurrentUser }
                    />
                </div>
            </div>
            {
                user && user.disabled &&
				<div className="grid grid-cols-12 gap-2">
				    <div className="col-span-12 lg:col-span-10 xl:col-span-8 2xl:col-span-6 p-6 bg-white dark:bg-light-900 drop-shadow mb-4 rounded-md flex items-center justify-between">
				        <div>
				            <h3 className="flex items-center gap-2 text-lg text-warning-light-default dark:text-warning-dark-default">
				                <FiAlertTriangle />
				                <span>Ce compte est suspendu</span>
				            </h3>
				        </div>
				    </div>
				</div>
            }
            <div className="grid grid-cols-12 gap-2">
                <div className="col-span-12 lg:col-span-10 xl:col-span-8 2xl:col-span-6 bg-white dark:bg-secondary-dark-shade drop-shadow p-6 rounded-md">
                    <EditUserForm
                        user={ user }
                        onSubmit={ handleSubmit }
                        saving={ saving }
                        errorCode={ errorCode }
                    />
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;

EditUserPage.propTypes = {
    userToEdit: shape({
        username: string,
        email: string,
        phone_number: string,
        role: string,
    }),
    csrfToken: string,
    session: object,
};

EditUserPage.defaultProps = {
    userToEdit: null,
    csrfToken: null,
    session: null,
};

const getServerSideProps = async ({ req, res }: GetServerSidePropsContextWithCsrf) => {
    await csrf(req, res);

    // if (!session || session && !isUserAbleToWatch(session.user.role, [ 'admin' ])) {
    //     return {
    //         redirect: {
    //             destination: '/admin/dashboard',
    //             permanent: false,
    //         },
    //     };
    // }

    return { props: { csrfToken: req.csrfToken() } };
};

export { getServerSideProps };
