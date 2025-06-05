import { getUserId } from '@/lib/utils';
import { LoaderFunction, redirect } from 'react-router';
import { databases, Query } from '@/lib/appwrite';
import { Models } from 'appwrite';
import { startOfToday, startOfTomorrow } from 'date-fns';

const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const APPWRITE_TASKS_ID = import.meta.env.VITE_APPWRITE_TASKS_ID;
const APPWRITE_PROJECTS_ID = import.meta.env.VITE_APPWRITE_PROJECTS_ID;

type TaskCounts = {
  inboxTasks: number;
  todayTasks: number;
};

export type AppLoaderData = {
  projects: Models.DocumentList<Models.Document>;
  taskCounts: TaskCounts;
};

const getProjects = async () => {
  try {
    return await databases.listDocuments(
      APPWRITE_DATABASE_ID,
      APPWRITE_PROJECTS_ID,
      [
        Query.select(['$id', 'name', 'color_name', 'color_hex', '$createdAt']),
        Query.orderDesc('$createdAt'),
        Query.limit(100),
        Query.equal('userId', getUserId()),
      ],
    );
  } catch (error) {
    console.log('Error fetching projects:', error);
    throw new Error('Failed to fetch projects');
  }
};

const getTasksCounts = async () => {
  const taskCounts: TaskCounts = {
    inboxTasks: 0,
    todayTasks: 0,
  };
  try {
    const { total: totalInboxTasks } = await databases.listDocuments(
      APPWRITE_DATABASE_ID,
      APPWRITE_TASKS_ID,
      [
        Query.select(['$id']),
        Query.isNull('project'),
        Query.equal('completed', false),
        Query.limit(1),
        Query.equal('userId', getUserId()),
      ],
    );
    taskCounts.inboxTasks = totalInboxTasks;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch task counts');
  }

  try {
    const { total: totalTodayTasks } = await databases.listDocuments(
      APPWRITE_DATABASE_ID,
      APPWRITE_TASKS_ID,
      [
        Query.select(['$id']),
        Query.and([
          Query.greaterThanEqual('due_date', startOfToday().toISOString()),
          Query.lessThan('due_date', startOfTomorrow().toISOString()),
        ]),
        Query.equal('completed', false),
        Query.limit(1),
        Query.equal('userId', getUserId()),
      ],
    );
    taskCounts.todayTasks = totalTodayTasks;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch task counts');
  }
  return taskCounts;
};

const appLoader: LoaderFunction = async () => {
  const userId = getUserId();
  if (!userId) return redirect('/login');
  const projects = await getProjects();
  const taskCounts = await getTasksCounts();
  return { projects, taskCounts };
};
export default appLoader;
