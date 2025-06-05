import { Models } from 'appwrite';
import { createContext, useContext } from 'react';
type ProjectProviderProps = {
  projects: Models.DocumentList<Models.Document>;
  children: React.ReactNode;
};

const ProjectContext =
  createContext<Models.DocumentList<Models.Document> | null>(null);

export const ProjectProvider: React.FC<ProjectProviderProps> = ({
  projects,
  children,
}) => {
  return (
    <ProjectContext.Provider value={projects}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);