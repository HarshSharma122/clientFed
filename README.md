# ClientFed

**Manage client projects, share deliverables, collect feedback, and keep everything organized in one place.**

ClientFed is a project management platform I'm building for freelance developers and small agencies to manage their client projects more efficiently.

The goal is to make communication between freelancers and clients easier by bringing project milestones, deliverables, feedback, and approvals together in one platform.

## Why ClientFed?

While working on different software projects, I wanted to build something that solves a real problem for freelancers and small development teams.

Client communication can become difficult to manage when project updates, files, feedback, and change requests are scattered across different platforms.

ClientFed aims to provide one organized space where freelancers can manage their projects and clients can stay updated on the progress.

## Features

### Implemented
- Custom user authentication.
- User registration and login.
- Authentication and protected routes.

### Planned
- **Project Management:** Create and manage client projects.
- **Client Management:** Add clients and give them access to their projects.
- **Milestone Management:** Create project milestones, share them with clients, and collect feedback.
- **Deliverables Management:** Upload and share project files, links, and completed work.
- **Feedback & Change Requests:** Allow clients to review work and request changes.
- **Client Approvals:** Let clients approve submitted work.
- **Project Dashboard:** Track project progress and activities.

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

Create a `.env` file in the root directory and add the required environment variables.

```env
MONGODB_URI=your_mongodb_connection_string
secret_token = your secret token for JWT
```

Add any other environment variables required by your authentication implementation.

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Status

<ins>Currently in Development</ins>

Authentication is implemented, and I'm actively working on the remaining features.

This project is being developed from scratch as a learning and building experience. I'll continue improving it and adding features as development progresses.

## Connect

**Developer:** Harsh Sharma

- GitHub: [HarshSharma122](https://github.com/HarshSharma122)
- Project Repository: [ClientFed](https://github.com/HarshSharma122/clientFed)

---

*Built with curiosity, consistency, and a desire to solve real-world problems.*