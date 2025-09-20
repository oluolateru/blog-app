# Deployment Guide

## Vercel Deployment (Recommended)

This application is optimized for deployment on Vercel.

### Quick Deploy

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Deploy with default settings

### Manual Setup

1. Install Vercel CLI:
\`\`\`bash
npm i -g vercel
\`\`\`

2. Login to Vercel:
\`\`\`bash
vercel login
\`\`\`

3. Deploy:
\`\`\`bash
vercel
\`\`\`

### Environment Variables

No additional environment variables are required for basic functionality. The SQLite database will be created by running the following commands.

1. Drizzle Generate Database:
\`\`\`bash
npm run db:generate
\`\`\`

2. Drizzle Migrate Database:
\`\`\`bash
npm run db:migrate
\`\`\`

3. Database Seeding:
\`\`\`bash
npm run db:seed
\`\`\`

## Alternative Deployment Options

### Docker

Create a `Dockerfile`:

\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN npm install --legacy-peer-deps

RUN npm run build

RUN npm run db:generate

RUN npm run db:migrate

RUN npm run db:seed

EXPOSE 3000

CMD ["npm", "start"]
\`\`\`

Build and run:
\`\`\`bash
docker build -t blog-app .
docker run -p 3000:3000 blog-app
\`\`\`

### Traditional Hosting

1. Install Packages
\`\`\`bash
npm install --legacy-peer-deps
\`\`\`

2. Build the application:
\`\`\`bash
npm run db:generate
\`\`\`

3. Build the application:
\`\`\`bash
npm run db:migrate
\`\`\`

4. Build the application:
\`\`\`bash
npm run db:seed
\`\`\`

5. Build the application:
\`\`\`bash
npm run build
\`\`\`

6. Start the production server:
\`\`\`bash
npm start
\`\`\`

The application will be available on port 3000.

## Database Considerations

For production deployments, consider:

- Using PostgreSQL or MySQL instead of SQLite
- Setting up proper database backups
- Implementing connection pooling
- Adding database monitoring

## Performance Monitoring

Consider adding:
- Vercel Analytics (already included)
- Error tracking (Sentry)
- Performance monitoring
- Uptime monitoring
