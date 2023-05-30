import '@/styles/globals.css';
import Context from './context';
import NextNProgress from 'nextjs-progressbar';
import Layout from '@/components/Layout';
export default function App({ Component, pageProps }) {
  return (
    <>
      <Context>
        <Layout>
          <NextNProgress />
          <Component {...pageProps} />
        </Layout>
      </Context>
    </>
  );
}
