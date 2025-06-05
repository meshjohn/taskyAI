import { useState } from 'react';
import ProjectForm from './ProjectForm';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { toast } from 'sonner';
import type { Project } from '@/types';
import { useFetcher } from 'react-router';
import { truncateString } from '@/lib/utils';

type ProjectFormDialogProps = {
  defaultFormData?: Project;
  children: React.ReactNode;
  method: 'POST' | 'PUT';
};

const ProjectFormDialog = ({
  defaultFormData,
  children,
  method,
}: ProjectFormDialogProps) => {
  const fetcher = useFetcher();
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='p-0 border-0 !rounded-xl'>
        <ProjectForm
          mode={method === 'POST' ? 'create' : 'edit'}
          defaultFormData={defaultFormData}
          onCancel={() => setOpen(false)}
          onSubmit={async (data) => {
            setOpen(false);
            toast(
              `${method === 'POST' ? 'Creating' : 'Updating'} ${truncateString(data.name, 32)}`,
              {
                duration: 2000,
              },
            );
            await fetcher.submit(JSON.stringify(data), {
              action: '/app/projects',
              method: method,
              encType: 'application/json',
            });
            toast.success(
              `Project ${method === 'POST' ? 'created' : 'updated'}.`,
              {
                description: `The project ${truncateString(data.name, 32)} ${data.ai_task_gen ? 'and its tasks' : ''} have been successfully ${method === 'POST' ? 'created' : 'updated'}.`,
                duration: 5000,
              },
            );
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProjectFormDialog;
