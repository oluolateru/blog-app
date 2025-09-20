import { authors, articles } from "@/lib/db/schema"

describe("Database Schema", () => {
  it("should have correct author table structure", () => {
    expect(authors).toBeDefined()
    expect(authors.id).toBeDefined()
    expect(authors.firstName).toBeDefined()
    expect(authors.lastName).toBeDefined()
    expect(authors.email).toBeDefined()
  })

  it("should have correct article table structure", () => {
    expect(articles).toBeDefined()
    expect(articles.id).toBeDefined()
    expect(articles.title).toBeDefined()
    expect(articles.slug).toBeDefined()
    expect(articles.description).toBeDefined()
    expect(articles.content).toBeDefined()
    expect(articles.authorId).toBeDefined()
    expect(articles.publishDate).toBeDefined()
    expect(articles.isPublished).toBeDefined()
  })
})
