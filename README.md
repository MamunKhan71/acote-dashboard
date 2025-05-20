# Acote Dashboard

Acote Dashboard is a custom Content Management System (CMS) designed for **Acote Group Limited** to manage and update the portfolio website seamlessly. Built with a modern tech stack, Acote Dashboard provides an intuitive interface for non-technical users to create, read, update, and delete portfolio entries, including projects, case studies, and team profiles.

## 🚀 Tech Stack

- **Frontend:** React.js, Tailwind CSS, TypeScript
- **Backend:** Node.js (Express)
- **Database:** MongoDB (Mongoose)
- **Authentication:** JSON Web Tokens (JWT)
- **API Documentation:** Swagger
- **DevOps:** Docker, GitHub Actions CI/CD, Heroku/Vercel deployment

## 📋 Features

- **Authentication & Authorization**  
  - Secure login with JWT-based sessions  
  - Role-based access control (Admin, Editor)

- **Portfolio Management**  
  - Create, edit, delete projects  
  - Rich text editor for project descriptions  
  - Upload and manage media assets (images, videos)

- **Team & Testimonials**  
  - Manage team member profiles (name, role, bio, social links)  
  - Add client testimonials with ratings and comments

- **Settings & Configuration**  
  - Update global site settings (site title, logo, SEO metadata)  
  - Manage navigation menus and footer links

- **Analytics Dashboard**  
  - Real-time site visit stats (powered by Google Analytics)  
  - Content performance overview

## 💾 Installation

### Prerequisites

- Node.js v18.x or later
- MongoDB (local or Atlas)
- Docker (optional)

### Setup

1. **Clone the repository**  
   ```bash
   git clone https://github.com/acote-group/acote-dashboard.git
   cd acote-dashboard
   ```

2. **Install dependencies**  
   ```bash
   # Backend
   cd server && npm install

   # Frontend
   cd ../client && npm install
   ```

3. **Environment variables**  
   - Create a `.env` file in `server/` with the following keys:
     ```env
     MONGODB_URI=your_mongo_uri
     JWT_SECRET=your_jwt_secret
     PORT=4000
     ```

4. **Run development servers**  
   ```bash
   # Run backend
   cd server && npm run dev

   # Run frontend
   cd ../client && npm run dev
   ```
   - Backend: `http://localhost:4000`
   - Frontend: `http://localhost:3000`

## 🏗️ Production Build & Deployment

### Docker

1. Build Docker images:
   ```bash
   docker-compose build
   ```
2. Start containers:
   ```bash
   docker-compose up -d
   ```
3. Dashboard will be available on your defined host/port.

### CI/CD (GitHub Actions)

- On push to `main`, GitHub Actions will:
  1. Run tests for both client and server
  2. Build Docker images
  3. Deploy to Heroku (server) and Vercel (client)

## 📑 API Documentation

- Swagger UI available at `http://localhost:4000/api-docs`
- Endpoints:
  - `POST /auth/login` - Login and receive JWT
  - `GET /projects` - List projects
  - `POST /projects` - Create a new project (admin only)
  - `PUT /projects/:id` - Update project (admin/editor)
  - `DELETE /projects/:id` - Delete project (admin only)
  - ... and more for team, testimonials, settings

## 🔧 Configuration

- **Client**: `client/src/config.js`  
- **Server**: `server/config/default.json` or environment variables

## 🛠️ Scripts

| Location | Command             | Description                          |
| -------- | ------------------- | ------------------------------------ |
| `client` | `npm run dev`       | Start React development server       |
| `client` | `npm run build`     | Build React app for production       |
| `server` | `npm run dev`       | Start Node.js server in dev          |
| `server` | `npm run start`     | Start Node.js server in prod         |
| root     | `docker-compose up` | Start both services with Docker      |

## 🤝 Contributing

1. Fork the repository  
2. Create a feature branch: `git checkout -b feature/your-feature`  
3. Commit your changes: `git commit -m "feat: add your feature"`  
4. Push to the branch: `git push origin feature/your-feature`  
5. Open a pull request  

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

*Developed with ❤️ by Acote Group Limited*
