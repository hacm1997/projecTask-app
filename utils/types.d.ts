import { CollaboratorType } from "@/components/utils/types";

export interface ProjectModel {
  _id: string;
  name: string;
  description: string;
  owner: string;
  collaborators: CollaboratorType[];
  tasks: string[];
  createdAt: string;
  updatedAt: string;
}
