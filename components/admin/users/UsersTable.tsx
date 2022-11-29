import { FiCheckCircle, FiLock, FiRotateCw, FiUser } from 'react-icons/fi';
import { getStringSlashedDateFromDate } from '../../../utils/dates';
import { useState, Fragment, useCallback, useEffect } from 'react';
import UserTableDataMenu from './UserTableDataMenu';
// import { useUsersContext } from '../../store/usersContext';
import Image from 'next/image';
import Table from '../ui/Table';
// import useUsersApi from '../../packages/api/users';
import { string } from 'prop-types';
import { useRouter } from 'next/router';
import { format } from 'libphonenumber-js';
import { useAuthContext } from '../../../context/auth.context';
import useUsersClientService from '../../../services/users/users.client.service';
import { User } from '../../../services/users/types/user.type';
import { CurrentUser } from '../../../services/auth/types/current-user.type';

type UserTableProperties = {
	searchString?: string;
};

type TableField = {
	title: string;
	name: string;
	sortable: boolean,
	fontStyle: 'bold' | 'semibold' | 'medium' | 'light',
	align: 'left' | 'right' | 'center',
};

const UsersTable = ({ searchString }: UserTableProperties) => {

    const router = useRouter();
    // const { usersList, usersTotal, dispatchUsersData } = useUsersContext();
    const [ usersList, setUsersList ] = useState<User[]>([]);
    const { getUsers } = useUsersClientService();

    const LOCAL_USERS_TABLE_CONFIG = localStorage.getItem('usersTableConfig') ? JSON.parse(localStorage.getItem('usersTableConfig') as string) : null;

    const DEFAULT_LIMIT = LOCAL_USERS_TABLE_CONFIG && LOCAL_USERS_TABLE_CONFIG.limit ? LOCAL_USERS_TABLE_CONFIG.limit : 10;
    const DEFAULT_SKIP = LOCAL_USERS_TABLE_CONFIG && LOCAL_USERS_TABLE_CONFIG.skip ? LOCAL_USERS_TABLE_CONFIG.skip : 0;
    const DEFAULT_SORT = LOCAL_USERS_TABLE_CONFIG && LOCAL_USERS_TABLE_CONFIG.sort && LOCAL_USERS_TABLE_CONFIG.sort.field ? LOCAL_USERS_TABLE_CONFIG.sort : {
        field: 'created_on',
        direction: -1,
    };

    const [ limit, setLimit ] = useState(DEFAULT_LIMIT);
    const [ skip, setSkip ] = useState(DEFAULT_SKIP);
    const [ sort, setSort ] = useState(DEFAULT_SORT);

    const tableFields: TableField[] = [
        {
            title: 'Nom',
            name: 'username',
            sortable: true,
            fontStyle: 'semibold',
            align: 'left',
        },
        {
            title: 'Adresse email',
            name: 'email',
            sortable: true,
            fontStyle: 'semibold',
            align: 'left',
        },
        {
            title: 'Téléphone',
            name: 'phone_number',
            sortable: true,
            fontStyle: 'semibold',
            align: 'left',
        },
        {
            title: 'Rôle',
            name: 'role',
            sortable: true,
            fontStyle: 'semibold',
            align: 'left',
        },
        {
            title: 'Date de création',
            name: 'created_on',
            sortable: true,
            fontStyle: 'semibold',
            align: 'left',
        },
        {
            title: 'Actions',
            name: 'actions',
            sortable: false,
            fontStyle: 'semibold',
            align: 'center',
        },
    ];

    const { currentUser } = useAuthContext();
    const [ dataLoading, setDataLoading ] = useState(true);

    const loadUsersTable = useCallback((limit, skip, sort, searchString) => {
        // getUsers(sort, skip, limit, searchString)
        //     .then(response => {
        //         dispatchUsersData(response.users, response.count, response.total);
        //     })
        //     .catch(console.error)
        //     .finally(() => setDataLoading(false));
        getUsers()
            .then((data) => {
                console.log(data);
                setUsersList(data.users);
            })
            .catch(console.error)
            .finally(() => setDataLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ setDataLoading, usersList, setUsersList ]);


    const reloadTable = (limit, skip, sort) => {
        // setLimit(limit);
        // setSkip(skip);
        // setSort((prevSort) => {
        //     if (!prevSort || (prevSort && (prevSort.direction !== sort.direction || prevSort.field !== sort.field))) {
        //         return sort;
        //     }
        // });
        // loadUsersTable(limit, skip, sort, searchString);
    };

    const onEditUser = (userId: string) => {
        router.push(`/admin/users/edit/${ userId }`);
    };-

    useEffect(() => {
        // loadUsersTable(limit, skip, sort, searchString);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ searchString, loadUsersTable ]);

    useEffect(() => {
        getUsers()
            .then((usersData) => {
                console.log('USERS', usersData);
                setUsersList(usersData.users);
            })
            .catch(console.error)
            .finally(() => setDataLoading(false));
    }, []);

    // useEffect(() => {
    //     setDataLoading(true);
    // }, [ setDataLoading ]);

    return(
        <Fragment>
            <Table
                dataLoading={ dataLoading }
                dataCount={ 5 }
                defaultLimit={ DEFAULT_LIMIT }
                defaultSkip={ DEFAULT_SKIP }
                defaultSort={ DEFAULT_SORT }
                fields={ tableFields }
                onReloadTable={ reloadTable }
            >
                {
                    usersList && usersList.map((user, index) => (
                        <tr
                            key={ user.uid + '-' + index }
                            className={ `${ user.disabled ? 'text-light-400' : '' }` }
                        >
                            <td
                                className="py-3 border-b-[0.5px] border-light-300 dark:border-light-700 cursor-pointer"
                                onClick={ () => onEditUser(user.uid) }
                            >
                                <span className="flex items-center gap-2">
                                    <div className="h-10 w-10 rounded-full drop-shadow bg-primary-light-default dark:bg-primary-dark-default text-light-50 flex justify-center items-center text-lg overflow-hidden relative">
                                        {
                                            user.photoURL && user.photoURL !== '' ?
                                                <Image
                                                    className="rounded-full"
                                                    src={ `/${ user.photoURL }` }
                                                    alt={ `${ user.displayName ? user.displayName : user.uid } profile photo` }
                                                    height={ 40 }
                                                    width={ 40 }
                                                />
                                                :
                                                <FiUser />
                                        }
                                        {
                                            user.disabled &&
                                            <div className="absolute inset-0 bg-danger-light-default/50 dark:bg-danger-dark-shade/50 flex justify-center items-center rounded-full">
                                                <FiLock
                                                    title='Compte désactivé'
                                                    className="text-light-50 text-xl"
                                                />
                                            </div>
                                        }
                                    </div>
                                    {user.displayName && user.displayName.length > 0 ? <span>{user.displayName}</span> : <span className="italic text-light-400">Sans nom</span>}
                                </span>
                            </td>
                            <td
                                className="py-3 border-b-[0.5px] border-light-300 dark:border-light-700 cursor-pointer"
                                onClick={ () => onEditUser(user.uid) }
                            >
                                <span className="flex items-center gap-1">
                                    <span>{user.email}</span>
                                    {
                                        user.emailVerified ?
                                            <FiCheckCircle
                                                title='Compte vérifié'
                                                className="text-success-light-default dark:text-success-dark-default"
                                            />
                                            :
                                            <FiRotateCw
                                                title="En attente de vérification"
                                                className="text-warning-light-default dark:text-warning-dark-default"
                                            />
                                    }
                                </span>
                            </td>
                            <td
                                className="py-3 border-b-[0.5px] border-light-300 dark:border-light-700 cursor-pointer"
                                onClick={ () => onEditUser(user.uid) }
                            >
                                {user.phoneNumber && user.phoneNumber.length > 0 ? <span>{ format(user.phoneNumber, 'INTERNATIONAL') }</span> : ''}
                            </td>
                            <td
                                className="py-2 border-b-[0.5px] border-light-300 dark:border-light-700 cursor-pointer"
                                onClick={ () => onEditUser(user.uid) }
                            >
                                {user.role === 'admin' ? 'Administrateur' : user.role === 'user' ? 'Utilisateur' : ''}
                            </td>
                            <td
                                className="py-2 border-b-[0.5px] border-light-300 dark:border-light-700 cursor-pointer"
                                onClick={ () => onEditUser(user.uid) }
                            >
                                {user.createdAt && getStringSlashedDateFromDate(user.createdAt instanceof Date ? user.createdAt : user.createdAt._seconds * 1000, 'fr')}
                            </td>
                            <td className="py-2 border-b-[0.5px] border-light-300 dark:border-light-700 text-center">
                                <UserTableDataMenu

                                    user={ user }
                                    currentUser={ currentUser as CurrentUser }
                                />
                            </td>
                        </tr>
                    ))
                }
            </Table>
        </Fragment>
    );
};

export default UsersTable;

UsersTable.propTypes = { searchString: string.isRequired };
