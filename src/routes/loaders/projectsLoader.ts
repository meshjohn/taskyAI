import { databases, Query } from '@/lib/appwrite';
import { getUserId } from '@/lib/utils';
import { LoaderFunction } from 'react-router';

const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const APPWRITE_PROJECTS_ID = import.meta.env.VITE_APPWRITE_PROJECTS_ID;

const getProjects = async (query: string) => {
  try {
    return await databases.listDocuments(
      APPWRITE_DATABASE_ID,
      APPWRITE_PROJECTS_ID,
      [
        Query.contains('name', query),
        Query.select(['$id', 'name', 'color_name', 'color_hex', '$createdAt']),
        Query.equal('userId', getUserId()),
        Query.orderDesc('$createdAt'),
      ],
    );
  } catch (error) {
    console.log('Error fetching projects:', error);
    throw new Error('Failed to fetch projects');
  }
};

const projectsLoader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get('q') || '';
  const projects = await getProjects(query);
  return { projects };
};

export default projectsLoader;
