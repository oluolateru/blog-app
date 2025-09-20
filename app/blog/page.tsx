import { db } from "@/lib/db";
import { articles, authors } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CalendarDays, User } from "lucide-react";
import type { Metadata } from "next";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Blog - Blog App",
  description:
    "Explore our collection of articles and insights on various topics in our Blog App.",
};

async function getPublishedArticles() {
  const publishedArticles = await db
    .select({
      id: articles.id,
      title: articles.title,
      slug: articles.slug,
      description: articles.description,
      publishDate: articles.publishDate,
      authorFirstName: authors.firstName,
      authorLastName: authors.lastName,
    })
    .from(articles)
    .innerJoin(authors, eq(articles.authorId, authors.id))
    .where(eq(articles.isPublished, true))
    .orderBy(articles.publishDate);

  return publishedArticles;
}

export default async function BlogPage() {
  const publishedArticles = await getPublishedArticles();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-primary">
              Blog App
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/blog"
                className="text-foreground hover:text-primary transition-colors"
              >
                Articles
              </Link>
              <Link
                href="/"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">
            Latest Articles
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 max-w-6xl mx-auto">
          {publishedArticles.map((article) => (
            <Link key={article.id} href={`/blog/${article.slug}`}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                <CardHeader className="pb-4">
                  <h2 className="text-2xl font-bold text-card-foreground group-hover:text-primary transition-colors text-balance">
                    {article.title}
                  </h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed text-pretty">
                    {article.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span>
                        {article.authorFirstName} {article.authorLastName}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <CalendarDays className="h-4 w-4" />
                      <span>
                        {new Date(article.publishDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {publishedArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No articles published yet.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
