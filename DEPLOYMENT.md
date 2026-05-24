# HerbalSync Deployment

Deploy the backend on Render and the frontend on Vercel.

## 1. MongoDB Atlas

1. Create a MongoDB Atlas cluster.
2. Create a database user and password.
3. In Network Access, allow Render to connect. For a student/demo deploy, `0.0.0.0/0` is the simplest option.
4. Copy the connection string and replace the username, password, and database name.

Example:

```text
mongodb+srv://username:password@cluster.mongodb.net/herbalsync
```

## 2. Render Backend

Create a new Web Service from this repo.

```text
Root Directory: Server
Environment: Node
Build Command: npm install
Start Command: npm start
Health Check Path: /health
```

Add these environment variables in Render:

```text
MONGO_URI=<your MongoDB Atlas connection string>
JWT_SECRET=<a long random secret>
CLIENT_URL=<your Vercel frontend URL>
NODE_VERSION=20
```

After deploy, open:

```text
https://your-render-service.onrender.com/health
```

The response should include `status: "ok"`. The database field may show `connecting` briefly while Atlas connects.

## 3. Vercel Frontend

Import the same repo in Vercel.

```text
Root Directory: client
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

Add this environment variable in Vercel:

```text
VITE_API_URL=https://your-render-service.onrender.com/api
```

Deploy Vercel once after the Render backend URL is ready.

## 4. Final Render CORS Update

After Vercel gives you the final frontend URL, go back to Render and set:

```text
CLIENT_URL=https://your-vercel-app.vercel.app
```

If you also want local development allowed, use a comma-separated value:

```text
CLIENT_URL=http://localhost:5173,https://your-vercel-app.vercel.app
```

Redeploy the Render service after changing environment variables.
