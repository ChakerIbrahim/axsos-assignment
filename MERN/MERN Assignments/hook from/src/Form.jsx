import { useState } from 'react'


function Form() {
const [firstName, setFirstName]= useState("");
const [lastName, setLastName]= useState("");
const [email, setEmail]= useState("");
const [password, setPassword]= useState("");
const [confirmPassword, setConfirmPassword] = useState("");

const awsUser={
      firstName,
      lastName,
      email,
      password
    };

  return (
    <>
    <form>
      <div>
          <label>First Name:</label>
          <input type='text'value={firstName} onChange={(e)=>(setFirstName(e.target.value))}/>
      </div>
      <div>
          <label>Last Name:</label>
          <input type='text'value={lastName} onChange={(e)=>(setLastName(e.target.value))}/>
      </div>
      <div>
          <label>Email:</label>
          <input type='email'value={email} onChange={(e)=>(setEmail(e.target.value))}/>
      </div>
      <div>
          <label>Password</label>
          <input type='password'value={password} onChange={(e)=>(setPassword(e.target.value))}/>
      </div>
      <div>
          <label>Confirm Password:</label>
          <input type='password'value={confirmPassword} onChange={(e)=>(setConfirmPassword(e.target.value))}/>
      </div>
    </form>
        <p> the First Name :- {firstName}</p>
      <p> the Last Name :- {lastName}</p>
      <p> Email is :- {email}</p>
      <p> Password is :- {password}</p>
      <p>Confirm Password is :- {confirmPassword}</p>
    </>
  )
}
export default Form
