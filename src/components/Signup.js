import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './Signup.css';

const Signup = () => {
    const [credentials, setCredentials] = useState({name:"", email: "", password:"", cpassword:""}) 
    let history = useNavigate();
    

    const handleSubmit = async (e) => {
        e.preventDefault();
       const {name,email,password}= credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,email,password})
        });
        const json = await response.json()
        console.log(json);
            // Save the auth token and redirect

            if (json.success){
                // Save the auth token and redirect
                localStorage.setItem('token', json.authtoken); 
                history.push("/");
    
            } 
        
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className="container Container-signup">
            <form className='form' onSubmit = {handleSubmit}>
                <div className='Signup'>
                <h1><u>Sign Up</u></h1>
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label"><b>Name</b></label>
                    <input type="text" className="text form-control" id="name" name ="name" onChange={onChange}aria-describedby="emailHelp"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label"><b>Email address</b></label>
                    <input type="email" className="text form-control" id="exampleInputEmail1"  name="email"onChange={onChange}aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text"><b>We'll never share your email with anyone else.</b></div>
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label"><b>Password</b></label>
                    <input type="password" className="text form-control" id="password" name = "password"onChange={onChange} minLength={5}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label"><b>Confirm Password</b></label>
                    <input type="password" className="text form-control" id="cpassword" name = "cpassword" onChange={onChange} minLength={5}/>
                </div>

                <button type="submit" className="button btn btn-success"><b>Submit</b></button>
            </form>
        </div>
    )
}

export default Signup
