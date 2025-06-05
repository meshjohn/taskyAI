import { Project } from '@/types';
import React, { useCallback } from 'react';
import { Button } from './ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { Trash2 } from 'lucide-react';
import { truncateString } from '@/lib/utils';
import { useFetcher, useLocation, useNavigate } from 'react-router';
import { toast } from 'sonner';

type ProjectDeleteButtonProps = {
  defaultFormData?: Project;
};

const ProjectDeleteButton: React.FC<ProjectDeleteButtonProps> = ({
  defaultFormData,
}) => {
  const fetcher = useFetcher();
  const location = useLocation();
  const navigate = useNavigate();
  const handleProjectDelete = useCallback(async () => {
    if (location.pathname === `/app/projects/${defaultFormData?.id}`) {
      navigate('/app/inbox');
    }
    toast('Deleting project...', {
      duration: 2000,
    });
    try {
      await fetcher.submit(defaultFormData, {
        action: '/app/projects',
        method: 'DELETE',
        encType: 'application/json',
      });

      toast.success('Project deleted successfully', {
        description: `The project ${truncateString(defaultFormData?.name || '', 32)} has been successfully deleted.`,
        duration: 5000,
      });
    } catch (err) {
      console.log('Error deleting project:', err);
      toast.error('Failed to delete project', {
        description: `An error occurred while trying to delete the project.`,
        duration: 5000,
      });
    }
  }, [defaultFormData]);
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button
          variant='ghost'
          size='sm'
          className='w-full justify-start px-2 !text-destructive'
        >
          <Trash2 /> Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete project?</AlertDialogTitle>
          <AlertDialogDescription>
            The{' '}
            <strong>{truncateString(defaultFormData?.name || '', 48)}</strong>{' '}
            project and all of its tasks will be permantely deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleProjectDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ProjectDeleteButton;
