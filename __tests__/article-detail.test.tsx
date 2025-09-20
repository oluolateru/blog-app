import { render, screen } from "@testing-library/react"
import ArticlePage from "@/app/blog/[slug]/page"

jest.mock("@/lib/db", () => ({
  db: {
    select: jest.fn(),
  },
}))

// Mock Next.js navigation
jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}))

const { db } = require("@/lib/db")
const mockDb = db as jest.Mocked<typeof db>

const mockArticle = {
  id: 1,
  title: "Test Article",
  slug: "test-article",
  description: "This is a test article description",
  content: "This is the full content of the test article.",
  publishDate: "2025-09-20",
  isPublished: true,
  authorFirstName: "Olu",
  authorLastName: "Olateru",
  authorEmail: "oluolat@test.com",
}

describe("Article Detail Page", () => {
  beforeEach(() => {
    jest.clearAllMocks()

    const mockQuery = {
      from: jest.fn().mockReturnThis(),
      innerJoin: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue([mockArticle]),
    }

    mockDb.select.mockReturnValue(mockQuery as any)
  })

  it("renders article content correctly", async () => {
    const params = Promise.resolve({ slug: "test-article" })
    const ArticlePageComponent = await ArticlePage({ params })
    render(ArticlePageComponent)

    // Check if article title is rendered
    expect(screen.getByText("Test Article")).toBeInTheDocument()

    // Check if author name is rendered
    expect(screen.getByText("Olu Olateru")).toBeInTheDocument()

    // Check if back button is rendered
    expect(screen.getByText("Back to Articles")).toBeInTheDocument()
  })
})
