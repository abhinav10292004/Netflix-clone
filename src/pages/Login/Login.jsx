import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { login, signup } from '../../firebase'
import netflix_spinner from '../../assets/netflix_spinner.gif'

const Login = () => {

  const [signState, setSignState] = useState("Sign In");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading,setLoading] = useState(false);

  const user_auth = async (event)=>{
    event.preventDefault();
    setLoading(true);
    if (signState==="Sign In") {
      await login(email, password);
    }
    else{
      await signup(name ,email, password);
    }
    setLoading(false);
  }

  // const setSignUpState = () => {
  //     setSignState("Sign Up");
  // };

  // const setSignInState = () => {
  //     setSignState("Sign In");
  // };

  return (
    loading?<div className="login-spinner">
      <img src={netflix_spinner} alt="" />
    </div>:
    <div className='login'>
      <img src={logo} alt="" className='login-logo' />
      <div className='login-form'>
        <h1>{signState}</h1>
        <form>
          {
            signState === "Sign Up"?<input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" placeholder='Your Name' />:<></>
          }

          <input value={email} onChange={(e)=>{setEmail(e.target.value)}}  type="email" placeholder='Email' />
          <input value={password} onChange={(e)=>{setPassword(e.target.value)}}  type="password" placeholder='Password' />
          <button onClick={user_auth} type='submit'>{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        {/* <div className="form-switch">
          {signState==="Sign Up"?<p>Already have Account? 
            <span onClick={setSignInState}>Sign in Now</span></p>:<p>New to Netflix? <span onClick={setSignUpState}>Sign Up Now</span></p>}
        </div> */}
        <div className="form-switch">
          {signState==="Sign Up"?<p>Already have Account? 
            <span onClick={()=>{setSignState("Sign In")}}>Sign in Now</span></p>:<p>New to Netflix? <span onClick={()=>{setSignState("Sign Up")}}>Sign Up Now</span></p>}
        </div>
      </div>
    </div>
  )
}

export default Login
