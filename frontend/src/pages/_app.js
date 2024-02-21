import '../styles/globals.css';
import Header from '../components/header/Header';
import { AuthProvider } from '../context/AuthContext';
import AdminPanel from '../components/adminPanel';
import Layout from '../components/layout';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
      <Header />
      <AdminPanel />
      <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
