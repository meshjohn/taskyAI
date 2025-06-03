/**
 * How Omit works
 * Omit is a utility type that removes properties from an object 
  type.
 * It takes two argumnets: the object type and the keys to remove.
 * It returns a new object type with the specified keys removed.
 */

import { CirclePlus } from 'lucide-react';
import { Button } from './ui/button';

type TaskCreateButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'className'
>;

const TaskCreateButton: React.FC<TaskCreateButtonProps> = (props) => {
  return (
    <Button
      variant='link'
      className='w-full justify-start mb-4 px-0'
      {...props}
    >
      <CirclePlus /> Add task
    </Button>
  );
};

export default TaskCreateButton;
