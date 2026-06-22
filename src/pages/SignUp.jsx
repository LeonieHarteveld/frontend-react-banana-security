import React, {useContext, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

function SignUp() {
    const navigate = useNavigate();
    const baseUrl = "https://novi-backend-api-wgsgz.ondigitalocean.app/"
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
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
            const response = await axios.post(`${baseUrl}api/users`, {
                email: formData.email,
                password: formData.password,
                username: formData.username,
            }, {
                headers: {
                    "novi-education-project-id" : "69197f2a-8d89-464a-8b9c-04da62d6ea68"
                }
            });
            console.log(response.data);
            navigate('/signin');
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <>
            <h1>Registreren</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque
                eligendi
                harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur
                deserunt
                doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Gebruikersnaam</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                />

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

                <button type="submit">Verzend</button>
            </form>
            <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
        </>
    );
}

export default SignUp;