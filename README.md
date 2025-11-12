# Wanderlust - A Full-Stack Airbnb Clone

Wanderlust is a full-stack web application inspired by Airbnb. It allows users to discover, list, and book unique accommodations around the world. This project is built using the MEN (MongoDB, Express.js, Node.js) stack and demonstrates key web development concepts including RESTful routing, authentication, data modeling, and front-end templating.

## Features

- **User Authentication**: Secure user sign-up, login, and logout functionality using Passport.js.
- **Listings Management (CRUD)**: Authenticated users can create, read, update, and delete their own property listings.
- **Image Handling**: Listings include images with a default placeholder if no image is provided.
- **Reviews and Ratings**: Users can post reviews and ratings for listings. Authors can delete their own reviews.
- **Booking System**: Users can book a listing for specific dates, and a confirmation page is displayed with the booking details.
- **Authorization**: Middleware ensures that users can only edit or delete their own listings and reviews.
- **Flash Messages**: Provides user feedback for actions like successful login, logout, or errors.
- **Schema Validation**: Server-side data validation to ensure data integrity for listings and reviews.
- **Responsive Design**: Styled with Bootstrap for a responsive experience across different devices.

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **View Engine**: EJS (Embedded JavaScript) with EJS-Mate for layouts
- **Authentication**: Passport.js (passport-local, passport-local-mongoose)
- **Middleware**: express-session, connect-flash, method-override
- **Styling**: Bootstrap

---

## Getting Started

Follow these instructions to get a local copy of the project up and running on your machine.

### Prerequisites

- **Node.js**: Make sure you have Node.js and npm (Node Package Manager) installed. You can download it from [nodejs.org](https://nodejs.org/).
 **MongoDB**: You need a running instance of MongoDB. You can install it locally or use a cloud service like MongoDB Atlas.

### Installation and Setup

1.  **Clone the Repository**

    ```bash
    git clone https://github.com/<your-github-username>/wanderlust-airbnb-clone.git
    cd wanderlust-airbnb-clone
    ```

2.  **Install Dependencies**

    Install all the required npm packages.

    ```bash
    npm install
    ```

3.  **Set up the Database**

    The application connects to a local MongoDB instance by default at `mongodb://127.0.0.1:27017/wanderlust`. Make sure your MongoDB server is running.

4.  **Initialize the Database with Sample Data**

    The project includes a script to populate the database with sample listings. However, these listings need an owner.

    a. **Start the server first:**
    ```bash
    node app.js
    ```

    b. **Create a user:**
    Open your browser and navigate to `http://localhost:8080/signup`. Create a new user account.

    c. **Find the new user's ID:**
    Open your MongoDB shell or GUI, connect to the `wanderlust` database, and find the ID of the user you just created.
    ```bash
    # In mongosh
    use wanderlust
    db.users.findOne({ username: 'your-new-username' })
    ```
    Copy the `_id` value from the output.

    d. **Update the init script:**
    Open the file `init/index.js` and replace the hardcoded `owner` ID with the ID you just copied.
    ```javascript
    // In init/index.js, find this line:
    initData.data = initData.data.map((obj) => ({ ...obj, owner: "69120886af732ea70435141f" })); // <-- REPLACE THIS ID
    ```

    e. **Run the init script:**
    Stop the server (Ctrl+C) and run the script from your terminal.
    ```bash
    node init/index.js
    ```

5.  **Run the Application**

    Start the Express server.

    ```bash
    node app.js
    ```

    The application will be running at `http://localhost:8080`.

