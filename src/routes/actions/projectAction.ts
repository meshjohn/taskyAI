import { generateProjectTasks } from '@/api/googleAi';
import { databases } from '@/lib/appwrite';
import { generateID, getUserId } from '@/lib/utils';
import { ProjectForm } from '@/types';
import { Models } from 'appwrite';
import { redirect, type ActionFunction } from 'react-router';

type aiGenTask = {
  content: string;
  due_date: Date | null;
};

const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const APPWRITE_PROJECTS_ID = import.meta.env.VITE_APPWRITE_PROJECTS_ID;
const APPWRITE_TASKS_ID = import.meta.env.VITE_APPWRITE_TASKS_ID;

const createProject = async (data: ProjectForm) => {
  let project: Models.Document | null = null;
  const aiTaskGen = data.ai_task_gen;
  const taskGenPrompt = data.task_gen_prompt;
  let aiGeneratedTasks: aiGenTask[] = [];
  try {
    project = await databases.createDocument(
      APPWRITE_DATABASE_ID,
      APPWRITE_PROJECTS_ID,
      generateID(),
      {
        name: data.name,
        color_name: data.color_name,
        color_hex: data.color_hex,
        userId: getUserId(),
      },
    );
  } catch (error) {
    console.log('Error creating project:', error);
  }
  if (aiTaskGen) {
    try {
      aiGeneratedTasks = JSON.parse(
        (await generateProjectTasks(taskGenPrompt)) || '',
      );
    } catch (error) {
      console.log('Error generating project tasks:', error);
    }
  }
  if (aiGeneratedTasks.length) {
    const promises = aiGeneratedTasks.map((task) => {
      return databases.createDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_TASKS_ID,
        generateID(),
        {
          ...task,
          project: project?.$id,
          userId: getUserId(),
        },
      );
    });
    try {
      await Promise.all(promises);
    } catch (error) {
      console.log('Error creating AI-generated tasks:', error);
    }
  }
  return redirect(`/app/projects/${project?.$id}`);
};

const projectAction: ActionFunction = async ({ request }) => {
  const method = request.method;
  const data = (await request.json()) as ProjectForm;
  if (method === 'POST') {
    return await createProject(data);
  }
  return null;
};

export default projectAction;
