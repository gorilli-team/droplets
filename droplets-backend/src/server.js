const app = require('./app');
require('dotenv').config();
const PORT = process.env.PORT || 3001;

console.log('Starting node server... 🚀');
console.log(process.env.MONGO_URL_NEW);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
