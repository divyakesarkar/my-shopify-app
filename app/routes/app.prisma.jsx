import { PrismaClient, User } from "@prisma/client";
import { authenticate } from "../shopify.server";
import { Form, Link, useLoaderData, useNavigation } from "@remix-run/react";
import { useEffect, useState } from "react"; 
import {
    Page,
    Layout,
    Text,
    Card,
    Button,
    BlockStack,
    Box,
    List,
    InlineStack,
   } from "@shopify/polaris";


/**
 *
 * @returns get data when page is loaded
 */
export const loader = async ({ request }) => {
  await authenticate.admin(request);
  const prisma = new PrismaClient();
  const allProducts = await prisma.product.findMany();
  
  // Fetch corresponding personalize data for each product
  const personalizedData = await Promise.all(
    allProducts.map(async (product) => {
      const personalizationData = await prisma.personalize.findUnique({
        where: { id: product.id },
      });
      return { ...product, personalizationData };
    })
  );

  // console.log("allProducts", personalizedData);
  
  await prisma.$disconnect();
  return personalizedData;
};

/**
 * called when I submit the form on my page
 * 
 * @param param0 
 * @returns 
 */
export async function action({ request }) {
  const form = await request.formData();
  
  const prisma = new PrismaClient();
  const checkbox1Value = form.get("checkbox1") === 'on' ? true : false;
  const checkbox2Value = form.get("checkbox2") === 'on' ? true : false;
  const checkbox3Value = form.get("checkbox3") === 'on' ? true : false;
  const productId = form.get("productId");
  const productName = form.get("productName");
  const productImage = form.get("productImage");
  const allUsers = await prisma.personalize.upsert({
    where: { id: productId },
    update: {
      name: productName,
      imageUrl: productImage,
      personalize: checkbox1Value, 
      template: checkbox2Value, 
      design: checkbox3Value,
    },
    create: {
      id: productId,
      name: productName,
      imageUrl: productImage,
      personalize: checkbox1Value, 
      template: checkbox2Value, 
      design: checkbox3Value,
    },
   });
   

  await prisma.$disconnect();
  return true;
 }
 
 


// ... (import statements)

export default function Index() {
  const products = useLoaderData();
  const { state } = useNavigation();
  const busy = state === "submitting";

  return (
    <Page fullWidth>
      <ui-title-bar title="Remix app template">
      </ui-title-bar>
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="500">
              <div>
                <Box
                  padding="400"
                  background="bg-surface-active"
                  borderWidth="025"
                  borderRadius="200"
                  borderColor="border"
                  overflowX="scroll"
                >
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Personalize</th>
                        <th>Template</th>
                        <th>Design</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id}>
                          <td style={{textAlign:"center"}}>{product.id}</td>
                          <td style={{textAlign:"center"}}>{product.name}</td>
                          <td style={{textAlign:"center"}}>
                            <img style={{ width: '200px' }} src={product.imageUrl} alt={product.name} />
                          </td>
                          <td style={{textAlign:"center"}}>
                            <Form method="post">
                              <input type="hidden" name="productId" value={product.id} />
                              <input type="hidden" name="productName" value={product.name} />
                              <input type="hidden" name="productImage" value={product.imageUrl} />
                              <input name="checkbox1" type="checkbox" defaultChecked={product.personalizationData?.personalize} />
                              <input name="checkbox2" type="checkbox" defaultChecked={product.personalizationData?.template} />
                              <input name="checkbox3" type="checkbox" defaultChecked={product.personalizationData?.design} />
                              <button type="submit" disabled={busy} data-product-id={product.id}>
                                {busy ? 'Saving...' : 'Save'}
                              </button>
                            </Form>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Box>
              </div>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
