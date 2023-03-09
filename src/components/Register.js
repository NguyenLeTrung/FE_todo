import { React, useState } from "react";
import '../images/access/main.css';
import { API_BASE_URL } from "../config";
import axios from "axios";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
// import { useNavigate } from "react-router-dom";


function Register() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [validationMsg, setValidationMsg] = useState({})
    const [message, setMessage] = useState('')
    // const [errors, setError] = useState('')
    // const redirect = useNavigate()

    const validateAll = () => {
        const msg = {}
        if (!username) {
            msg.username = "Username fields is required"
        } else if (username.length < 5) {
            msg.username = "Username length over 5 character"
        }

        if (isEmpty(email)) {
            msg.email = "Email fields is required"
        } else if (!isEmail(email)) {
            msg.email = "Email is correct"
        }

        if (isEmpty(password)) {
            msg.password = "Password fields is required"
        } else if (password.length < 8) {
            msg.password = "Password length over 8 characters"
        }

        setValidationMsg(msg)
        if (Object.keys(msg).length > 0) return false
        return true;
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        // if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
        //     return;
        // }
        const isValid = validateAll()
        if (!isValid) return 

        await axios.post(`${API_BASE_URL}register`,
            {
                username: username,
                email: email,
                password: password
            })
            .then(response => {
                localStorage.clear()
                localStorage.setItem('user', JSON.stringify(response.data))
                setMessage("")
                window.location.replace("http://localhost:3000/")
                setTimeout(function () {
                    window.location.reload();
                }, 1000)
            })
            .catch(error => console.log(error))
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="offset-md-2 col-lg-5 col-md-7 offset-lg-4 offset-md-3">
                        <div className="panel border bg-white">
                            <div className="panel-heading">
                                <h3 className="pt-3 font-weight-bold">Create new account</h3>
                            </div>
                            <div className="panel-body p-3">
                                <form onSubmit={handleFormSubmit}>
                                    <div className="form-outline mb-4">
                                        <div className="input-field">
                                            <span className="far fa-user p-2"></span>
                                            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
                                        </div>
                                        <p className="text-danger">{validationMsg.username}</p>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <div className="input-field">
                                            <span className="far fa-user p-2"></span>
                                            <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                                        </div>
                                        <p className="text-danger">{validationMsg.email}</p>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <div className="input-field">
                                            <span className="fas fa-lock p-2"></span>
                                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                                        </div>
                                        <p className="text-danger">{validationMsg.password}</p>
                                    </div>
                                    <button className="btn btn-block mt-3 bg-primary text-white" type="submit">Sign up</button>
                                    <div className="text-center pt-4 text-muted">Do you already have an account ? <a href="/">Log in</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Register;