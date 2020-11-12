import React, {useState} from 'react';
import './form.css'
import Error from './Error'

function SignupForm(props){
    const errorBlock = (props.error)? <Error error={props.error} /> : null
    const [user, setUser] = useState({});

    const submitNewUser=()=>{
        if(user.password !== user.repeatpassword){
            props.setError("Error: The second password is different.")
            setUser({username:user.username})
            return;
        }
        props.signup({username:user.username, password:user.password})
    }

    return(
        <form className={props.class}>
             {errorBlock}
            <label className='formContent' htmlFor="account">Account:</label>
            <input className='formContent roundedborder' type="text" id="signupaccount" name="account" value={user.username} onChange={(e)=>setUser({...user, username:e.target.value})}/>
            <label className='formContent' htmlFor="password">Password:</label>
            <input className='formContent roundedborder' type="password" id="signuppassword" name="password" value={user.password} onChange={(e)=>setUser({...user, password:e.target.value})}/>
            <label className='formContent' htmlFor="repeatPassword">Input the password again:</label>
            <input className='formContent roundedborder' type="password" id="repeatPassword" name="repeatpassword" value={user.repeatpassword} onChange={(e)=>setUser({...user, repeatpassword:e.target.value})}/>
            <button className='formContent formBtn btn btn-info' onClick={(e)=>{e.preventDefault(); submitNewUser()}}>Sign up</button>
        </form>
    )
}

export default  SignupForm;