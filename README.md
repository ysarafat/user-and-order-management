# Installation guide and run locally

To get started with "user-and-order-management" you'll need to follow these installation steps:

## Prerequisites

Before you begin, ensure that you have the following prerequisites installed on your system:

- Node.js: Download and install [Node.js](https://nodejs.org/) if you haven't already.

- MongoDB: Install or set up mongodb atlas [MongoDB](https://www.mongodb.com/try/download/community) to user-and-order-managemen.

## Installation Steps

1.  **Clone the Repository:**
    Clone the "user-and-order-management" repository to your local machine.

    ```bash
    git clone <repository-url>
    ```

2.  **Navigate to the Project Directory:**
    Change your current working directory to the project folder.

    ```bash
    cd user-and-order-management
    ```

3.  **Install Dependencies**
    Use `npm` to install the project dependencies.

    ```bash
    npm install
    ```

    #### or

    Use `yarn` to install the project dependencies.

    ```bash
    yarn install
    ```

4.  **Add `.env` file**

    Create an `.env` file in the project root directory and enter the following variables.

    ```bash
    DATABASE_URL=your-db-url
    PORT=3000
    ```

    **_If you do not enter the `PORT` variable, the project will run on port `5000`_**

5.  **Build the Application:**

    Build the application with the following command.

    Build the application with `npm`

    ```bash
    npm run build
    ```

    build the application with `yarn`

    ```bash
    yarn build
    ```

6.  **Start the Application:**

    Run the application with the following command.

    Run the application with `npm`

    ```bash
    npm run dev
    ```

    Run the application with `yarn`

    ```bash
    yarn dev
    ```

## Access user-and-order-management api using postman

To interact with `user-and-order-management` using Postman, follow these steps:

1. **Create a new user by `POST` method**

   ```url
   https://user-and-order-management.vercel.app/api/users
   ```

   **_Request body_**

   ```json
   {
     "userId": "number",
     "username": "string",
     "password": "string",
     "fullName": {
       "firstName": "string",
       "lastName": "string"
     },
     "age": "number",
     "email": "string",
     "isActive": "boolean",
     "hobbies": ["string", "string"],
     "address": {
       "street": "string",
       "city": "string",
       "country": "string"
     }
   }
   ```

2. **Get a list of all user by `GET` method**

```url
 https://user-and-order-management.vercel.app/api/users
```

**_Response body_**

```json
{
  "success": true,
  "message": "Users fetched successfully!",
  "data": [
    {
      "username": "string",
      "fullName": {
        "firstName": "string",
        "lastName": "string"
      },
      "age": "number",
      "email": "string",
      "address": {
        "street": "string",
        "city": "string",
        "country": "string"
      }
    }
    // more user objects...
  ]
}
```

3. **Get a specific user by userId using `GET` method**

   ```url
   https://user-and-order-management.vercel.app/api/users/:userId
   ```

   **_Response body_**

   ```json
   {
     "success": true,
     "message": "User fetched successfully!",
     "data": {
       "userId": "number",
       "username": "string",
       "fullName": {
         "firstName": "string",
         "lastName": "string"
       },
       "age": "number",
       "email": "string",
       "isActive": "boolean",
       "hobbies": ["string", "string"],
       "address": {
         "street": "string",
         "city": "string",
         "country": "string"
       }
     }
   }
   ```

4. **Update a specific user by userId using `PUT` method**

   ```url
   https://user-and-order-management.vercel.app/api/users/:userId
   ```

   **_Request body any user field_**

   **_Response body_**

   ```json
   {
     "success": true,
     "message": "User updated successfully!",
     "data": {
       "userId": "number",
       "username": "string",
       "fullName": {
         "firstName": "string",
         "lastName": "string"
       },
       "age": "number",
       "email": "string",
       "isActive": "boolean",
       "hobbies": ["string", "string"],
       "address": {
         "street": "string",
         "city": "string",
         "country": "string"
       }
     }
   }
   ```

5. **Delete a specific user by userId using `DELETE` method**

   ```url
   https://user-and-order-management.vercel.app/api/users/:userId
   ```

   **_Response body_**

   ```json
   {
     "success": true,
     "message": "User deleted successfully!",
     "data": null
   }
   ```

### Access user oder menagement

1. **Update order by userId using `PUT` method**

   ```url
   https://user-and-order-management.vercel.app/api/users/:userId/orders
   ```

   **_Request body_**

   ```json
   {
     "productName": "string",
     "price": "number",
     "quantity": "number"
   }
   ```

   **_Response body_**

   ```json
   {
     "success": true,
     "message": "Order created successfully!",
     "data": null
   }
   ```

1. **Get All order by userId using `get` method**

   ```url
   https://user-and-order-management.vercel.app/api/users/:userId/orders
   ```

   **_Request body_**

   ```json
   {
     "productName": "string",
     "price": "number",
     "quantity": "number"
   }
   ```

   **_Response body_**

   ```json
   {
     "success": true,
     "message": "Order created successfully!",
     "data": null
   }
   ```

1. **Get total price of order by userId using `get` method**

   ```url
   https://user-and-order-management.vercel.app/api/users/:userId/orders/total-price
   ```

   **_Request body_**

   ```json
   {
     "productName": "string",
     "price": "number",
     "quantity": "number"
   }
   ```

   **_Response body_**

   ```json
   {
     "success": true,
     "message": "Total price calculated successfully!",
     "data": {
       "totalPrice": 154.99
     }
   }
   ```

By following these steps, you can use Postman to interact with your "user-and-order-management" API, making requests and testing different features of the application. Make sure your "user-and-order-management" server is running and accessible at the specified URL before using Postman to access it.
