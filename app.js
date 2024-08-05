const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;

//  connection
const db = require('./models');
db.sequelize.sync(); 

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//  files
app.use(express.static(path.join(__dirname, '../public')));

// View 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); // Updated from 'jade' to 'pug'

// Routes
const indexRouter = require('./routes/index');
const employeeRouter = require('./routes/employee');
const assetRouter = require('./routes/asset');
const assetCategoryRouter = require('./routes/assetCategory');

app.use('/', indexRouter);
app.use('/employees', employeeRouter);
app.use('/assets', assetRouter);
app.use('/asset-categories', assetCategoryRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
