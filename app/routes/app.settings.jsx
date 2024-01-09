import React, { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    // Function to insert the button on the product page
    const insertButton = () => {
      const productPage = document.querySelector('.product-page'); // You might need to adjust the selector based on your theme structure
      
      if (productPage) {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'custom-button-container';

        const customButton = document.createElement('button');
        customButton.innerText = 'Custom Button';
        customButton.className = 'custom-button';

        // Add your button click logic here
        customButton.addEventListener('click', () => {
          // Your button click logic
          console.log('Button Clicked!');
        });

        buttonContainer.appendChild(customButton);
        productPage.appendChild(buttonContainer);
      } 
    };

    // Insert the button when the DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', insertButton);
    } else {
      insertButton();
    }
  }, []);

  return (
    <div>
      {/* Your app content goes here */}
    </div>
  );
};

export default App;
