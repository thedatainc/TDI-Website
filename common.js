/*****************************************************
 * Module 1: Navigation Menu
 *****************************************************/

document.addEventListener('DOMContentLoaded', function () {
    // Assuming this is the function for your navigation menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function () {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
});

/*****************************************************
 * Module 2: Dynamic Header and Footer Includes
 *****************************************************/

// Function to include external HTML into the current page
function includeHTML() {
    const elements = document.querySelectorAll("[data-include-html]");
    elements.forEach((element) => {
        const file = element.getAttribute("data-include-html");
        if (file) {
            fetch(file)
                .then(response => {
                    if (response.ok) return response.text();
                    throw new Error('Error loading the file.');
                })
                .then(html => {
                    element.innerHTML = html;
                })
                .catch(error => console.error(error));
        }
    });
}

// Load header and footer after the page has loaded
document.addEventListener("DOMContentLoaded", function () {
    includeHTML();
});

  
/*****************************************************
 * Module 3: POP-UP Contact-us form
 *****************************************************/
// Get elements
const popupForm = document.getElementById('popupForm');
const contactUsBtns = document.querySelectorAll('.learn-more-btn'); // Updated selector for your button
const closePopupBtn = document.getElementById('closePopupForm');

// Open the pop-up when any "Book a Call" button is clicked
contactUsBtns.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior
        popupForm.style.display = 'flex'; // Show the pop-up
    });
});

// Close the pop-up when the "X" button is clicked
closePopupBtn.addEventListener('click', () => {
    popupForm.style.display = 'none'; // Hide the pop-up
});

// Close the pop-up when clicking outside of the form
window.addEventListener('click', (event) => {
    if (event.target === popupForm) {
        popupForm.style.display = 'none'; // Hide the pop-up
    }
});
