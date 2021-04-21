import '@/styles/globals.css'
import {AuthProvider} from "@/lib/auth";
import Navigation from "@/components/Navigation";

function App({ Component, pageProps }) {
  return (
      <AuthProvider> {/*Todos los componentes que se renderizan aqui van a tener acceso a AuthContext*/}
        <Navigation/>
        <Component {...pageProps} />
      </AuthProvider>
  );

}

export default App
