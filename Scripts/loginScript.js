async function login() {
    // Get the user's email and password from the login form.
    const email = document.querySelector('#login-form input[name="email"]').value;
    const password = document.querySelector('#login-form input[name="password"]').value;

    // Make a POST request to the backend API to authenticate the user.
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    // If the request is successful, get the JWT token from the response.
    if (response.ok) {
      const token = await response.json();

      // Store the JWT token in local storage.
      localStorage.setItem('jwt', token);

      // Redirect the user to the protected page.
      window.location.href = '/protected';
    } else {
      // Handle the error.
      alert('Login failed!');
    }
  }

  // Submit the login form.
  document.querySelector('#login-form').addEventListener('submit', login);