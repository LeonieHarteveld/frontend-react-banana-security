import React, {useContext, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

function SignIn() {
    const baseUrl = "https://novi-backend-api-wgsgz.ondigitalocean.app/"
    const {handleLogin} = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        password: '',
        email: '',
    });


    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await axios.post(`${baseUrl}api/login`, {
                email: formData.email,
                password: formData.password,
            }, {
                headers: {
                    "novi-education-project-id" : "69197f2a-8d89-464a-8b9c-04da62d6ea68"
                }
            });
            console.log(response.data);
            handleLogin(response.data.token);
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <h1>Inloggen</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id
                molestias qui quo unde?</p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Emailadres</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <label htmlFor="password">Wachtwoord</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <button type="submit">Inloggen</button>
            </form>

            <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
        </>
    );
}

export default SignIn;