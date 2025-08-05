import '../styles/globals.css';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import Sidebar from '../components/Sidebar';
import { ToastProvider } from '../contexts/ToastContext';
import { AuthProvider } from '../contexts/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const hideSidebar = router.pathname === '/login';

  return (
    <>
      <AuthProvider>
        {!hideSidebar ? (
          <Sidebar>
            <Component {...pageProps} />
          </Sidebar>
        ) : (
          <Component {...pageProps} />
        )}
        <ToastProvider />
      </AuthProvider>
    </>
  );
}

export default MyApp;
