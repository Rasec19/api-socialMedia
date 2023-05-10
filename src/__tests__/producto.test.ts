import request from 'supertest';
import Server from '../model/server';

describe('Prueba en productos', () => {

  const server = new Server();

  test('debe crear un nuevo producto y repsonder con status 201', async () => {
    const nuevoProducto = {
      nombre: 'Play Station 4',
      precio: 1100,
      descripcion: 'Es una consola de videojuegos',
      usuario: '6459da00ba8bc6737157048d'
    };

    const response = await request(server.app)
      .post('/api/productos')
      .send(nuevoProducto);

    expect(response.status).toBe(201);
    // expect(response.body).toMatchObject(nuevoProducto);
  });

  test('debe obtener todos los productos y repsonder con status 200', async () => {
  
    const response = await request(server.app)
      .get('/api/productos')
      .send();

    expect(response.status).toBe(200);
  });
  
  test('debe obtener un producto por su id y repsonder con status 200', async () => {

    const id = "6459eee984e561aea5b9f2e9";
  
    const response = await request(server.app)
      .get(`/api/productos/${id}`)
      .send();

    expect(response.status).toBe(200);
  });

  test('debe actualizar un producto por su id y repsonder con status 200', async () => {

    const id = "6459eee984e561aea5b9f2e9";

    const updateProducto = {
      disponible: false,
    };
  
    const response = await request(server.app)
      .put(`/api/productos/${id}`)
      .send( updateProducto );

    expect(response.status).toBe(200);
  });
  
  test('debe eliminar un producto por su id y repsonder con status 200', async () => {

    const id = "6459eee984e561aea5b9f2e9";
  
    const response = await request(server.app)
      .delete(`/api/productos/${id}`)
      .send();

    expect(response.status).toBe(200);
  });

});