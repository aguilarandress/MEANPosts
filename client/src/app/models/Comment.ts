import User from './User';

export default interface Comment {
  text?: string;
  _id: string;
  user?: User;
  date?: string;
}
