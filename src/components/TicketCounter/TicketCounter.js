import React, { useEffect, useState } from 'react';
import './TicketCounter.css';
import fakeData from "../../fakeData/fakeData";
import Tickets from '../Tickets/Tickets';

const TicketCounter = () => {
  const [tickets, setTickets] = useState([]);
  useEffect(()=>{
    setTickets(fakeData);
  },[])
  return (
    <div className ="ticket-counter row container-fluid">
      {
        tickets.map(ticket => <Tickets ticket={ticket}></Tickets> )
      }
            
    </div>
  );
};

export default TicketCounter;