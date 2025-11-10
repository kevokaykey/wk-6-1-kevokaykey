import React from 'react';
import { useParams } from 'react-router-dom';

const OrderDetailPage = () => {
  const { id } = useParams();
  
  return (
    <div>
      <h1>Order Details</h1>
      <p>Order ID: {id}</p>
      <p>Order details and tracking information would be displayed here.</p>
    </div>
  );
};

export default OrderDetailPage;
