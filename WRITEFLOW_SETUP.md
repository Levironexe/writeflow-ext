# WriteFlow Chat Setup Guide

This guide explains how to run the WriteFlow Chrome extension with the embedded Next.js chat application.

## Architecture

The Chrome extension's side panel embeds the Next.js WriteFlow Chat app via an iframe. This means you need to run **two separate processes**:

1. **Next.js App** (pages/side-panel/writeflow-chat) - The chat interface
2. **Chrome Extension** - The extension that embeds the chat app

## Setup Instructions

### 1. Set Up the Next.js App

Navigate to the writeflow-chat directory:

```bash
cd pages/side-panel/writeflow-chat
```

Install dependencies (uses pnpm):

```bash
pnpm install
```

Set up your environment variables:

```bash
cp .env.example .env.local
```

Edit `.env.local` and configure your environment variables (API keys, database, etc.)

Run database migrations:

```bash
pnpm db:migrate
```

Start the Next.js development server:

```bash
pnpm dev
```

The app should now be running at `http://localhost:3000`

### 2. Set Up the Chrome Extension

Go back to the extension root directory:

```bash
cd ../../..  # Back to the root of chrome-extension-boilerplate-react-vite
```

Install dependencies:

```bash
pnpm install
```

Build and run the extension in development mode:

```bash
pnpm dev
```

### 3. Load the Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top-right)
3. Click "Load unpacked"
4. Select the `dist` folder from your extension directory
5. Open the side panel to see the WriteFlow Chat app embedded

## Configuration

### Changing the Next.js App URL

By default, the extension connects to `http://localhost:3000`. To change this:

Edit the `.env` file in the extension root (all custom variables must start with `CEB_`):

```bash
CEB_NEXT_APP_URL=http://localhost:3000
```

Or for production:

```bash
CEB_NEXT_APP_URL=https://your-deployed-app.vercel.app
```

**Note:** This boilerplate requires all custom environment variables to start with `CEB_` prefix.

## Development Workflow

1. **Start the Next.js app** in one terminal:
   ```bash
   cd pages/side-panel/writeflow-chat && pnpm dev
   ```

2. **Start the extension dev server** in another terminal:
   ```bash
   pnpm dev
   ```

3. **Reload the extension** in Chrome when you make changes to extension code
4. **Refresh the side panel** to see Next.js app changes (or use Next.js fast refresh)

## Troubleshooting

### CORS Issues

If you encounter CORS errors, you may need to configure the Next.js app to allow iframe embedding. Add this to your Next.js config:

```js
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'ALLOW-FROM chrome-extension://*',
          },
        ],
      },
    ];
  },
};
```

### Iframe Not Loading

1. Make sure the Next.js app is running at `http://localhost:3000`
2. Check the browser console for errors
3. Verify the `VITE_NEXT_APP_URL` environment variable is set correctly

### Authentication Issues

The Next.js app uses NextAuth. Make sure your `.env.local` has the required auth configuration:

```bash
AUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000
```

## Production Deployment

### Deploy the Next.js App

Deploy the writeflow-chat app to Vercel, Netlify, or your hosting provider:

```bash
cd pages/side-panel/writeflow-chat
pnpm build
```

### Update Extension Configuration

Update the extension's `.env` to point to your production URL:

```bash
CEB_NEXT_APP_URL=https://your-app.vercel.app
```

### Build the Extension

```bash
pnpm build
```

The production-ready extension will be in the `dist` folder.

## Notes

- The iframe has `clipboard-read` and `clipboard-write` permissions enabled
- Communication between the extension and the Next.js app can be done via `postMessage` if needed
- The Next.js app needs to be running for the side panel to work
