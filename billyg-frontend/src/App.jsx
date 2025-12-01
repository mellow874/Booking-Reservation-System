import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Reservationdate from './components/Reservationdate';
import Home from './pages/Home'
import FormDetail from './components/FormDetail';
import Confirmation from './components/Confirmation';
import { BookingProvider } from "./components/Booking";
import './App.css'

function App() {
  return (
    //Booking Provider for global state
    <BookingProvider>
      {/* Router to move between pages */}
    <Router>
       <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservation-date" element={<Reservationdate />} />
        <Route path="/details" element={<FormDetail />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
      </div>
    </Router>
    </BookingProvider>
  )
}

export default App
