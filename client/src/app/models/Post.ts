import User from './User';
import Comment from './Comment';

interface Post {
  _id: string;
  title?: string;
  body?: string;
  user?: User;
  date?: string;
  comments?: Comment[];
}

export default Post;
