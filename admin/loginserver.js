const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Destination folder for storing files
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

mongoose.connect('mongodb://localhost:27017/LoginDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const userSchema = new mongoose.Schema({
    name: String,
    regd: String,
    mobile: Number,
    email: String,
    password: String,
    securityQuestion: String,
    securityAnswer: String,
    cgpa: Number, // Add CGPA field
    profileImage: String,
});

const User = mongoose.model('User', userSchema);

const resultsSchema = new mongoose.Schema({
    regd: String, // Registration number to link with User collection
    CGPA: Number,
});

const Results = mongoose.model('Results', resultsSchema);

// Register route
app.post('/register', upload.single('image'), (req, res) => {
    const userData = req.body;

    // Assuming you have a public URL where uploaded images are accessible
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    // Add the image URL to the userData
    userData.profileImage = imageUrl;

    const newUser = new User(userData);
    newUser.save((err, user) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error', message: err.message });
        } else {
            console.log('User registered and stored in the database:', user._id);

            // Move the uploaded file to the 'uploads' folder
            if (req.file) {
                const targetPath = path.join(__dirname, 'uploads', req.file.filename);
                fs.rename(req.file.path, targetPath, (err) => {
                    if (err) {
                        console.error(err);
                        res.status(500).json({ error: 'Internal Server Error', message: 'Error moving file to destination' });
                    } else {
                        console.log('Image moved to uploads folder');
                        res.status(200).json({ message: 'User registered successfully', user });
                    }
                });
            } else {
                res.status(200).json({ message: 'User registered successfully', user });
            }
        }
    });
});

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email }, (err, user) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error', message: err.message });
        } else {
            if (user) {
                if (password === user.password) {
                    // Return user details along with the success message
                    res.status(200).json({ message: 'Login successful', user });
                } else {
                    res.status(401).json({ error: 'Unauthorized', message: 'Invalid password' });
                }
            } else {
                res.status(404).json({ error: 'Not Found', message: 'User not found' });
            }
        }
    });
});


app.get('/checkDuplicateDetails', async (req, res) => {
    const { email, regd, mobile } = req.query;

    try {
        const existingUserEmail = await User.findOne({ email });
        const existingUserRegd = await User.findOne({ regd });
        const existingUserMobile = await User.findOne({ mobile });

        const duplicateDetails = {
            email: existingUserEmail !== null,
            regd: existingUserRegd !== null,
            mobile: existingUserMobile !== null,
        };

        res.status(200).json(duplicateDetails);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
});
// Add a new route to fetch user details by email
app.post('/getUserDetails', (req, res) => {
    const { email } = req.body;

    User.findOne({ email }, (err, user) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error', message: err.message });
        } else {
            if (user) {
                // Assuming you have a separate collection for results and it's linked by regd
                Results.findOne({ regd: user.regd }, (err, results) => {
                    if (err) {
                        console.error(err);
                        res.status(500).json({ error: 'Internal Server Error', message: err.message });
                    } else {
                        // If results found, add CGPA to user object
                        if (results) {
                            user.cgpa = results.CGPA;
                        }
                        res.status(200).json({ message: 'User details retrieved successfully', user });
                    }
                });
            } else {
                res.status(404).json({ error: 'Not Found', message: 'User not found' });
            }
        }
    });
});

app.post('/forgetPassword', (req, res) => {
    const { email, securityQuestion, securityAnswer, newPassword } = req.body;

    User.findOne({ email, securityQuestion, securityAnswer }, (err, user) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error', message: err.message });
        } else {
            if (user) {
                // Verify credentials
                if (!newPassword) {
                    res.status(200).json({ message: 'Credentials verified successfully' });
                } else {
                    // Update the password only if new password and confirm password match
                    if (user.password !== newPassword) {
                        user.password = newPassword;
                        user.save((err, updatedUser) => {
                            if (err) {
                                console.error(err);
                                res.status(500).json({ error: 'Internal Server Error', message: err.message });
                            } else {
                                res.status(200).json({ message: 'Password updated successfully' });
                            }
                        });
                    } else {
                        res.status(200).json({ message: 'No changes in the password' });
                    }
                }
            } else {
                res.status(401).json({ error: 'Unauthorized', message: 'Invalid credentials' });
            }
        }
    });
});

app.listen(PORT, () => {
    console.log(`Combined Server is running on http://localhost:${PORT}`);
});
