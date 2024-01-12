const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());

app.use(bodyParser.json());

const staticData = {
  commissionRate: 0.1, 
  feeAmount: 0.99, 
};

app.post('/api/pay', (req, res) => {
    const {
      creditCardNumber,
      billingZip,
      zipPortal,
      cvc,
      month,
      year
    } = req.body;
  
    const isPaymentSuccessful = Math.random() > 0.5; 
    const totalAmount = staticData.feeAmount;
  
    if (isPaymentSuccessful) {
      const commission = totalAmount * staticData.commissionRate;
      const sellerAmount = totalAmount - commission;
  
      res.json({
        success: true,
        totalAmount,
        commission,
        sellerAmount,
      });
    } else {
      console.log('Payment failed. Additional information:');
      console.log('Credit Card Number:', creditCardNumber);
      console.log('Billing Zip:', billingZip);
      console.log('CVC:', cvc);
      console.log('Month:', month);
      console.log('Year:', year);
  
      res.json({ success: false, message: 'Payment failed. Please try again.' });
    }
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
