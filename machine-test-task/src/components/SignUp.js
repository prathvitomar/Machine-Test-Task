import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

const SignUp = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [profession, setProfession] = useState('');
  const [isAllFieldsFilled, setIsAllFieldsFilled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [captchaConfirmed, setCaptchaConfirmed] = useState(false)

  const captchaConfirm = () =>{
    setCaptchaConfirmed(true);
  }

  const areAllFieldsFilled = () => {
    return firstName && lastName && age && city && profession;
  };

  // NEW:
  const handleSignUp = (e) => {
    e.preventDefault()
    setIsAllFieldsFilled(areAllFieldsFilled())
    // Perform validation for all fields filled
    if (firstName && lastName && age && city && profession) {
      setIsAllFieldsFilled(true);
    } else {
      setIsAllFieldsFilled(false);
      setShowModal(true); // Show the incomplete fields modal
    }
  };


  const handleContinue = () => {
    // Upon successful sign-up, redirect to Manage Payment Methods Wizard Component
    if(captchaConfirmed){
      navigate('/manage-payment');
    }
  };


  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (showModal && e.target.className === 'modal') {
        // Clicked outside the incomplete fields modal; close modal
        setShowModal(false);
      }
    };

    window.addEventListener('mousedown', handleOutsideClick);

    return () => {
      window.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showModal]);


  // const handleChange = event => {
  //   const result = event.target.value.replace(/[^a-z]/gi, '');
  //   setFirstName(result);
  // };
  


  return (
    // <div className='signup-form'>
    //   <h1>Sign Up</h1>
    //   <input
    //   className='signup-input'
    //     type="text"
    //     placeholder="First Name"
    //     value={firstName}
    //     onChange={(e) => setFirstName(e.target.value)}
    //   />
    //   <input
    //   className='signup-input'
    //     type="text"
    //     placeholder="Last Name"
    //     value={lastName}
    //     onChange={(e) => setLastName(e.target.value)}
    //   />
    //   <input
    //   className='signup-input'
    //     type="number"
    //     placeholder="Age"
    //     value={age}
    //     onChange={(e) => setAge(e.target.value)}
    //   />
    //   <input
    //   className='signup-input'
    //     type="text"
    //     placeholder="City"
    //     value={city}
    //     onChange={(e) => setCity(e.target.value)}
    //   />
    //   <input
    //   className='signup-input'
    //     type="text"
    //     placeholder="Profession"
    //     value={profession}
    //     onChange={(e) => setProfession(e.target.value)}
    //   />
    //   <button className={`login-input ${isAllFieldsFilled ? 'filled' : ''}`} onClick={handleSignUp}>Sign Up</button>

    //   {/* Modal for terms and conditions */}
    //   {isAllFieldsFilled && (
    //     <div className="modal">
    //       <div className="modal-content">
    //         <h2>Welcome {firstName} {lastName}!</h2>
    //         <p>TERMS AND CONDITION:</p>
    //         <ReCAPTCHA sitekey="6LfsL0wpAAAAAMZ4mZ5lTV7xbtPOm5OO5ExHyxSX" onChange={captchaConfirm} disabled={!captchaConfirmed}/>
    //         <p></p>
    //         { captchaConfirmed &&
    //           <button className='login-input' onClick={handleContinue}>Agree and Continue</button>

    //         }
    //       </div>
    //     </div>
    //   )}

    //   {/* Modal for incomplete fields */}
    //   {showModal && (
    //     <div className="modal">
    //       <div className="modal-content">
    //         <span className="close" onClick={() => setShowModal(false)}>&times;</span>
    //         <p>Please fill in all fields.</p>
    //       </div>
    //     </div>
    //   )}
    // </div>



    <div className='signup-form'>
    <h1>Sign Up</h1>
    <form onSubmit={handleSignUp}>
      <input
        className='signup-input'
        type='text'
        placeholder='First Name'
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <input
        className='signup-input'
        type='text'
        placeholder='Last Name'
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <input
        className='signup-input'
        type='number'
        placeholder='Age'
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required
      />
      <input
        className='signup-input'
        type='text'
        placeholder='City'
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
      />
      <input
        className='signup-input'
        type='text'
        placeholder='Profession'
        value={profession}
        onChange={(e) => setProfession(e.target.value)}
        required
      />
      <button className={`login-input ${isAllFieldsFilled ? 'filled' : ''}`} type='submit'>
        Sign Up
      </button>
    </form>

    {/* Modal for terms and conditions */}
    {isAllFieldsFilled && (
      <div className='modal'>
        <div className='modal-content'>
          <h2>
            Welcome {firstName} {lastName}!
          </h2>
          <p>TERMS AND CONDITION:</p>
          <ReCAPTCHA sitekey='YourSiteKey' onChange={captchaConfirm} disabled={!captchaConfirmed} />
          <p></p>
          {captchaConfirmed && (
            <button className='login-input' onClick={handleContinue}>
              Agree and Continue
            </button>
          )}
        </div>
      </div>
    )}

    {/* Modal for incomplete fields */}
    {showModal && (
      <div className='modal'>
        <div className='modal-content'>
          <span className='close' onClick={() => setShowModal(false)}>
            &times;
          </span>
          <p>Please fill in all fields.</p>
        </div>
      </div>
    )}
  </div>
  );
};

export default SignUp;
