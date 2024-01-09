// import { useEffect, useState } from "react";
// import { json } from "@remix-run/node";
// import { useActionData, useLoaderData, useSubmit } from "@remix-run/react";
// import { MONTHLY_PLAN } from "../shopify.server";
// import {
//  Page,
//  Layout,
//  Text,
//  Card,
//  Button,
//  BlockStack,
//  Box,
//  List,
//  Link,
//  InlineStack,
// } from "@shopify/polaris";
// import { authenticate } from "../shopify.server";

// export const loader = async ({ request }) => {
//   const { admin } = await authenticate.admin(request);
 
//     const response = await admin.graphql(
//       `#graphql
//       mutation AppSubscriptionCreate($name: String!, $lineItems: [AppSubscriptionLineItemInput!]!, $returnUrl: URL!) {
//         appSubscriptionCreate(name: $name, returnUrl: $returnUrl, lineItems: $lineItems) {
//           userErrors {
//             field
//             message
//           }
//           appSubscription {
//             id
//           }
//           confirmationUrl
//         }
//       }`,
//       {
//         variables: {
//           "name": "Super Duper Recurring Plan",
//           "returnUrl": "http://super-duper.shopifyapps.com/",
//           "lineItems": [
//             {
//               "plan": {
//                 "appRecurringPricingDetails": {
//                  "price": {
//                    "amount": 10.0,
//                    "currencyCode": "USD"
//                  },
//                  "interval": "EVERY_30_DAYS"
//                 }
//               }
//             }
//           ]
//         },
//       },
//     );
//     const responseJson = await response.json();
    
//     return json(responseJson.data.appSubscriptionCreate.confirmationUrl);
    

//  };
 

// export const action = async ({ request }) => {
// const { admin } = await authenticate.admin(request);

// }

// export default function Index() {
//   const data = useLoaderData();
//   useEffect(() => {
//     const redirectToSubscription = async () => {
//       const url = data;
//       if (url) {
//         window.location.href = url;
//       }
//     }
//     redirectToSubscription();
//   }, []);
//   console.log('Data:', data);

//   return (
//     <div>
//         <h2>Subscription Details</h2>
//             <>  
//                <a href={data} target="_blank" rel="noopener noreferrer">Approve Subscription</a>
//             </>

//     </div>
//   );
// }

  