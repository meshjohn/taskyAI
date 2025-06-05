import { SidebarProvider } from '@/components/ui/sidebar';
import { Outlet, useLoaderData, useNavigation } from 'react-router';
import AppSidebar from '@/components/AppSidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';

import { AppLoaderData } from '@/routes/loaders/appLoader';
import { ProjectProvider } from '@/contexts/ProjectContext';

const AppLayout = () => {
  const navigation = useNavigation();
  const { projects } = useLoaderData<AppLoaderData>();
  const isLoading = navigation.state === 'loading' && !navigation.formData;
  return (
    <>
      <ProjectProvider projects={projects}>
        <SidebarProvider>
          <TooltipProvider
            delayDuration={500}
            disableHoverableContent
          >
            <AppSidebar />
            <main
              className={cn(
                'flex-1',
                isLoading && 'opacity-50 pointer-events-none',
              )}
            >
              <Outlet />
            </main>
          </TooltipProvider>
        </SidebarProvider>
        <Toaster />
      </ProjectProvider>
    </>
  );
};

export default AppLayout;
