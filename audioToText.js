const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

const OPENAI_API_KEY = 'my_key';
// add file name here
const filePath = path.join(__dirname, 'audio.mp3');
const model = 'whisper-1';

const formData = new FormData();
formData.append('model', model);
formData.append('file', fs.createReadStream(filePath));

axios
  .post('https://api.openai.com/v1/audio/transcriptions', formData, {
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
    },
  })
  .then((response) => {
    const outputFile = path.join(__dirname, 'responseJustText.txt');
    fs.writeFileSync(outputFile, JSON.stringify(response.data, null, 2)); // Запис в файл в форматі JSON
    console.log('Response saved to responseJustText.txt');
  })
  .catch((error) => {
    console.error('Error saving response:', error);
  });

//   audio must have name 'audio.mp3'. to start - use command node audioToText.js in terminal
