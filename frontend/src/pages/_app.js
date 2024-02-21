import '../styles/globals.css';
import Sidebar from '../components/sidebar/sidebar';
import { AuthProvider } from '../context/authContext';
import AdminPanel from '../components/adminPanel/adminPanel';
import Layout from '../components/layout';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
      <Sidebar />
      <AdminPanel />
      <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
