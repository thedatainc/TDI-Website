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

/*****************************************************
 * Module 4: Handle Form Submission to API Gateway
 *****************************************************/
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent form from reloading the page

        // Collect form data
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            companyName: document.getElementById('companyName').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
        };

        try {
            // Send data to API Gateway
            const response = await fetch('https://3ao7ngabhh.execute-api.us-east-1.amazonaws.com/Production/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Form submitted successfully!');
                popupForm.style.display = 'none'; // Close the pop-up
            } else {
                console.error('Error submitting form:', response.statusText);
                alert('Failed to submit the form. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred. Please try again.');
        }
    });
}

/*****************************************************
 * Module 5: Contact us
 *****************************************************/

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message')
    };

    fetch('https://kuccv46swe.execute-api.us-east-1.amazonaws.com/production/submit-contactUs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert('Message sent successfully!'); // Provide feedback to the user
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to send message.'); // Provide error feedback to the user
    });
});