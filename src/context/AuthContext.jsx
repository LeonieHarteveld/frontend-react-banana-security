import {createContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext(null);

function AuthContextProvider({children}) {

    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });
    const navigate = useNavigate();

    function handleLogout() {
        toggleIsAuth(  {
            isAuth: false,
        user: null} );
        console.log ( "Gebruiker is uitgelogd!" );
        navigate('/')
    }

    function handleLogin(token) {
        console.log("Ontvangen token:", token);

        toggleIsAuth(  {
            isAuth: true,
            user: null} );
        console.log ( "Gebruiker is ingelogd!" );
        navigate('/profile')
    }


    return (
        <AuthContext.Provider value={{ isAuth, toggleIsAuth, handleLogout, handleLogin }}>
            {children}
        </AuthContext.Provider>

    )
}

export default AuthContextProvider;