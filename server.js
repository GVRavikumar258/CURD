// Import required modules
const express = require('express');
const mysql = require('mysql2');

// Create MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'contactsdb'
});


// Create Express application
const app = express();

// Enable parsing of JSON request body
app.use(express.json());

// Endpoint to create a new contact in CRM or database
app.post('/createContact', (req, res) => {
  const firstName = req.body.first_name;
  const lastName = req.body.last_name;
  const email = req.body.email;
  const mobileNumber = req.body.mobile_number;
  const dataStore = req.body.data_store;

  // Check if required parameters are present
  if (!firstName || !lastName || !email || !mobileNumber || !dataStore) {
    return res.status(400).send('Missing required parameters');
  }

  // Create contact in CRM
  if (dataStore === 'CRM') {
    // TODO: Use FreshSales API to create contact
    return res.send('Contact created in CRM');
  }

  // Create contact in database
  if (dataStore === 'DATABASE') {
    pool.query('INSERT INTO contacts SET ?', {first_name: firstName, last_name: lastName, email: email, mobile_number: mobileNumber}, (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).send('Error creating contact in database');
      }
      console.log(results);
      return res.send('Contact created in database');
    });
  } else {
    return res.status(400).send('Invalid data_store parameter');
  }
});

// Endpoint to retrieve a contact from CRM or database
app.get('/getContact', (req, res) => {
  const contactId = req.body.contact_id;
  const dataStore = req.body.data_store;

  // Check if required parameters are present
  if (!contactId || !dataStore) {
    return res.status(400).send('Missing required parameters');
  }

  // Retrieve contact from CRM
  if (dataStore === 'CRM') {
    // TODO: Use FreshSales API to retrieve contact
    return res.send('Contact retrieved from CRM');
  }

  // Retrieve contact from database
  if (dataStore === 'DATABASE') {
    pool.query('SELECT * FROM contacts WHERE id = ?', [contactId], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).send('Error retrieving contact from database');
      }
      console.log(results);
      if (results.length > 0) {
        return res.send(results[0]);
      } else {
        return res.status(404).send('Contact not found');
      }
    });
  } else {
    return res.status(400).send('Invalid data_store parameter');
  }
});

// Endpoint to update a contact in CRM or database
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
app.listen(5000, () => {
    console.log('Server started on port 5000');
});
  


  