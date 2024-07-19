const axios = require('axios');
const fs = require('fs');
const path = require('path');

// URL of your deployed JSON server
const url = 'https://palfu-api.onrender.com/api/list';

// Path to your local db.json file
const dbFilePath = path.join(__dirname, 'db.json');

async function updateLocalDb() {
  try {
    // Fetch data from JSON server
    const response = await axios.get(url);
    const listData = response.data;

    // Read the current local db.json
    const dbData = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));

    // Update the list data in the local db.json
    dbData.list = listData;

    // Write the updated db.json back to the file
    fs.writeFileSync(dbFilePath, JSON.stringify(dbData, null, 2));

    console.log('Local db.json updated successfully!');
  } catch (error) {
    console.error('Failed to update local db.json:', error);
  }
}

updateLocalDb();