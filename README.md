🛡️ Login Task - MeetusAR Auth Page
This is a modern, responsive login interface built for a virtual shopping platform using Next 16, Redux Toolkit, and TailwindCSS. It provides a smooth and engaging authentication experience with real-time form validation and animated transitions.
-------------------------------------------------------
🔗 Live Demo
You can check the deployed version of the task here:

👉 https://meetus-tau.vercel.app/

-----------------------------------------------------
🚀 Features

✅ Login with email & password

✅ Redux Toolkit for global state management

✅ Real-time validation using yup + react-hook-form

✅ Authentication persistence via Cookies

✅ Responsive UI across all devices

✅ Shadcn UI components with modern styling

✅ Redirect handling based on auth state

-----------------------------------------------------
🔐 Auth Flow

On login, credentials are submitted via fetch to backend API.

If successful:

user, token, and isEmployee are stored in Cookies.

User is redirected to the dashboard.

If logged out:

Cookies is cleared.

User is sent back to /login.

Navigation logic is guarded based on user presence in Cookies.

