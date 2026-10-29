# Course API — Express.js Modular MVC Assignment

**Student Name:** [Write your name]  
**Roll Number/ID:** [Write your roll number]

## 1. Setup
1. Install Node.js and MongoDB, or create a MongoDB Atlas database.
2. Extract the ZIP and open this folder in VS Code.
3. Run `npm install`.
4. Copy `.env.example` to a new file named `.env`.
5. Set `MONGODB_URI` to your local MongoDB URI or Atlas connection string.
6. Replace `JWT_SECRET` with a long random secret.
7. Run `npm run dev`.
8. The API runs at `http://localhost:5000`.

## 2. Authentication
### Register
`POST http://localhost:5000/api/auth/register`
```json
{
  "name": "Your Name",
  "email": "student@example.com",
  "password": "Pass123!"
}
```
Expected status: **201 Created**. Copy the returned token.

### Login
`POST http://localhost:5000/api/auth/login`
```json
{
  "email": "student@example.com",
  "password": "Pass123!"
}
```
Expected status: **200 OK**.

For protected endpoints, in Postman choose **Authorization → Bearer Token** and paste the token.

## 3. Category CRUD
### Create category
`POST http://localhost:5000/api/categories`
Authorization: Bearer Token
```json
{
  "name": "Web Development",
  "description": "Web development courses"
}
```
Expected: **201 Created**.

### List categories
`GET http://localhost:5000/api/categories`
Expected: **200 OK**.

### Get one
`GET http://localhost:5000/api/categories/CATEGORY_ID`

### Update
`PUT http://localhost:5000/api/categories/CATEGORY_ID`
```json
{
  "name": "Frontend Development",
  "description": "HTML, CSS and JavaScript"
}
```

### Delete
`DELETE http://localhost:5000/api/categories/CATEGORY_ID`

## 4. Course CRUD
### Create course
Use the `_id` of a category returned by GET categories.
`POST http://localhost:5000/api/courses`
```json
{
  "title": "Express Fundamentals",
  "description": "Build REST APIs with Express",
  "instructor": "Your Name",
  "category": "PASTE_CATEGORY_ID_HERE",
  "price": 2500
}
```
Expected: **201 Created**.

### List courses
`GET http://localhost:5000/api/courses`

### Get one
`GET http://localhost:5000/api/courses/COURSE_ID`

### Update
`PUT http://localhost:5000/api/courses/COURSE_ID`
```json
{
  "price": 3000
}
```

### Delete
`DELETE http://localhost:5000/api/courses/COURSE_ID`

All course endpoints require a Bearer token.

## 5. Mandatory Postman Evidence — five screenshots
At the top of **each** screenshot/page, add your real student name and roll number.

1. **Register and Login:** Show successful register and login responses. If the instructor requires one image, use a combined evidence page with both screenshots; otherwise include both.
2. **Create Category:** `POST /api/categories`, valid Bearer token, JSON body, status **201 Created**, response body visible.
3. **Get Categories:** `GET /api/categories`, valid Bearer token, status **200 OK**, response body visible.
4. **Validation Error:** `POST /api/categories` with `{}` and valid Bearer token. Status **400 Bad Request** and error response visible.
5. **Not Found:** Open `GET http://localhost:5000/this-route-does-not-exist`. Status **404 Not Found** and response body visible.

For every screenshot, show the Postman request method, full URL, Headers/Authorization, and response status/body. Do not fake or edit status codes. Capture actual Postman responses.

## 6. Endpoints Summary
| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/categories` | Create category |
| GET | `/api/categories` | List categories |
| GET | `/api/categories/:id` | Read category |
| PUT | `/api/categories/:id` | Update category |
| DELETE | `/api/categories/:id` | Delete category |
| POST | `/api/courses` | Create course |
| GET | `/api/courses` | List courses |
| GET | `/api/courses/:id` | Read course |
| PUT | `/api/courses/:id` | Update course |
| DELETE | `/api/courses/:id` | Delete course |

## Notes
- Do not upload `.env` or `node_modules` to GitHub.
- For GitHub submission, commit the source files and include a README.
- Use your own student name and roll number; do not submit the placeholders unchanged.
