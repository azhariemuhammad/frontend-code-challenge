# frontend-code-challenge

App built using React + Typescript + Vite.
Visit the site [angloeastern-fe-challenge](https://angloeastern.azhariemuhammad.com)

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

## System Design

![Screen Shot 2024-08-02 at 9 55 58 AM](https://github.com/user-attachments/assets/70874f04-4a2e-4d35-bc3a-3111c47effb5)


## File structure

````
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

````
