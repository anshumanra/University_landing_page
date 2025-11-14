📘 University Landing Pages – Lead Generation Project

This project is a complete multi-page university lead generation system built using HTML, CSS, and JavaScript, designed with modern UI/UX and full responsiveness. It features two landing pages for Lovely Professional University (LPU) and Chandigarh University (CU), with dynamic data loading and a working lead submission backend using Pipedream Webhook API.

🚀 Features
🏠 Homepage

Black-themed home page

Large university logos in white square cards

Clean descriptions

Clickable buttons to access each landing page

🎓 Landing Pages (LPU & CU)

Unique themes

LPU: Orange + Black

CU: Red + Black

Big centered logo in a white square box

University overview, courses, placements

Download Brochure button

Dynamic course-wise fee modal (from JSON API)

📝 Lead Capture Form

Fields: Name, Email, Phone, State, Course, Intake, Consent

10-digit phone validation

Consent checkbox required

Submits using Pipedream webhook

Shows success or error messages without page refresh

🗂️ API Integration

Two static JSON APIs:

lpu-data.json

cu-data.json

Used to dynamically load:

University details

Courses

Fees

Placement information

🛠️ Tech Stack

HTML5

CSS3 (Custom themes + responsive)

JavaScript (ES6)

JSON APIs

Pipedream Webhook API

GitHub Pages (SSL hosting)

📁 Project Structure
project-root/
├── index.html
├── index-lpu.html
├── index-cu.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── api/
│   ├── lpu-data.json
│   └── cu-data.json
└── assets/
    ├── logos/
    └── brochures/

🌐 Hosting

The project is optimized for deployment using GitHub Pages, which automatically provides SSL-secured hosting.

🔗 Pipedream Integration

Each form sends data to a configurable webhook URL:

window.PIPEDREAM_ENDPOINT = "https://eot2syr5kiupuao.m.pipedream.net";


You can forward leads to:

Google Sheets

Email

CRM

Databases

Or any API

📦 How to Run Locally

Clone the repository

Open index.html in a browser

Ensure JSON files are in the /api/ folder

Update your Pipedream endpoint in both landing pages

Deploy to GitHub Pages for SSL hosting