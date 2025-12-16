# 🎓 Education4Integration: AI-Powered Integrity Education

**Team Lovelace | Coding4Integrity Hackathon Entry**

## 🌟 Overview

**Education4Integration** is a pioneering mobile application designed to educate young people about corruption, ethical decision-making, and the critical role of organizations like the **United Nations Office on Drugs and Crime (UNODC)**.

We recognized that traditional methods often fail to engage youth on these complex topics. Our solution utilizes **adaptive AI tutoring** to create personalized, interactive learning pathways, focusing on real-world scenarios and gamified challenges.

### Educational Foundation

This application was designed using the **ADDIE Model** 

[Image of the ADDIE Model]
 (Analysis, Design, Development, Implementation, and Evaluation) to ensure pedagogical effectiveness, and built upon established educational software principles to guarantee a high-quality, measurable learning experience.

## 💻 Tech Stack

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | **React Native** | Used for cross-platform mobile development (iOS & Android). |
| **UI Library** | **gluestack** | Provides a robust, accessible, and themeable UI component library for consistent design. |
| **Backend** | **Node.js** | Powers our robust RESTful API and handles application logic. |
| **Database** | **PostgreSQL** | A powerful, open-source object-relational database used for storing user data, course progress, and integrity scenarios. |
| **AI/ML** | Custom Integration | Used for the adaptive tutoring engine and dynamic scenario generation. |

## 🛠 Project Structure

The project is divided into two main components:

1.  `./frontend`: The React Native application.
2.  `./backend`: The Node.js API server.

## 🚀 Getting Started

Follow these instructions to set up and run the **Education4Integration** project locally.

### Prerequisites

You must have the following installed on your system:

* Node.js (LTS version recommended)
* npm or Yarn
* PostgreSQL
* React Native development environment (Android Studio/XCode)

### 1. Database Setup

1.  **Create Database:** Create a new PostgreSQL database named `integration_db`.
    ```bash
    psql -c 'CREATE DATABASE integration_db;'
    ```
2.  **Configuration:** Navigate to the `./backend` directory and create a file named `.env`. Add your database connection details:
    ```
    # .env in /backend
    DATABASE_URL=postgres://user:password@host:port/integration_db
    PORT=3000
    # Include any necessary API keys (e.g., for AI services)
    AI_API_KEY=your_key_here
    ```
3.  **Run Migrations:** Install dependencies and run the database migrations.
    ```bash
    cd backend
    npm install
    # Execute migration commands (specific commands will depend on your ORM, e.g., Sequelize or Prisma)
    # Example: npm run migrate
    ```

### 2. Backend Server

1.  **Install Dependencies:** If not already done:
    ```bash
    cd backend
    npm install
    ```
2.  **Start Server:**
    ```bash
    npm start
    ```
    The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

### 3. Frontend Application

1.  **Set Backend URL:** Navigate to the `./frontend` directory and create a file named `.env`. Point the app to your local backend server:
    ```
    # .env in /frontend
    REACT_APP_BACKEND_URL=[http://10.0.2.2:3000](http://10.0.2.2:3000)
    # Note: Use 10.0.2.2 for Android Emulator, or your local IP for physical devices.
    ```
2.  **Install Dependencies:**
    ```bash
    cd frontend
    npm install
    ```
3.  **Run the App:**
    ```bash
    # For Android
    npx react-native run-android

    # For iOS (Requires Mac/XCode)
    npx react-native run-ios
    ```
The mobile application should now connect to your local backend and be ready for use.

## 🤝 Team Lovelace

This project was developed with passion and dedication by:

* **Mbofho Mamatsharaga**
* **Agape Mamphasa**
* **Amanda Khuzwayo**
* **Keabetswe Mothapo**