import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ManagePaymentMethodsWizard = () => {
  const navigate = useNavigate();
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [billingZip, setBillingZip] = useState('');
  const [zipPortal, setZipPortal] = useState('');
  const [cvc, setCvc] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [showFeeModal, setShowFeeModal] = useState(true);
  const [showProceedModal, setShowProceedModal] = useState(false);
  const [showDenyModal, setShowDenyModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showCancelConfirmationModal, setShowCancelConfirmationModal] = useState(false);
  const [showThanksForVisitingModal, setShowThanksForVisitingModal] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [commission, setCommission] = useState(0);


  const handlePay = async (e) => {
    e.preventDefault();
    if (creditCardNumber && billingZip && zipPortal && cvc && month && year) {
      try {
        const response = await fetch('http://localhost:5000/api/pay', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            creditCardNumber,
            billingZip,
            zipPortal,
            cvc,
            month,
            year,
          }),
        });
  
        const data = await response.json();
  
        if (data.success) {
          setTotalAmount(data.totalAmount);
          setCommission(data.commission);
          setShowProceedModal(true);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.error('Error processing payment:', error);
      }
    } else {
      console.log('Please fill in all fields before proceeding.');
    }
  };

  


  const handleProceed = () => {
    console.log('Proceeding with payment details:');
    console.log('Total Amount:', totalAmount);
    console.log('Commission:', commission);
    if (creditCardNumber && billingZip && zipPortal && cvc && month && year) {
      alert('Form successfully submitted');
      setShowConfirmationModal(true);
      clearFields();
    } else {
      console.log("Please fill in all fields before proceeding.");
    }
    setShowProceedModal(false);
  };


  

  const handleDeny = () => {
    setShowDenyModal(true);
    clearFields();
  };

  const handleConfirmation = (isAgree) => {
    if (isAgree) {
      clearFields();
      setShowFeeModal(false);
      setShowProceedModal(false);
      setShowDenyModal(false);
      setShowConfirmationModal(false);
    } else {
      navigate('/login');
    }
  };

  const handleCancel = () => {
    setShowCancelConfirmationModal(true);
    // setShowThanksForVisitingModal(true);
  };

  const handleCancelConfirmation = (isSure) => {
      setShowCancelConfirmationModal(false);
        navigate('/login');
  };

  const clearFields = () => {
    setCreditCardNumber('');
    setBillingZip('');
    setZipPortal('');
    setCvc('');
    setMonth('');
    setYear('');
  };

  useEffect(() => {
    const handleClickOutsideModal = (e) => {
      if ((showDenyModal || showProceedModal) && e.target.classList.contains('modal')) {
        setShowDenyModal(false);
        setShowProceedModal(false);
      }
    };
  
    window.addEventListener('mousedown', handleClickOutsideModal);
  
    return () => {
      window.removeEventListener('mousedown', handleClickOutsideModal);
    };
  }, [showDenyModal, showProceedModal]);
  

  return (
    <>
    <div className='manage-payment'>
      <h1>Manage Payment Methods Wizard</h1>
    <form onSubmit={handlePay}>
          <input
            className='signup-input'
            type='number'
            placeholder='Credit Card Number'
            value={creditCardNumber}
            onChange={(e) => setCreditCardNumber(e.target.value)}
          />
          <input
            className='signup-input'
            type='number'
            placeholder='Billing Zip'
            value={billingZip}
            onChange={(e) => setBillingZip(e.target.value)}
          />
          <input
            className='signup-input'
            type='text'
            placeholder='Zip Portal'
            value={zipPortal}
            onChange={(e) => setZipPortal(e.target.value)}
          />
          <input
            className='signup-input'
            type='text'
            placeholder='CVC'
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
          />
          <input
            className='signup-input'
            type='number'
            placeholder='Month'
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
          <input
            maxLength='4'
            className='signup-input'
            pattern="\d*"
            type='number'
            placeholder='YYYY'
            value={year}
            onChange={(e) => setYear(e.target.value)}
            inputMode="numeric"
          />
          <button className='in-button' type='submit'>
            Pay
          </button>
      </form>

      {/* Fee Modal */}
      {showFeeModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Your Payment Method will be charged a non-refundable fee of $0.99</p>
            <div className='button-space'>
            <button className='in-button' onClick={() => setShowFeeModal(false)}>Agree</button>
            <button className='in-button' onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Proceed Modal */}
      {showProceedModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you willing to pay the amount of $0.99 charged as a non-refundable fee?</p>
            <div className='button-space'>
            <button className='in-button' onClick={handleProceed}>Proceed</button>
            <button className='in-button' onClick={handleDeny}>Deny</button>
            </div>
          </div>
        </div>
      )}

      {/* Deny Modal */}
      {showDenyModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Payment Denied. Please contact your institution or add another Payment Method.</p>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Successfully paid $0.99. Do you want to make more payments?</p>
            <div className='button-space'>
            <button className='in-button' onClick={() => handleConfirmation(true)}>Okay</button>
            <button className='in-button' onClick={handleCancelConfirmation}>Cancel</button>
            </div>
          </div>
        </div>
      )}


    {showCancelConfirmationModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to exit?</p>
            <div className='button-space'>
              <button className='in-button' onClick={() => navigate('/login')}>Yes</button>
              <button className='in-button' onClick={() => setShowCancelConfirmationModal(false)}>No</button>
            </div>
          </div>
        </div>
      )}

  {showThanksForVisitingModal && (
    <div className="modal">
      <div className="modal-content">
        <p>Thanks for visiting</p>
      </div>
    </div>
  )}
    </div>
    </>
  );
};

export default ManagePaymentMethodsWizard;

































  // const handlePay = () => {
  //   if (creditCardNumber && billingZip && zipPortal && cvc && month && year) {
  //         setShowProceedModal(true);
  //     // setShowFeeModal(true);
  //   } else {
  //     console.log("Please fill in all fields before proceeding.");
  //   }
  // };





  
  // const handleProceed = async () => {
  //   if (creditCardNumber && billingZip && zipPortal && cvc && month && year) {
  //     try {
  //       const response = await axios.post('http://localhost:5000/api/pay', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           creditCardNumber,
  //           billingZip,
  //           zipPortal,
  //           cvc,
  //           month,
  //           year,
  //         }),
  //       });
  
  //       const data = await response.json();
  
  //       if (data.success) {
  //         setTotalAmount(data.totalAmount);
  //         setCommission(data.commission);
  //         setShowConfirmationModal(true);
  //         clearFields();
  //       } else {
  //         console.log(data.message);
  //       }
  //     } catch (error) {
  //       console.error('Error processing payment:', error);
  //     }
  //   } else {
  //     console.log('Please fill in all fields before proceeding.');
  //   }
  // };
  