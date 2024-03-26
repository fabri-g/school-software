# School Management Software

This project is a school administration software designed for schools to manage rooms/courses. It enables the creation and management of classroom details and student profiles, including assigning students to rooms, tracking their personal information, and identifying sibling relationships. The system features a user-friendly interface, secured with user authentication.

## Features

- **Room Management:** Create and view rooms, including detailed views of rooms. Edit and delete rooms created.
- **Student Management:** Add students to the system, specifying their room, age, gender, and additional information. Edit and delete created students. 
- **Sibling Tracking:** Identify and list siblings enrolled in the school.
- **Authentication:** Add, edit and delete with access control through user authentication.

## Technologies Used
### Backend
- **[Node.js](https://nodejs.org/en):** A JavaScript runtime used for creating the server-side of the application.
### Database
- **[PostgreSQL](https://www.postgresql.org/):** Database used for handling the application's data storage needs.
- **[Sequelize](https://sequelize.org/):** A promise-based Node.js ORM for Postgres,  used to manage database operations.
### Frontend
- **[React.js](https://react.dev/):** JavaScript library for building user interfaces.
- **[Next.js](https://nextjs.org/):** A React framework that enables server-side rendering.
- **CSS:** Used for styling the application's frontend.
### Authentication
- **[React Context](https://react.dev/reference/react/createContext):** Utilized for managing authentication state across the application.

## Getting Started
1. Clone the repository.
2. Install dependencies using ```npm install```.
3. Run the frontend and backend with ```npm start```.
4. Ensure to configure environment variables.


## Repository Structure

### Backend
Brief overview of the backend structure:
- **config:**  Initialize and configure the database.
- **controllers:** Contains controller files that handle client requests by executing corresponding service logic and sending back the responses.
- **middleware:** Includes middleware functions for handling authentication and for centralized error handling.
- **migrations:** Includes files that manage the database schema changes.
- **models:**  Holds the database models defining the structure of the database tables.
- **routes:** Consists of route definitions that associate endpoints with the corresponding controllers.
- **services:** Contains business logic and API calls that are invoked by the controllers.

### Frontend
Brief overview of the frontend structure:
- **components:** Contains reusable UI components
- **context:** Holds the React Context files used for managing global state across the application
- **helpers:** Includes utility functions and helper scripts that provide common functionality across the application
- **pages:** Consists of components that correspond to different routes or screens in the application. 
- **styles:** Contains CSS files for styling the application.
- **public:** Used for static files such as images, icons, and other assets that can be publicly accessed by the browser.

## Authors
- fabrig - [fabri-g](https://github.com/fabri-g)

