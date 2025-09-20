import { db } from "@/lib/db"
import { articles, authors } from "@/lib/db/schema"
import { eq, and } from "drizzle-orm"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, User, ArrowLeft } from "lucide-react"
import type { Metadata } from "next"
import sanitizeHtml from "sanitize-html"
import { Footer } from "@/components/footer"

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

async function getArticleBySlug(slug: string) {
  const article = await db
    .select({
      id: articles.id,
      title: articles.title,
      slug: articles.slug,
      description: articles.description,
      content: articles.content,
      publishDate: articles.publishDate,
      isPublished: articles.isPublished,
      authorFirstName: authors.firstName,
      authorLastName: authors.lastName,
      authorEmail: authors.email,
      authorId: authors.id,
    })
    .from(articles)
    .innerJoin(authors, eq(articles.authorId, authors.id))
    .where(and(eq(articles.slug, slug), eq(articles.isPublished, true)))
    .limit(1)

  return article[0] || null
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    return {
      title: "Article Not Found",
    }
  }

  return {
    title: `${article.title} - Blog App`,
    description: article.description,
    authors: [{ name: `${article.authorFirstName} ${article.authorLastName}` }],
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.publishDate,
      authors: [`${article.authorFirstName} ${article.authorLastName}`],
    },
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const sanitizedContent = sanitizeHtml(article.content, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
    allowedAttributes: {
      a: ["href", "target"],
      img: ["src", "alt"],
    },
  })

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
              <Link href="/blog" className="text-foreground hover:text-primary transition-colors">
                Articles
              </Link>
              <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/blog" className="inline-block mb-8">
            <Button variant="outline" className="gap-2 bg-transparent">
              <ArrowLeft className="h-4 w-4" />
              Back to Articles
            </Button>
          </Link>

          {/* Article Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {article.authorFirstName} {article.authorLastName}
                  </p>
                  {article.authorEmail && <p className="text-sm text-muted-foreground">{article.authorEmail}</p>}
                </div>
              </div>

              <div className="flex items-center space-x-2 text-muted-foreground">
                <CalendarDays className="h-5 w-5" />
                <span>
                  {new Date(article.publishDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <Card>
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                <div className="text-xl text-muted-foreground mb-8 text-pretty leading-relaxed">
                  {article.description}
                </div>

                <div
                  className="text-foreground leading-relaxed space-y-6 prose prose-lg prose-slate max-w-none
                    prose-headings:text-foreground prose-headings:font-bold
                    prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4
                    prose-h2:text-2xl prose-h2:mt-6 prose-h2:mb-3
                    prose-h3:text-xl prose-h3:mt-4 prose-h3:mb-2
                    prose-p:mb-4 prose-p:text-pretty prose-p:leading-relaxed
                    prose-a:text-primary prose-a:underline hover:prose-a:text-primary/80
                    prose-strong:text-foreground prose-strong:font-semibold
                    prose-em:text-foreground prose-em:italic
                    prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
                    prose-pre:bg-muted prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
                    prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic
                    prose-ul:list-disc prose-ul:ml-6 prose-ol:list-decimal prose-ol:ml-6
                    prose-li:mb-2"
                  dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="mt-12 text-center">
            <Link href="/blog">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Read More Articles
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
