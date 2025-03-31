import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function NewsletterSection() {
  return (
    <section className="mb-10">
      <div className="bg-secondary/10 rounded-xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0 md:mr-8">
            <h2 className="font-sans text-xl font-bold text-secondary mb-2">Get Weekly Deals in Your Inbox</h2>
            <p className="text-gray-600">Subscribe to our newsletter and never miss the best grocery deals.</p>
          </div>
          <div className="flex flex-1 max-w-md">
            <Input
              type="email"
              placeholder="Your email address"
              className="flex-1 py-3 px-4 rounded-l-lg border-y border-l border-gray-300"
            />
            <Button className="bg-secondary hover:bg-secondary/90 text-white font-semibold py-3 px-6 rounded-r-lg">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
