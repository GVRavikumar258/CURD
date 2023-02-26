 // Import necessary modules
const express = require('express');
const mysql = require('mysql');

// Create connection to MySQL database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'contacts_db'
});

// Initialize express app
const app = express();

// Create endpoint to update contact
app.post('/updateContact', (req, res) => {
    const contact_id = req.body.contact_id;
    const new_email = req.body.new_email;
    const new_mobile_number = req.body.new_mobile_number;
    const data_store = req.body.data_store;

    // Check if data_store is CRM or DATABASE
    if (data_store === 'CRM') {
        // Make API call to FreshSales CRM to update contact
        // Code to make API call goes here
        res.send('Contact updated in CRM');
    } else if (data_store === 'DATABASE') {
        // Update contact in MySQL database
        const sql = `UPDATE contacts SET email='${new_email}', mobile_number='${new_mobile_number}' WHERE id='${contact_id}'`;
        connection.query(sql, (error, results) => {
            if (error) {
                res.send(error);
            } else {
                res.send('Contact updated in database');
            }
        });
    } else {
        res.send('Invalid data_store value');
    }
});

// Create endpoint to delete contact
app.post('/deleteContact', (req, res) => {
    const contact_id = req.body.contact_id;
    const data_store = req.body.data_store;

    // Check if data_store is CRM or DATABASE
    if (data_store === 'CRM') {
        // Make API call to FreshSales CRM to delete contact
        // Code to make API call goes here
        res.send('Contact deleted from CRM');
    } else if (data_store === 'DATABASE') {
        // Delete contact from MySQL database
        const sql = `DELETE FROM contacts WHERE id='${contact_id}'`;
        connection.query(sql, (error, results) => {
            if (error) {
                res.send(error);
            } else {
                res.send('Contact deleted from database');
            }
        });
    } else {
        res.send('Invalid data_store value');
    }
});

// Start server on port 3000
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
