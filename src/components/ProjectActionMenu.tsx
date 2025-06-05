import type { Project } from '@/types';
import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { Edit } from 'lucide-react';
import ProjectFormDialog from './ProjectFormDialog';
import ProjectDeleteButton from './ProjectDeleteButton';

interface ProjectActionMenuProps extends DropdownMenuContentProps {
  defaultFormData?: Project;
}

const ProjectActionMenu: React.FC<ProjectActionMenuProps> = ({
  children,
  defaultFormData,
  ...props
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent {...props}>
        <DropdownMenuItem asChild>
          <ProjectFormDialog
            method='PUT'
            defaultFormData={defaultFormData}
          >
            <Button
              variant='ghost'
              size='sm'
              className='w-full justify-start px-2'
            >
              <Edit /> Edit
            </Button>
          </ProjectFormDialog>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <ProjectDeleteButton defaultFormData={defaultFormData} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProjectActionMenu;
