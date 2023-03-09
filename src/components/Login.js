import { React, useState } from "react"
import '../images/access/main.css';
import { API_BASE_URL } from "../config"
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import FacebookLogin from "react-facebook-login";
import { findByUsername } from "../service/Task";


function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    // const redirect = useNavigate()
    const [login, setLogin] = useState(false);
    const [data, setData] = useState({});
    const [picture, setPicture] = useState('');

    const responseFacebook = (response) => {
        console.log(response);
        if (response.accessToken) {
            findByUsername(response.userID)
                .then(async response2 => {
                    if(response2.data !== null){
                        localStorage.clear()
                        console.log(response2)
                        localStorage.setItem('usertoken', JSON.stringify(response2))
                        localStorage.setItem('chakra-ui-color-mode', 'light')
                    }else{
                        await axios.post(`${API_BASE_URL}register`,
                        {
                            username: response.userID,
                            email: 'facbook@gmail.com',
                            password: '123456'
                        })
                        .then( response1 => {
                            localStorage.clear()
                            localStorage.setItem('usertoken', JSON.stringify(response1.data))
                            localStorage.setItem('chakra-ui-color-mode', 'light')
                        })
                    }
                    // redirect('/home')
                    window.location.replace("http://localhost:3000/home")
                    setTimeout(function() {
                        window.location.reload();
                    }, 1000)
                }).catch(error => {
                    console.log(error)
                })
            setData(response);
            setPicture(response.picture.data.url);
            setLogin(true);
            window.location.replace("http://localhost:3000/home")
        } else {
            setLogin(false);
        }
    }
    
    const handleLogin = async (e) => {
        e.preventDefault()
        await axios.post(`${API_BASE_URL}login`,
            {
                username: username,
                password: password
            })
            .then(response => {
                localStorage.clear()
                localStorage.setItem('accesstoken', response.data.jwt)
                localStorage.setItem('usertoken', JSON.stringify(response.data.user))
                window.location.replace("http://localhost:3000/home")
                setTimeout(function() {
                    window.location.reload();
                }, 1000)
            })
            .catch(error => console.log(error))
        
    }


    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="offset-md-2 col-lg-5 col-md-7 offset-lg-4 offset-md-3">
                        <div className="panel border bg-white">
                            <div className="panel-heading">
                                <h3 className="pt-3 font-weight-bold">Login</h3>
                            </div>
                            <div className="panel-body p-3">
                                <form onSubmit={handleLogin}>
                                    <div className="form-outline mb-4">
                                        <div className="input-field">
                                            <span className="far fa-user p-2"></span>
                                            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
                                        </div>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <div className="input-field">
                                            <span className="fas fa-lock px-2"></span>
                                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                                        </div>
                                    </div>
                                    <button className="btn btn-block mt-3 bg-primary text-white" type="submit">Log in</button>
                                    <div className="text-center pt-4 text-muted">Don't have an account? <a href="/register">Sign up</a>
                                    </div>
                                </form>
                            </div>
                            <div className="mx-3 my-2 py-4 ml-2 bordert">
                                <div className="text-center" style={{ alignItems: "center" }}>
                                    {/* <a href="#/" className="px-2" style={{marginLeft:"130px"}}>
                                        <img src="https://www.dpreview.com/files/p/articles/4698742202/facebook.jpeg" alt="" style={{height:"40px", width:"40px"}}>
                                        </img>
                                    </a>

                                    <a href="#/" className="px-2">
                                        <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
                                            alt=""></img>
                                    </a> */}
                                    <FacebookLogin
                                        appId="758416122548068"
                                        autoLoad={true}
                                        fields="name,email,picture"
                                        scope="public_profile,user_friends"
                                        callback={responseFacebook}
                                        icon="fa-facebook" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;