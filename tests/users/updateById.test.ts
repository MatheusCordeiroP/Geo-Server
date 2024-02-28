import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Users - Update By Id', () => {
  it('updates user successfully with id', async () => {
    const response1 = await testServer
      .put('/api/v1/user/65ddf014e9032e08525dedfb')
      .send({
        name: 'Novo nome',
      });

    expect(response1.status).toBe(StatusCodes.OK);
  });

  it('fails at updating user with invalid id', async () => {
    const response2 = await testServer
      .put('/api/v1/user/65ddf014e9032e08525dedf')
      .send({
        name: 'Novo nome',
      });

    expect(response2.status).toBe(StatusCodes.BAD_REQUEST);
  });

  it('fails at updating user with invalid field format', async () => {
    const response3 = await testServer
      .put('/api/v1/user/65ddf014e9032e08525dedf')
      .send({
        name: { '0': 51 },
      });

    expect(response3.status).toBe(StatusCodes.BAD_REQUEST);
  });
});
