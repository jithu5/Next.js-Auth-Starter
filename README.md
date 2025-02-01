# Next.js Authentication Project

This project demonstrates a simple authentication system using **Next.js** and **TypeScript**, including user signup, login, email verification with **Mailtrap**, and profile management.

---

## Features

- User Signup
- User Login
- Email Verification (via Mailtrap)
- Profile Page
- Middleware for Route Protection
- JWT-based Authentication

## Technologies Used

- **Next.js**
- **TypeScript**
- **Axios**
- **React Hot Toast** for notifications
- **JSON Web Tokens (JWT)**
- **MongoDB (Mongoose)**
- **Mailtrap** for email verification
- **Bcryptjs** for password hashing

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/jithu5/Next.js-Auth-Starter.git
cd Next.js-Auth-Starter
```

### 2. Install dependencies

   ```bash
   npm install
   ```

### 3. Set up environment variables

   Create a `.env.local` file in the root directory and add the following variables:

   ``` env
   MONGO_URI=<DATABSE_URL>
    TOKEN_SECRET=<JWT TOKEN SECRET>
    DOMAIN=<APP URL>
    NODE_ENV=<NODE_ENV>
    SMTP_HOST=<SMTP_HOST>
    SMTP_PORT=<SMTP_PORT>
    SMTP_USER=<SMTP_USER>
    SMTP_PASS=<SMTP_PASS>
    SMTP_USERGMAIL=<USER EMAIL>
     ```

### 4. Run the development server

   ```bash
   npm run dev
   ```

### 5. Open your browser

   Navigate to [http://localhost:3000](http://localhost:3000)

---

## Project Structure

src/
├── app/
│   ├── signup/page.tsx       # Signup page
│   ├── login/page.tsx        # Login page
│   ├── verifyemail/page.tsx  # Email verification page
│   ├── profile/page.tsx      # Profile page
│   ├── profile/[id]/page.tsx # Dynamic profile page
│   ├── layout.tsx            # Root layout
│
├── components/
│   ├── NavBar.tsx            # Navigation bar
│
├── middleware.ts             # Middleware for route protection
│
├── helpers/
│   ├── getDataFromToken.ts   # Extracts data from JWT
│   ├── mailer.ts             # Sends verification emails
│
├── api/
│   ├── users/
│   │   ├── login/route.ts     # User login API
│   │   ├── signup/route.ts    # User signup API
│   │   ├── verifyemail/route.ts # Email verification API
│   │   ├── me/route.ts        # Fetch user data API
│   │   ├── logout/route.ts    # Logout API
│
├── dbConfig/dbConfig.ts      # Database configuration
├── models/userModel.ts       # User schema/model

- `src/app/signup/page.tsx`: Signup page component
- `src/app/login/page.tsx`: Login page component
- `src/app/verifyemail/page.tsx`: Page for email verification
- `src/app/profile/page.tsx`: Profile page component
- `src/app/profile/[id]/page.tsx`: Dynamic profile page component

- `src/app/layout.tsx`: Root layout component

- `src/components/NavBar.tsx`: Navigation bar component

- `src/middleware.ts`: Middleware for route protection

- `src/helpers/getDataFromToken.ts`: Helper function to extract data from JWT
- `src/helpers/mailer.ts`: Helper function to send mail

- `src/app/api/users/login/route.ts`: API route to handle user login
- `src/app/api/users/signup/route.ts`: API route to handle user signup
- `src/app/api/users/verifyemail/route.ts`: API route to handle user email verification
- `src/app/api/users/me/route.ts`: API route to fetch user data
- `src/app/api/users/logout/route.ts`: API route to handle user logout

- `src/dbConfig/dbConfig.ts`: Database configuration
- `src/models/userModel.ts`: User Model configuration

## Usage

- **Signup:** Create a new account by providing a username, email, and password.
- **Login:** Log in with your email and password.
- **Profile:** View your profile information and log out.

---
