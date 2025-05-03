![ICollabNest Screenshot](https://i.ibb.co.com/CKZF2bX3/Screenshot-2025-05-03-212033.jpg)

# CollabNest

**CollabNest** is a highly efficient and interactive workspace designed to help teams collaborate seamlessly in real time. Built with a modern tech stack, CollabNest brings together task management, chat, file sharing, and more—enabling teams to stay connected and productive.

---

## 📑 Table of Contents

* [Project Goal](#project-goal)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Installation](#installation)
* [Usage](#usage)
* [Configuration](#configuration)
* [Examples](#examples)
* [Troubleshooting](#troubleshooting)
* [Contributors](#contributors)
* [License](#license)

---

## 🚀 Project Goal

CollabNest aims to provide a real-time collaboration platform with seamless communication, role-based access, and productivity tools. It enhances teamwork by minimizing communication gaps and streamlining daily operations.

---

## ✨ Features

### 🔧 Core Functionalities

#### ✅ Task Management (Imtiaz)

* Create, assign, and manage tasks with priorities and deadlines.
* Track task progress: To-Do, In Progress, Completed.
* Real-time updates and notifications on task status.

#### 🔐 Role-Based Access Control (Imtiaz)

* Roles: Admin, Group Leader, Member.
* Admins and Group Leaders have full access; Members have limited permissions.
* JWT-based authentication and role-based authorization.

#### 🔍 Search & Filtering (Chrabon)

* Search across messages, files, and tasks.
* Filter by user, date, and type.
* Auto-suggestions and real-time updates via WebSockets.

#### 🖼️ Real-Time Image Sharing (Chrabon)

* Share images in messages or tasks instantly.
* Includes previews, downloads, and notifications.

#### 📣 @Mentions Feature (APU)

* Tag team members using `@username` in messages.
* Notifies mentioned users in real-time.

#### 🔔 Real-Time Notifications (APU)

* Toast and badge notifications for new messages or task activity.

#### 💬 Comments and Reactions (Srity)

* Comment on tasks and add reactions (like/dislike).
* Real-time sync of comments and reactions.

#### 📌 Pin a Task (Imtiaz)

* Pin important tasks for quick access.
* Pinned tasks are updated in real-time.

#### 🗨️ Chat: 1:1 and Group (Srity)

* Supports real-time private and group messaging.
* Stores messages with metadata (sender, time).

#### 🎨 Theme Toggle & Profile Features (Srity)

* Light/Dark mode switch.
* Profile update (name, bio).
* Custom status (Available, Busy, etc.) with live updates.

---

## 🛠️ Tech Stack

* **Frontend**: React.js
* **Backend**: Express.js (TypeScript)
* **Database**: MongoDB
* **Real-Time Communication**: Socket.IO
* **Authentication**: JWT
* **Notifications**: react-toastify, custom WebSocket events

---

## 📥 Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-org/collabnest.git
   cd collabnest
   ```

2. **Install dependencies:**

   ```bash
   # Frontend
   cd client
   npm install

   # Backend
   cd ../server
   npm install
   ```

3. **Set environment variables:**

   * Create `.env` files in both `client/` and `server/` directories.
   * Include MongoDB URI, JWT secret, and WebSocket URL as needed.

4. **Run the application:**

   ```bash
   # Backend
   cd server
   npm run dev

   # Frontend (in another terminal)
   cd client
   npm start
   ```

---

## 🧪 Usage

* Access the app at `http://localhost:3000`.
* Register or login.
* Create teams, assign roles, and start collaborating.
* Use chat, task boards, file sharing, and more—all in real time.

---

## ⚙️ Configuration

| Variable        | Description                  | Location      |
| --------------- | ---------------------------- | ------------- |
| `MONGO_URI`     | MongoDB connection string    | `server/.env` |
| `JWT_SECRET`    | Secret key for JWT auth      | `server/.env` |
| `SOCKET_URL`    | URL for WebSocket connection | `client/.env` |
| `REACT_APP_API` | Base URL of backend API      | `client/.env` |

---

## 📸 Examples

* Assign a task → User gets notified in real time.
* Mention a teammate in chat → Notification and direct link to message.
* Upload an image in task → Instant preview appears for all participants.

---

## 🧩 Troubleshooting

* **WebSocket not connecting?**

  * Ensure correct `SOCKET_URL` is set in `.env`.

* **Tasks not updating in real-time?**

  * Check Socket.IO server and client-side connection logs.

* **Permission denied errors?**

  * Verify user roles and token expiration.

---

## 👥 Contributors

* **Imtiaz** — Task Management, Role Access, Task Pinning
* **Chrabon** — Search, Filtering, Real-time Image Sharing
* **APU** — @Mentions, Notification System
* **Srity** — Chat, Reactions, UI Preferences

---

live URL.

- Click here to watch [live site](https://team-management-tool.firebaseapp.com/)
