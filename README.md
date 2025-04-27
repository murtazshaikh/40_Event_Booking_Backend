# Event Booking Backend API

Welcome to the **Event Booking Backend API**! :tada:

This is a full-featured backend built with **NestJS** and **MongoDB** (using native driver, no Mongoose), supporting user registration, authentication (JWT), event management, seat booking, and role-based authorization.

---

# :wrench: Technologies Used

- **NestJS** (Framework)
- **MongoDB** (Database)
- **JWT** Authentication
- **Swagger** API Documentation
- **Role-Based Access Control**
- **Environment Variables** for configuration security

---

# :file_folder: Project Setup Instructions

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/event-booking-backend.git
cd event-booking-backend
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Setup Environment Variables

Create a **`.env`** file at the root of your project.

Refer to the `.env.example` file provided.

### Example `.env`
```env
MONGODB_URI=your-mongodb-connection-uri-here
```

**Important:**
- NEVER upload your real `.env` to GitHub.
- Always use `.env.example` for sharing structure.

## 4. Start the Development Server

```bash
npm run start:dev
```

Server will start at `http://localhost:3000`

## 5. API Documentation

Access Swagger API docs at:

> `http://localhost:3000/api-docs`

All endpoints and schemas are documented.

---

# :running_man: Available Endpoints

## Auth (User)
- `POST /auth/register` - Register a new user (email, password, role)
- `POST /auth/login` - Login and get JWT access token
- `GET /auth/profile` - Get logged-in user's profile (protected route)

## Events (Admin)
- `POST /events` - Create new event (Admin only)
- `GET /events` - List all events (with optional filters)
- `GET /events/:id` - Get single event details
- `PATCH /events/:id` - Update event (Admin only)
- `DELETE /events/:id` - Delete event (Admin only)

## Bookings (User)
- `POST /bookings/:eventId` - Book seats for an event
- `GET /bookings` - View user's bookings

---

# :bar_chart: Filters Supported on Events

You can filter events by:

- **Date** (e.g., upcoming events)
- **Location**

Example usage:
```bash
GET /events?date=2025-05-10&location=New York
```

---

# :lock: Role Based Access

| Role | Capabilities |
|:----|:--------------|
| **user** | Book events, view own bookings |
| **admin** | Create, update, delete events |

---

# :rotating_light: Important Notes

- MongoDB URI should be kept secure.
- Use a dedicated DB user with limited permissions if deploying.
- Protect your `.env` at all times!
- Swagger authorization uses Bearer token for testing protected APIs.

---

# :hammer_and_wrench: Commands Quick Reference

| Action | Command |
|:------|:---------|
| Install deps | `npm install` |
| Start Dev Server | `npm run start:dev` |
| Build Prod Version | `npm run build` |

---

# :trophy: Congratulations!

You now have a fully functional **Event Booking Backend** ready to integrate with any frontend (React, Next.js, Angular, etc.) or mobile app.

---

# :rocket: Future Enhancements (Optional)

- Booking cancellation feature
- Email notifications on booking confirmation
- Pagination for event listing
- Admin dashboard integration

---

# :sparkles: Special Thanks

Huge shoutout to everyone learning NestJS, MongoDB, and real-world backend development! :rocket::tada:

---

> **Author:** Murtaza Shaikh
> **GitHub:** https://github.com/murtazshaikh

Happy coding! :sparkles:
