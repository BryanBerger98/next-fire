import { FiChevronLeft, FiUserPlus } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import csrf from '../../../../utils/csrf';
import { string } from 'prop-types';
// import { isUserAbleToWatch } from '../../../../utils/permissions';
import { GetServerSidePropsContextWithCsrf } from '../../../../types/ssr.types';
import Button from '../../../../components/admin/ui/Button/Button';
import { useCsrfContext } from '../../../../context/csrf.context';
import EditUserForm, { EditUserFormInputs } from '../../../../components/admin/users/EditUserForm';
import { User } from '../../../../services/users/types/user.type';
import useUsersClientService from '../../../../services/users/users.client.service';
import { useRouter } from 'next/router';

type NewUserPage = {
	csrfToken: string;
}

const NewUserPage = ({ csrfToken }: NewUserPage) => {

    const [ saving, setSaving ] = useState<boolean>(false);
    const [ errorCode, setErrorCode ] = useState<string | null>(null);

    const router = useRouter();

    const { dispatchCsrfToken } = useCsrfContext();
    const { createUser } = useUsersClientService();

    useEffect(() => {
        dispatchCsrfToken(csrfToken);
    }, [ dispatchCsrfToken, csrfToken ]);

    const handleSubmit = (values: EditUserFormInputs) => {
        setSaving(true);

        createUser(values)
            .then(createdUser => {
                console.log(createdUser);
                // router.replace('/admin/dashboard');
            })
            .catch(error => {
                console.error(error);
                setErrorCode('An error happened.');
            })
            .finally(() => {
                setSaving(false);
            });
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
            <div className="grid grid-cols-12">
                <div className="col-span-12 lg:col-span-10 xl:col-span-8 2xl:col-span-6 bg-white dark:bg-secondary-dark-shade drop-shadow p-10 rounded-md">
                    <h1 className="flex items-center gap-2 text-xl mb-5 text-primary-light-default dark:text-primary-dark-default"><FiUserPlus /><span>Nouvel utilisateur</span></h1>
                    <EditUserForm
                        onSubmit={ handleSubmit }
                        errorCode={ errorCode }
                        saving={ saving }
                    />
                </div>
            </div>
        </div>
    );
};

export default NewUserPage;

NewUserPage.propTypes = { csrfToken: string };

NewUserPage.defaultProps = { csrfToken: null };

const getServerSideProps = async ({ req, res }: GetServerSidePropsContextWithCsrf ) => {
    await csrf(req, res);

    return { props: { csrfToken: req.csrfToken() } };
};

export { getServerSideProps };
