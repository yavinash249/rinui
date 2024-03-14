This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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
# Installation

To install the required dependencies, run:

- `framer-motion`: A popular animation library for React, allowing you to create smooth and interactive animations.
- `clsx`: A tiny utility for constructing `className` strings conditionally.
- `tailwind-merge`: A utility function that merges Tailwind CSS class names together.

# Installing Axios

To install the `axios` library, run the following command in your project's root directory:

## What is Axios?

Axios is a popular JavaScript library used for making HTTP requests from the browser or Node.js. It provides a simple and consistent interface for sending asynchronous HTTP requests to REST endpoints and performing CRUD operations.

## Using Axios with GitHub API

Once you've installed Axios, you can import it into your React application and use it to fetch data from the GitHub API. Here's an example of how you might fetch a user's profile information:

```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GithubUser = ({ username }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [username]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img src={userData.avatar_url} alt={userData.name} />
      <h2>{userData.name}</h2>
      <p>{userData.bio}</p>
    </div>
  );
};

export default GithubUser;
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


