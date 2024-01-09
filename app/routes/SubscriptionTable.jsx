import React from 'react';

function SubscriptionTable({ subscription }) {
 return (
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Price</th>
        <th>Interval</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{subscription.appSubscription.id}</td>
        <td>{subscription.name}</td>
        <td>{subscription.lineItems[0].plan.appRecurringPricingDetails.price.amount}</td>
        <td>{subscription.lineItems[0].plan.appRecurringPricingDetails.interval}</td>
        <td>
          <button onClick={() => window.location.href = subscription.confirmationUrl}>Approve</button>
        </td>
      </tr>
    </tbody>
  </table>
 );
}

export default SubscriptionTable;
