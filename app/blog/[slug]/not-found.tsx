import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <FileX className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Article Not Found
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
          The article you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <div className="space-x-4">
          <Link href="/blog">
            <Button>Browse Articles</Button>
          </Link>
          <Link href="/">
            <Button variant="outline">Go Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
