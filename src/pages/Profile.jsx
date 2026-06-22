import React, {useContext, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

function Profile() {
    const {isAuth} = useContext(AuthContext);
    const [privateContent, setPrivateContent] = useState(null);

    useEffect(() => {
        async function fetchPrivateContent() {
            try {
                const token = localStorage.getItem('token');

                const response = await axios.get(
                    "https://novi-backend-api-wgsgz.ondigitalocean.app/api/secrets",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "novi-education-project-id": "69197f2a-8d89-464a-8b9c-04da62d6ea68",
                        },
                    }
                );

                console.log(response.data);
                setPrivateContent(response.data);

            } catch (e) {
                console.error(e);
            }
        }

        fetchPrivateContent();
    }, []);

    return (

        <>
            {isAuth.isAuth ? (
                <>
                    <h1>Profielpagina</h1>

                    <section>
                        <h2>Gegevens</h2>
                        <p><strong>Gebruikersnaam:</strong> {isAuth.user?.username}</p>
                        <p><strong>Email:</strong> {isAuth.user?.email}</p>
                    </section>
                    <section>
                        <h2>Strikt geheime profiel-content</h2>

                        {privateContent ? (
                            <p>{(privateContent, null, 2)}</p>
                        ) : (
                            <p>Geheime content wordt geladen...</p>
                        )}
                    </section>
                    <p>Terug naar de <Link to="/">Homepagina</Link></p>
                </>

            ) : (
                <p>Je moet eerst inloggen</p>
            )}
            </>
    );
}

export default Profile;