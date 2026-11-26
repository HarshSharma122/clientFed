# ClientFed

**Manage client projects, share deliverables, collect feedback, and keep everything organized in one place.**

ClientFed is a project management platform I'm building for freelance developers and small agencies to manage their client projects more efficiently.

The goal is to make communication between freelancers and clients easier by bringing project milestones, deliverables, feedback, and approvals together in one place.

## Why ClientFed?

I wanted to build a project that solves a real-world problem while improving my software development skills.

Client communication can become difficult to manage when project updates, files, feedback, and change requests are scattered across different platforms.

ClientFed aims to provide one organized space where freelancers can manage their projects and clients can stay updated on the progress.

## Features

### Completed

- Custom user authentication.
- User registration and login.
- Protected routes and authentication checks.
- Add new clients.
- View and manage the client list.
- Store client details, including name, email, company name, website, and phone number.
- send invitation link to client so that client can add to their project
<img width="1407" height="825" alt="Screenshot 2026-11-26 145524" src="https://github.com/user-attachments/assets/3d47cc50-8b44-4b80-9eea-5d6d1642f5ae" />


- Track client status (Active / Archived).



## Screenshots

### Add Client for first time

Add a new client by providing their contact and company information.
<img width="1138" height="857" alt="Screenshot 2026-11-26 145340" src="https://github.com/user-attachments/assets/0803cece-8345-4516-9767-0626fcd73578" />



### Connect with a client you've already worked with.

just add email and automatically client added to project


<img width="1020" height="616" alt="Screenshot 2026-11-26 145412" src="https://github.com/user-attachments/assets/903e8371-6440-469f-b57b-2a9b488fa8ff" />


### Client List

View and manage all added clients, including their contact details, company information, and status.

<img width="1502" height="664" alt="clientlist" src="https://github.com/user-attachments/assets/7bce62ae-dcb8-4eda-8088-894e67f74e35" />


## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | Frontend and application framework |
| MongoDB | Database |
| Custom Authentication | User authentication and authorization |

## Getting Started

Follow these steps to run ClientFed locally.

### 1. Clone the repository

```bash
git clone https://github.com/HarshSharma122/clientfed.git
```

### 2. Navigate to the project

```bash
cd clientfed
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the root directory.

```env
MONGODB_URI=your_mongodb_connection_string
secret_token=your_jwt_secret
FRONTEND_URL = https://
```

Add any other environment variables required by your implementation.

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:5900](http://localhost:5900) in your browser.

## Project Status

**Currently in Development**

Authentication and client management features are implemented. I'm currently working on the remaining modules.

ClientFed is being built from scratch using my own development skills. I'll continue adding features and improving the platform as development progresses.

## Connect

**Developer:** Harsh Sharma

- GitHub: [HarshSharma122](https://github.com/HarshSharma122)
- Project Repository: [ClientFed](https://github.com/HarshSharma122/clientfed)

---

*Built with curiosity, consistency, and a desire to solve real-world problems.*
