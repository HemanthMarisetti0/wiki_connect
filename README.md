# Wikipedia Search React App

A beautiful Wikipedia search app built with React, React Query, and Material-UI (MUI).  
It features debounced live search, clean UI, and a sticky footer.

---

## Features

- Debounced search input for efficient queries  
- Display Wikipedia search results with snippets  
- Loading spinner while fetching  
- Error message on fetch failure  
- Clear search button inside input  
- Sticky footer always visible with developer credit  
- Responsive and accessible design

---

## Live Preview

Try the live demo here:  
[https://684695b017cd2bbb56f9b766--imaginative-gingersnap-7eff86.netlify.app/](https://684695b017cd2bbb56f9b766--imaginative-gingersnap-7eff86.netlify.app/)

---

## Getting Started

### Prerequisites

- Node.js (v14 or above recommended)  
- npm or yarn package manager

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/HemanthMarisetti0/wiki_connect.git
   cd wiki_connect

### Install dependencies:

bash
Copy
Edit
npm install
# or
yarn install

### Run the development server:

bash
Copy
Edit
npm start
# or
yarn start
Open your browser and visit http://localhost:3000

### Build for Production
To create an optimized production build, run:

bash
Copy
Edit
npm run build
# or
yarn build
The build files will be generated in the build/ directory. You can deploy these static files to any static hosting service such as Netlify, Vercel, GitHub Pages, or your own server.

### Technologies Used
React

React Query

Material-UI (MUI)

Wikipedia REST API

### Project Structure
src/api/api.ts — API call to Wikipedia

src/SearchResults.tsx — Component rendering search results

src/Wikipedia.tsx — Main app component with search input and state management

Other standard React files (index.tsx, App.tsx, etc.)

### License
This project is open source and free to use.

### Author
Developed by Hemanth


   
