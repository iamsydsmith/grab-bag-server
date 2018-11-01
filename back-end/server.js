    // set up ========================
    var express  = require('express');
    var app      = express();
    var mongoose = require('mongoose');
    var morgan = require('morgan');
    var bodyParser = require('body-parser');
    var methodOverride = require('method-override');
    var db = require('./db');

    // =================================================
    // ROUTES
    // =================================================
    var people        = require('./routes/people');

    // configuration =================


   var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/grab-bag-app'

    mongoose.connect(mongoURI);


    // connect to mongoDB database on modulus.io

    function quit() {
      mongoose.disconnect();
      console.log('All Done!');
    }

    app.use(express.static(__dirname + '/app'));
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({'extended':'true'}));
    app.use(bodyParser.json());
    app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
    app.use(methodOverride());


    app.use('/family', people);

    // listen (start app with node server.js) ======================================

    app.listen(process.env.PORT || 7100);
    console.log("App listening on port 7100");

    module.exports = app;
