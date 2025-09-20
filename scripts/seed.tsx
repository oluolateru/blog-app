import { db } from "../lib/db"
import { authors, articles } from "../lib/db/schema"

async function seed() {
  console.log("Seeding database started...")

  // Clear existing data
  await db.delete(articles)
  await db.delete(authors)

  // Insert authors
  const [author1, author2] = await db
    .insert(authors)
    .values([
      {
        firstName: "Olateru",
        lastName: "Olu",
        email: "test@t3est.com",
      },
      {
        firstName: "Devolu",
        lastName: "Olat",
        email: "dev@test.com",
      },
    ])
    .returning()

  // Insert articles
  await db.insert(articles).values([
    {
      title: "A wonderful serenity has taken possession of my entire soul",
      slug: "a-wonderful-seerinity-has-taken-possession-of-my-entire-soul",
      description: "A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.",
      content: `<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a,</p>`,
      authorId: author1.id,
      publishDate: "2025-09-20",
      isPublished: true,
    },

    {
      title: "One morning, when Gregor Samsa woke from troubled dreams",
      slug: "one-morning-when-gregor-samsa-woke-from-troubled-dreams",
      description: "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin..",
      content: `<p>One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What's happened to me?" he thought. It wasn't a dream. His room, a proper human</p>`,
      authorId: author2.id,
      publishDate: "2025-09-19",
      isPublished: true,
    },

    {
      title: "Far far away, behind the word mountains",
      slug: "far-far-away-behind-the-word-mountains",
      description: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
      content: `<h3>Far far away, behind the word mountains</h3> <p>Far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to</p>`,
      authorId: author2.id,
      publishDate: "2025-09-19",
      isPublished: true,
    },

    {
      title: "Far far away, behind the word mountains 2",
      slug: "far-far-away-behind-the-word-mountains-2",
      description: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
      content: `<h1>Far far away, behind the word mountains</h1> <p>Far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to</p>`,
      authorId: author2.id,
      publishDate: "2025-09-19",
      isPublished: false,
    }
  ])

  console.log("Database seeded successfully!")
}

seed().catch((error) => {
  console.error("Error seeding database:", error)
  process.exit(1)
})
