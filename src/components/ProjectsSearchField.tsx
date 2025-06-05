import { cn } from '@/lib/utils';
import { Loader2, Search } from 'lucide-react';
import { Input } from './ui/input';

export type SearchingState = 'idle' | 'loading' | 'searching';

type ProjectsSearchFieldProps = {
  handleChange?: React.ChangeEventHandler<HTMLInputElement>;
  searchingState: SearchingState;
};

const ProjectsSearchField: React.FC<ProjectsSearchFieldProps> = ({
  handleChange,
  searchingState,
}) => {
  return (
    <div className='relative'>
      <Search
        size={18}
        className='absolute top-1/2 -translate-y-1/2 left-2 text-muted-foreground pointer-events-none'
      />
      <Input
        type='text'
        name='q'
        className='px-8'
        placeholder='Search projects'
        onChange={handleChange}
      />
      <Loader2
        size={18}
        className={cn(
          'absolute top-2 right-2 text-muted-foreground pointer-events-none hidden',
          searchingState !== 'idle' && 'block animate-spin',
        )}
      />
    </div>
  );
};

export default ProjectsSearchField;
