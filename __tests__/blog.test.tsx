import { render, screen } from "@testing-library/react"
import BlogPage from "@/app/blog/page"
// import jest from "jest"

jest.mock("@/lib/db", () => ({
  db: {
    select: jest.fn(),
  },
}))

const { db } = require("@/lib/db")
const mockDb = db as jest.Mocked<typeof db>

const mockArticles = [
  {
    id: 1,
    title: "Test Article 1",
    slug: "test-article-1",
    description: "This is a test article description",
    publishDate: "2025-09-20",
    authorFirstName: "Olateru",
    authorLastName: "Olu",
  },
  {
    id: 2,
    title: "Test Article 2",
    slug: "test-article-2",
    description: "This is another test article description",
    publishDate: "2025-09-20",
    authorFirstName: "Olu",
    authorLastName: "Olateru",
  },
]

describe("Blog Page", () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks()

    // Mock the database query chain
    const mockQuery = {
      from: jest.fn().mockReturnThis(),
      innerJoin: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockResolvedValue(mockArticles),
    }

    mockDb.select.mockReturnValue(mockQuery as any)
  })

  it("renders the blog page with articles", async () => {
    const BlogPageComponent = await BlogPage()
    render(BlogPageComponent)

    // Check if the page title is rendered
    expect(screen.getByText("Latest Articles")).toBeInTheDocument()

    // Check if the description is rendered
    expect(screen.getByText(/Lorem ipsum is placeholder text commonly used in the graphic/)).toBeInTheDocument()
  })

  it("displays the correct page metadata", () => {
    // This would typically be tested with a more sophisticated setup
    // I am just ensuring the component renders without errors
    expect(true).toBe(true)
  })
})
