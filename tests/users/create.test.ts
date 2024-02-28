import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Users - Create', () => {
  it('creates user successfully with coordinates', async () => {
    const response1 = await testServer.post('/api/v1/user/create').send({
      name: 'Matheus Cordeiro',
      email: 'matheus@gmail.com',
      coordinates: [-23, -41],
    });
    expect(response1.statusCode).toBe(StatusCodes.CREATED);
    expect(response1.body._id).toMatch(/^[0-9a-fA-F]{24}$/);
  });

  it('creates user successfully with address', async () => {
    const response1 = await testServer.post('/api/v1/user/create').send({
      name: 'Matheus Cordeiro',
      email: 'matheus@gmail.com',
      address: 'mocked address',
    });
    expect(response1.statusCode).toBe(StatusCodes.CREATED);
    expect(response1.body._id).toMatch(/^[0-9a-fA-F]{24}$/);
  });

  it('fails at creating user with both address and coordinates', async () => {
    const bothAddressCoordinates = {
      name: 'Matheus Cordeiro',
      email: 'matheus@gmail.com',
      coordinates: [-23, -41],
      address: 'mocked address',
    };

    const responseBothAddressCoordinates = await testServer
      .post('/api/v1/user/create')
      .send(bothAddressCoordinates);

    expect(responseBothAddressCoordinates.status).toBe(StatusCodes.BAD_REQUEST);
  });

  it('fails at creating user with missing attributes.', async () => {
    const missingName = {
      email: 'matheus@gmail.com',
      coordinates: [-23, -41],
    };
    const missingEmail = {
      name: 'Matheus Cordeiro',
      coordinates: [-23, -41],
    };
    const missingBothAddressCoordinates = {
      name: 'Matheus Cordeiro',
      email: 'matheus@gmail.com',
    };

    const responseMissingName = await testServer
      .post('/api/v1/user/create')
      .send(missingName);
    const responseMissingEmail = await testServer
      .post('/api/v1/user/create')
      .send(missingEmail);
    const responseMissingBothAddressCoordinates = await testServer
      .post('/api/v1/user/create')
      .send(missingBothAddressCoordinates);

    expect(responseMissingName.status).toBe(StatusCodes.BAD_REQUEST);
    expect(responseMissingEmail.status).toBe(StatusCodes.BAD_REQUEST);
    expect(responseMissingBothAddressCoordinates.status).toBe(
      StatusCodes.BAD_REQUEST
    );
  });
});
