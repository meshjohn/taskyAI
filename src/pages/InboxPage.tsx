import Head from '@/components/Head';
import { Page, PageHeader, PageList, PageTitle } from '@/components/Page';
import TaskCreateButton from '@/components/TaskCreateButton';
import TaskEmpty from '@/components/TaskEmpty';
import TaskFormF from '@/components/TaskForm';
import TopAppBar from '@/components/TopAppBar';
import { useState } from 'react';
import { useFetcher, useLoaderData } from 'react-router';

import type { Models } from 'appwrite';
import TaskCard from '@/components/TaskCard';
import TaskCardSkeleton from '@/components/TaskCardSkeleton';

const InboxPage = () => {
  const fetcher = useFetcher();
  const { tasks } = useLoaderData<{
    tasks: Models.DocumentList<Models.Document>;
  }>();

  const [taskFormShow, setTaskFormShow] = useState(false);
  return (
    <>
      <Head title='Inbox - Tasky AI' />
      <TopAppBar
        title='Inbox'
      />
      <Page>
        <PageHeader>
          <PageTitle>Inbox</PageTitle>
        </PageHeader>
        <PageList>

          {tasks.documents.map(
            ({ $id, content, completed, due_date, project }) => (
              <TaskCard
                key={$id}
                id={$id}
                content={content}
                completed={completed}
                dueDate={due_date}
                project={project}
              />
            ),
          )}

          {fetcher.state !== 'idle' && <TaskCardSkeleton />}

          {!taskFormShow && (
            <TaskCreateButton onClick={() => setTaskFormShow(true)} />
          )}

          {!tasks.total && !taskFormShow && <TaskEmpty type='inbox' />}

          {taskFormShow && (
            <TaskFormF
              className='mt-1'
              mode='create'
              onCancel={() => setTaskFormShow(false)}
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

export default InboxPage;
