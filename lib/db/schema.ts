import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"
import { relations } from "drizzle-orm"

export const authors = sqliteTable("authors", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email"),
})

export const articles = sqliteTable("articles", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  content: text("content").notNull(),
  authorId: integer("author_id")
    .notNull()
    .references(() => authors.id),
  publishDate: text("publish_date").notNull(),
  isPublished: integer("is_published", { mode: "boolean" }).notNull().default(false),
})

// Relations
export const authorsRelations = relations(authors, ({ many }) => ({
  articles: many(articles),
}))

export const articlesRelations = relations(articles, ({ one }) => ({
  author: one(authors, {
    fields: [articles.authorId],
    references: [authors.id],
  }),
}))

// Types
export type Author = typeof authors.$inferSelect
export type NewAuthor = typeof authors.$inferInsert
export type Article = typeof articles.$inferSelect
export type NewArticle = typeof articles.$inferInsert
