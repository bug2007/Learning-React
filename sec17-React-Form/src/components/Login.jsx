import { useRef, useState } from "react";
import { useInput } from "../hooks/useInput";

export default function Login() {
  const { value: emailValue, handleInputChange: handleEmailChange, handleInputBlur: handleEmailBlur } = useInput('')
  const { value: passwordValue, handleInputChange: handlePasswordChange, handleInputBlur: handlePasswordBlur } = useInput('')
  // const [emailIsInvalid, setEmailIsInvalid] = useState(false)

  // const emailIsInvalid = entered.values.email !== '' && !enteredValues.email.includes('@');
  // const emailIsInvalid = didEdit.email && !enteredValues.email.includes('@');

  // const email = useRef()
  // const password = useRef()

  function handleSubmit(event) {
    event.preventDefault()

    // const enteredEmail = email.current.value;
    // const enteredPassword = password.current.value;

    // console.log(enteredEmail, enteredPassword)
      // const emailIsValid = enteredEmail.includes('@');
      // if (!emailIsValid) {
        // setEmailIsInvalid(true)
        // return
      // }

      // setEmailIsInvalid(false)

  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          {/* <input id="email" type="email" name="email" onChange={(event) => handleInputChange('email', event.target.value)} value={enteredValues.email} /> */}
          {/* <input id="email" type="email" name="email" onChange={(event) => handleInputChange('email', event.target.value)} onBlur={() => handleInputBlur('email')} value={enteredValues.email} /> */}
          {/* <div className="control-error">{emailIsInvalid && <p>Please enter a valid email address</p>}</div> */}
          <input id="email" type="email" name="email" ref={email} />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          {/* <input id="password" type="password" name="password" onChange={(event) => handleInputChange('password', event.target.value)} value={enteredValues.password} /> */}
          <input id="password" type="password" name="password" ref={password} />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button> 
      </p>
    </form>
  );
}
 

