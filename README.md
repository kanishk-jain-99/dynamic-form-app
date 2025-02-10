# Dynamic Form Renderer

This project is a **React application** built with **Vite** that dynamically renders forms based on a JSON configuration. It supports various field types, validation, and conditional rendering using **Redux-Form** for state management.

---

## 🚀 Getting Started

### 1️⃣ **Clone the Repository**

```sh
git clone https://github.com/kanishk-jain-99/dynamic-form-app.git
cd <project_folder>
```

### 2️⃣ **Install Dependencies**

```sh
npm install
```

### 3️⃣ **Run the Application**

```sh
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📝 Configuring the Form with `formConfig.json`

The form is generated dynamically based on `src/config/formConfig.json`. You can modify this file to customize your form.

### **Example JSON Structure:**

```json
[
  {
    "name": "username",
    "type": "text",
    "label": "Username",
    "required": true,
    "minLength": 3
  },
  {
    "name": "email",
    "type": "email",
    "label": "Email",
    "required": true,
    "validate": "email"
  },
  {
    "name": "subscribe",
    "type": "checkbox",
    "label": "Subscribe to Newsletter"
  },
  {
    "name": "newsletterType",
    "type": "select",
    "label": "Newsletter Type",
    "options": ["Daily", "Weekly", "Monthly"],
    "dependsOn": "subscribe"
  }
]
```

### **Supported Field Types:**

✅ Text, Email, Password, Date, Number, Tel, URL, Textarea  
✅ Radio, Checkbox, Select, File Upload, Color Picker

---

## 🔄 Checking Conditional Rendering

Some fields only appear based on conditions. For example:

- **"Newsletter Type"** is visible **only if** "Subscribe to Newsletter" is checked.

To test this:

1. Open the form.
2. Check the **"Subscribe to Newsletter"** checkbox.
3. Observe that the **"Newsletter Type"** dropdown appears.

---

## ✅ Running Tests

This project includes Jest tests to validate form rendering and functionality.

### Run all tests:

```sh
npm test
```

### Run a specific test file:

```sh
npm test -- src/components/DynamicForm.test.jsx
```

---

## 📂 Project Structure

```
├── src/
│   ├── components/
│   │   ├── DynamicForm.jsx   # Main form component
│   │   ├── DynamicForm.test.jsx  # Unit tests
│   ├── config/
│   │   ├── formConfig.json   # Form configuration file
│   ├── index.css
│   ├── main.jsx
│   ├── App.jsx
├── public/
├── package.json
├── README.md
```

---

## 🌎 Deployment

This app is deployed using **Vercel**.

URL: [text](https://dynamic-form-app-1kec.vercel.app/)

```

---
```
