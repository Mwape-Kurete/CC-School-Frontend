![GitHub-CC-Banner-frontend](https://github.com/user-attachments/assets/bef07f6e-db73-48d5-8368-57846617eec9)
---
<h4 align="center"> A cross-platform desktop school management system</h4>

--- 
<h1 align="center">Code & Cloud School</h1>
<h4 align="center">Frontend Repo • <a href="https://github.com/KurtSchwimmbacher/CC_School_Backend">Backend Repo</a></h4>
<details>
<summary>📑 <strong>Table of Contents</strong> (Click to expand)</summary>

1. [**About The Project**](#about-the-project)  
   ↳ 1.1 [Project Description](#11-project-description)  
   ↳ 1.2 [Built With](#12-built-with)  
2. [**Getting Started**](#getting-started)  
   ↳ 2.1 [Prerequisites](#21-prerequisites)  
   ↳ 2.2 [How to Install](#22-how-to-install)  
3. [**Features & Usage**](#features--usage)  
4. [**Demonstration**](#demonstration)  
5. [**Architecture / System Design**](#architecture--system-design)  
6. [**Unit Testing & User Testing**](#unit-testing--user-testing)  
7. [**Highlights & Challenges**](#highlights--challenges)  
8. [**Roadmap & Future Implementations**](#roadmap--future-implementations)  
9. [**Contributing & Licenses**](#contributing--licenses)  
10. [**Authors & Contact Info**](#authors--contact-info)  
11. [**Acknowledgements**](#acknowledgements)  
</details>

<hr style="height:2px; border:none; background:#F0F1A5;">

## About The Project   
A Modern, Cross-Platform School Management System


### 1.1 Project Description 
Our system is a .NET Electron-powered desktop application designed to streamline administrative workflows, enhance academic coordination, and improve communication for Cloud & Code Academy. Built with Vue.js for a responsive frontend and Electron for seamless cross-platform compatibility (Windows, macOS, Linux), it centralises critical operations into one intuitive interface:
 
 * Student Management: Simplified enrolment
 * Academic Tools: Assignment creation
 * Dynamic Scheduling: Timetable generation
 * Real-Time Communication: Announcement broadcasting
 * Course Administration: Effortless course creation, updates, and curriculum adjustments.

By unifying these features, the system reduces manual overhead, minimises errors, and empowers educators to focus on teaching, while ensuring students and administrators stay synchronised.


### 1.2 Built With 

**Frontend**  
![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D) ![Pinia](https://img.shields.io/badge/Pinia-FFD02F?style=for-the-badge&logo=pinia&logoColor=000) ![Composition API](https://img.shields.io/badge/Composition_API-999999?style=for-the-badge)

**Backend**  
![.NET Core](https://img.shields.io/badge/.NET%20Core-512BD4?style=for-the-badge&logo=dotnet&logoColor=white) ![REST API](https://img.shields.io/badge/REST_API-FF5733?style=for-the-badge) ![Entity Framework](https://img.shields.io/badge/Entity_Framework-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)

**Desktop**  
![Electron](https://img.shields.io/badge/Electron-47848F?style=for-the-badge&logo=electron&logoColor=white) ![Cross-Platform](https://img.shields.io/badge/Cross_Platform-0178D7?style=for-the-badge&logo=windows11&logoColor=white)

**Database**  
![SQL Server](https://img.shields.io/badge/SQL_Server-CC2927?style=for-the-badge&logo=microsoftsqlserver&logoColor=white) ![Secure](https://img.shields.io/badge/Secure-4EA94B?style=for-the-badge&logo=securityscorecard&logoColor=white)


## Getting Started
### 2.1 Prerequisites

Ensure you have the following installed before running the app:

- ![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=nodedotjs&logoColor=white) (v18 or higher)
- ![Vue-3](https://img.shields.io/badge/Vue-3-4FC08D?style=flat-square&logo=vuedotjs&logoColor=white)
- ![Electron](https://img.shields.io/badge/Electron-47848F?style=flat-square&logo=electron&logoColor=white)

> 💡 Recommended: Use a Node version manager like [nvm](https://github.com/nvm-sh/nvm) for managing Node versions across projects.

---
### 2.2 How to Install 
1. Clone the repository:
   ```
   git clone https://github.com/Mwape-Kurete/CC-School-Frontend.git
   cd CC-School-Frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
4. Run the app:
   ```
   npm run dev    # Dev server (Vite)
   npm run electron  # Launch desktop app
   ```
---
## **API Integration**  
### **Key API Endpoints**  
All API calls are handled through a centralised `api.js` file and their relevant service files. 

| Feature          | Endpoint                                      | Method | 
|------------------|-----------------------------------------------|--------|
| **Authentication** | `/${role}/login`                              | POST   | 
|                  | `/${role}/register`                           | POST   | 
| **Announcements** | `/courses/${courseId}/announcements`          | POST   | 
| **Assignments**   | `/assignments`                                | POST   | 
|                  | `/assignments/${assignmentId}/publish`        | PATCH  | 
| **Students**      | `/student/${studentNumber}/enroll`            | PUT    | 
| **Majors**        | `/majors/getMajorsByStudentId/${studentId}`   | GET    | 

---
## Features & Usage
### **🚀 Core Features by Role**  

#### **👨‍💼 Administrators**  
- **📅 Timetable Management**  
  - Generate conflict-free class timetables and exam schedules.  
  - Automatically resolve room/lecturer clashes.  
- **👩‍🏫 Lecturer Management**  
  - Create and assign lecturers to courses.  
- **🎓 Enrollment Oversight**  
  - Verify/approve student enrollments.  

---

#### **👩‍🏫 Lecturers**  
- **🏫 Class Management**  
  - Upload course materials (PDFs, videos, links).  
- **📝 Assignments & Grading**  
  - Create assignments with deadlines.   
- **📢 Announcements**  
  - Post updates to entire classes or specific students.  

---

#### **🎓 Students**  
- **📚 Enrollment Portal**  
  - Select majors during registration.  
- **🗓️ Schedule Access**  
  - View personalised class timetable.  
- **📤 Assignment Submissions**  
  - Upload files (PDF, DOCX, ZIP).  

---

### **🎨 Usage Highlights**  
- **Timetable**: Avoids overlaps in rooms/lecturers during generation.  
- **Live Edit**: Lecturers can visualise, update, and upload course content with ease  

---

## Demonstration
link to our Demo video -> ![Demo Video](https://drive.google.com/file/d/10KLjwpqMqiMYzO_2HIpNvMB4rxMOCKAp/view?usp=sharing)

## Architecture / System Design
### System Design Diagram (the layered approach) 
![WhatsApp Image 2025-06-10 at 21 52 58_2b984a57](https://github.com/user-attachments/assets/4105bef9-5f3c-4983-b45a-4f46e27e50b6)

### System UI Design 
![IMG-20250610-WA0074](https://github.com/user-attachments/assets/c2b28af0-5b34-425d-8a38-007589c99936)
![IMG-20250610-WA0075](https://github.com/user-attachments/assets/2ba37842-d8aa-4f59-a5c7-fc4ea45a1bd8)
![IMG-20250610-WA0076](https://github.com/user-attachments/assets/95f2e6a3-3f68-4f8d-b9d4-60a964d89e00)
![IMG-20250610-WA0079](https://github.com/user-attachments/assets/b64f3add-9265-468d-b9b7-37531adfd6ab)
![IMG-20250610-WA0077](https://github.com/user-attachments/assets/6e6d82c4-7195-4f7b-aff3-73382dd9f5b1)
![IMG-20250610-WA0078](https://github.com/user-attachments/assets/e9b88358-6d85-4110-8bfd-0525ce95876d)

## Unit Testing & User Testing
### ✅ Unit Testing

> Unit testing is currently under development. We plan to use [Vitest](https://vitest.dev/) with [Vue Test Utils](https://test-utils.vuejs.org/) to ensure component-level reliability across the Vue 3 frontend.

Once implemented, unit tests will validate:
- Form interactions (e.g. login, course submission)
- Role-based rendering (admin/lecturer/student)
- API service calls and error handling

### 👥 User Testing

We conducted user feedback rounds using [Google Forms](https://www.google.com/forms/about/), targeting:
- **Students**: to evaluate assignment workflows and timetable usability
- **Lecturers**: for course material management, assignment generation, and announcement management
- **Administrators**: for enrollment verification and timetable generation
## Highlights & Challenges
Throughout the development of the CC School Management System 

### Highlights 
| Feature            | Highlights                                   | 
|--------------------|----------------------------------------------|
| **Authentication** | 2 Factor Authentication                      |
| **Assignments**    | Accessibility Feature, Rich Text Editor      | 
| **Timetable**      | Visual Representation | 
| **User**           | extending user types           |
| **Avatar Api**     | Smart Api to create unique user avatars|

### Challenges 
| Feature            | Challenges                                   | 
|--------------------|----------------------------------------------|
| **2 Factor Authentication**    | Email Services                   |
| **Live Course Edit**    | Partial Patching                 |
| **Accessibility Feature**    | Webkit Recognition                |
| **Assignment Course Relationship**    | Fetching the relevent relationship details      |
| **Assignment File Uploads**    | Storing Filees in backend      |

## Roadmap & Future Implementations

### **🌐 Integration Enhancements**  
- **Video Conferencing**: Integrate Google Meet/Zoom for virtual classrooms.  
- **Calendar Sync**: Sync with Google Calendar/iCal for deadline reminders.  

### **👨‍💼 Administrators**  
- **Analytics Dashboard**:  
  - Real-time insights on student performance, course popularity, and resource utilisation.  
- **Automated Teaching Assignments**:  
  - Algorithm-based distribution of teaching loads based on lecturer availability/expertise.  

### **👩‍🏫 Lecturers**  
- **Resource Library**:  
  - Centralised repository for lecture recordings, slides, and reading materials.  
- **Automated Grading**:  
  - AI-assisted grading for quizzes/MCQs (e.g., regex-based answer matching).  
- **Attendance Automation**:  
  - Facial recognition/QR codes for automated attendance marking.  

### **🎓 Students**  
- **Course Recommendations**:  
  - ML-driven suggestions based on past performance/interests.  
- **Smart Planner**:  
  - Unified view of timetables, deadlines, and personal events (with notifications).  
- **Quiz Hosting**:  
  - In-app quiz creation/submission with instant feedback.  

---

## Contributing & Licenses
> This project was developed as part of a university course requirement and is currently private and non-commercial.  
No external contributions are being accepted at this time. 

## Authors & Contact Info
Built with ❤️ by:
- **Brilu Hlongwane**
- **Kurt Schwimmbacher**
- **Mwape Kurete**
- **Ngozi Ojukwu**

  
## Acknowledgements 
Special thanks to:
- **Vue.js** and the open-source community for powerful tools and documentation
- **Microsoft .NET Team** for backend scalability support
- **Code & Cloud Academy** lecturers and students for real-world testing and feedback
- Contributors of [Electron](https://www.electronjs.org/) for enabling seamless cross-platform desktop apps
- [Google Forms](https://forms.google.com) for collecting valuable user insights
