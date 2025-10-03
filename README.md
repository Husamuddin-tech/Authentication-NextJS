# Authentication‑NextJS

A full-stack authentication system built with **Next.js** (App Router) and **TypeScript**, featuring email verification, password reset, and user session management.  

This project uses **Ethereal Email** (or Mailtrap in dev) to test out email flows without sending real emails.

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Features

- User registration with **username, email, password**  
- Email verification via token / link  
- Password reset via email  
- Protected routes / profile page  
- Login / logout flow  
- Responsive UI using Tailwind CSS and a theme (emerald)  
- TypeScript for full typing safety  
- Email previews via **Ethereal** (development)  
- API routes built in Next.js (`/api/...`)  

---

## Tech Stack

| Layer        | Technology            |
|---------------|------------------------|
| Frontend / UI | Next.js (App Router), React, Tailwind CSS |
| Backend / API | Next.js API routes (Route Handlers) |
| Auth / Security | bcryptjs for hashing, token-based verification |
| Email / Testing | Ethereal (or Mailtrap) for email previews |
| Database (if used) | e.g. MongoDB / Mongoose (as seen in your code) |

---

## Setup & Installation

1. Clone this repository  
   ```bash
   git clone https://github.com/Husamuddin-tech/Authentication-NextJS.git
   cd Authentication-NextJS
   ```

2. Install dependencies  
   ```bash
   npm install
   # or yarn / pnpm
   ```

3. Create `.env.local` in project root, and add:

   ```env
   # App settings
   DOMAIN=http://localhost:3000

   # Ethereal Email (for development)
   ETHEREAL_USER=your_ethereal_user
   ETHEREAL_PASS=your_ethereal_pass

   # (Optional) Mailtrap settings if you still want to use it
   MAIL_HOST=sandbox.smtp.mailtrap.io
   MAIL_PORT=2525
   MAIL_USER=your_mailtrap_user
   MAIL_PASS=your_mailtrap_pass
   ```

4. Start development server  
   ```bash
   npm run dev
   # opens at http://localhost:3000
   ```

---

## Usage

- Go to `/signup` → register a new user  
- Check console (or API response) for **Ethereal preview URL** to view verification email  
- Click verification link or visit `/verifyemail?token=…`  
- After verification, login at `/login`  
- Protected pages (like `/profile`) show user data or allow logout  

---

## API Routes

Here are some of the main API endpoints (via Next.js route handlers):

| Endpoint               | Method  | Purpose                                 |
|------------------------|---------|------------------------------------------|
| `/api/users/signup`    | POST    | Register new user, send verification email |
| `/api/users/login`     | POST    | Authenticate credentials, start session  |
| `/api/users/me`        | GET/POST(*) | Fetch current user info or verify session |
| `/api/users/verify`    | POST    | Process email verification token         |
| `/api/users/forgot`    | POST    | Initiate password reset (send email)     |
| `/api/users/reset`     | POST    | Reset password using token               |

> **Note:** If you intend to fetch user data with GET, make sure the API route handler supports `GET`, not only `POST`.

---

## Troubleshooting & Tips

- **404 / 405 Errors** — Check that your API route filename and method (GET/POST) match your client call  
- **Invalid Email Credentials** — With Ethereal, make sure `ETHEREAL_USER` and `ETHEREAL_PASS` are correct  
- **Token not working** — Ensure token expiry logic, DB updates, and query parameter reading are correct  
- **Client-side navigation** — Use `Link` from `next/link` for internal navigation  
- **Params in Next.js 15+** — When using dynamic routes (e.g. `[id]`), `params` may be a Promise. Use `await params` or `React.use()` per the new Next.js change notice.

---

## Future Improvements

- Add JWT / cookie-based authentication for session persistence  
- Add email templates (HTML + CSS)  
- Add role-based access (admin vs user)  
- Enable “remember me” / token refresh  
- Add user avatar upload / profile edit  
- Add unit/integration tests for API and UI  

---

## License

MIT License © [Your Name or Organization]

---

## Contribution

Contributions are welcome! Feel free to open issues or submit pull requests.  

---

Enjoy building secure apps with authentication! 🚀  


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
