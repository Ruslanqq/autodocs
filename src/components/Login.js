import { useRef, useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { axiosSSR } from '../api/axios';

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();
  

    const [username, setUser] = useState('');
    const [password, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
        
    }, [])

   

    useEffect(() => {
        setErrMsg('');
    }, [username, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        
        const data = {
            username: username,
            password: password
        }
        await axiosSSR.post("/rest-auth/login/", data).then((res) => {
            window.localStorage.setItem("token", res.data.key)
            goToLoginPage()
        }).catch(e => console.error(e))
    }

    const navigate = useNavigate();
    const goToLoginPage = () => navigate('/reques');

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : (
                <section className='Login_Form'>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={username}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={password}
                            required
                        />
                        <button type='submit'>Sign In</button>
                    </form>
                </section>
            )}
        </>
    )
}


export default Login
