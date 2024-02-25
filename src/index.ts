import 'dotenv/config';
import './database';
import server from './server/server';

const port = process.env.PORT || 3003;

server.listen(port, () => {
  console.log(`Server started on port ${port} at ${new Date()}`);
});
