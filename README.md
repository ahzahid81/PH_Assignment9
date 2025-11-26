# 🎠 ToyTopia – A Local Kids Toy Store Platform

ToyTopia is a vibrant and playful online marketplace where families can explore toys from local sellers.  
Users can browse toys, filter by category, view detailed information, and safely access protected pages using Firebase Authentication.

This project is built as part of **Assignment 09** following all requirements, including private routes, JSON data loading, dynamic titles, environment variables, and user authentication.

---

## 🔗 Live Website  
👉 **Live URL:**   https://assignment9ph.netlify.app/

## 📦 GitHub Repository  
👉 **Repository Link:** https://github.com/ahzahid81/PH_Assignment9

---

## 🚀 Features

### 🧒 Visitor Features
- Browse featured toys on the homepage  
- Explore toys with images, price, rating, and categories  
- Filter toys instantly using "Shop by Category"  
- View a responsive slider built with **Swiper.js**  
- Fully responsive on mobile, tablet, and desktop  

### 🔐 Authentication Features
- Login using **email + password**  
- Register using **email + password + name + photo URL**  
- Login using **Google Authentication**  
- Show user image + name on navbar when logged in  
- Logout anytime  
- Password validation (uppercase, lowercase, min 6 chars)  
- Forget password functionality (redirects to Gmail after email sent)  

### 🔒 Protected Routes
- **Toy Details Page** (Private)  
- **My Profile Page** (Private)  
- **Extra Private Page – Wishlist** (Private)  
- Users must log in to view protected content  
- After login → redirects back to the route they wanted  

### 🧸 Toy Features
- Toys loaded from local JSON (`toys.json`)  
- Each toy card displays:
  - Name  
  - Category  
  - Rating  
  - Price  
  - Quantity  
  - Image  
- Clicking “View More” shows full toy details  

### 🧾 Extra Features
- Dynamic page titles using `document.title`  
- 404 Page (Not Found Page)  
- Environment variables used for Firebase config  
- Unique, colorful UI built with **TailwindCSS + DaisyUI**  

---

## 📂 Pages Included

| Page | Route | Public/Private | Description |
|------|--------|----------------|-------------|
| Home | `/` | Public | Slider + Popular Toys + Categories + Extra sections |
| Login | `/login` | Public | Login form + Google login |
| Register | `/register` | Public | Register form + validation |
| Forget Password | `/forget-password` | Public | Sends password reset email |
| Toy Details | `/toy/:id` | **Private** | Full toy info + Try Now form |
| My Profile | `/my-profile` | **Private** | User info + update profile |
| Extra Page | `/extra` | **Private** | Wishlist page (Extra Private Route) |
| Not Found | `*` | Public | 404 Page |

---

## 🛠️ Technologies Used

### Frontend
- **React.js**
- **React Router DOM**
- **Tailwind CSS**
- **DaisyUI**
- **Swiper.js**

### Firebase
- **Firebase Authentication**
  - Email/Password Login
  - Google Login
  - Logout
  - Password Reset
  - Profile Update (`updateProfile`)
- **onAuthStateChanged** to keep user logged in even after refresh

---

## 📦 NPM Packages Used

- `swiper`
- `react-hot-toast`
- `firebase`
- `react-router-dom`

## 🔧 Environment Variables (Firebase)

`.env` file in the root

