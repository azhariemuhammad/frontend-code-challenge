# frontend-code-challenge

Visit the site [angloeastern-fe-challenge](https://angloeastern.azhariemuhammad.com)

Tech Stack for this mini App:

Frontend:

- React with TypeScript: For building the user interface
- Vite: For faster development
- Chakra UI: For ready-made components
- React Query: For getting and managing data

Backend:

- Express.js: For creating the API

Database:

- JSON file: For storing data

Deployment:

- Digital Ocean: I put the app on my own server at Digital Ocean

Why I chose these:

1. Vite: It's fast and easy to set up. It makes the development process quicker.
2. Chakra UI: I know how to use it well. It has many components I can use to build the app quickly.
3. React Query: It makes it easy to get data from the server and keep it updated. It also helps make the app faster.
4. Express.js: It's simple to use and can create an API quickly.
5. JSON file for data: For a small app like this, it's simple and good enough. We don't need a complex database.
6. Digital Ocean: I chose to deploy on my own server because it gives me more control. It's also a good way to show I can set up and manage a server.

Things to think about:

- Using a JSON file for data works for this small app, but it might not be good for bigger apps.
- This setup is good for making the app quickly, which is important for a take-home test. For a real app that many people would use, we might need to add more things.
- Deploying on my own server means I'm responsible for keeping it running and secure. This takes more work but shows I can handle the whole process of making an app work online.

[Caching Implementation:](https://github.com/azhariemuhammad/frontend-code-challenge/blob/b4a49acf7490bd4f133fed79ce891285de85c882/server/src/controllers/issues.ts#L8)

To improve performance and reduce unnecessary file reads, I implemented a simple in-memory caching system for the issues data. Here's how it works:

1. The first time the data is requested, it's read from the file and stored in memory.
2. For subsequent requests, the system checks if the file has been modified since the last read.
3. If the file hasn't changed, the cached data is used, avoiding a file read operation.
4. If the file has been modified, the system reads the new data from the file and updates the cache.

This approach balances performance and data freshness. It speeds up response times for frequent requests while ensuring that any changes to the data file are reflected in the application. The cache is stored in the server's memory, so it's fast to access but doesn't persist between server restarts.

This caching method is particularly effective for our use case, where the data doesn't change very often but is read frequently. It significantly reduces the number of file system operations, which can be slow compared to memory access.

## Features

- View past issue
- Create new issue
- Update issue
- Delete issue
- Search issue by title

## Getting Started

- Clone this repo
- run `npm install`
- run `npm run dev:client`

To run server

- `cd server`
- `npm install`
- `npm run dev`

To run test

- `npm run test`

## System Design

![Screen Shot 2024-08-02 at 9 55 58 AM](https://github.com/user-attachments/assets/70874f04-4a2e-4d35-bc3a-3111c47effb5)

## File structure

```
.
├── server
│   ├── db
│   │   └── db.json
│   ├── src
│   │   ├── index.ts
│   │   ├── controllers
│   │   │   └── issues.ts
│   │   ├── models
│   │   │   └── types.ts
│   │   └── routes
│   │       └── index.ts
├── src
│   ├── components
│   │   ├── ExpandableSearch.tsx
│   │   ├── IssueComposer.tsx
│   │   ├── IssueList.tsx
│   │   └── IssueListItem.tsx
│   ├── config
│   │   └── index.ts
│   ├── hooks
│   │   └── useCreateNewIssue.ts
│   ├── pages
│   │   ├── Issues.tsx
│   │   └── index.tsx

```

## CRUD API

### GET /api/v1/issues

- Get all issues
- Response
  - Status: 200
  - Body
    ```
    {
      "issues": [
        {
          "id": "1",
          "imageUri": "https://github.com/github/explore/blob/main/topics/javascript/javascript.png?raw=true",
          "title": "Issue 1",
          "issueNumber": 1,
          "issueDate": "2023-07-01"
        },
        {
          "id": "2",
          "imageUri": "https://github.com/github/explore/blob/main/topics/javascript/javascript.png?raw=true",
          "title": "Issue 2",
          "issueNumber": 2,
          "issueDate": "2023-07-02"
        }
      ]
    }
    ```

### GET /api/v1/issues/:id

- Get issue by id
- Response
  - Status: 200
  - Body
    ```
    {
      "id": "1",
      "imageUri": "https://github.com/github/explore/blob/main/topics/javascript/javascript.png?raw=true",
      "title": "Issue 1",
      "issueNumber": 1,
      "issueDate": "2023-07-01"
    }
    ```

### POST /api/v1/issues

- Create new issue
- Request
  - Body
    ```
    {
      "imageUri": "https://github.com/github/explore/blob/main/topics/javascript/javascript.png?raw=true",
      "title": "Issue 1",
      "issueNumber": 1,
      "issueDate": "2023-07-01"
    }
    ```
- Response
  - Status: 201
  - Body
    ```
    {
      "issues": [
        {
          "id": "1",
          "imageUri": "https://github.com/github/explore/blob/main/topics/javascript/javascript.png?raw=true",
          "title": "Issue 1",
          "issueNumber": 1,
          "issueDate": "2023-07-01"
        }
      ]
    }
    ```

### PUT /api/v1/issues/:id

- Update issue
- Request
  - Body
    ```
    {
      "id": "1",
      "imageUri": "https://github.com/github/explore/blob/main/topics/javascript/javascript.png?raw=true",
      "title": "Issue 1",
      "issueNumber": 1,
      "issueDate": "2023-07-01"
    }
    ```
- Response
  - Status: 200
  - Body
    ```
    {
      "issues": [
        {
          "id": "1",
          "imageUri": "https://github.com/github/explore/blob/main/topics/javascript/javascript.png?raw=true",
          "title": "Issue 1",
          "issueNumber": 1,
          "issueDate": "2023-07-01"
        }
      ]
    }
    ```

### DELETE /api/v1/issues/:id

- Delete issue by id
- Response
  - Status: 200
  - Body
    ```
    {
      "issues": [
        {
          "id": "1",
          "imageUri": "https://github.com/github/explore/blob/main/topics/javascript/javascript.png?raw=true",
          "title": "Issue 1",
          "issueNumber": 1,
          "issueDate": "2023-07-01"
        }
      ]
    }
    ```
