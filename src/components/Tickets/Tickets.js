import React from 'react';
import { Link } from 'react-router-dom';
import './Tickets.css';

const Tickets = (props) => {
  
  const {id, type, photo} = props.ticket;
  return (
    <div className=" col-10 col-sm-6 col-md-3 p-3 mt-5">
      <div className="card" >
        <img src={photo} className=" card-img-top rounded card-image" alt="..." />
        <div className="card-body text-center">
          <h5 className="card-title">{type}</h5>
          <Link to={`/destination/${id}`} className="btn btn-primary">Book now</Link>
        </div>
      </div>   
    </div>
  );
};

export default Tickets;