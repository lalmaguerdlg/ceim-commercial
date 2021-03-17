import type { AppProps } from 'next/app'
import OverlayRenderer from '../components/Overlay/OverlayRenderer';
import '../styles/style.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <OverlayRenderer></OverlayRenderer>
    </>
  )
}

export default MyApp;