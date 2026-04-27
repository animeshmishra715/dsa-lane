# DSA-Lane

DSA-Lane is a full-stack discussion platform built for students to collaborate, ask doubts, and learn Data Structures & Algorithms in a structured way based on their skill level.

The platform automatically groups users into Beginner, Intermediate, and Advanced levels and provides separate discussion spaces for each group.

---

## Live Project

Frontend: https://dsa-lane-frntnd.vercel.app  
Backend API: https://dsa-lane.onrender.com  

---

## Problem Statement

Most students struggle to find the right peer group while learning DSA. Beginners feel lost in advanced discussions, and advanced learners find beginner-level questions repetitive.

DSA-Lane solves this by:
- Categorizing users based on their coding profiles
- Providing level-based discussion rooms
- Enabling structured and relevant learning

---

## Features

### Authentication
- User Signup & Login
- Stores username and level
- Session handled using localStorage

### Level Classification
- Users are grouped into:
  - Beginner
  - Intermediate
  - Advanced
- Based on coding profile inputs (Codeforces, etc.)

### Discussion System
- Separate discussion rooms per level
- Topic-based channels:
  - Arrays
  - Linked List
  - Stack / Queue
  - Trees
  - Graphs
  - DP / Greedy / CP

### Posts
- Create posts
- View posts
- Filter by topic

### Voting System
- Upvote / Downvote posts
- Prevent duplicate votes (handled backend)

### Delete Feature
- Users can delete their own posts

---

## Tech Stack

### Frontend
- React.js
- React Router
- CSS (custom styling)

### Backend
- Node.js
- Express.js

### Database
- MongoDB (Atlas)
- Mongoose

### Deployment
- Frontend → Vercel
- Backend → Render

---

## Project Structure
DSA-LANE/
│
├── client/ # React frontend
│ ├── public/
│ ├── src/
│ │ ├── pages/
│ │ ├── App.js
│ │ └── index.js
│
├── server/ (or root backend files)
│ ├── models/
│ ├── routes/
│ ├── app.js
│ └── config/
│
├── .env
├── package.json


---

## Environment Variables

Create a `.env` file in backend:
MONGO_URI=your_mongodb_connection_string
PORT=3000

---

## How to Run Locally

### 1. Clone the repository
git clone https://github.com/your-repo/dsa-lane.git

cd dsa-lane

---

### 2. Backend Setup
npm install
node app.js

Server runs on:
http://localhost:3000


---

### 3. Frontend Setup
cd client
npm install
npm start


Frontend runs on:
http://localhost:3000


---

## API Endpoints

### Auth
- POST /auth/signup
- POST /auth/login

### Posts
- GET /api/:level/posts
- POST /api/:level/posts
- POST /api/:level/posts/:id/upvote
- POST /api/:level/posts/:id/downvote
- DELETE /api/:level/posts/:id

---

## Challenges Faced

- Handling CORS issues during deployment
- Managing environment variables securely
- Connecting frontend with deployed backend
- Debugging MongoDB connection errors
- Syncing team workflow with Git

---

## Future Improvements

- Real-time chat using WebSockets
- Better UI/UX enhancements
- Profile dashboards
- Code editor integration
- Notifications system

---

## Team Contribution

This project was built collaboratively with clear role distribution:

- Backend development and API integration  
- Frontend UI and state management  
- Deployment and testing  

Each part was integrated step-by-step to build a complete working system.

---

## Conclusion

DSA-Lane is a structured learning platform that bridges the gap between different skill levels in DSA preparation. It ensures that users interact in the right environment, making learning more effective and less overwhelming.

---

## Acknowledgement

Special thanks to:
- MongoDB Atlas
- Render
- Vercel
- Open-source community resources
