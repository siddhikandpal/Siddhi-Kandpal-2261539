Here’s an enhanced and **attractive `README.md`** for your GitHub project. It's styled with clean **headings**, **badges**, **code blocks**, **checklists**, and **highlighted sections** to make it **eye-catching and professional**, perfect for evaluators or recruiters browsing your repository:

---

```markdown
# 🚀 URL Shortener Application

A **React-based web app** with a reusable **logging middleware**, built as part of a frontend evaluation for **Afford Medical Technologies**.

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue?logo=typescript)
![Material UI](https://img.shields.io/badge/UI-Material%20UI-purple?logo=mui)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🗂️ Project Structure

```

SONU\_BISHT\_2261545/
├── frontend-test-submission/      # React app (client)
│   ├── public/                    # Static files
│   ├── src/
│   │   ├── components/            # Reusable UI components
│   │   ├── pages/                 # Views/Pages (Home, Stats, etc.)
│   │   ├── utils/                 # Helper utilities
│   │   ├── App.tsx                # Main app component
│   │   └── index.tsx              # Entry point
│   ├── package.json               # Frontend dependencies
│   └── .env                       # Environment variables
└── logging-middleware/            # Custom middleware
├── logger.ts                  # Core logging logic
└── package.json               # Middleware setup

````

---

## ⚙️ Setup Instructions

### ✅ Prerequisites
- [Node.js](https://nodejs.org/) v14+
- npm v6+

### 📥 Installation

1. **Clone this repository**:
   ```bash
   git clone https://github.com/your-username/SONU_BISHT_2261545.git
   cd SONU_BISHT_2261545
````

2. **Install frontend dependencies**:

   ```bash
   cd frontend-test-submission
   npm install
   ```

3. **Install the custom logging middleware**:

   ```bash
   npm install file:../logging-middleware
   ```

4. **Set environment variables**:

   ```bash
   echo "REACT_APP_API_BASE_URL=http://20.244.56.144/evaluation-service
   REACT_APP_LOG_API=http://20.244.56.144/evaluation-service/logs" > .env
   ```

---

## ▶️ Run the Application

To start the development server:

```bash
npm start
```

Access the app at [http://localhost:3000](http://localhost:3000)

---

## ✨ Features

* 🔗 **URL Shortening** with optional custom slugs
* ⏳ **Expiry time configuration** (default: 30 minutes)
* 📊 **Analytics**: Click tracking, timestamps, location info
* 🧾 **Logging Middleware**: Integrated with external API
* 💎 **Responsive UI** using Material UI
* ❗ **Error handling & client-side validation**

---

## 🛠️ Tech Stack

| Area       | Tools Used                             |
| ---------- | -------------------------------------- |
| Frontend   | React, TypeScript, Axios, React Router |
| UI Library | Material UI                            |
| Middleware | Custom logging utility in TypeScript   |
| Env Mgmt   | `.env` file                            |

---

## 🧪 Troubleshooting

* ⚠ **TS1208**: Ensure all `.ts`/`.tsx` files use proper `import`/`export`
* 📦 **Missing Modules**: Run `npm install` in both directories
* 🌐 **API Errors**: Check `.env` URLs or your network connectivity

---

## ✅ Evaluation Requirements Checklist

* [x] React frontend app with routing
* [x] Custom logging middleware integration
* [x] Material UI responsiveness
* [x] URL shortening functionality
* [x] API communication with axios
* [x] Error handling and validations

---

## 📌 Screenshots *(Optional)*

> Add screenshots of the UI (Home, Analytics, Logs, etc.) here for a visual preview of your project.

---

## 👨‍💻 Author

**Sonu Bisht**
📧 [iamsonubisht95@gmail.com](mailto:iamsonubisht95@gmail.com)
   **OR **
   📧 [bisht95488@gmail.com](mailto:bisht95488@gmail.com)
🌍 [GitHub Profile](https://github.com/iamsonubisht)


