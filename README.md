# E-commerce Dashboard

This project is a comprehensive e-commerce dashboard built with Next.js,
designed to provide a robust and intuitive interface for managing products,
orders, coupons, and user roles. It features a modern UI, real-time data
updates, and secure authentication.

## Live Demo

Experience the dashboard live here:
[E-commerce Dashboard Live Demo](https://e-commerce-dashboard-theta.vercel.app/)

## Features

- **AI Assistant**: An integrated AI assistant capable of reading the web UI,
  performing actions on the database, and conducting web searches to assist with
  various tasks.
- **User Authentication**: Secure login and user management with different roles
  (admin, read-only).
- **Product Management**: Add, edit, and delete products with detailed
  information, including images and variations.
- **Order Management**: Track and update order statuses from pending to
  delivered.
- **Coupon Management**: Create and manage discount coupons with start and
  expiry dates.
- **User Management**: Create and manage admin and read-only users.
- **Responsive Design**: Optimized for various screen sizes.
- **Firebase Integration**: Utilizes Firebase for backend services and
  authentication.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

## Project Structure

```
├── .gitignore
├── .prettierrc
├── .vscode\
│   └── settings.json
├── README.md
├── app\
│   ├── (auth)\
│   │   ├── layout.tsx
│   │   └── log-in\
│   │       └── page.tsx
│   ├── (root)\
│   │   ├── add-coupon\
│   │   │   └── page.tsx
│   │   ├── add-product\
│   │   │   └── page.tsx
│   │   ├── coupons\
│   │   │   ├── [id]\
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── messages\
│   │   │   └── page.tsx
│   │   ├── orders\
│   │   │   ├── [id]\
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── page.tsx
│   │   ├── products\
│   │   │   ├── [id]\
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   └── settings\
│   │       └── page.tsx
│   ├── api\
│   │   └── chat\
│   │       └── route.ts
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── loading.tsx
├── cloudinary\
│   └── cloudinary.ts
├── components.json
├── components\
│   ├── AiChat.tsx
│   ├── AiChatToggler.tsx
│   ├── DateSelector.tsx
│   ├── DragAndDropInput.tsx
│   ├── Dropdown.tsx
│   ├── FormField.tsx
│   ├── InputArray.tsx
│   ├── Notification.tsx
│   ├── ProductVarieties.tsx
│   ├── Spinner.tsx
│   ├── UI\
│   │   ├── alert-dialog.tsx
│   │   ├── button.tsx
│   │   ├── calendar.tsx
│   │   ├── card.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── popover.tsx
│   │   ├── select.tsx
│   │   ├── sheet.tsx
│   │   ├── sonner.tsx
│   │   └── themeToggle.tsx
│   ├── coupons\
│   │   ├── CouponsPageContext.tsx
│   │   ├── CouponsTable.tsx
│   │   ├── TableBody.tsx
│   │   └── TableFooter.tsx
│   ├── dashboard\
│   │   ├── DashboardContextPass.tsx
│   │   ├── DataCard.tsx
│   │   ├── Filter.tsx
│   │   ├── Latest3Products.tsx
│   │   ├── LineChart.tsx
│   │   ├── LineChartContainer.tsx
│   │   ├── PiChart.tsx
│   │   └── PiChartContainer.tsx
│   ├── icons\
│   │   └── logo.tsx
│   ├── layout\
│   │   ├── nav.tsx
│   │   ├── sideNav.tsx
│   │   ├── sideNavLink.tsx
│   │   ├── userProfile.tsx
│   │   └── userProfileSkeleton.tsx
│   ├── login-form.tsx
│   ├── messages\
│   │   ├── MessageContent.tsx
│   │   ├── MessageLink.tsx
│   │   └── MessagesHolder.tsx
│   ├── orders\
│   │   ├── Filter.tsx
│   │   ├── OrderContextPass.tsx
│   │   ├── OrdersItemTable.tsx
│   │   ├── OrdersTable.tsx
│   │   ├── SearchByID.tsx
│   │   ├── TableBody.tsx
│   │   └── TableFooter.tsx
│   ├── products\
│   │   ├── DeleteAlert.tsx
│   │   ├── ProductContextPass.tsx
│   │   ├── ProductsTable.tsx
│   │   ├── SearchInput.tsx
│   │   ├── TableBody.tsx
│   │   ├── TableFooter.tsx
│   │   └── products-table-skeleton.tsx
│   ├── settings\
│   │   ├── AdminUser.tsx
│   │   ├── ReadOnlyUser.tsx
│   │   └── UpdateUser.tsx
│   └── themeProvider.tsx
├── eslint.config.mjs
├── firebase\
│   ├── admin.ts
│   └── client.ts
├── lib\
│   ├── PageContextProvider.tsx
│   ├── action\
│   │   ├── auth.action.ts
│   │   ├── coupons.action.ts
│   │   ├── messages..action.ts
│   │   ├── orders.action.ts
│   │   └── product.action.ts
│   ├── ai.tools.ts
│   ├── schemas\
│   │   └── product-schema.ts
│   ├── utils\
│   │   └── form-helpers.ts
│   └── utils.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public\
│   ├── Opior.svg
│   └── profile.svg
├── tsconfig.json
├── types\
│   └── index.d.ts
└── vercel.json
```
