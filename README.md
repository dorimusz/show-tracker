# Fullstack Api Exam Project 2

## Fullstack Api Exam Project: Series Tracker Website

## Summary of the project:
1. The project's goal is to make it possible for registered users to organize and keep track of their TV shows and series in an administrative system. The following functions should be implemented:
    - Register and login
    - Having a user profile with personalized dashboard
    - Browse unlimited series by name, which needs reliable APIs to fetch and load the list of series.
    - Browse by streaming sources: Netflix, Amazon, Hulu, and iTunes
    - Open and view a series' details, aired and upcoming episodes, which needs reliable APIs to fetch and load series information.
    - Request adding a new show
    - There is a page where the upcoming episodes are listed (potential function) - calendar view(?)
    - A user can add a series to its private list/watchlist (only for himself, not visible for other users)
    - The user can track the seen episodes connected to a series (show progress) - watchlist
    - The user will be able to mark watched and track aired episodes from the watchlist
        
**External API:**
https://www.tvmaze.com/

2. User stories (*persona + need + purpose*):
    - User story #1: User1 is a casual TV show watcher. Fancies series since +15 years, however is bad at keeping track of the episodes. Sometimes skips more than one season or just stops at the middle of it for years. Later cannot know where to pick it up, what episode is the next one.
    - User story #2: User2 tries to track a series that cannot be found anywhere, also tries to figure out when the next episode will be aired. The user is able to request a new series to appear on the site (if possible any ways).
    - User story #3: For user3 watching series is like a hobby. Beside tracking his show progression, also interested in finding new ones, moreover to see a seasons' details at one place like title, seasons and episodes with their air date, duration, source or channel and status.

3. Software Architecture (the core components)
    1. Web server: where code is executed (e.g.Azure, Amazon) - firstly it's gonna be hosted locally.
    2. Application Dependency Manager: Manually or using Docker containers (dependencies as black boxes with clearly defined rules of cooperation) + environment for the application code - Node.js
    3. Database: To this project the most fitting database type would be a relational one, however it's a criteria using a non-relational one, it'll be MongoDB


4. High fidelity wireframe: https://www.figma.com/file/GxlmaqZrrNTeK2ZhSQSAmR/Track-My-Series?node-id=0%3A1



## Story

In the second half of your final project, you will need to implement your application using the plan you've already created. When you are finished with your project, you will need to send the repository to the mentor team, at least 1 week before the final.

## What are you going to learn?

- how to create a containerized application

## Tasks

1. Implement your project, fulfilling every requirement that has been given and send the repository link to the mentors.
    - The project is completed
    - The mentor team has the link to the repository

## General requirements

- The application is an administrative system
- The application uses model-service-component architecture
- MongoDB base, with at least 5 entities (e.g. product, order, customer, delivery, bill ...)
- NodeJS API, with at least 10 endpoints (e.g. /api/user, /api/product, /api/order ...)
- Angular or React frontend, with at least 5 pages (Bootstrap/Material or other templates are allowed)
- The application is dockerized, it can be run from a container
- The client side is responsive
- Some parts of the interface are only accessible after log in (JWT authentication)
- Every element of the application is created with clean code principles
- For every API path, there is at least 1 test written
- At least 1-1 Unit and Integration test
- Swagger based API documentation
- Markdown dokumentation (readme) in the repository, containing the steps to install, how to configure and purpose of the application

## Hints



## Background materials


