# Blog App

A Blog App application built with Next.js 14, TypeScript, and Drizzle ORM.

## Features

- **Modern Stack**: Next.js 14 with App Router, TypeScript, Drizzle ORM, SQLite
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **SEO Optimized**: Proper metadata, Open Graph tags, and semantic HTML
- **Database Relations**: Proper foreign key relationships between authors and articles
- **Dynamic Routing**: Slug-based article URLs
- **Error Handling**: Custom 404 pages and error boundaries
- **Testing**: Comprehensive test suite with Jest and React Testing Library
- **Type Safety**: Full TypeScript coverage with proper type definitions

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Database**: SQLite with Drizzle ORM
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: shadcn/ui
- **Testing**: Jest + React Testing Library
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone <repository-url>
   cd blog-app
   \`\`\`

2. **Install dependencies** (this is required before running any database commands):
   \`\`\`bash
   npm install
   \`\`\`

3. **Generate and run database migrations** (creates the database tables):
   \`\`\`bash
   npm run db:generate
   npm run db:migrate
   \`\`\`

4. **Seed the database** with sample data:
   \`\`\`bash
   npm run db:seed
   \`\`\`

5. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Troubleshooting

**If you encounter `tsx: command not found` error:**

- Make sure you've run `npm install` first to install all dependencies
- The `tsx` package is required to run TypeScript scripts and is included in devDependencies

**If you encounter `no such table: articles` error:**

- Make sure you've run `npm run db:migrate` before `npm run db:seed`
- The migrate command creates the database tables, which must exist before seeding data
- Run the commands in this exact order: `db:generate` → `db:migrate` → `db:seed`

## Database Schema

### Authors Table

- `id` - Primary key (auto-increment)
- `firstName` - Author's first name
- `lastName` - Author's last name
- `email` - Author's email (optional)

### Articles Table

- `id` - Primary key (auto-increment)
- `title` - Article title
- `slug` - URL-friendly identifier
- `description` - Article summary
- `content` - Full article content
- `authorId` - Foreign key to authors table
- `publishDate` - Publication date
- `isPublished` - Boolean flag for published status

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate database migrations
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Drizzle Studio
- `npm run db:seed` - Seed database with sample data
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## Project Structure

\`\`\`
├── app/ # Next.js App Router pages
│ ├── blog/ # Blog routes
│ │ ├── [slug]/ # Dynamic article pages
│ │ └── page.tsx # Blog listing page
│ ├── globals.css # Global styles and design tokens
│ ├── layout.tsx # Root layout
│ └── page.tsx # Home page
├── components/ # Reusable UI components
│ └── ui/ # shadcn/ui components
├── lib/ # Utility functions and configurations
│ └── db/ # Database configuration and schema
├── scripts/ # Database scripts
├── **tests**/ # Test files
└── README.md
\`\`\`

## Features Implemented

### Required Features 

- [x] Working Next.js app with App Router
- [x] TypeScript usage throughout
- [x] Drizzle ORM schema and type definitions
- [x] Blog listing page (/blog) with article cards
- [x] Article detail page (/blog/[slug]) with dynamic routing
- [x] Database relationships between articles and authors
- [x] Clean code structure and organization
- [x] Responsive design with Tailwind CSS
- [x] Seeded data with 3 articles and 2 authors

### Bonus Features ⭐

- [x] Error handling with custom 404 pages
- [x] Loading states and proper async handling
- [x] SEO metadata and Open Graph tags
- [x] Comprehensive test suite
- [x] Clear README with setup instructions
- [x] Ready for Vercel deployment

## Testing

The project includes comprehensive tests covering:

- Component rendering and functionality
- Database schema validation
- Page routing and navigation
- Error handling scenarios

Run tests with:
\`\`\`bash
npm run test
\`\`\`

## Deployment

See the [Deployment Guide](./DEPLOYMENT.md) for instructions.

## License

This project is created for assessment purposes.
