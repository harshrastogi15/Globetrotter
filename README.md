

# **📌 Globetrotter**
Game - Guess the Destination

🚀 **Live Demo**: https://globetrotter-y2jb.vercel.app/

---

## **📌 Features**
✅ **Guess the Destination:**  Get 1–2 cryptic clues and select from multiple choices.
✅ **Real-time Feedback:** 🎉 Confetti for correct answers, 😢 Sad-face for wrong ones.
✅ **Track Score:** Displays correct & incorrect answers.
✅ **Challenge a Friend:** Generate an invite link with a dynamic image.

---

## **📌 Tech Stack**
### **Frontend**
- **React (with Vite)**
- **Tailwind CSS**
- **Axios** – API communication
- **React Router** – Navigation

### **Backend**
- **Node.js & Express**
- **MongoDB**

---

## **📌 Installation & Setup**
### **1️⃣ Clone the Repository**
```sh
git clone repo_url
cd Globetrotter
```

### **2️⃣ Install Dependencies**
#### **Frontend**
```sh
cd frontend
npm install
```
#### **Backend**
```sh
cd backend
npm install
```

### **3️⃣ Configure Environment Variables**
Create a **`.env`** file in the **backend** folder:
```env
URL_DB=
PORT=
```

Create a **`.env`** file in the **Frontend** folder:
```env
VITE_API_URL
```

### **4️⃣ Start the Development Servers**
#### **Run Backend**
```sh
cd backend
npm start
```
#### **Run Frontend**
```sh
cd frontend
npm run dev
```

Now visit: **`http://localhost:5173`** 🚀

---

## **📌 API Endpoints**
| Method | Endpoint | Description |
|--------|----------|-------------|
| **POST** | `/api/v1/register` | Register a new user
| **POST** | `/api/v1/question` | Generate a question |
| **POST** | `/api/v1/answer` | Validate an answer |

---

## **📌 Future Improvements**
🔹 **Level** – Variation in Number of Clue
🔹 **User Login** – maintain user score and provide progress
---
