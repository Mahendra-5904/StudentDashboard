document.addEventListener('DOMContentLoaded', () => {
    const hamburgerLinks = document.querySelectorAll('.hamburger-menu a');
    hamburgerLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu();

            const href = link.getAttribute('href');

            if (href && href !== '#') {
                window.location.href = href;
            }
        });
    });
});

function toggleMenu() {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    hamburgerMenu.style.display = (hamburgerMenu.style.display === 'block') ? 'none' : 'block';
}

function setProfileImageMenu(profileImageSrc) {
    var profileImageElement3 = document.getElementById('profileImage2');
    if (profileImageElement3) {
        profileImageElement3.src = profileImageSrc;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    var user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        var userNameElement = document.getElementById('user-name');
        if (userNameElement) {
            setProfileImageMenu(user.profileImage);
            userNameElement.innerText = user.name;
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    fetchUserDetails();

    function fetchUserDetails() {
        var user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            fetchUserDetailsByEmail(user.email);
        } else {
            console.error('User information not found in local storage.');
        }
    }

// Function to fetch user details by email
function fetchUserDetailsByEmail(email) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:4000/login', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
                var userDetails = response.user;

                // Display user details in the specified container
                displayUserDetails(userDetails);

                // Set profile image in the hamburger menu
                setProfileImageMenu(userDetails.profileImage);
            } else {
                console.error('Error fetching user details:', xhr.status, xhr.statusText);
            }
        }
    };

    var data = JSON.stringify({ email: email });
    xhr.send(data);
}

    

    // Function to display user details
    function displayUserDetails(userDetails) {
        // Access the container element
        var container = document.getElementById('user-details');

        // Create HTML elements to display user details
        function createParagraph(label, value) {
            var paragraph = document.createElement('p');

            // Apply styles to both label and value
            var strong = document.createElement('strong');
            strong.textContent = label;
            strong.style.color = 'black'; // Set the color to black
            strong.style.fontWeight = 'bold'; // Set the font weight to bold
            paragraph.appendChild(strong);

            // Add a line break
            paragraph.appendChild(document.createElement('br'));

            var span = document.createElement('span');
            span.textContent = value;
            span.style.color = 'black'; // Set the color to black
            paragraph.appendChild(span);
            setProfileImage(userDetails.profileImage);
            return paragraph;
        }

        // Create and append elements to the container
        container.appendChild(createParagraph('Name:', userDetails.name)).style.marginBottom = '15px';
        container.appendChild(createParagraph('Registration Number:', userDetails.regd)).style.marginBottom = '15px';
        container.appendChild(createParagraph('Mobile Number:', userDetails.mobile)).style.marginBottom = '15px';
        container.appendChild(createParagraph('Email:', userDetails.email)).style.marginBottom = '15px';

        // Display CGPA if available
        if (userDetails.cgpa !== undefined) {
            container.appendChild(createParagraph('CGPA:', userDetails.cgpa)).style.marginBottom = '15px';
        } else {
            container.appendChild(createParagraph('CGPA:', 'Not available')).style.marginBottom = '15px';
        }
    }

    function setProfileImage(profileImageSrc) {
        var profileImageElement1 = document.getElementById('profileImage1');
        var profileImageElement2 = document.getElementById('profileImage');

        if (profileImageElement1) {
            profileImageElement1.src = profileImageSrc;
        }

        if (profileImageElement2) {
            profileImageElement2.src = profileImageSrc;
        }
    }

});
