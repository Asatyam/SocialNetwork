import '@/styles/globals.css';
import Context from './context';
import NextNProgress from 'nextjs-progressbar';
export default function App({ Component, pageProps }) {
  return (
    <>
      <Context>
        <NextNProgress />
        <Component {...pageProps} />
      </Context>
    </>
  );
}
