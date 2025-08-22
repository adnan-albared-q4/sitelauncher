# Site Launcher

A web-based automation tool for managing site migration workflows between old and new instances.

## Quick Start

### Prerequisites
- Node.js 18+ (use `nvm use 22.14.0` for this project)
- npm

### Setup
1. **Switch to the correct Node version:**
   ```bash
   nvm use 22.14.0
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env.local` file in the project root with:
   ```
   # Site Launcher Login Credentials
   NEXT_PUBLIC_APP_NAME="Site Launcher"
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=admin123
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Login Credentials
- **Username:** `admin`
- **Password:** `admin123`

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Login page
│   ├── dashboard/
│   │   ├── page.tsx        # Dashboard with card-based UI
│   │   └── dashboard.css   # Dashboard-specific styles
│   └── globals.css         # Global styles with CSS variables
├── components/
│   └── cards/              # Modular card system
│       ├── faces/          # Individual card faces
│       │   ├── SiteSelectionFace.tsx
│       │   └── AddSiteFace.tsx
│       ├── manager/
│       │   └── CardManager.tsx  # Centralized card controller
│       └── SiteCard.tsx    # Site management card
public/
├── logo.svg               # Application logo
└── logo-white.svg         # White version for dark backgrounds
```

## Features

- ✅ **Login System**: Simple authentication with environment variables
- ✅ **Modular Card System**: 3D flip animations with reusable card faces
- ✅ **Site Management**: Add, select, and manage site migration projects
- ✅ **Custom CSS**: Brand-consistent styling with CSS variables
- ✅ **TypeScript**: Full type safety
- ✅ **Next.js 15**: Latest stable version with App Router

## Environment Variables

The application requires the following environment variables in a `.env.local` file:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_APP_NAME` | Application name displayed in UI | `"Site Launcher"` |
| `ADMIN_USERNAME` | Admin login username | `admin` |
| `ADMIN_PASSWORD` | Admin login password | `admin123` |

> **Security Note:** The `.env.local` file is ignored by git and should never be committed. For production deployments, set these variables in your hosting platform's environment configuration.

## Development

- **Build:** `npm run build`
- **Start Production:** `npm start`
- **Lint:** `npm run lint`

## Next Steps

This is a minimal setup. Future development will include:
- Playwright automation engine
- Workflow management
- Site migration automation
- Dashboard with real-time progress 