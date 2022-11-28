import { useAuthUser, withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';

const HomePage = () => {
    const AuthUser = useAuthUser();

    return (
        <div>
            <p>Your email is {AuthUser && AuthUser.email ? AuthUser.email : 'unknown'}.</p>
        </div>
    );
};

export const getServerSideProps = withAuthUserTokenSSR()();

export default withAuthUser()(HomePage);
