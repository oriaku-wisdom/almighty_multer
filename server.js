const express = require('express');
require('dotenv').config()
const PORT = process.env.PORT || 4000;
const sequelize = require('./database/database')
const router= require('./routes/router.js')

const app = express();
app.use(express.json());
 app.use(router);

 

 const DBconnect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
 DBconnect();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
})
