import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Regions - Create', () => {
  it('creates region successfully', async () => {
    const response1 = await testServer.post('/api/v1/region/create').send({
      name: 'Cidade de São Paulo',
      region: {
        type: 'Polygon',
        coordinates: [
          [
            [0.0, 1.0],
            [1.0, 1.0],
            [0.0, 0.0],
            [0.0, 1.0],
          ],
        ],
      },
      created_by: '65ddef39e9032e08525dedf5',
    });
    expect(response1.statusCode).toBe(StatusCodes.CREATED);
    expect(response1.body._id).toMatch(/^[0-9a-fA-F]{24}$/);
  });

  it('fails at creating region with missing attributes.', async () => {
    const missingName = {
      region: {
        type: 'Polygon',
        coordinates: [
          [
            [0.0, 1.0],
            [1.0, 1.0],
            [0.0, 0.0],
            [0.0, 1.0],
          ],
        ],
      },
      created_by: '65ddef39e9032e08525dedf5',
    };
    const missingRegion = {
      name: 'Cidade de São Paulo',
      created_by: '65ddef39e9032e08525dedf5',
    };
    const missingCreatedBy = {
      name: 'Cidade de São Paulo',
      region: {
        type: 'Polygon',
        coordinates: [
          [
            [0.0, 1.0],
            [1.0, 1.0],
            [0.0, 0.0],
            [0.0, 1.0],
          ],
        ],
      },
    };

    const responseMissingName = await testServer
      .post('/api/v1/region/create')
      .send(missingName);
    const responseMissingRegion = await testServer
      .post('/api/v1/region/create')
      .send(missingRegion);
    const responseMissingCreatedBy = await testServer
      .post('/api/v1/region/create')
      .send(missingCreatedBy);

    expect(responseMissingName.status).toBe(StatusCodes.BAD_REQUEST);
    expect(responseMissingRegion.status).toBe(StatusCodes.BAD_REQUEST);
    expect(responseMissingCreatedBy.status).toBe(StatusCodes.BAD_REQUEST);
  });

  it('fails at creating region with incorrect values.', async () => {
    const objectName = {
      name: { name: '' },
      region: {
        type: 'Polygon',
        coordinates: [
          [
            [0.0, 1.0],
            [1.0, 1.0],
            [0.0, 0.0],
            [0.0, 1.0],
          ],
        ],
      },
      created_by: '65ddef39e9032e08525dedf5',
    };
    const numberName = {
      name: 151595,
      region: {
        type: 'Polygon',
        coordinates: [
          [
            [0.0, 1.0],
            [1.0, 1.0],
            [0.0, 0.0],
            [0.0, 1.0],
          ],
        ],
      },
      created_by: '65ddef39e9032e08525dedf5',
    };
    const voidObjectRegion = {
      name: 'Cidade de São Paulo',
      region: {},
      created_by: '65ddef39e9032e08525dedf5',
    };
    const voidArrayRegion = {
      name: 'Cidade de São Paulo',
      region: [],
      created_by: '65ddef39e9032e08525dedf5',
    };
    const numberRegion = {
      name: 'Cidade de São Paulo',
      region: 5.55,
      created_by: '65ddef39e9032e08525dedf5',
    };
    const stringRegion = {
      name: 'Cidade de São Paulo',
      region: `{ type: 'Polygon', coordinates:[[[0.0, 1.0],[1.0, 1.0],[0.0, 0.0],[0.0, 1.0],],],}`,
      created_by: '65ddef39e9032e08525dedf5',
    };
    const wrongIdFormat = {
      name: 'Cidade de São Paulo',
      region: {
        type: 'Polygon',
        coordinates: [
          [
            [0.0, 1.0],
            [1.0, 1.0],
            [0.0, 0.0],
            [0.0, 1.0],
          ],
        ],
      },
      created_by: '65ddef39e9032e08525dedf',
    };
    const numberId = {
      name: 'Cidade de São Paulo',
      region: {
        type: 'Polygon',
        coordinates: [
          [
            [0.0, 1.0],
            [1.0, 1.0],
            [0.0, 0.0],
            [0.0, 1.0],
          ],
        ],
      },
      created_by: 1,
    };

    const responseObjectName = await testServer
      .post('/api/v1/region/create')
      .send(objectName);
    const responseNumberName = await testServer
      .post('/api/v1/region/create')
      .send(numberName);
    const responseVoidObjectRegion = await testServer
      .post('/api/v1/region/create')
      .send(voidObjectRegion);
    const responseVoidArrayRegion = await testServer
      .post('/api/v1/region/create')
      .send(voidArrayRegion);
    const responseNumberRegion = await testServer
      .post('/api/v1/region/create')
      .send(numberRegion);
    const responseStringRegion = await testServer
      .post('/api/v1/region/create')
      .send(stringRegion);
    const responseWrongIdFormat = await testServer
      .post('/api/v1/region/create')
      .send(wrongIdFormat);
    const responseNumberId = await testServer
      .post('/api/v1/region/create')
      .send(numberId);

    expect(responseObjectName.status).toBe(StatusCodes.BAD_REQUEST);
    expect(responseNumberName.status).toBe(StatusCodes.BAD_REQUEST);
    expect(responseVoidObjectRegion.status).toBe(StatusCodes.BAD_REQUEST);
    expect(responseVoidArrayRegion.status).toBe(StatusCodes.BAD_REQUEST);
    expect(responseNumberRegion.status).toBe(StatusCodes.BAD_REQUEST);
    expect(responseStringRegion.status).toBe(StatusCodes.BAD_REQUEST);
    expect(responseWrongIdFormat.status).toBe(StatusCodes.BAD_REQUEST);
    expect(responseNumberId.status).toBe(StatusCodes.BAD_REQUEST);
  });
});
