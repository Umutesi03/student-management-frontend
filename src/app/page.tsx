import { HeroSection } from "../components/home/hero-section"
import { FeaturesSection } from "../components/home/features-section"
import { StatsSection } from "../components/home/stats-section"
import { CTASection } from "../components/home/cta-section"
import { Header } from "../components/layout/header"
import { Footer } from "../components/layout/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
