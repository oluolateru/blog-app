import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Welcome to Blog App
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
          </p>
          <Link href="/blog">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Explore Articles
            </Button>
          </Link>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}
