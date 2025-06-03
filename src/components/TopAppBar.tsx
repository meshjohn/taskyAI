import { useEffect, useState } from 'react';
import Kbd from './Kbd';
import { SidebarTrigger } from './ui/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { cn } from '@/lib/utils';

type TopAppBarProps = {
  title: string;
  taskCount?: number;
};

const TopAppBar: React.FC<TopAppBarProps> = ({ title, taskCount }) => {
  const [showTitle, setShowTitle] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowTitle(window.scrollY > 70);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div
      className={cn(
        'sticky z-40 bg-background top-0 h-14 grid grid-cols-[40px,minmax(0,1fr),40px] items-center px-4',
        showTitle && 'border-b',
      )}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <SidebarTrigger />
        </TooltipTrigger>
        <TooltipContent className='flex items-center'>
          <p>Toggle sidebar</p>
          <Kbd kdbList={['Ctrl', 'B']} />
        </TooltipContent>
      </Tooltip>
      <div
        className={cn(
          'max-w-[480px] max-auto text-center transition-[transform,opacity]',
          showTitle ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0',
        )}
      >
        <h1 className='font-semibold truncate'>{title}</h1>
        {Boolean(taskCount) && (
          <div className='text-xs text-muted-foreground'>{taskCount} tasks</div>
        )}
      </div>
    </div>
  );
};

export default TopAppBar;