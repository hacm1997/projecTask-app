# Project Task App (FrontEnd)

Dashboard for managing projects, tasks, and comments

## Technologies Used

- **Next.js**: Framework for developing React applications.
- **TypeScript**: A superset of JavaScript that enhances development experience with static typing.
- **Tailwind CSS**: A CSS design framework.
- **React Icons**: A collection of React Icons.
- **Axios**: For API requests.

## Project Structure

The folder structure of the project is as follows:

📁 root/

├── 📁 components/ # Reusable components

├── 📁 envs/ # Contains the necessary environment variables

├── 📁 hooks/ # Custom hooks (e.g., useFavorites, useMovies)

├── 📁 app/ # Main pages (e.g., Home, Favorites)

├── 📁 services/ # Module for making API requests

├── 📁 middlewares/ # For protected routes

├── 📁 context/ # To maintain the logged-in user information across the app

## Installation and Setup

Follow these steps to install and run the project on your local machine:

1. **Clone the repository**:

   git clone https://github.com/LeonardoGomezz/movies_app.git

2. **Enter the directory**:

   cd movies_app

3. **Install the dependencies**:

   npm install

4. **Start the development server**:

   npm run dev

## Features

- **Login**: Login implementation.
- **User Registration**: To register a user, use the postman collections located in the postman folder at the root of the repository (create a user with 'admin' role and another with 'team member' role).
- **Create Projects**: Form to create projects (admin only).
- **Delete Projects**: Administrators can delete projects.
- **Add collaborators to projects**: Administrators can add collaborators.
- **Add Tasks**: Users can add tasks.
- **Delete Tasks**: Users can delete tasks.
- **Update Tasks**: Users can update tasks.
- **Assign Tasks**: Admin users can assign tasks.
- **Search Tasks**: Users can search for tasks by name.
- **Add Comments**: Users can add comments to tasks.

## Custom Hooks

To keep the code organized and reusable, two custom hooks have been created.

## Validations

- **Search Validation**
- **User Role Validations**
- **Form Validations**
