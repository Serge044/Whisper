const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

const OPENAI_API_KEY = 'my_key';
// add file name here
const filePath = path.join(__dirname, 'audio.mp3');
const model = 'whisper-1';
const response_format = 'srt';

const formData = new FormData();
formData.append('model', model);
formData.append('response_format', response_format);
formData.append('file', fs.createReadStream(filePath));

axios
  .post('https://api.openai.com/v1/audio/transcriptions', formData, {
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
    },
  })
  .then((response) => {
    const outputFile = path.join(__dirname, 'responseWithTimestamps.srt');
    // Перевіряємо формат відповіді і перетворюємо у строку, якщо потрібно
    const responseData =
      typeof response.data === 'string'
        ? response.data
        : JSON.stringify(response.data);
    fs.writeFileSync(outputFile, responseData);
    console.log(
      'Transcription with timestamps saved to responseWithTimestamps.srt'
    );
  })
  .catch((error) => {
    console.error('Error saving transcription:', error);
  });

//   audio must have name 'audio.mp3'. to start - use command node audioToTextWithTimestamps.js in terminal
