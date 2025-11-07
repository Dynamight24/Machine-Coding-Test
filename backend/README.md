# Backend (Express + MongoDB)

Instructions:

1. Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.
2. Install dependencies:
   npm install
3. Run server:
   npm run start
   or for development with nodemon:
   npm run dev

APIs:
- POST /api/auth/register
  body: { name, dob (YYYY-MM-DD), email, password }
  response: { token, user }

- POST /api/auth/login
  body: { email, password }
  response: { token, user }

