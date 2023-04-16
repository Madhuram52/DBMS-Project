document.getElementById('login-link').addEventListener('click', function () {
  document.getElementById('signup-form').style.display = 'none';
  document.getElementById('login-form').style.display = 'block';
});

document.getElementById('signup-link').addEventListener('click', function () {
  document.getElementById('signup-form').style.display = 'block';
  document.getElementById('login-form').style.display = 'none';
});

document.getElementById('signup-form').addEventListener('submit', function (event) {
  event.preventDefault();

  // Get form values
  var staffId = document.getElementById('staff-id').value;
  var name = document.getElementById('name').value;
  var phone = document.getElementById('phone').value;
  var password = document.getElementById('password').value;


  // Perform sign up logic here
  // Example: Send form data to server for validation and storage
  var formData = new FormData();
  formData.append('staffId', staffId);
  formData.append('name', name);
  formData.append('phone', phone);
  formData.append('password', password);

  // Send form data to server for validation and storage
  fetch('/signup', {
    method: 'POST',
    body: formData
  })


  // Reset form
  document.getElementById('staff-id').value = '';
  document.getElementById('name').value = '';
  document.getElementById('phone').value = '';
  document.getElementById('password').value = '';

  // Show login form
  document.getElementById('signup-form').style.display = 'none';
  document.getElementById('login-form').style.display = 'block';
});

document.getElementById('login-form').addEventListener('submit', function (event) {
  event.preventDefault();

  // Get form values
  var staffId = document.getElementById('login-staff-id').value;
  var password = document.getElementById('login-password').value;

  // Perform login logic here
  // Example: Send form data to server for validation and authentication

  // Reset form
  document.getElementById('login-staff-id').value = '';
  document.getElementById('login-password').value = '';

  // Redirect to dashboard on successful login
  window.location.href = 'home.html';
});
