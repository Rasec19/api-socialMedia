import request from 'supertest';
import Server from '../model/server';
import supertest from 'supertest';
import { generarJWT } from '../helpers';

describe('Prueba en productos', () => {

  const server = new Server();

  test('debe crear un nuevo producto y repsonder con status 201', async () => {

    const token = await generarJWT('6459da00ba8bc6737157048d');

    const nuevoProducto = {
      nombre: 'testProductoCreat',
      precio: 100,
      descripcion: 'testing create',
      usuario: '6459da00ba8bc6737157048d'
    };

    const { statusCode } = await supertest(server.app).post("/api/productos")
                      .set('x-token', `${token}`)
                      .send(nuevoProducto);

    expect(statusCode).toBe(201);
  });

  test('debe obtener todos los productos y repsonder con status 200', async () => {
  
    const response = await request(server.app)
      .get('/api/productos')
      .send();

    expect(response.status).toBe(200);
  });
  
  test('debe obtener un producto por su id y repsonder con status 200', async () => {

    const idProducto = "6459eee984e561aea5b9f2e9";
  
    const response = await request(server.app)
      .get(`/api/productos/${idProducto}`)
      .send();

    expect(response.status).toBe(200);
  });

  test('debe actualizar un producto por su id y repsonder con status 200', async () => {

    const idUsuario = "6459da00ba8bc6737157048d";
    const token = await generarJWT(idUsuario);

    const idProducto = '645c28a4051749ef3a2d1d6f';

    const updateProducto = {
      nombre: "testingUpdated",
      descripcion: "testing updated function",
    };
  
    const { statusCode } = await supertest(server.app).put(`/api/productos/${idProducto}`)
                      .set('x-token', `${token}`)
                      .send(updateProducto);

    expect(statusCode).toBe(200);
  });
  
  test('debe eliminar un producto por su id y repsonder con status 200', async () => {

    const idUsuario = "6459da00ba8bc6737157048d";
    const token = await generarJWT(idUsuario);

    const idProducto = '645c28a4051749ef3a2d1d6f';
  
    const { statusCode } = await supertest(server.app).delete(`/api/productos/${idProducto}`)
                      .set('x-token', `${token}`)
                      .send();

    expect(statusCode).toBe(200);
  });

});