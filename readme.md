# Nick's Landscape Calculator

A full-stack web application designed to provide instant cost estimates for common landscaping projects.

---

![Screenshot of Calculator View](assets/lc-calc-view-png.png)

---

### Table of Contents
* [Description](#description)
* [Features](#features)
* [Technologies Used](#technologies-used)

---

## Description

This project was inspired by the need to make my job easier, it is a tool to help with the bidding process.

I am also using it to help me learn and demonstrate my full-stack development skills.

---

## Features

*   **Dynamic Cost Calculation:** Select a service and enter project dimensions (e.g., square footage) to receive an instant cost estimate.
*   **Multiple Pricing Tiers:** Handles complex pricing rules, including different material options and minimum charges per service.
*   **Secure User Authentication:** Users can create an account and log in using JWT-based authentication. Passwords are fully encrypted using bcrypt.
*   **Protected Routes & Saved Estimates:** Logged-in users can save their calculated estimates to their personal profile for future reference.
*   **Rate Limiting:** Implements express rate limiting on the backend to prevent API abuse and brute-force login attempts.
*   **Responsive UI:** A clean and intuitive user interface built with React that works smoothly on both desktop and mobile devices.

---

## Technologies Used

### Backend
*   **Runtime:** [Node.js](https://nodejs.org/)
*   **Framework:** [Express.js](https://expressjs.com/)
*   **Database:** [PostgreSQL](https://www.postgresql.org/)
*   **Authentication:** JSON Web Tokens (JWT)
*   **Password Hashing:** [bcrypt.js](https://www.npmjs.com/package/bcryptjs)
*   **API Security:** [CORS](https://www.npmjs.com/package/cors), [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)

### Frontend
*   **Library:** [React.js](https://reactjs.org/)
*   **Routing:** [React Router](https://reactrouter.com/)
*   **State Management:** React Context API
*   **Styling:** CSS3, with a focus on responsive design
*   **API Communication:** Fetch API

### Development & Testing
*   **Backend Testing:** [Jest](https://jestjs.io/)
*   **Frontend Testing:** [Jest](https://jestjs.io/), [React Testing Library](https://testing-library.com/)

---