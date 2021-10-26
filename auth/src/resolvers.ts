import db from './db';

const Query = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  user(parent: unknown, args: { id: string }, context: unknown, info: unknown): unknown {
    return db.users.find(user => user.id === args.id);
  },
};

export default {
  Query,
};
