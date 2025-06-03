import { databases, Query } from '@/lib/appwrite';
import { getUserId } from '@/lib/utils';
import { startOfToday } from 'date-fns';
import type { LoaderFunction } from 'react-router';

const APPWRITE_DATABASES_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const APPWRITE_DATABASES_TASKS_ID = import.meta.env.VITE_APPWRITE_TASKS_ID;

const getTasks = async () => {
  try {
    console.log(APPWRITE_DATABASES_ID, APPWRITE_DATABASES_TASKS_ID);

    return await databases.listDocuments(
      APPWRITE_DATABASES_ID,
      APPWRITE_DATABASES_TASKS_ID,
      [
        Query.equal('completed', false),
        Query.isNotNull('due_date'),
        Query.greaterThanEqual('due_date', startOfToday().toISOString()),
        Query.orderAsc('due_date'),
        Query.equal('userId', getUserId()),
      ],
    );
  } catch (err) {
    console.log();
    throw new Error('Error getting upcoming tasks');
  }
};

const upcomingTaskLoader: LoaderFunction = async () => {
  const tasks = await getTasks();
  return { tasks };
};

export default upcomingTaskLoader;
