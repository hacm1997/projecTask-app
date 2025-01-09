import { SetStateAction } from "react";

export interface ProjectModalProps {
  showModal: boolean;
  setShowModal?: React.Dispatch<SetStateAction<boolean>>;
  closeModal: () => void;
}

export interface TaskModalProps {
  showModal: boolean;
  setShowModal?: React.Dispatch<SetStateAction<boolean>>;
  closeModal: () => void;
  projectId: string;
  taskId?: string;
}

export interface TaskDetailModalProps {
  showModal: boolean;
  setShowModal?: React.Dispatch<SetStateAction<boolean>>;
  setTaskId: React.Dispatch<SetStateAction<string>>;
  closeModal: () => void;
  taskId: string;
  projectId: string;
}

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

export interface TaskModel {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  status: "in-progress" | "completed" | "pending";
  project: string;
  assignedTo: string;
  collaborators: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TaskFormModel {
  title: string;
  description: string;
  dueDate: string;
  project: string;
  assignedTo: string;
  status: "todo" | "in-progress" | "completed" | "all";
  collaborators?: CollaboratorType[];
}

export interface CollaboratorType {
  _id: string;
  name: string;
}

export interface UserModel {
  _id: string;
  name: string;
  user_name: string;
  email: string;
  role: "team member" | "admin";
  reputationPoints: number;
}

export interface CommentModel {
  _id: string;
  content: string;
  task: string;
  author: string;
  user_name: string;
  createdAt: string;
  updatedAt: string;
}
