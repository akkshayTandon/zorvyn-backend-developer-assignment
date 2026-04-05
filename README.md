# Finance Dashboard Backend Developer Assignment - Zorvyn

## Overview
This project is a backend system for managing financial records and providing dashboard insights with role-based access control.

## Tech Stack
- Node.js
- Express.js
- SQLite (better-sqlite3)

## Key Points
- Authentication is mocked using `user-id` header.
- SQLite used for simplicity. Used raw SQL to keep implementation lightweight
- Implemented role-based access using middleware (VIEWER, ANALYST, ADMIN)
- Viewer role restricted to dashboard only
- Separated routes, controllers, and middleware for clarity

## Features

### User Management
- Create and manage users
- Role-based access: Viewer, Analyst, Admin

### Financial Records
- Create, read, update, delete records
- Filtering by type, category, and date

### Dashboard APIs
- Total income, expenses, net balance
- Category-wise breakdown
- Recent transactions
- Monthly trends

### Access Control
- Viewer: Only dashboard access
- Analyst: Records (read) + dashboard
- Admin: Full access

## API Endpoints

### Users
- POST /users
- GET /users

### Records
- POST /records (Admin)
- GET /records (Analyst, Admin)
- PUT /records/:id (Admin)
- DELETE /records/:id (Admin)

### Dashboard
- GET /dashboard/summary (Viewer, Analyst, Admin)
- GET /dashboard/categories (Analyst, Admin)
- GET /dashboard/recent (Analyst, Admin)
- GET /dashboard/trends (Analyst, Admin)


## Setup Instructions

```bash
npm install
node src/app.js