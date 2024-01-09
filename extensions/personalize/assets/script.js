
import { PrismaClient } from "@prisma/client";

document.addEventListener('DOMContentLoaded', function() {
async function fetchPersonalizeItems() {
  try {
    const prisma = new PrismaClient();
    const personalizeItems = await prisma.personalize.findMany();
    console.log(personalizeItems);
    return personalizeItems;
  } catch (error) {
    console.error('Error fetching personalize items:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  const personalizeItems = await fetchPersonalizeItems();

  // Assuming you are using this in a server-side context (e.g., Node.js with Express)
  // You can send the HTML response back to the client.

  const htmlContent = personalizeItems.map(item => `
    <div>
      <h2>${item.name}</h2>
      <img src="${item.imageUrl}" alt="${item.name}" width="100" height="100" loading="lazy">
      <p>Personalize: ${item.personalize}</p>
      <p>Template: ${item.template}</p>
      <p>Design: ${item.design}</p>
    </div>
  `).join('\n');

  console.log(htmlContent);
}

main();
});
function doSomething() {
    var button = document.querySelector('.custom-button');
    if (!button) {
        button = document.createElement('button');
        button.innerHTML = 'Design';
        button.classList.add('custom-button');
 
        var productForm = document.querySelector('.product-form');
        if (productForm) {
            productForm.appendChild(button);
        }
 
        button.addEventListener('click', function () {
            // Add your custom button click functionality here
            alert('Button clicked!');
        });
    }
 }
 
 if (document.readyState === "loading") {
    // Loading hasn't finished yet
    document.addEventListener("DOMContentLoaded", doSomething);
 } else {
    // `DOMContentLoaded` has already fired
    doSomething();
 }