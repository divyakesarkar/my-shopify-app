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
  