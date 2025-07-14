# Rondo Commemorative Plaza Brick Road Site

This project was built by Jonah Zimmer, overseen by Katie Frye and Professor Getiria Onsongo. It is a monorepo containing a React application and an Express backend, designed to display and manage the commemorative bricks at the Rondo Commemorative Plaza.

## Getting Started

To get the project running locally, you'll need to set up the frontend and backend services separately.

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later recommended)
- [npm](https://www.npmjs.com/)

### Frontend Setup

1.  Navigate to the `react-app` directory:
    ```bash
    cd react-app
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  To run the development server:
    ```bash
    npm run dev
    ```
    This will start the webpack development server and open the site in your default browser.

4.  To create a production build:
    ```bash
    npm run build
    ```

### Backend Setup

1.  Navigate to the `server` directory:
    ```bash
    cd server
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  The server uses Supabase for some of its database interactions. You will need to set up a `.env` file in the `server` directory with your Supabase credentials. See `server/supabase.ts` for the required environment variables.
4.  Start the server:
    ```bash
    node index.js
    ```
    For development, you might want to use a tool like `nodemon` to automatically restart the server on file changes.

## Deployment with Vercel

This monorepo is configured for deployment on [Vercel](https://vercel.com/). The `vercel.json` file in the root directory handles the build and routing configuration.

When you push to your connected Git repository, Vercel will automatically:
1.  Build the `react-app` and serve it as a static site.
2.  Deploy the `server` as a serverless function.
3.  Route any requests to `/api` to the serverless function.

## Project Structure

The project is organized into two main parts: a `react-app` for the frontend and a `server` for the backend.

```
.
├── react-app/
│   ├── dist/             # Build output for the React app
│   ├── pages/
│   │   ├── about/        # Components for the About page
│   │   ├── admin/        # Components for the Admin dashboard
│   │   ├── bricks/       # Components for the Bricks page
│   │   │   ├── scrolling/ # Scrolling view components
│   │   │   └── static/    # List view components
│   │   └── report/       # Components for reporting issues
│   ├── public/
│   │   ├── aboutImages/  # Images for the About page
│   │   ├── panels/       # Images for the brick panels
│   │   │   ├── big/      # High-resolution panel images
│   │   │   └── small/    # Low-resolution panel images
│   ├── styles/           # CSS stylesheets
│   └── webpack.config.js # Webpack configuration
├── server/
│   ├── admin/            # Backend logic for admin features
│   ├── bricks/           # Backend logic for brick data
│   ├── report/           # Backend logic for reports
│   ├── index.js          # Main Express server file
│   └── supabase.ts       # Supabase client configuration
├── vercel.json           # Vercel deployment configuration
└── README.md
```

## Brick Data

All the data for the commemorative bricks is stored in Supabase and accessed via the Express backend.

### Brick Data Schema and Layout

Each brick in Supabase has the following structure:
-   `panel`: The panel number the brick is in front of (1-13). Numbers outside this range are for bricks not in front of a main panel.
-   `row`: The row number (1-15), with row 1 being closest to the panels.
-   `col`: The column number (0-9) within a panel section.
-   `namingYear`: The year the brick was named.
-   `inscriptionLine1`, `inscriptionLine2`, `inscriptionLine3`: The three lines of text on the brick. Empty strings should be used for unused lines.
-   `purchaser`: The name of the person or group who purchased the brick.
-   `section`: An optional section identifier. Use an empty string if not applicable.