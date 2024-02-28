import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Regions - Update By Id', () => {
  it('updates region successfully with id', async () => {
    const response1 = await testServer
      .put('/api/v1/region/65ddf014e9032e08525dedfb')
      .send({
        name: 'Novo nome',
      });

    expect(response1.status).toBe(StatusCodes.OK);
  });

  it('fails at updating region with invalid id', async () => {
    const response2 = await testServer
      .put('/api/v1/region/65ddf014e9032e08525dedf')
      .send({
        name: 'Novo nome',
      });

    expect(response2.status).toBe(StatusCodes.BAD_REQUEST);
  });

  it('fails at updating region with invalid field format', async () => {
    const response3 = await testServer
      .put('/api/v1/region/65ddf014e9032e08525dedfb')
      .send({
        name: [],
      });

    console.log(response3);

    expect(response3.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });
});
