Employee Leave Management System:

                         INTERNET
                            |
                            |
                    ┌───────▼────────┐
                    │    FRONTEND    │
                    │    EC2-1       │
                    │    Nginx       │
                    │    Port 80     │
                    │ Public IP       │
                    └───────┬────────┘
                            |
                            | HTTP API
                            | Port 5000
                            ▼
                    ┌────────────────┐
                    │    BACKEND     │
                    │    EC2-2       │
                    │ Node.js        │
                    │ Express        │
                    │ PM2            │
                    │ Port 5000      │
                    │ Private IP     │
                    └───────┬────────┘
                            |
                            | MySQL
                            | Port 3306
                            ▼
                    ┌────────────────┐
                    │     MYSQL      │
                    │     EC2-3      │
                    │     MySQL      │
                    │     Port 3306  │
                    │     Private IP │
                    └────────────────┘



MODULE 1 — MYSQL

1. EC2 creation
2. Linux installation
3. MySQL installation
4. Dependencies
5. Configuration
6. Database creation
7. User creation
8. Tables
9. Security Group
10. Private IP
11. Test connection
12. Deployment
13. Troubleshooting


MODULE 2 — BACKEND

1. EC2 creation
2. Linux
3. Git installation
4. Node.js installation
5. GitHub clone
6. npm dependencies
7. .env configuration
8. MySQL connection
9. Backend code
10. PM2
11. Security Group
12. Testing
13. Deployment


MODULE 3 — FRONTEND

1. Frontend files in VS Code
2. HTML
3. CSS
4. JavaScript
5. Backend API configuration
6. GitHub push
7. EC2
8. Git clone
9. Nginx
10. Configuration
11. Deployment
12. Browser testing




MODULE 4 — COMPLETE CONNECTION

Frontend
   ↓
Backend
   ↓
MySQL

Security Groups
Private IPs
Public IP
Nginx
PM2
Logs
Troubleshooting
RCA