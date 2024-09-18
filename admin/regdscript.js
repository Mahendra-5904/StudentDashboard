document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    if (document.getElementById('forget-email') !== null) {
        forgetPassword();
    } else {
        registerUser();
    }
});

function forgetPassword() {
    var email = document.getElementById('forget-email').value;
    var securityQuestion = document.getElementById('form').elements['securityQuestion'].value;
    var securityAnswer = document.getElementById('securityAnswer').value;
    var newPassword = document.getElementById('forget-password').value;
    var confirmNewPassword = document.getElementById('confirm-forget-password').value;

    if (newPassword !== confirmNewPassword) {
        alert("New passwords do not match!");
        return;
    }

    var credentials = {
        email: email,
        securityQuestion: securityQuestion,
        securityAnswer: securityAnswer,
        newPassword: newPassword
    };

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:4000/forgetPassword", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                if (newPassword) {
                    // Password updated successfully
                    alert("Password updated successfully");
                } else {
                    // Credentials verified successfully
                    alert("Credentials verified successfully");
                    // Enable the password fields
                    document.getElementById('forget-password').removeAttribute('disabled');
                    document.getElementById('confirm-forget-password').removeAttribute('disabled');
                }
            } else {
                alert("Password update failed. Please check your credentials.");
            }
        }
    };
    
    xhr.send(JSON.stringify(credentials));
}

function registerUser() {
    var name = document.getElementById('name').value;
    var regd = document.getElementById('regd').value;
    var mobile = document.getElementById('mobile').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    var securityQuestion = document.getElementById('form').elements['securityQuestion'].value;
    var securityAnswer = document.getElementById('securityAnswer').value;

    // Get the image file input element
    var imageInput = document.getElementById('image-upload');
    var imageFile = imageInput.files[0];

    // Check if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Check minimum password length
    if (password.length < 6) {
        alert("Password should be at least 6 characters long!");
        return;
    }

    // Check if any of the details (name, mobile, email, regd) are already registered
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:4000/checkDuplicateDetails?email=" + email + "&regd=" + regd + "&mobile=" + mobile, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var duplicateDetails = JSON.parse(xhr.responseText);

                if (duplicateDetails.email) {
                    alert("Email already used!");
                    return;
                }
                if (duplicateDetails.regd) {
                    alert("Registration number already used!");
                    return;
                }
                if (duplicateDetails.mobile) {
                    alert("Mobile number already used!");
                    return;
                }

                // If no duplicate details and password is valid, proceed with registration
                var formData = new FormData();
                formData.append('name', name);
                formData.append('regd', regd);
                formData.append('mobile', mobile);
                formData.append('email', email);
                formData.append('password', password);
                formData.append('securityQuestion', securityQuestion);
                formData.append('securityAnswer', securityAnswer);
                formData.append('image', imageFile);

                var registerXhr = new XMLHttpRequest();
                registerXhr.open("POST", "http://localhost:4000/register", true);
                registerXhr.onreadystatechange = function () {
                    if (registerXhr.readyState == 4) {
                        alert("Sign up completed!");

                        if (registerXhr.status == 200) {
                            document.getElementById('name').value = '';
                            document.getElementById('regd').value = '';
                            document.getElementById('mobile').value = '';
                            document.getElementById('email').value = '';
                            document.getElementById('password').value = '';
                            document.getElementById('confirmPassword').value = '';
                            document.getElementById('securityAnswer').value = '';
                            document.getElementById('personalInfoTextArea').style.backgroundColor = 'transparent';
                        }
                    }
                };
                registerXhr.send(formData);
            } else {
                alert("Error checking duplicate details.");
            }
        }
    };
    xhr.send();
}

function fetchUserDetails() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:4000/fetchDetails", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var userDetails = JSON.parse(xhr.responseText);
            displayUserDetails(userDetails);
        }
    };
    xhr.send();
}

