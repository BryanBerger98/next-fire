import '../styles/globals.css';
import type { AppProps } from 'next/app';
import initAuth from '../utils/initAuth';
import ThemeContextProvider from '../context/theme.context';
import Layout from '../components/layout/Layout';
import CsrfContextProvider from '../context/csrf.context';
import AuthContextProvider from '../context/auth.context';

initAuth();

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <ThemeContextProvider>
            <CsrfContextProvider>
                <AuthContextProvider>
                    <Layout>
                        <Component { ...pageProps } />
                    </Layout>
                </AuthContextProvider>
            </CsrfContextProvider>
        </ThemeContextProvider>
    );
};

export default App;
