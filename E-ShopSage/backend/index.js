require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8001;
const routerPath = require('./app/routes/Admin/router');
// Set default ADMIN_APP_KEY if not provided
if (!process.env.ADMIN_APP_KEY) {
    process.env.ADMIN_APP_KEY = 'your_super_secret_admin_jwt_key_here_2024';
    console.log('Warning: Using default ADMIN_APP_KEY. Please set ADMIN_APP_KEY in .env file for production.');
}
app.use(cors());
// Parse different content types
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Handle multipart/form-data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routerPath); 

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log('Environment:', process.env.NODE_ENV || 'development');
});
