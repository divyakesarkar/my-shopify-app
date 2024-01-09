import React, { useState, useEffect } from 'react';
import { FormLayout, Button, Page, Layout, Card, BlockStack } from '@shopify/polaris';
import emailjs from 'emailjs-com';
import { authenticate } from "../shopify.server";
import { Form, useActionData } from "@remix-run/react";
import { PrismaClient } from '@prisma/client';

export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  const formData = await request.formData();
  const formType = formData.get('formType');

  const response = await admin.graphql(`
  {
    shop {
      name
      primaryDomain {
        url
        host
      }
      myshopifyDomain
      contactEmail
    }
  }`
  )

  const responseJson = await response.json();
  const shopName = responseJson.data.shop.name;
  // const result = await admin.graphql(`
  // query Shop {
  //   app {
  //     installation {
  //       launchUrl
  //     }
  //   }
  // }`,
  // {
  //   variables:{}
  // }
  // );
  // const appurl = await result.json();
  const launchurl = "./app/iframe";

  if (formType === 'generate') {
    const username = 'user_' + Math.random().toString(36).substr(2, 9);
    const password = Math.random().toString(36).substr(2, 9);
    const prisma = new PrismaClient();

    await prisma.shop.create({
      data: {
        shopName: shopName,
        contactEmail: responseJson.data.shop.contactEmail,
        username,
        password,
      },
    });
    const launchurl = `https://admin.shopify.com/store/${shopName}/apps/personalize-app-1/app/iframe`;
      console.log(launchurl);

    return { generated: true, username, password, launchUrl: launchurl };
  } else if (formType === 'login') {
    const loginUsername = formData.get('loginUsername');
    const loginPassword = formData.get('loginPassword');
    const prisma = new PrismaClient();

    const user = await prisma.shop.findFirst({
      where: { username: loginUsername, password: loginPassword },
    });

    return { loginSuccess: !!user, launchUrl: launchurl };
  }
};

export default function Index() {
  const [emailStatus, setEmailStatus] = useState(''); 
  const actionData = useActionData();
  const [launchUrl, setLaunchUrl] = useState(''); // New state for launchUrl

  useEffect(() => {
   if (actionData) {
      // Call sendEmail when actionData is available
      sendEmail(actionData.username, actionData.password);
    }
  
    // if (actionData?.generated || actionData?.loginSuccess) {
    //   if (actionData.launchUrl) {
    //     setLaunchUrl(actionData.launchUrl); // Set the launchUrl
    //   }
    // }

    if (actionData?.loginSuccess && actionData?.launchUrl) {
      // Directly use launchUrl from actionData for redirection
      window.open(actionData.launchUrl, '_blank'); // Opens in a new tab/window
    }
  }, [actionData]); // Depend on actionData and launchUrl

  const sendEmail = async (username, password) => {
    const templateParams = {
      username,
      password,
      to_email: 'divya.k@wtpbiz.com',
      message: `Username: ${username}, Password: ${password}`,
    };

    try {
      await emailjs.send('service_jsi6fot', 'template_paflaz8', templateParams, 'aV4JPAK8prWcWjz4t');
      setEmailStatus('Email sent successfully!');
    } catch (err) {
      console.error('Email sending failed:', err);
      setEmailStatus('Failed to send email.');
    }
  };

  return (
    <Page>
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="500">
                <BlockStack gap="200">
                  <Form method="post">
                    <input type="hidden" name="formType" value="generate" />
                    <Button variant="primary" submit>Generate and Send Credentials</Button>
                  </Form>
                  <p>{emailStatus}</p>

                  <Form method="post">
                    <input type="hidden" name="formType" value="login" />
                    <FormLayout>
                      <div>
                        <label htmlFor="loginUsername">Username</label>
                        <input id="loginUsername" name="loginUsername" type="text" />
                      </div>
                      <div>
                        <label htmlFor="loginPassword">Password</label>
                        <input id="loginPassword" name="loginPassword" type="password" />
                      </div>
                      <Button submit>Log in</Button>
                    </FormLayout>
                  </Form>

                  {actionData?.loginSuccess === false && <p>Login failed. Incorrect username or password.</p>}
                  {actionData?.loginSuccess === true && <p>Login successful!</p>}
                </BlockStack>         
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
