import { UsersService } from './user';

const port = 4000; // TODO - Get the port from env variable
const usersService = new UsersService(port);

usersService.run();
// usersService(port).catch(err => console.error(err));