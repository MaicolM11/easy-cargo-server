import 'babel-polyfill'
const supertest = require('supertest')
const {app, server} = require('../index')
const mongoose = require('mongoose')

const api = supertest(app)

test('save user', async () => {
    const response = await api.post('/auth/register')
    .send({
        username:"camione", 
        email:"mai@gmail", 
        password:"123", 
        rol: "PROVIDER",
        vehicle_type: "TRUCK", 
        loading_capacity: 1000,
        description: "Camionero de 80 años ",
        cc: 90000
    })
    expect(response.status).toBe(201)
})

afterAll(async ()=>{
    mongoose.connection.collections['users'].drop()
    await mongoose.disconnect();
    await server.close()
})
