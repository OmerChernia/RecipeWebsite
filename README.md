# Recipe Management Application

Welcome to the Recipe Management Application! This application allows users to create, edit, delete, and view recipes and categories. It is built using a modern web stack with a Node.js backend and a React frontend.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Code References](#code-references)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Recipe Management**: Create, edit, and delete recipes.
- **Category Management**: Manage categories for recipes.
- **Image Upload**: Upload images for recipes.
- **Responsive Design**: Mobile-friendly interface.

## Installation

To get started with the project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/recipe-management.git
   cd recipe-management
   ```

2. **Install dependencies for the server:**

   ```bash
   cd server
   npm install
   ```

3. **Install dependencies for the client:**

   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables:**

   Create a `.env` file in the `server` directory and add your environment variables:

   ```plaintext
   MONGODB_URI=your_mongodb_uri
   GCS_BUCKET_NAME=your_gcs_bucket_name
   JWT_SECRET=your_jwt_secret
   ```

5. **Run the application:**

   - **Server**: In the `server` directory, run `npm start`.
   - **Client**: In the `client` directory, run `npm start`.

## Usage

- **Access the application**: Open your browser and go to `http://localhost:3000`.
- **Manage recipes and categories**: Use the interface to add, edit, or delete recipes and categories.

## API Endpoints

### Categories

- **GET /api/categories**: Retrieve all categories.
- **GET /api/categories/:id**: Retrieve a single category.
- **POST /api/categories**: Create a new category.
- **PUT /api/categories/:id**: Update a category.
- **DELETE /api/categories/:id**: Delete a category.

### Recipes

- **GET /api/recipes**: Retrieve all recipes.
- **GET /api/recipes/:id**: Retrieve a single recipe.
- **POST /api/recipes**: Create a new recipe.
- **PUT /api/recipes/:id**: Update a recipe.
- **DELETE /api/recipes/:id**: Delete a recipe.

## Code References

### Server

- **Categories Route**: Handles CRUD operations for categories.

  ```javascript:server/routes/categories.js
  startLine: 1
  endLine: 110
  ```

- **Recipes Route**: Handles CRUD operations for recipes.
  ```javascript:server/routes/recipes.js
  startLine: 8
  endLine: 175
  ```

### Client

- **Edit Recipe Component**: Component for editing recipes.

  ```javascript:client/src/components/EditRecipe.js
  startLine: 1
  endLine: 50
  ```

- **CSS Styles**: Styles for various components.
  ```css:client/src/App.css
  startLine: 721
  endLine: 936
  ```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.
