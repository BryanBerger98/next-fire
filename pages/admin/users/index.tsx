import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FiPlus, FiUsers } from 'react-icons/fi';
import Button from '../../../components/admin/ui/Button/Button';
import PageTitle from '../../../components/admin/ui/PageTitle';
import UsersTable from '../../../components/admin/users/UsersTable';
import { useCsrfContext } from '../../../context/csrf.context';
import { wrapper } from '../../../store';
import { GetServerSidePropsContextWithCsrf } from '../../../types/ssr.types';
import csrf from '../../../utils/csrf';
import { connect } from 'react-redux';
import { selectUsersState } from '../../../store/users.slice';
import { GetServerSideProps, GetServerSidePropsContext, NextPageContext } from 'next';

type UsersPageProperties = {
	csrfToken: string;
}

const UsersPage = ({ csrfToken }: UsersPageProperties) => {

    const [ searchString, setSearchString ] = useState('');
    const { dispatchCsrfToken } = useCsrfContext();
    const router = useRouter();


    useEffect(() => {
        dispatchCsrfToken(csrfToken);
    }, [ dispatchCsrfToken, csrfToken ]);

    const onSearchUsers = (value: string) => {
        setSearchString(value);
    };

    const onCreateNewUser = () => {
        router.push('/admin/users/edit');
    };

    return (
        <div className="container mx-auto my-10 px-5">
            <PageTitle><FiUsers /><span>{0} Utilisateur{ 0 > 1 ? 's' : '' }</span></PageTitle>
            <div className="grid grid-cols-12 mb-5">
                <div className="col-span-6">
                    {/* <SearchField onSearchElements={ onSearchUsers } /> */}
                </div>
                <div className="col-span-6 flex justify-end text-sm">
                    <Button
                        onClick={ onCreateNewUser }
                        variant={ 'primary' }
                    >
                        <FiPlus />
                        <span>Nouveau</span>
                    </Button>
                </div>
            </div>
            <div className="w-full min-h-96 bg-white dark:bg-secondary-dark-shade drop-shadow rounded-md p-3 text-sm">
                <UsersTable searchString={ searchString } />
            </div>
        </div>
    );
};

export default connect(selectUsersState)(UsersPage);

const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, res, preview }: GetServerSidePropsContextWithCsrf) => {
    await csrf(req, res);

    return { props: { csrfToken: req.csrfToken() } };
});

export { getServerSideProps };
