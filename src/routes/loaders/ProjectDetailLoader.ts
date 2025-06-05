import { databases } from '@/lib/appwrite';
import { getUserId } from '@/lib/utils';
import { LoaderFunction } from 'react-router';

const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const APPWRITE_PROJECTS_ID = import.meta.env.VITE_APPWRITE_PROJECTS_ID;

const getProject = async (projectId: string) => {
  try {
    const project = await databases.getDocument(
      APPWRITE_DATABASE_ID,
      APPWRITE_PROJECTS_ID,
      projectId,
    );
    if (project.userId !== getUserId()) {
      throw new Error('You do not have permission to access this project.');
    }
    return project;
  } catch (error) {
    console.log(`Error fetching project with ID ${projectId}:`, error);
    if (error instanceof Error) {
      throw new Response(error.message);
    }
    throw new Error('An unexpected error occurred while fetching the project.');
  }
};

const projectDetailLoader: LoaderFunction = async ({ params }) => {
  const { projectId } = params as { projectId: string };
  const project = await getProject(projectId);
  return { project }
};

export default projectDetailLoader;
