# Job Management System - Backend

Spring Boot REST API backend for the Job Management System with real-time job status streaming using Server-Sent Events.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Security](#security)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

This is the backend service for the Job Management System, providing:
- RESTful API endpoints for job and user management
- Real-time job status updates via Server-Sent Events (SSE)
- User authentication and authorization
- Job lifecycle management (PENDING → RUNNING → DONE/FAILED)

## 🛠️ Tech Stack

- **Java**: 17+
- **Spring Boot**: 3.x
- **Spring Framework Modules**:
  - Spring Web (REST API)
  - Spring Security (Authentication & Authorization)
  - Spring Data JPA (Database ORM)
  - Spring Validation (Input validation)
- **Database**: H2 (in-memory for development)
- **Build Tool**: Maven 3.6+
- **Architecture**: MVC Pattern with Service Layer

## 📋 Prerequisites

Ensure you have the following installed:

- **Java JDK 17 or higher**
```bash