import 'babel-polyfill'
const supertest = require('supertest')
const {app, server} = require('../index')
const mongoose = require('mongoose')

const api = supertest(app)

let transporter_token;
let provider_token;
let offer;

test('guardar un transportador', async () => {
    const response = await api.post('/auth/register')
    .send({
        username:"driver", 
        email:"driver@gmail", 
        password:"123", 
        rol: "CONVEYOR",
        vehicle_type: "TRUCK", 
        loading_capacity: 1000,
        description: "Camionero de 80 años ",
        cc: 90000
    })
    expect(response.status).toBe(201)
})

test('guardar un proveedor', async () => {
    const response = await api.post('/auth/register')
    .send({
        username:"proveedor", 
        email:"prov@gmail", 
        password:"123", 
        rol: "PROVIDER",
        nit: "678enjkwueiro",
        company_name: "Argos",
        company_address: "Cra 1 Florida",
        description: "Empresa productora de cemento"
    })
    expect(response.status).toBe(201)
})

test('generar token de autenticacion proveedor', async() => {
    const res = await api.post('/auth/login')
        .send({email: "prov@gmail", password:"123", });
    provider_token = res.body.token; // save the token!
})

test('generar token de autenticacion transportador', async() => {
    const res = await api.post('/auth/login')
        .send({email: "driver@gmail", password:"123", });
    transporter_token = res.body.token; // save the token!
})

test('crear una 0ferta con credenciales', async () => {
    const response = await api.post('/offer')
    .set('x-access-token', provider_token)
    .send({
        username:"proveedor", 
        email:"prov@gmail", 
        password:"123", 
        rol: "PROVIDER",
        nit: "678enjkwueiro",
        company_name: "Argos",
        company_address: "Cra 1 Florida",
        description: "Empresa productora de cemento"
    })
    expect(response.status).toBe(201)
})

test('Aceptar una oferta', async () => {
    const response = await api.post('/offer/')
    .set('x-access-token', provider_token)
    .send({
        username:"proveedor", 
        email:"prov@gmail"
    })
    expect(response.status).toBe(201)
})

afterAll(async ()=>{
    mongoose.connection.collections['users'].drop()
    await mongoose.disconnect();
    await server.close()
})