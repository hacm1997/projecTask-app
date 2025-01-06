export interface ProjectModel {
  _id: string;
  name: string;
  description: string;
  owner: string;
  collaborators: string[];
  tasks: string[];
  createdAt: string;
  updatedAt: string;
}
