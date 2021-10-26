import { gql, request } from 'graphql-request';

import { UsersService } from './user';

const port = 4000;
const USERS_SERVICE_URL = `http://localhost:${port}`;

describe('user service queries', () => {
  let usersService: UsersService;

  beforeAll(() => {
    usersService = new UsersService(port);
    usersService.run();
  });

  it('validates the user query', async () => {
    const userId = '447';
    const query = gql`{
      user(id: "${userId}") {
        username
        id
      }
    }`;
    const res = await request(`${USERS_SERVICE_URL}/graphql`, query);
    expect(res.id === userId);
  });

  afterAll(() => {
    usersService.stop();
  });
});