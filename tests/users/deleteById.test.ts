import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Users - Delete By Id', () => {
  it('deletes user successfully with id', async () => {
    const response1 = await testServer
      .delete('/api/v1/user/65ddf014e9032e08525dedfb')
      .send();

    expect(response1.statusCode).toBe(StatusCodes.OK);
  });

  it('fails at deleting user with invalid id', async () => {
    const response2 = await testServer
      .delete('/api/v1/user/65ddf014e9032e08525dedf')
      .send();

    expect(response2.status).toBe(StatusCodes.BAD_REQUEST);
  });
});
