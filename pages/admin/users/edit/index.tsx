import { FiChevronLeft, FiUserPlus } from 'react-icons/fi';
import EditUserForm from '../../../../components/users/EditUserForm';
import { useEffect, useState } from 'react';
import csrf from '../../../../utils/csrf';
import { useCsrfContext } from '../../../../store/csrfContext';
import { string } from 'prop-types';
import { getSession } from 'next-auth/react';
import { isUserAbleToWatch } from '../../../../utils/permissions';
import Button from '../../../../components/ui/Button/Button';

const NewUserPage = ({ csrfToken }) => {

    const [ user, setUser ] = useState(null);
    const { dispatchCsrfToken } = useCsrfContext();

    useEffect(() => {
        dispatchCsrfToken(csrfToken);
    }, [ dispatchCsrfToken, csrfToken ]);

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
            <div className="grid grid-cols-12">
                <div className="col-span-12 lg:col-span-10 xl:col-span-8 2xl:col-span-6 bg-white dark:bg-secondary-dark-shade drop-shadow p-10 rounded-md">
                    <h1 className="flex items-center gap-2 text-xl mb-5 text-primary-light-default dark:text-primary-dark-default"><FiUserPlus /><span>Nouvel utilisateur</span></h1>
                    <EditUserForm
                        user={ user }
                        setUser={ setUser }
                    />
                </div>
            </div>
        </div>
    );
};

export default NewUserPage;

NewUserPage.propTypes = { csrfToken: string };

NewUserPage.defaultProps = { csrfToken: null };

const getServerSideProps = async ({ req, res }) => {
    const session = await getSession({ req });
    await csrf(req, res);

    if (!session || session && !isUserAbleToWatch(session.user.role, [ 'admin' ])) {
        return {
            redirect: {
                destination: '/admin/dashboard',
                permanent: false,
            },
        };
    }

    return { props: { csrfToken: req.csrfToken() } };
};

export { getServerSideProps };
