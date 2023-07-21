import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import 'primeicons/primeicons.css'
import '/node_modules/primeflex/primeflex.css'

//theme
import "primereact/resources/themes/md-dark-deeppurple/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";                                       
        



export default function App({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
    
    )
}
