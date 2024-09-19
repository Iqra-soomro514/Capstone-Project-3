document.getElementById('signupForm')
    .addEventListener('submit', async function (e) {
        e.preventDefault();
        
        // Fetch values from form fields
        const useremail = document.getElementById('signup-useremail').value;
        const password = document.getElementById('signup-password').value;

        // Define the user object
        const user = {
            email: useremail,
            password: password,
        };

        try {
            // Make API request to create the user
            const response = await fetch('https://fakestoreapi.com/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),  // Send user object as JSON
            });

            const data = await response.json();

            // Show success message and redirect
            alert('User created successfully. Now you can log in.');
            window.location.href = "../index.html";
            console.log(data);
        } catch (error) {
            // Show error message
            alert('Error creating user.');
            console.error(error);
        }
    });