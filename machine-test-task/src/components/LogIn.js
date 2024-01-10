import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const LogIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  let location;

  useEffect(() => {
    const closeModalOnOutsideClick = (e) => {
      if (showModal && e.target.className === 'modal') {
        setShowModal(false);
        if (modalMessage ==='Geolocation is not supported by your browser' && modalMessage ==="Please Fill all the Fields") {
          return;
        }
        else{
          navigate('/manage-payment'); 
        }
      }
    };

    window.addEventListener('mousedown', closeModalOnOutsideClick);

    return () => {
      window.removeEventListener('mousedown', closeModalOnOutsideClick);
    };
  }, [showModal, navigate, modalMessage]);



  const handleLogin = (e) => {
    // e.preventDefault();
    // const validationErrors = {}
    // if(email==='' && password===''){
    //   setShowModal(true);
    //   setModalMessage("Please Fill all the Fields");
    //   resetInputValue()
    // }
    // else{
    //   if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(showLocation, failedToGet);
    //   } else {
    //     setShowModal(true);
    //     setModalMessage("Geolocation is not supported by your browser");
    //   }
    // }
    e.preventDefault();
    if (email.trim() === '' || password.trim() === '') {
      setShowModal(true);
      setModalMessage('Please fill in all the fields.');
      resetInputValue();
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showLocation, failedToGet);
      } else {
        setShowModal(true);
        setModalMessage('Geolocation is not supported by your browser');
      }
    }
    console.log({
      username : email,
      pass : password
    })
  };
  

  async function getData(latitude, longitude){
    const promise = await fetch(`http://api.weatherapi.com/v1/current.json?key=77ae83ed03c1464ca2273901241001&q=${latitude},${longitude}&aqi=yes`);
    return await promise.json()
  }


  const showLocation = async (position) => {
    try {
      const result = await getData(position.coords.latitude, position.coords.longitude);
      console.log(result);
      const currentLocation = result.location;
      if (currentLocation.country === 'India') {
        setShowModal(true);
        setModalMessage(`Your Current City is ${currentLocation.name} and Your Country is ${currentLocation.country}`);
      } else {
        navigate('/manage-payment', { state: { location: currentLocation } });
      }
    } catch (error) {
      console.error('Error getting location:', error);
      failedToGet();
    }
  };


  const handleSignUp = () => {
    navigate('/signup');
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMessage('');
  };

  const resetInputValue = () => {
    setEmail('');
    setPassword('');
  };


  const failedToGet = () =>{
    alert("Failed to get Location");
    resetInputValue()
  }


  return (
    <>
    <div className='login-form'>
      <h1>Login</h1>
      <p>{email} and {password}</p>
      {/* <input
        className='login-input'
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className='login-input'
        type="text"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className='login-button' onClick={handleLogin}>Login</button> */}
      <form id='form' onSubmit={handleLogin}>
          <input
            className='login-input'
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className='login-input'
            type="password" // Change to password input type
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className='login-button' type="submit">Login</button>
        </form>
      <p>If you don't have an account, <span onClick={handleSignUp}>sign up here</span></p>

      {/* Modal for valid and invalid credentials */}
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowModal(false)}>&times;</span>
              <p>{modalMessage}</p>
            </div>
          </div>
        )}
    </div>
    </>
  );
};

export default LogIn;