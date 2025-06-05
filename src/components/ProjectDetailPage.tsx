import type { Models } from 'appwrite';
import { useState } from 'react';
import { useFetcher, useLoaderData } from 'react-router';
import Head from './Head';
import TopAppBar from './TopAppBar';
import { Page, PageHeader, PageList, PageTitle } from './Page';
import { Button } from './ui/button';
import { MoreHorizontal } from 'lucide-react';
import ProjectActionMenu from './ProjectActionMenu';
import TaskCard from './TaskCard';
import TaskCardSkeleton from './TaskCardSkeleton';
import TaskCreateButton from './TaskCreateButton';
import TaskEmpty from './TaskEmpty';
import TaskFormF from './TaskForm';

const ProjectDetailPage = () => {
  const fetcher = useFetcher();

  const { project } = useLoaderData<{ project: Models.Document }>();
  const projectTasks = project.tasks.filter(
    (i: Models.Document) => !i.completed,
  ) as Models.Document[];
  projectTasks.sort((a, b) => {
    return a.due_date < b.due_date ? -1 : 1;
  });
  const [taskFormShow, setTaskFormShow] = useState<boolean>(false);

  return (
    <>
      <Head title={project.name + ' - Tasky AI'} />
      <TopAppBar title={project.name} />
      <Page>
        <PageHeader>
          <div className='flex items-center gap-2'>
            <PageTitle>{project.name}</PageTitle>
            <ProjectActionMenu
              defaultFormData={{
                id: project.$id,
                name: project.name,
                color_name: project.color_name,
                color_hex: project.color_hex,
              }}
            >
              <Button
                variant='ghost'
                size='icon'
                className='w-8 h-8 shrink-0'
                aria-label='More actions'
              >
                <MoreHorizontal />
              </Button>
            </ProjectActionMenu>
          </div>
        </PageHeader>
        <PageList>
          {projectTasks.map(({ $id, content, completed, due_date }) => (
            <TaskCard
              key={$id}
              id={$id}
              content={content}
              completed={completed}
              dueDate={due_date}
              project={project}
            />
          ))}
          {fetcher.state !== 'idle' && <TaskCardSkeleton />}
          {!taskFormShow && (
            <TaskCreateButton onClick={() => setTaskFormShow(true)} />
          )}
          {!projectTasks.length && !taskFormShow && (
            <TaskEmpty type='project' />
          )}
          {taskFormShow && (
            <TaskFormF
              className='mt-1'
              mode='create'
              onCancel={() => setTaskFormShow(false)}
              defaultFormData={{
                content: '',
                due_date: null,
                project: project.$id,
              }}
              onSubmit={(FormData) => {
                fetcher.submit(JSON.stringify(FormData), {
                  action: '/app',
                  method: 'POST',
                  encType: 'application/json',
                });
              }}
            />
          )}
        </PageList>
      </Page>
    </>
  );
};

export default ProjectDetailPage;
