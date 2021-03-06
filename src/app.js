const express = require("express")
const cors = require("cors")
const app = express();
const morgan = require('morgan')

// Settings
app.set("port", process.env.PORT || 3000);
app.use(express.json()); 

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// test
app.get("/", (req, res) => {
    res.json({
      message: "API is working"
    });
});

// Routes
app.use('/offer',require('./routes/offer.routes'));
app.use('/user',require('./routes/user.routes'));
app.use('/auth',require('./routes/auth.routes'));

module.exports = app;  