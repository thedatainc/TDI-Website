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
 * Module 3: POP-UP Contact-us form with Bitrix CRM Form
 *****************************************************/
const popupForm1 = document.getElementById('popupForm1');
const contactUsBtns1 = document.querySelectorAll('.learn-more-btn'); // Buttons for the popup
const closePopupBtn1 = document.getElementById('closePopupForm1');
const bitrixFormContainer = document.getElementById('bitrixFormContainer');

// Open the popup when "Book a Call" buttons are clicked
contactUsBtns1.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default behavior
        popupForm1.style.display = 'flex'; // Show the popup

        // Load Bitrix form only if it's not already loaded
        if (!bitrixFormContainer.innerHTML.trim()) {
            loadBitrixForm();
        }
    });
});

// Close the popup when the "X" button is clicked
closePopupBtn1.addEventListener('click', () => {
    closePopup();
});

// Close the popup when clicking outside of the form
window.addEventListener('click', (event) => {
    if (event.target === popupForm1) {
        closePopup();
    }
});

// Function to load the Bitrix form script dynamically
function loadBitrixForm() {
    const script = document.createElement('script');
    script.setAttribute('data-b24-form', 'inline/2/7my8zz');
    script.setAttribute('data-skip-moving', 'true');
    script.async = true;
    script.src = 'https://cdn.bitrix24.com/b32396671/crm/form/loader_2.js?' + (Date.now() / 180000 | 0);
    bitrixFormContainer.appendChild(script);
}

// Listen for the Bitrix form submission and hide the popup after submission
window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'b24-form-submit') {
        setTimeout(() => {
            closePopup();
        }, 3000); // Close popup 3 seconds after submission
    }
});

// Function to close the popup
function closePopup() {
    popupForm1.style.display = 'none'; // Hide the popup
}



  
/*****************************************************
 * Module 3: POP-UP Contact-us form
 *****************************************************/
/*
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
/*
const popupContactForm = document.getElementById('popupContactForm');
const popupHeading = document.getElementById('popupHeading');
const popupSuccessMessage = document.getElementById('popupSuccessMessage');

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
                // Hide the form and show the success message
                popupContactForm.style.display = 'none';
                popupHeading.style.display = 'none';
                popupSuccessMessage.style.display = 'block';

                // Wait for 2-3 seconds, then close the popup
                setTimeout(() => {
                    popupForm1.style.display = 'none'; // Close the popup
                    // Reset the form and UI for next time
                    popupContactForm.reset();
                    popupContactForm.style.display = 'block';
                    popupHeading.style.display = 'block';
                    popupSuccessMessage.style.display = 'none';
                }, 3000); // 3-second delay
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
