const app = require("./app")
const db = require("./database")
const setup = require('./initSetup')

// MONGO ATLAS
// monolegaltest@gmail.com
// monolegal123
app.listen(app.get("port"));

console.log("Server on port", app.get('port'));