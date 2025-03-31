import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { HeroSection } from "@/components/home/hero-section";
import { CategoriesSection } from "@/components/home/categories-section";
import { BestDealsSection } from "@/components/home/best-deals-section";
import { ShoppingListsSection } from "@/components/home/shopping-lists-section";
import { PriceComparisonTool } from "@/components/home/price-comparison-tool";
import { RelatedProductsSection } from "@/components/home/related-products-section";
import { NewsletterSection } from "@/components/home/newsletter-section";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6 mb-16 md:mb-0">
        <HeroSection />
        <CategoriesSection />
        <BestDealsSection />
        <ShoppingListsSection />
        <PriceComparisonTool />
        <RelatedProductsSection />
        <NewsletterSection />
      </main>
      
      <Footer />
      <MobileNavigation />
    </div>
  );
}
