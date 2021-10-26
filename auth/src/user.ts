// import { buildFederatedSchema } from '@apollo/federation';
import { ApolloServer, gql } from 'apollo-server';
import fs from 'fs';
import resolvers from './resolvers';

export class UsersService {
  private port: number;
  private server?: ApolloServer;

  constructor(port: number) {
    this.port = port;
  }

  async usersService(port: number): Promise<void> {
    const typeDefs = gql(fs.readFileSync('./src/schema.graphql', { encoding: 'utf8' }));
    this.server = new ApolloServer({
      typeDefs,
      resolvers,
    });
  
    void this.server.listen(port).then(({ url }) => console.log(`Users Service is up and running @ ${url}`));
  }

  run(): void {
    this.usersService(this.port);
  }

  stop(): void {
    this.server?.stop();
  }
}
