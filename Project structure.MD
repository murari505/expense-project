Project: Employee Leave Management System

This is a good practice project because it has real CRUD operations, database relationships, login, APIs, and a frontend.

1. What the application does

Employee:
Register/login
View profile
Apply for leave
View leave history
Check leave status

Admin:
Login
View employees
View leave requests
Approve leave
Reject leave

MySQL + Backend + Frontend → deploy on a Linux server

                    USER
                     |
                     v
              +-------------+
              |  FRONTEND   |
              | HTML/CSS/JS |
              +------+------+
                     |
                     | HTTP Request
                     v
              +-------------+
              |   NGINX     |
              |   Port 80   |
              +------+------+
                     |
                     | /api
                     v
              +-------------+
              |   BACKEND   |
              | Node/Express|
              | Port 5000   |
              +------+------+
                     |
                     | SQL
                     v
              +-------------+
              |    MYSQL    |
              |   Port 3306 |
              +-------------+