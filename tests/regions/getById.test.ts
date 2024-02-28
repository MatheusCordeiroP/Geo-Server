import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Regions - Get By Id', () => {
  it('gets region successfully with id', async () => {
    const response1 = await testServer
      .get('/api/v1/region/65ddf014e9032e08525dedfb')
      .send();

    expect(response1.status).toBe(StatusCodes.OK);
  });

  it('fails at getting region with invalid id', async () => {
    const response2 = await testServer
      .get('/api/v1/region/65ddf014e9032e08525dedf')
      .send();

    expect(response2.status).toBe(StatusCodes.BAD_REQUEST);
  });
});
