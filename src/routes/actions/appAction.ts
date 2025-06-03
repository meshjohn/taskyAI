import type { ActionFunction } from 'react-router';
import type { Task } from '@/types';
import { databases } from '@/lib/appwrite';
import { generateID, getUserId } from '@/lib/utils';

const APPWTRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const APPWRITE_DATABASES_TASKS_ID = import.meta.env.VITE_APPWRITE_TASKS_ID;

const createTask = async (data: Task) => {
  try {
    return await databases.createDocument(
      APPWTRITE_DATABASE_ID,
      APPWRITE_DATABASES_TASKS_ID,
      generateID(),
      { ...data, userId: getUserId() },
    );
  } catch (err) {
    console.log(err);
  }
};

const updateTask = async (data: Task) => {
  const documentId = data.id;
  if (!documentId) throw new Error('Task id not found.');
  delete data.id;
  try {
    return await databases.updateDocument(
      APPWTRITE_DATABASE_ID,
      APPWRITE_DATABASES_TASKS_ID,
      documentId,
      data,
    );
  } catch (err) {}
};

const deleteTask = async (data: Task) => {
  const documentId = data.id;
  if (!documentId) throw new Error('Task id not found.');
  try {
    return await databases.deleteDocument(
      APPWTRITE_DATABASE_ID,
      APPWRITE_DATABASES_TASKS_ID,
      documentId,
    );
  } catch (err) {}
};

const appAction: ActionFunction = async ({ request }) => {
  const data = (await request.json()) as Task;
  if (request.method === 'POST') {
    return await createTask(data);
  }
  if (request.method === 'PUT') {
    return await updateTask(data);
  }
  if (request.method === 'DELETE') {
    return await deleteTask(data);
  }
};

export default appAction;