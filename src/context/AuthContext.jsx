import {createContext, useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext(null);

function AuthContextProvider({children}) {
    const baseUrl = "https://novi-backend-api-wgsgz.ondigitalocean.app/";
    const projectId = "69197f2a-8d89-464a-8b9c-04da62d6ea68";

    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });

    const navigate = useNavigate();

    useEffect(() => {
        console.log("Context wordt gerefresht!");

        async function fetchUserData() {
            const token = localStorage.getItem('token');

            if (!token) {
                toggleIsAuth({
                    isAuth: false,
                    user: null,
                    status: 'done',
                });

                return;
            }

            try {
                const decoded = jwtDecode(token);
                const userId = decoded.userId;

                const response = await axios.get(`${baseUrl}api/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "novi-education-project-id": projectId,
                    },
                });

                toggleIsAuth({
                    isAuth: true,
                    user: response.data,
                    status: 'done',
                });

            } catch (e) {
                console.error(e);

                localStorage.removeItem('token');

                toggleIsAuth({
                    isAuth: false,
                    user: null,
                    status: 'done',
                });
            }
        }

        fetchUserData();
    }, []);

    async function handleLogin(token) {
        try {
            localStorage.setItem('token', token);

            const decoded = jwtDecode(token);
            const userId = decoded.userId;

            const response = await axios.get(`${baseUrl}api/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "novi-education-project-id": projectId,
                },
            });

            toggleIsAuth({
                isAuth: true,
                user: response.data,
                status: 'done',
            });

            navigate('/profile');

        } catch (e) {
            console.error(e);

            localStorage.removeItem('token');

            toggleIsAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }

    function handleLogout() {
        localStorage.removeItem('token');

        toggleIsAuth({
            isAuth: false,
            user: null,
            status: 'done',
        });

        navigate('/');
    }


    return (
        <AuthContext.Provider value={{isAuth, toggleIsAuth, handleLogout, handleLogin}}>
            {isAuth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>

    )
}

export default AuthContextProvider;