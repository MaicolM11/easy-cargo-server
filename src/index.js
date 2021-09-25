const app = require("./app")
const db = require("./database")
const setup = require('./libs/initSetup')
const morgan = require('morgan')

app.use(morgan('dev'))

// MONGO ATLAS
// monolegaltest@gmail.com
// monolegal123

app.get('/', (req, res)=>{
    res.json({
        
    })  
})

app.listen(app.get("port"));
console.log("Server on port", app.get('port'));