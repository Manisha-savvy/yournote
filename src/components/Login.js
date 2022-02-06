import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css';



const Login = () => {
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    let history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            history.push("/");

        }
        else{
            alert("Invalid credentials");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className='login'>
            <form className='loginform' onSubmit={handleSubmit}>
                <h1><u>Login</u></h1>
                <div className="email mb-3">
                    <label htmlFor="email" className="form-label" >Email address</label>
                    <input type="email" className="form-control" placeholder='Please enter your email.'  value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                </div>
                <div className="password mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" placeholder='Please enter your password.' value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>

                <button type="submit" className="submit btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
