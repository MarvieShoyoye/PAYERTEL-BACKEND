import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { join, resolve } from 'path';
import User from '../../models/userModel.js';
import { connectDB } from '../../config/db.js';

// Load environment variables
config({ path: './config.env' });

// Resolve paths
const rootDir = resolve();
const usersPath = join(rootDir, 'dev-data', 'data', 'users.json');

// Read and parse data
const users = JSON.parse(readFileSync(usersPath, 'utf-8'));

/**
 * Import data into the database.
 */
const importData = async () => {
  try {
    await User.create(users, { validateBeforeSave: false });
    console.log('Data successfully loaded');
  } catch (error) {
    console.error('Error loading data:', error);
  } finally {
    process.exit();
  }
};

/**
 * Delete all data from the database.
 */
const deleteData = async () => {
  try {
    await User.deleteMany();
    console.log('Data successfully deleted');
  } catch (error) {
    console.error('Error deleting data:', error);
  } finally {
    process.exit();
  }
};

// Connect to the database
connectDB();

// Switch based on command line arguments
const action = process.argv[2];
switch (action) {
  case '--import':
    importData();
    break;
  case '--delete':
    deleteData();
    break;
  default:
    console.error(
      'Invalid option. Use --import to import data or --delete to delete data.'
    );
    process.exit(1);
}
