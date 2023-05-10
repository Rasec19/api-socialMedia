import request from 'supertest';
import Server from '../model/server';
import supertest from 'supertest';
import { generarJWT } from '../helpers';

describe('Pruebas en usuario', () => {

  const server = new Server();

  test('debe autenticar a un usuario y repsonder con status 200', async () => {
    const usuarioValidar = {
      correo: 'rasec.camacho19@gmail.com',
      contraseña: '123456'
    };

    const { status, text } = await request(server.app)
      .post('/api/auth/login')
      .send(usuarioValidar);

    expect(status).toBe(200);
    // expect(response.body).toMatchObject(nuevoUsuario);
  });

  test('debe crear un nuevo usuario y repsonder con status 201', async () => {

    const token = await generarJWT('6459da00ba8bc6737157048d');

    const nuevoUsuario = {
      nombre: 'test',
      contraseña: '12345678',
      correo: 'test@test.com',
      rol:'USER'
    };

    const { statusCode } = await supertest(server.app).post("/api/usuarios")
                      .set('x-token', `${token}`)
                      .send(nuevoUsuario);

    expect(statusCode).toBe(201);
    // expect(response.body).toMatchObject(nuevoUsuario);
  });

  

});