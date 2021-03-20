import React, { useEffect, useState } from 'react';
import './Destination.css';
import fakeData from "../../fakeData/fakeData";
import { useParams } from 'react-router';

const Destination = () => {

  let {ticketId} = useParams();
  const [destination, setDestination] = useState({
    pickFrom:"",
    goTo:""
  });
  const [ticket, setTicket] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  useEffect(()=>{
    setTickets(fakeData);
    const bookedTicket = tickets.filter(tckt => {
        console.log(tckt, "inside useEffect");
        if(tckt.id === Number(ticketId)){
            return tckt;
        }
    });
    setTicket(bookedTicket);
    console.log("Actual ticket",ticket)

  }, [ ticket] );

  const handleBlur = (e) =>{
    if(e.target.value !== ""){
      let newDestination = {...destination};
      newDestination[e.target.name] = e.target.value;   
      setDestination(newDestination);
    }
  }
  const handleSubmit = (e)=>{
      setIsSearched(!isSearched);
      e.preventDefault();

  }

  console.log("ticket id", typeof ticketId);
  return (
    <div className="row container-fluid">
      <div className="destination-places col-10 col-md-4">
        <div className="p-5 destination-form">
          {!isSearched && <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <input type="text" onBlur={handleBlur} className="form-control col-10 col-md-8" name="pickFrom" placeholder="Pick from" required /> 
            </div>
            <div className="row mb-3">
              <input type="text" onBlur={handleBlur} className="form-control col-10 col-md-8" name="goTo" placeholder="Go to" required /> 
            </div>
            <div className="row mb-3">
              <input type="submit" value="Search" className="form-control col-10 col-md-8" /> 
            </div>
          </form>}
          {isSearched && 
            <div style={{color:'white'}}>
              <p>From: {destination.pickFrom}</p>
              <p>To: {destination.goTo}</p>
            </div>
          }
          {isSearched &&
            <div className="row">
              <div className="col-md-5">
              </div>


            </div>
          }
        </div>
        
      </div> 
      <div className="destination-map col-10 col-md-6 m-3">
        <h2>This is Map</h2>
      </div>  
    </div>
  );
};

export default Destination;