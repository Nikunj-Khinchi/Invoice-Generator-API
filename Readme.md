# Invoice Generator API

## Overview

The Invoice Generator API is a backend system built with Node.js to manage invoices. It provides full CRUD functionality with role-based access control (RBAC) for Admin and User roles. The system includes features such as automatic invoice number generation, tax calculations, payment tracking, and event-driven architecture for handling events like invoice creation, updates, and deletions.

---

## Features

### Core Features

1. **CRUD Operations for Invoices**

   - **Create**: Admins can create invoices with detailed customer and item information.
   - **Read**: Admins can view all invoices; Users can view only accessible invoices.
   - **Update**: Admins can update invoice details.
   - **Delete**: Admins can delete invoices.

2. **Role-Based Access Control (RBAC)**

   - Admin users: Full access to all CRUD operations.
   - Regular users: Read-only access.

3. **Invoice Number Generation**

   - Automatically generates unique invoice numbers based on predefined formats Format (INV-YYYYMMDD-(Random 6 value)).

4. **Payment Tracking**

   - Tracks and updates payment statuses (e.g., pending, paid, overdue).

5. **Tax Calculations**

   - Calculates taxes based on predefined tax rates (e.g., GST, VAT).

6. **Discounts**

   - Supports optional discounts applied to the total invoice amount.

### Additional Features

1. **Event-Driven Architecture**

   - Implements event emitters and listeners for actions like creating, updating, or deleting invoices.
   - Integrates with Redis for event queueing.

2. **Invoice PDF Generation**

   - Generates a downloadable PDF version of invoices using Puppeteer.
   - Sends the generated PDF to the customer’s email when an invoice is created or updated and deleted.

3. **Email Notifications**

   - Sends email notifications to users based on events (e.g., invoice creation, updates and delete) using EventEmitter and the Bull queue of Redis for asynchronous handling.

---

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (or any supported database, e.g., MySQL)
- Redis (for event-driven architecture)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd invoice-generator-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Create a `.env` file in the root directory with the following variables:
     ```env
     PORT=3000
     DB_URI=<your-database-connection-string>
     JWT_SECRET=<your-jwt-secret>
     REDIS_HOST=<your-redis-host>
     REDIS_PORT=<your-redis-port> 
     EMAIL_USER=<your-email>
     EMAIL_PASS=<your-email-password>
     ```

4. Start the server:

   ```bash
   npm start
   ```

### API Documentation

Comprehensive API documentation is available via the `/api-docs` endpoint (Swagger UI).

---

## Database Schema

### User Model

- **Fields**:
  - `username`: String
  - `password`: String (hashed)
  - `email`: String
  - `address`: String
  - `role`: String (`admin` or `user`)

### Invoice Model

- **Fields**:
  - `invoiceNumber`: String (unique)
  - `customer`: Object Id (User)
  - `invoiceDate`: Date
  - `dueDate`: Date
  - `items`: Array of Objects
    - `name`: String
    - `quantity`: Number
    - `unitPrice`: Number
  - `taxRates`: Array of Numbers
  - `discount`: Number (optional)
    (Auto calculated based on defined tax rates and discount)
    - `totalAmount`: Number
    - `paymentStatus`: String (`pending`, `paid`, `overdue`)

---

## Libraries and Tools Used

1. **Express**: For building the RESTful API.
2. **Mongoose**: For MongoDB object modeling.
3. **JWT**: For secure authentication.
4. **Bcrypt**: For password hashing.
5. **EventEmitter**: For event-driven architecture.
6. **Redis**: For event queueing (optional).
7. **Puppeteer**: For generating PDF invoices with templates.
8. **Bull**: For handling asynchronous jobs with Redis.
9. **Swagger**: For API documentation.
10. **Joi**: For request validation.
11. **Nodemailer**: For sending email notifications.
12. **Winston** : For logging application events and errors

---

## Event-Driven Architecture

- Events emitted for invoice actions:
  - **Invoice Created**: Triggers a webhook notification and sends the invoice PDF to the customer’s email.
  - **Invoice Updated**: Sends an updated invoice PDF to the customer’s email.
  - **Invoice Deleted**: Sends a deletion notification.
- Redis and Bull are used for asynchronous event handling and job queuing.

---

## Challenges and Solutions

1. **Role-Based Access Control**

   - Implemented middleware to validate user roles based on JWT tokens.

2. **PDF Generation**

   - Used Puppeteer to format invoices dynamically with customer and item details.

3. **Event Handling**

   - Leveraged Node.js `EventEmitter` for basic event-driven functionality and Redis with Bull for scaling.

4. **Logging**

    - Implemented Winston for structured and level-based logging to track application events and errors.
