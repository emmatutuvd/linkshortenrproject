---
description: Read this file describes the data fetching strategy for the project.
---

# Data Fetching Guidelines

This document outlines the data fetching strategy for our project. It provides guidelines on how to fetch data efficiently and effectively while maintaining code readability and performance.

## 1. Use Server components for Data Fetching

In Next.js, ALWAYS use server component for datafetching. NEVER use client component for data fetching.

## 2. Data Fetching Methods

ALWAYS use the helpper functions in the /data directory to fetch data. NEVER fetch data directly in the component.

All helper functions in the /data directory should use Drizzle ORM for database interactions.
