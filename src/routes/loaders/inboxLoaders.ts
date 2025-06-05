import { databases, Query } from '@/lib/appwrite';
import { getUserId } from '@/lib/utils';
import type { LoaderFunction } from 'react-router';

const APPWRITE_DATABASES_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const APPWRITE_DATABASES_TASKS_ID = import.meta.env.VITE_APPWRITE_TASKS_ID;

const getTasks = async () => {
  try {
    return await databases.listDocuments(
      APPWRITE_DATABASES_ID,
      APPWRITE_DATABASES_TASKS_ID,
      [
        Query.equal('completed', false),
        Query.isNull('project'),
        Query.equal('userId', getUserId()),
      ],
    );
  } catch (err) {
    console.log();
    throw new Error('Error getting inbox tasks');
  }
};
const inboxTaskLoader: LoaderFunction = async () => {
  const tasks = await getTasks();
  return { tasks };
};

export default inboxTaskLoader;
