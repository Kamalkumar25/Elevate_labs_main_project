# 🚀 Elevate Labs DevOps Project — CI/CD Pipeline with Docker & GitHub Actions  

## 👤 Author
**S. Kamal Krishna Kumar**  
Batch #05 — DevOps Intern at **Elevate Labs**  

## 🎯 Objective
To design and deploy a **fully automated CI/CD pipeline** for a professional web application using **GitHub Actions** and **Docker**, running entirely on a **local environment (no cloud required)**.

The pipeline builds the application, runs automated tests, packages it as a Docker image, and deploys locally using Docker Compose — all in a seamless automated flow.

---

## 🧩 Project Overview

This project is a **Smart Calculator Web App** featuring:
- A responsive UI with light/dark theme toggle 🌗  
- Core math operations (Add, Subtract, Multiply, Divide)
- Additional features such as:
  - Age calculator (DOB-based)
  - Unit conversions (time, weight, temperature)
  - Date difference calculator
  - Percentage and square root calculations
- Built using **Node.js (Express)** for backend and **HTML/CSS/JS** for frontend.

---

## ⚙️ Tech Stack & Tools Used

| Category | Tools |
|-----------|-------|
| **Frontend** | HTML, CSS, JavaScript |
| **Backend** | Node.js, Express.js |
| **Containerization** | Docker, Docker Compose |
| **CI/CD Automation** | GitHub Actions |
| **Testing** | Node.js test scripts |
| **Version Control** | Git & GitHub |
| **Deployment** | Local Docker Desktop (no cloud needed) |

---

## 🛠️ Folder Structure
ElevateLabs_Mainproject/
1. app.js # Backend logic (Express API + Static hosting)
2. Dockerfile # Image build instructions
3. docker-compose.yml # Local deployment setup
4. package.json # Node dependencies
5. public/ # Frontend (index.html, style.css, script.js)
6. screenshots/ # Output and CI/CD screenshots
7. .github/workflows/ci-cd.yml # GitHub Actions CI/CD workflow

## 🧠 CI/CD Workflow Explanation

This project implements a **fully automated pipeline** using GitHub Actions:

### 🔹 Continuous Integration (CI)
1. Triggered automatically whenever code is pushed to the `main` branch.  
2. Builds the Node.js app and runs test cases.  
3. Validates Docker build using `Dockerfile`.  

### 🔹 Continuous Deployment (CD)
1. Logs in securely to **Docker Hub** using encrypted GitHub Secrets.  
2. Builds a Docker image  
3. Pushes the image automatically to Docker Hub.  
4. The image can then be deployed locally or pulled anywhere.


### 🔹 Build and Run Locally
```bash
docker-compose up --build
docker pull kamalkumar25/elevate-calculator:latest
docker run -p 9090:8080 kamalkumar25/elevate-calculator
*Access the app at*: http://localhost:9090
