import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SignUp from './components/SignUp'
import LogIn from './components/LogIn';
import ManagePaymentMethodsWizard from './components/ManagePaymentMethodsWizard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/manage-payment" element={<ManagePaymentMethodsWizard />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;
