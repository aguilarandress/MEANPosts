import User from './User';

interface Post {
  _id: string;
  title?: string;
  body?: string;
  user?: User;
  date?: string;
}

export default Post;
