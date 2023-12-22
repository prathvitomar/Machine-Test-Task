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


  const handlePay = () => {
    if (creditCardNumber && billingZip && zipPortal && cvc && month && year) {
      setShowProceedModal(true);
    } else {
      console.log("Please fill in all fields before proceeding.");
    }
  };
  

  const handleProceed = () => {
    setShowConfirmationModal(true);
    clearFields();
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
    <div className='manage-payment'>
      <h1>Manage Payment Methods Wizard</h1>
      <input
      className='signup-input'
        type="text"
        placeholder="Credit Card Number"
        value={creditCardNumber}
        onChange={(e) => setCreditCardNumber(e.target.value)}
      />
      <input className='signup-input'
        type="text"
        placeholder="Billing Zip"
        value={billingZip}
        onChange={(e) => setBillingZip(e.target.value)}
      />
      <input className='signup-input'
        type="text"
        placeholder="Zip Portal"
        value={zipPortal}
        onChange={(e) => setZipPortal(e.target.value)}
      />
      <input className='signup-input'
        type="text"
        placeholder="CVC"
        value={cvc}
        onChange={(e) => setCvc(e.target.value)}
      />
      <input className='signup-input'
        type="text"
        placeholder="Month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      />
      <input className='signup-input'
        type="text"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <button className='in-button' onClick={handlePay}>Pay</button>

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
  );
};

export default ManagePaymentMethodsWizard;
