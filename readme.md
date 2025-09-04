# Nick's Landscape Calculator

A full-stack web application designed to provide instant cost estimates for landscaping projects.

Check out the [Live Demo](https://www.nikelley.com)!

---

![Screenshot of Calculator View](assets/lc-calc-view-png.png)

---

### Table of Contents
* [Description](#description)
* [Features](#features)
* [Technologies Used](#technologies-used)

---

## Description

I created this project to apply my web development skills towards my work as a Landscaper.

My inspiration was to make bidding a little easier and increase my confidence about the estimates I'm making.
The guy who runs my company really regretted not charging people more when he started the company so I want to make sure I'm being compensated fairly for my work. 

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
*   **Styling:** CSS3, with a focus on design responsiveness
*   **API Communication:** Fetch API

### Development & Testing
*   **Backend Testing:** [Jest](https://jestjs.io/)
*   **Frontend Testing:** [Jest](https://jestjs.io/), [React Testing Library](https://testing-library.com/)

---
