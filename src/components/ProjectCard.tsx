import type { Models } from 'appwrite';
import { Hash, MoreHorizontal } from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router';
import ProjectActionMenu from './ProjectActionMenu';

type ProjectCardProps = {
  project: Models.Document;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className='group/card relative h-14 flex items-center gap-3 px-2 rounded-lg hover:bg-secondary'>
      <Hash
        size={16}
        color={project.color_hex}
        className='shrink-0'
      />
      <p className='text-sm truncate max-w-[48ch]'>{project.name}</p>
      {/* Action menu */}
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
          className='relative shrink-0 z-20 ms-auto opacity-0 group-hover/card:opacity-100 max-md:opacity-100'
          aria-label='More actions'
        >
          <MoreHorizontal />
        </Button>
      </ProjectActionMenu>
      <Link
        to={`/app/projects/${project.$id}`}
        className='absolute inset-0 z-10'
      />
    </div>
  );
};

export default ProjectCard;
