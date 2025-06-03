import { useState } from 'react';
import ProjectForm from './ProjectForm';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';

import type { Project } from '@/types';
import { useFetcher } from 'react-router';

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
            await fetcher.submit(JSON.stringify(data), {
              action: '/app/projects',
              method: method,
              encType: 'application/json',
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProjectFormDialog;
