import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Regions - Get All', () => {
  it('gets all users successfully', async () => {
    const response1 = await testServer
      .get('/api/v1/region?limit=10&offset=0')
      .send();

    expect(response1.status).toBe(StatusCodes.OK);
  });

  it('fails at getting all users with invalid limit', async () => {
    const response2 = await testServer
      .get('/api/v1/region?limit=1000&offset=0')
      .send();

    expect(response2.status).toBe(StatusCodes.BAD_REQUEST);
  });
});
