const app = require("./app")
const db = require("./database")
const setup = require('./libs/initSetup')

// MONGO ATLAS
// monolegaltest@gmail.com
// monolegal123

const server = app.listen(app.get("port"));
console.log("Server on port", app.get('port'));

module.exports = {app, server }