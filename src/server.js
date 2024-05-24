const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON request body
app.use(express.json());

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle the form submission
app.post('/update-json', (req, res) => {
  const updatedJSON = req.body;

  // Read the existing JSON file
  fs.readFile('./cypress/fixtures/passenger_data.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).send('Error reading file');
      return;
    }

    // Update the JSON data
    const jsonData = JSON.parse(data);
    jsonData.USERNAME = updatedJSON.USERNAME;
    jsonData.PASSWORD = updatedJSON.PASSWORD;
    jsonData.AUTO_CAPTCHA = updatedJSON.AUTO_CAPTCHA;
    jsonData.TRAIN_NO = updatedJSON.TRAIN_NO;
    jsonData.TRAIN_COACH = updatedJSON.TRAIN_COACH;
    jsonData.TRAVEL_DATE = updatedJSON.TRAVEL_DATE;
    jsonData.SOURCE_STATION = updatedJSON.SOURCE_STATION;
    jsonData.DESTINATION_STATION = updatedJSON.DESTINATION_STATION;
    jsonData.TATKAL = updatedJSON.TATKAL;
    jsonData.PREMIUM_TATKAL = updatedJSON.PREMIUM_TATKAL;
    jsonData.UPI_ID_CONFIG = updatedJSON.UPI_ID_CONFIG;
    jsonData.PASSENGER_DETAILS = updatedJSON.PASSENGER_DETAILS;
    jsonData.CONTACT = updatedJSON.CONTACT;
    jsonData.CONTACT_EMAIL = updatedJSON.CONTACT_EMAIL;

    // Write the updated JSON back to the file
    fs.writeFile('./cypress/fixtures/passenger_data.json', JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        console.error('Error writing file:', err);
        res.status(500).send('Error writing file');
        return;
      }

      console.log('JSON file updated successfully');
      res.status(200).send('JSON file updated successfully');
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});