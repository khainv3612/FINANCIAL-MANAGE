import {Role} from './Role';

export class User {
  id: number;
  username?: string;
  password?: string;
  email?: string;
  roles?: Role[];
  token?: string;
}
