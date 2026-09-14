---
description: Read this file to understand how to fetch data from the database in this project.
---

# Data Fetching Guidelines

This document outlines the best practices and guidelines for fetching data from the database in this project. It is important to follow these guidelines to ensure consistency, performance, and maintainability of the codebase.

## 1. Use server components for data fetching

- In Next.js, ALWAYS prefer using server components for data fetching. NEVER use client components for data fetching.

## 2. Data fetching methods

- ALWAYS use the helper methods in `/data` directory for data fetching. NEVER fetch data directly in your components.
- All helper functions in `/data` directory should use DRIZZLE ORM for database interactions.
