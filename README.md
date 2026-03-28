# Event Management API

## Project Overview

### What does this API do?
This API allows users to schedule events. It allows you to reteive a list of all active events, get events by ID,
change event details, create events, and remove them. Its a comphrehensive backend api to adjust events.

### What problem does it solve?
It solves the problom of overcomplication. It handles the list of information for you. It cleans up to formating to understand how to create an event.
t provides a controller to trim and clean up event listings as you need and see fit.

### Who is it for?
It would be used by organizers of stadiums or events planners. Events like comic-con at the MTS building and such.
People who organize city events could use it. Also charity wings of major corperations would be able to use it.

---

## Installation Instructions
Run a "git clone" command on this repo https://github.com/rrc-w2025-mturzak/evergreen_august_assignment_3

### Prerequisites
- VsCode (most recent version)
- Node.js (v22.21.1 or newer)
- npm (10.9.4 or newer)
- Postman or another API client (optional)

### Environment variable setup
SERVER_URL=http://localhost:3000/api/v1 is the base url for all endpoints
env file also has the access key for the firebase database to connect

How to start the server
run this in terminal: npm run start

Here are endpoint doc's for easy understanding while server is running:
http://localhost:3000/api-docs

Full documentation at:
https://github.com/rrc-w2025-mturzak/evergreen_august_assignment_3

## These are all your endpoints while the server is running:

### GET
### /health
Health check endpoint

### GET
### /events
### Retrieve all events example:
{
  "message": "Events retrieved",
  "count": 17,
  "data": [
    {
      "id": "5KJucGDRTLA8uLw7SN3q",
      "name": "Small New Event",
      "date": "2026-12-25T09:00:00.000Z",
      "capacity": 50,
      "registrationCount": 25,
      "status": "active",
      "category": "networking",
      "createdAt": "2026-03-01T02:06:12.173Z",
      "updatedAt": "2026-03-01T02:06:12.173Z"
    },
    {
      "id": "JH3dUhsikOCO2ajWSP5T",
      "name": "Big Valid Event",
      "date": "2026-12-25T09:00:00.000Z",
      "capacity": 300,
      "registrationCount": 25,
      "status": "active",
      "category": "general",
      "createdAt": "2026-03-01T02:06:29.710Z",
      "updatedAt": "2026-03-01T02:06:29.710Z"
    } ...

### POST
### /events
### Create a new event body example:
{
  "name": "Tech Conference 2026",
  "date": "2026-12-25T09:00:00.000Z",
  "capacity": 200,
  "category": "conference",
  "registrationCount": 0,
  "status": "active"
}

expected result:
{
  "message": "Event created",
  "data": {
    "id": "oJFb2f4hjwXvpZaB3155",
    "name": "Tech Conference 2026",
    "date": "2026-12-25T09:00:00.000Z",
    "capacity": 200,
    "registrationCount": 0,
    "status": "active",
    "category": "conference",
    "createdAt": "2026-03-28T02:13:10.281Z",
    "updatedAt": "2026-03-28T02:13:10.281Z"
  }
}

Note that when making an event you must do so following these rules:

### Name
A string representing the event’s name. Must be at least 3 characters long. 

Required

Example: "Tech Conference 2026"

### Date
The date and time when the event will occur. Must be a valid ISO 8601 date string. Must be in the future (cannot be today or in the past)

Required

Example: "2026-12-25T09:00:00.000Z"

### Capacity
The maximum number of attendees the event can hold. Must be a number. Must be an integer. Must be at least 5

Required

Example: 200

### RegistrationCount
How many people are currently registered for the event. Must be an integer. Optional. If provided, it cannot exceed the capacity

Example: 25

### Status
The current state of the event.

Optional

Must be one of:

"active"
"cancelled"
"completed"

Example: "active"

### Category
The type of event.

Optional

Must be one of:

"conference"
"workshop"
"meetup"
"seminar"
"general"
"networking"

Example: "conference"

### GET
### /events/{id}
### example: http://localhost:3000/api/v1/events/evt_000001
Retrieve a single event by ID example:

  "status": "success",
  "data": {
    "id": "evt_000001",
    "name": "Tech Conference 2026",
    "date": "2026-12-25T09:00:00.000Z",
    "capacity": 200,
    "registrationCount": 50,
    "status": "active",
    "category": "conference",
    "createdAt": "2026-02-28T01:50:57.242Z",
    "updatedAt": "2026-02-28T01:50:57.242Z"
  },
  "message": "Event retrieved"
}

### PUT
### /events/{id}
Update an existing event following the POST parameters example result:
{
  "message": "Event updated",
  "data": {
    "id": "evt_000001",
    "name": "Updated Event Name",
    "date": "2026-12-25T09:00:00.000Z",
    "capacity": 300,
    "registrationCount": 25,
    "status": "active",
    "category": "general",
    "createdAt": "2026-02-28T01:50:57.242Z",
    "updatedAt": "2026-03-01T02:06:12.173Z"
  }
}

### DELETE
### /events/{id}
Delete an event by ID expected results
{
  "message": "Event deleted"
}
