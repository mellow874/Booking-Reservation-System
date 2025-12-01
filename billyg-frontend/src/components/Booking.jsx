import { createContext, useContext, useState } from 'react';

//Booking context that will share reservation data across components
 const Booking = createContext();
/*BookingProvider component 
 -Provides global state management for booking data across all pages
 -Stores: date, people, time, seat, fullname, email, phone, requests*/

 export function BookingProvider({children}) {
    const [reservationData, setReservationData] = useState({
    date: "",
    people: "",
    time: "",
    seat: "",
    fullname: "",
    email: "",
    phone: "",
    requests: "",
    });

    return (
    <Booking.Provider value={{ reservationData, setReservationData }}>
      {children}
    </Booking.Provider>
  );
 }

 /*Returns objects with reservationData and setReservationData */
 export function useBooking() {
   const context = useContext(Booking);
   if (!context) {
     throw new Error("useBooking must be used within a BookingProvider");
   }
   return context;
 }