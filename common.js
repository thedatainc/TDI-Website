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
/*****************************************************
 * Module 3: POP-UP Contact-us form
 *****************************************************/
const popupForm = document.getElementById('popupForm');
const contactUsBtns = document.querySelectorAll('.learn-more-btn'); // Buttons for the popup
const closePopupBtn = document.getElementById('closePopupForm');

// Open the popup when "Book a Call" buttons are clicked
contactUsBtns.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default behavior
        popupForm.style.display = 'flex'; // Show the popup
    });
});

// Close the popup when the "X" button is clicked
closePopupBtn.addEventListener('click', () => {
    popupForm.style.display = 'none'; // Hide the popup
});

// Close the popup when clicking outside of the form
window.addEventListener('click', (event) => {
    if (event.target === popupForm) {
        popupForm.style.display = 'none'; // Hide the popup
    }
});

// Allow "Discover now →" links to work as intended
document.querySelectorAll('.action-link').forEach(link => {
    link.addEventListener('click', (event) => {
        console.log('Action link clicked:', link.href); // Debug log
        event.stopPropagation(); // Prevent the click from bubbling up
        popupForm.style.display = 'none'; // Ensure popup is closed
    });
});

// Prevent clicks on service cards from triggering unintended behavior
document.querySelectorAll('.service-card-section-2').forEach(card => {
    card.addEventListener('click', (event) => {
        console.log('Clicked on:', event.target); // Debug log
        if (event.target.tagName === 'A') {
            // Allow links inside the card to function normally
            return;
        }
        event.preventDefault(); // Prevent default behavior for other clicks
        event.stopPropagation(); // Prevent propagation
    });
});

