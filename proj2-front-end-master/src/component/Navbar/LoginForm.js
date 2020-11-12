import React, {useState} from 'react'
import './form.css'
import Error from './Error'

function LoginForm(props){
    const errorBlock = (props.error)? <Error error={props.error} /> : null
    const [user, setUser] = useState({});
    return(
        <form className={props.class}>
            {errorBlock}
            <label className='formContent' htmlFor="account">Account:</label>
            <input className='formContent roundedborder' type="text" id="account" name="account" value={user.username} onChange={(e)=>setUser({...user, username:e.target.value})} />
            <label className='formContent' htmlFor="password">Password:</label>
            <input className='formContent roundedborder' type="password" id="password" name="password" value={user.password} onChange={(e)=>setUser({...user, password:e.target.value})}/>
            <button className='formContent formBtn btn btn-info' onClick={(e)=>{e.preventDefault();props.login(user)}} >Log in</button>
        </form>
    )
}

export default LoginForm;