import { app } from './app';
import { ConnectToDB } from './config/database';

const PORT = 3000;

(async () => {
  try {
    await ConnectToDB();
    console.log('Connected to the database');
  } catch (error) {
    console.error(
      'Error connecting to the database or syncing with Clerk:',
      error,
    );
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
