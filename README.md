# 🛒 Techno Store Frontend

An e-commerce frontend project built with **Next.js** and **TypeScript**, featuring product display, fast search, pagination, shopping cart, and a mock-based authentication (login/register) system.

---

## ✨ Features

* ⚡ UI built with **Next.js 16** and **React 19**
* 🔗 Dynamic routes for product pages
* 🔍 Live product search with instant results
* 📄 Product pagination
* 🛍️ Shopping cart with **localStorage** persistence
* 💸 Discounted products support with total price calculation including discounts
* 🧪 **MSW (Mock Service Worker)** for API mocking
* 🚀 Quick setup using **pnpm**

---

## 🧰 Technologies

* ⚛️ Next.js
* ⚛️ React
* 🟦 TypeScript
* 🎨 Tailwind CSS
* 🧪 MSW (Mock Service Worker)
* 🧩 Context API for cart management
* 📝 React Hook Form + Yup for form validation
* 🎞️ Framer Motion and GSAP for animations
* 🌐 Axios for HTTP requests

---

## 📁 Project Structure

* 📂 `src/app/` – main application directory

  * 🏠 `(main)` – main shop section

    * 🛒 `cart` – shopping cart page
    * 🏬 `store` – product listing page
    * 🔍 `Search.tsx` – smart search component
    * 🧠 `context/ShoppingCartContext.tsx` – cart state management and persistence
    * 🧱 `components/` – shared components like `TopHeader`, `ProductListWithPagination`, `AddToCart`
  * 🔐 `(auth)/login` – login / register pages

* 🧪 `mocks/` – mock data and MSW handlers

* 📦 `public/` – static assets and `mockServiceWorker.js`

---

## ⚙️ Setup

### 📥 Install dependencies

```bash
pnpm install
```

### 💻 Run development server

```bash
pnpm dev
```

### 🏗️ Build the project

```bash
pnpm build
```

### 🚀 Run production build

```bash
pnpm start
```

### 🧹 Run ESLint

```bash
pnpm lint
```

### 📤 Export static build

```bash
pnpm export
```

---

## 🧪 Mock Data & API

This project uses **MSW (Mock Service Worker)** for fast development and simulates the following endpoints:





## 🧪 Mock API Endpoints


### 📦 Products

* `GET /products`

### 🎞️ Carousel

* `GET /carousel`
* `GET /carousel/:id`

### 🖼️ Product Slider

* `GET /productslider`
* `GET /productslider/:id`


### 🧾 Users

* `POST /api/users/register`
* `GET /api/users`
* `GET /api/users/by-slug/:slug`
* `GET /api/users/check-email`
Product and user data are stored in `mocks/data.ts`.

---

## ⚠️ Important Notes

* 🛒 Shopping cart is managed using Context API and stored locally in `localStorage`
* 🔍 Search page works with local data from `mocks/data.ts`
* 🔗 Product URLs are generated using Persian slugs

---

## 🚀 Future Improvements

* 💳 Add a checkout/payment page
* 🔐 Implement real backend authentication for login/register
* 🎛️ Add advanced filters and sorting
* ⚡ Optimize rendering for large product lists

---

## 🧑‍💻 Development Environment

* 🟢 Node.js >= 18.17.0
* 📦 pnpm