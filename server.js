const app = require('./app.js')
require('dotenv').config();

// console.log(`PORT:::`, process.env.PORT);
const PORT = process.env.PORT || 5000;
app.listen( PORT , () => {
    console.log('Server running at ${PORT}');
})
