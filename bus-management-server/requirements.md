# Bus Management System

The project is an FYP for students which is directed for students and administration to manage their bus routes, payments and schedule. 

- Node.js
- MongoDB
- TypeScript

## Models

- departments
- students
- drivers
- admin
- buses
- routes
- support

### Department

- departmendId
- title

### student

- studentId
- name: String
- department: Department
- systemId (rollno): String
- email: String
- password: String
- phone: String
- gender: 'male'|'female'
- photo: Image
- assignedBus: Bus
- slipPhoto: Image
- paymentVerified: boolean

### driver

- driverId
- name
- phone
- photo

### bus

- busId
- busName
- capacity
- assignedRoute

### routes

- routeId
- routeNumber
- stops [geo-point]

## stops


## Feedback 

- feedbackId 
- title
- status
- message

## Platforms

- Admin Dashboard
- Student Dashboard


## Functionality 

- requestAccessForStudent()
- slipUploadThenAdminVerified()
- feedback()

## Revision 

- SupportTicketMessageStatus() - show status |active|progress|closed|
- CreateStudentSignUp() -> Student select Route -> Route will have a bus.
- studentPortalNotWorking - (fix)
- addSelectDeparmentInStudent()  ===X===
- addSorting()  ===X===
- DashboardStatistics() ===X===
- bug=> busesRouteLoading() ===X===
