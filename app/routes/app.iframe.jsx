import { useEffect } from "react";
import { json } from "@remix-run/node";
import { useActionData, useNavigation, useSubmit, useLoaderData } from "@remix-run/react";
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
  const { admin } = await authenticate.admin(request);
 
  // Create the first metafield
  const responseDesign = await admin.graphql(
   `#graphql
   mutation CreateMetafieldDefinition($definition: MetafieldDefinitionInput!) {
     metafieldDefinitionCreate(definition: $definition) {
       createdDefinition {
         id
         name
         namespace
       }
       userErrors {
         field
         message
         code
       }
     }
   }
   `,
   {
     variables: {
       "definition": {
         "name": "Design",
         "namespace": "design",
         "key": "design",
         "type": "boolean",
         "ownerType": "PRODUCT"
       }
     },
   }
  );
 
  const responseDesignJson = await responseDesign.json();
 
  if (responseDesignJson.data.metafieldDefinitionCreate.userErrors.length > 0) {
  //  console.log("Design Errors:", responseDesignJson.data.metafieldDefinitionCreate.userErrors);
  } else {
   const confirmationDesign = responseDesignJson.data.metafieldDefinitionCreate.createdDefinition;
  //  console.log("Design:", confirmationDesign);
  }
 
  // Create the second metafield
  const responseTemplate = await admin.graphql(
   `#graphql
   mutation CreateMetafieldDefinition($definition: MetafieldDefinitionInput!) {
     metafieldDefinitionCreate(definition: $definition) {
       createdDefinition {
         id
         name
         namespace
       }
       userErrors {
         field
         message
         code
       }
     }
   }
   `,
   {
     variables: {
       "definition": {
         "name": "Template",
         "namespace": "template",
         "key": "template",
         "type": "boolean",
         "ownerType": "PRODUCT"
       }
    
     },
   }
  );
 
  const responseTemplateJson = await responseTemplate.json();
 
  if (responseTemplateJson.data.metafieldDefinitionCreate.userErrors.length > 0) {
  //  console.log("Template Errors:", responseTemplateJson.data.metafieldDefinitionCreate.userErrors);
  } else {
   const confirmationTemplate = responseTemplateJson.data.metafieldDefinitionCreate.createdDefinition;
  //  console.log("Template:", confirmationTemplate);
  }
 
  return null;
 };
 

export default function Index() {
  const data = useLoaderData();

  return (
    <Page>
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="500">
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                   Welcome to Design Studio 🎉
                  </Text>

                  <List type="bullet">
                <List.Item>From your Shopify admin, go to Online Store - <Link
                    url="https://admin.shopify.com/themes"
                    target="_blank"
                    removeUnderline
                  > Themes </Link>.</List.Item>
                <List.Item>Find the theme that you want to edit, and then click Customize.</List.Item>
                <List.Item>Navigate to the Product page and section where you want to add the app block.</List.Item>
                <List.Item>On the sidebar, click Add block.</List.Item>
                <List.Item>From the drop-down menu, in the Apps section, select the Personalize App block.</List.Item>
                <List.Item>Optional: Click and drag the ⋮⋮ icon to move the block to another available location on the page. You can also customize the block using any available settings.</List.Item>
                <List.Item> Click Save.</List.Item>
              </List>
                </BlockStack>
             
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
