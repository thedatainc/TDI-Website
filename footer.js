document.addEventListener("DOMContentLoaded", function() {
    const footerTitles = document.querySelectorAll('.footer-title');

    footerTitles.forEach(title => {
        title.addEventListener('click', function() {
            const links = this.nextElementSibling;  // The UL containing links
            links.classList.toggle('hidden');  // Toggle visibility of links

            const icon = this.querySelector('.toggle-icon');  // Toggle the icon
            icon.textContent = icon.textContent === '+' ? '-' : '+';
        });
    });
});
