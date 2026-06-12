import {createContext, useState} from 'react';
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext(null);

function AuthContextProvider({children}) {
    const [isAuth, toggleIsAuth] = useState( true);
    const navigate = useNavigate();

    function handleLogout() {
        toggleIsAuth( false);
        console.log ( "Gebruiker is uitgelogd!" );
        navigate('/')
    }

    function handleLogin(e) {
        e.preventDefault();
        toggleIsAuth( true);
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