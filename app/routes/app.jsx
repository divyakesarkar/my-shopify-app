import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { MONTHLY_PLAN, authenticate } from "../shopify.server";
import { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { redirect } from '@remix-run/node';



export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export const loader = async ({ request }) => {
  const {session, admin, redirect, billing} =   await authenticate.admin(request);

  const result = await admin.graphql(`
  query Shop{
    app{
      installation{
        launchUrl
   activeSubscriptions {
     id
     name
     createdAt
      returnUrl
     status
     currentPeriodEnd
     trialDays
   }
   }
   }
   }`,
 {
 variables:{}
 }
 );
 const resultJson = await result.json();

 const { activeSubscriptions, launchUrl } = resultJson.data.app.installation;
//  if (activeSubscriptions.length < 1){
    // await billing.require({

    // plans:  [MONTHLY_PLAN],
    // isTest: true,
    // onFailure: async () => 
    //   billing.request({
    //     plan: MONTHLY_PLAN,
    //     returnUrl: launchUrl,
    
    // }),
    // });

  // const response = await admin.graphql(
  //   `#graphql
  //   mutation AppPurchaseOneTimeCreate($name: String!, $price: MoneyInput!, $returnUrl: URL!) {
  //     appPurchaseOneTimeCreate(name: $name, returnUrl: $returnUrl, price: $price) {
  //       userErrors {
  //         field
  //         message
  //       }
  //       appPurchaseOneTime {
  //         createdAt
  //         id
  //       }
  //       confirmationUrl
  //     }
  //   }`,
  //   {
  //     variables: {
  //       "name": "One Time Subscription",  
  //       "returnUrl": launchUrl,
  //       "price": {
  //         "amount": 10.0,
  //         "currencyCode": "USD"
  //       }
  //     },
  //   },
  // );
  
  // const data = await response.json();
  
    
  //   const confirmationUrl = data.data.appPurchaseOneTimeCreate.confirmationUrl;
  //   console.log("Subscription:", confirmationUrl)

  //   redirect(confirmationUrl, { target: "_parent" });

  return json({ apiKey: process.env.SHOPIFY_API_KEY || "" });
};



export default function App() {
  const { apiKey } = useLoaderData();

  return (
    <AppProvider isEmbeddedApp apiKey={apiKey}>
      <ui-nav-menu>
        <Link to="/app" rel="home">
          Home
        </Link>
        {/* <Link to="/app/iframe">Editor</Link> */}
        <Link to="/app/settings">Settings</Link>
        {/* <Link to="/app/dashboard">Dashboard</Link> */}
        {/* <Link to="/app/prisma">Prisma</Link>
        <Link to="/app/subscription">Subscription</Link> */}
      </ui-nav-menu>
      {/* <Router>
      <Route path="/approve-subscription/:planName" element={<ApproveSubscription />} />
      </Router> */}
      <Outlet />
    </AppProvider>
  );
}

// Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
