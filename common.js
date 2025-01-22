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
const popupForm1 = document.getElementById('popupForm1');
const contactUsBtns1 = document.querySelectorAll('.learn-more-btn'); // Buttons for the popup
const closePopupBtn1 = document.getElementById('closePopupForm1');

// Open the popup when "Book a Call" buttons are clicked
contactUsBtns1.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default behavior
        popupForm1.style.display = 'flex'; // Show the popup
    });
});

// Close the popup when the "X" button is clicked
closePopupBtn1.addEventListener('click', () => {
    popupForm1.style.display = 'none'; // Hide the popup
});

// Close the popup when clicking outside of the form
window.addEventListener('click', (event) => {
    if (event.target === popupForm1) {
        popupForm1.style.display = 'none'; // Hide the popup
    }
});

/*****************************************************
 * Module 4: Handle Form Submission to API Gateway
 *****************************************************/
const popupContactForm = document.getElementById('popupContactForm');

if (popupContactForm) {
    popupContactForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent form from reloading the page

        const formData = {
            firstName: document.getElementById('popupFirstName').value,
            lastName: document.getElementById('popupLastName').value,
            companyName: document.getElementById('popupCompanyName').value,
            phone: document.getElementById('popupPhone').value,
            email: document.getElementById('popupEmail').value,
        };

        try {
            const response = await fetch('https://3ao7ngabhh.execute-api.us-east-1.amazonaws.com/Production/submit-form', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                popupForm1.style.display = 'none'; // Close the popup
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
 * Module 5: Contact us Form
 *****************************************************/
const contactUsForm = document.getElementById('contactUsForm');

if (contactUsForm) {
    contactUsForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData(this);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            message: formData.get('message'),
        };

        fetch('https://kuccv46swe.execute-api.us-east-1.amazonaws.com/production/submit-contactUs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
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
}
