import React from 'react';
import "./App.css";
import {useHistory} from "react-router-dom";
import getUser from './GetUsers';

const Login = () => {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [error, setError] = React.useState("");

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name || !email) setError("Insert your name & email");
        else {
             getUser()
            .then((data) => {

                const fetchedNames = data.map(user => user.username);
                const fetchedEmails = data.map(user => user.email);

                if(!fetchedNames.includes(name) || !fetchedEmails.includes(email)) {
                    throw ({message: "Not found"});
                }
                else {
                    localStorage.setItem("logged", "yes");
                    history.push("/")
                }
            })

        }
    }

    return (
        <div className="form_container">
            <span className="form_container_header">Login Fom</span>
            <form className="form-login" onSubmit={handleSubmit}>
                <input name="name" type="text" placeholder="Type your name..." className="nameInput" onChange={(e) => setName(e.target.value)} />
                <input name="email" type="email" placeholder="Type your email..." className="emailInput" onChange={(e) => setEmail(e.target.value)} />

                {error && <span style={{color: "red"}}>{error}</span>}
                <button type="submit">Login</button>
            </form>
        </div>

    )
}


export default Login