# Shelves & Stories — Online Book Borrowing Platform

A Next.js library-style web app where readers browse a catalog, filter by category, and borrow books digitally. Authentication and sessions use [Better Auth](https://www.better-auth.com/) with MongoDB; book inventory is stored in MongoDB and updates when users borrow.

## Purpose

Digitize the traditional library flow: explore titles, see availability, sign in, and borrow in one place—with a responsive layout for phone, tablet, and desktop.

## Live URL

Deploy to [Vercel](https://vercel.com) or [Render](https://render.com) and set the environment variables below. Replace this line with your production URL after deployment:

**Live demo:** `https://your-deployment-url.example` (update after you host the app)

> **SPA / reload:** The app uses the Next.js App Router with server components and API routes, so refreshing on routes like `/books`, `/books/[id]`, or `/profile` does not throw client-side routing errors when hosted on Vercel or similar platforms.

## Key features

- **Layout:** Sticky header with logo (home link), centered nav (Home, All Books, My Profile), and conditional auth (Login vs. name + Logout). Custom footer with social links and Contact Us.
- **Home:** Hero (“Find Your Next Read” + Browse Now), marquee strip, featured books (top 4 from the API), **Swiper** carousel (“Reader picks”), and a “How borrowing works” section.
- **Catalog:** All Books with title search and a **category sidebar** (Story / Tech / Science).
- **Book details (private):** Large cover, metadata, live copy count, **Borrow This Book** (session-aware; redirects to login with toast when signed out).
- **Auth:** Email/password login and registration (with profile photo URL on signup), Google OAuth when env vars are set, toasts for errors/success. Registration ends on the login page; Google sign-in lands on home.
- **Profile (private):** View account details; **Update information** links to `/profile/edit` using Better Auth [`updateUser`](https://www.better-auth.com/docs/concepts/users-accounts#update-user).
- **Security:** Secrets and DB URLs live in environment variables only (see `.env.example`).

## Tech stack

- **Next.js** (App Router) · **React** · **JavaScript** (`.js` / `.jsx`)
- **Tailwind CSS** v4 · **DaisyUI** v5
- **Better Auth** (MongoDB adapter) · **MongoDB** (native driver)
- **Swiper** (carousel) · **Sonner** (toasts)

## Getting started

1. Copy `.env.example` to `.env.local` and fill in values (MongoDB URI and `BETTER_AUTH_SECRET` are required).
2. Install and run:

```bash
npm install
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000). On first request, the app seeds **12 books** into the `books` collection if it is empty.

### Google sign-in

Create OAuth credentials in [Google Cloud Console](https://console.cloud.google.com/), add authorized redirect URIs like `http://localhost:3000/api/auth/callback/google` (and your production URL + `/api/auth/callback/google`), then set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.

## npm packages (high level)

| Package        | Role                                      |
| -------------- | ----------------------------------------- |
| `next`         | Framework, routing, API routes            |
| `better-auth`  | Auth, sessions, social login, `updateUser` |
| `mongodb`      | Database driver for Better Auth + books   |
| `tailwindcss`  | Utility-first styling                     |
| `daisyui`      | UI components (buttons, cards, menus)     |
| `swiper`       | Home page carousel                        |
| `sonner`       | Toast notifications                       |

## Project structure (abbreviated)

- `src/lib/auth.ts` — Better Auth server config  
- `src/lib/auth-client.ts` — React client  
- `src/lib/books.ts` — Book queries + borrow  
- `src/app/api/books/` — Books REST API  
- `src/proxy.ts` — Next.js 16 proxy for protected routes  

## Assignment notes

- **10+ meaningful commits:** Use `git log` in this repo after cloning; history is written as small, descriptive steps for the grader.
- **Explanation video:** Record a walkthrough of features and paste the link in your submission where required.

---

Built for the Programming Hero “Online Book Borrowing Platform” brief.
