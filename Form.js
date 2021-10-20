import React,{useState, } from "react";
import {BrowserRouter as Router ,Route ,Switch} from 'react-router-dom'
import {Link , useHistory} from 'react-router-dom'
const Form =()=>
{
    const [Email,SetEmail]=useState('')
  const [Password,SetPassword]=useState('')
  let history = useHistory();


const SubmitHandler=(e)=>
{
  e.preventDefault()
  const data={Email,Password}
  SetEmail('')
  SetPassword('')
  fetch('http://localhost:3000/create',{
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify( data)
  }).then(()=>
  {
    console.log("data sent")
  })

  history.push("/random");






  // createUser(data)                                  code for server side
  // .then(response => {
  //   console.log(response);
    
// });
  
}


// code for server side
//  async function createUser(data) {
//   const response = await fetch(`/api/user`, {
//       method: 'POST',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({user: data})
//     })
//   return await response.json();
// }
 


  const EmailHandler=(e)=>
  {
    SetEmail(e.target.value)
  }
  const PasswordHandler=(e)=>
  {
    SetPassword(e.target.value)
  }

  
  
    

  
    

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="login-form-inner">
         
          <h1>Login</h1>
          <p className="body-text">
            See your growth and get consulting support!
          </p>

          <div className="sign-in-seperator">
            <span>or Sign in with Email</span>
          </div>
          <form method="POST" action="/random" onSubmit={SubmitHandler}>
            <div className="login-form-group">
              <label htmlFor="email">
                Email <span className="required-star">*</span>
              </label>
              <input type="text" value={Email} onChange={EmailHandler} />
            </div>
            <div className="login-form-group">
              <label htmlFor="pwd">
                Password <span className="required-star" >*</span>
              </label>
              <input
               
                type="text"
                placeholder="Minimum 8 characters"
                value={Password}
                onChange={PasswordHandler}
              />
            </div>

          <button type="submit" >   Login </button> 
          </form>
        </div>
      </div>
      <div className="onboarding">
        <div className="swiper-container">
          <div className="swiper-wrapper">
            <div className="swiper-slide color-1">
              <div className="slide-image">
                <img
                  src="https://raw.githubusercontent.com/ismailvtl/ismailvtl.github.io/master/images/startup-launch.png"
                  loading="lazy"
                  alt=""
                />
              </div>
              <div className="slide-content">
                <h2>Turn your ideas into reality.</h2>
                <p>
                  Consistent quality and eperience across all platform and
                  devices
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Form