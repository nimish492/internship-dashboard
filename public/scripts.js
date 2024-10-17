document.addEventListener("DOMContentLoaded", function () {
    const exportOverlay = document.getElementById("exportOverlay");
    const exportButton1 = document.querySelectorAll(".export-button1");
    const exportButton2 = document.querySelectorAll(".export-button2");
    const closeExportOverlay = document.getElementById("closeExportOverlay");

    // Show export overlay on export button click
    exportButton1.forEach(button => {
        button.addEventListener("click", function () {
            exportOverlay.style.display = "flex";
        });
    });

    // Close export overlay
    closeExportOverlay.addEventListener("click", function () {
        exportOverlay.style.display = "none";
    });


    exportButton2.forEach(button => {
        button.addEventListener("click", function () {
            exportOverlay.style.display = "flex";
        });
    });

    // Close export overlay
    closeExportOverlay.addEventListener("click", function () {
        exportOverlay.style.display = "none";
    });



    function downloadPDF() {
        const element = document.querySelector('.statement');
        html2pdf().from(element).save('Report.pdf');
    }


    // Function to generate PDF from table content using html2pdf.js
    function generatePDF() {
        const element = document.querySelector('.statement');
        html2pdf().from(element).toPdf().output('datauristring').then(function (pdfData) {
            sendEmailWithPDF(pdfData);
        });
    }

    // Function to send email with PDF attachment via backend
    function sendEmailWithPDF(pdfData) {
        console.log('Sending email with PDF attachment...');

        fetch('/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                pdfData: pdfData,
                to: 'puyadav566@gmail.com',  // Replace with actual recipient email
                subject: 'Account Statement',
                text: 'Here is the attachment of your requested Account Statement. Happy Banking!',
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Email sent successfully:', data);
                alert('Email sent successfully!');
            })
            .catch(error => {
                console.error('Email sending failed:', error);
                alert('Failed to send email. Please try again.');
            });
    }


    // Event listener for the download PDF button
    document.querySelector('.center-btn-download').addEventListener('click', function (event) {
        event.preventDefault();
        downloadPDF();
    });

    // Event listener for the Send PDF button
    document.querySelector('.center-btn-email').addEventListener('click', function (event) {
        event.preventDefault();
        generatePDF();
    });

    // Select all tab buttons
    const tabButtons = document.querySelectorAll('.tab-button, .tab-button-active');

    // Select statement containers
    const statementContainer1 = document.querySelector('.statement-container1');
    const statementContainer3 = document.querySelector('.statement-container3');

    // Add click event listener to each tab button
    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Check if clicked button is from the first set
            const isActiveSet1 = this.classList.contains('tab-button');

            // Show/hide statement containers based on clicked button
            if (isActiveSet1) {
                statementContainer1.style.display = 'block';
                statementContainer3.style.display = 'none';
            } else {
                statementContainer1.style.display = 'none';
                statementContainer3.style.display = 'block';
            }

            // Remove 'active' class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active', 'clicked'));

            // Add 'active' class to the clicked button
            this.classList.add('active', 'clicked');
        });
    });

    // Simulate click on the default tab button (.tab-button)
    const defaultTabButton = document.querySelector('.tab-button');
    if (defaultTabButton) {
        defaultTabButton.click(); // Simulate click
    }

    const dropdownMenus = document.querySelectorAll('.dropdown-menu');
    const selectedYearButton = document.getElementById('selectedYear');

    // Set default year to 2024
    selectedYearButton.textContent = '2024'; // Update button text with default year

    // Add click event listener to each dropdown menu item
    dropdownMenus.forEach(menu => {
        menu.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default link behavior

            const selectedYear = this.getAttribute('data-year');
            selectedYearButton.textContent = selectedYear; // Update button text with selected year
        });
    });


    const dropdownMenu = document.querySelectorAll('.dropdown-menu2');
    const selectedYearButton2 = document.getElementById('selectedYear2');

    // Set default year to 2024
    selectedYearButton2.textContent = '2024'; // Update button text with default year

    // Add click event listener to each dropdown menu item
    dropdownMenu.forEach(menu => {
        menu.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default link behavior

            const selectedYear2 = this.getAttribute('data-year');
            selectedYearButton2.textContent = selectedYear2; // Update button text with selected year
        });
    });

    const loggedInUser = "User's Name"; // Replace with actual user's name
    const welcomeUserElement = document.querySelector('.welcome-user');
    if (welcomeUserElement) {
        welcomeUserElement.textContent = `Welcome ${loggedInUser}`;
    }
});
