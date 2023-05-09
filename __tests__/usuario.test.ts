import request from 'supertest';
import Server from '../model/server';

describe('Pruebas en usuario', () => {

  const server = new Server();

  test('debe crear un nuevo usuario y repsonder con status 201', async () => {
    const nuevoUsuario = {
      nombre: 'John Doe',
      correo: 'johndoe@example.com',
      contraseña: 'contraseña123'
    };

    const response = await request(server.app)
      .post('/api/usuarios')
      .send(nuevoUsuario);

    expect(response.status).toBe(201);
    // expect(response.body).toMatchObject(nuevoUsuario);
  });

});