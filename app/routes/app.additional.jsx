import { useEffect, useState } from "react";
import { json } from "@remix-run/node";
import { useActionData, useNavigation, useSubmit } from "@remix-run/react";
import {
 Page,
 Layout,
 Text,
 Card,
 Button,
 BlockStack,
 Box,
 List,
 Link,
 InlineStack,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
 await authenticate.admin(request);
 return null;
};

const { PrismaClient } = require('@prisma/client');


export const action = async ({ request, checkedStatus }) => {
    const { admin } = await authenticate.admin(request);
    const response = await admin.graphql(
    `#graphql
    query {
     products(first: 200) {
       edges {
         node {
           id
           title
           images(first: 1) {
             edges {
               node {
                originalSrc
               }
             }
           }
         }
       }
     }
    }
    `
    );
    const responseJson = await response.json();
    if (responseJson.data.products.edges.length > 0) {
    const products = responseJson.data.products.edges.map(edge => ({
     id: edge.node.id,
     name: edge.node.title,
     imageUrl: edge.node.images.edges[0]?.node.originalSrc,
    }));
    const prisma = new PrismaClient();
    for (const product of products) {
     if (product.imageUrl) {
       await prisma.product.upsert({
         where: { id: product.id },
         update: {
           name: product.name,
           imageUrl: product.imageUrl,  
         },
         create: {
           id: product.id,
           name: product.name,
           imageUrl: product.imageUrl,
         },
       });
     }
    }
    await prisma.$disconnect();
    } else {
    return json({});
    }
    return null;
   };






   
   
   

export default function Index() {
 const nav = useNavigation();
 const actionData = useActionData();
 const submit = useSubmit();
 const isLoading =
   ["loading", "submitting"].includes(nav.state) && nav.formMethod === "POST";
 const products = actionData?.products;
 
 useEffect(() => {
   if (products) {
     shopify.toast.show("Products fetched");
   }
 }, [products]);
 const fetchProducts = () => submit({}, { replace: true, method: "POST" });

 

 const [checkedStatus, setCheckedStatus] = useState({});

 const handleCheckboxChange = (productId, checkboxType, isChecked) => {
 setCheckedStatus(prevState => ({
   ...prevState,
   [productId]: {
     ...prevState[productId],
     [checkboxType]: isChecked,
   },
 }));
 };

 return (
  <Page fullWidth>
    <ui-title-bar title="Remix app template">
      <button variant="primary" onClick={fetchProducts}>
        Fetch products
      </button>
    </ui-title-bar>
  
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="500">
              <BlockStack gap="200">
               {/* ... rest of the code */}
              </BlockStack>
              <InlineStack gap="300">
               <Button loading={isLoading} onClick={fetchProducts}>
                Fetch products
               </Button>
              </InlineStack>
              {products && (
               <Box
                padding="400"
                background="bg-surface-active"
                borderWidth="025"
                borderRadius="200"
                borderColor="border"
                overflowX="scroll"
               >
                <table style={{
               width: '100%',
               borderCollapse: 'collapse',
              }}>
               <tr>
                <th style={{
                  border: '1px solid black',
                  padding: '15px',
                  textAlign: 'center',
                  backgroundColor: '#000',
                  color: 'white',
                }}>ID</th>
                <th style={{
                  border: '1px solid black',
                  padding: '15px',
                  textAlign: 'center',
                  backgroundColor: '#000',
                  color: 'white',
                }}>Name</th>
                <th style={{
                  border: '1px solid black',
                  padding: '15px',
                  textAlign: 'center',
                  backgroundColor: '#000',
                  color: 'white',
                }}>Image</th>
                <th style={{
                  border: '1px solid black',
                  padding: '15px',
                  textAlign: 'center',
                  backgroundColor: '#000',
                  color: 'white',
                }}>Personalize</th>
                 <th style={{
                  border: '1px solid black',
                  padding: '15px',
                  textAlign: 'center',
                  backgroundColor: '#000',
                  color: 'white',
                }}>Template</th>
                 <th style={{
                  border: '1px solid black',
                  padding: '15px',
                  textAlign: 'center',
                  backgroundColor: '#000',
                  color: 'white',
                }}>Design</th>
               </tr>
               {products.map((product, index) => (
                <tr key={index} style={{
                  border: '1px solid black',
                  padding: '15px',
                  textAlign: 'left',
                }}>
                  <td style={{
                  border: '1px solid black',
                  padding: '15px',
                    textAlign: 'center',
                  }}>{product.id}</td>
                    <td style={{
                    border: '1px solid black',
                    padding: '15px',
                    textAlign: 'center',
                  }}>{product.name}</td>
                    <td style={{
                    border: '1px solid black',
                    padding: '15px',
                    textAlign: 'center',
                  }}>
                      <img src={product.imageUrl} alt={product.name} />
                    </td>
                    <td>

            <input
              type="checkbox"
              checked={!!checkedStatus[product.id]?.checkbox1}
              onChange={e => handleCheckboxChange(product.id, 'checkbox1', e.target.checked)}
            />
          </td>
          <td>
            <input
              type="checkbox"
              checked={!!checkedStatus[product.id]?.checkbox2}
              onChange={e => handleCheckboxChange(product.id, 'checkbox2', e.target.checked)}
            />
          </td>
          <td>
            <input
              type="checkbox"
              checked={!!checkedStatus[product.id]?.checkbox3}
              onChange={e => handleCheckboxChange(product.id, 'checkbox3', e.target.checked)}
            />
          </td>
                    
                  </tr>
                ))}
               </table>
                </Box>
               )}
             </BlockStack>
           </Card>
         </Layout.Section>
         {/* Rest of the code */}
       </Layout>
                      
   </Page>
 );
 }