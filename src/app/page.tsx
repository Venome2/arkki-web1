import { Music, Palette, Shield, Zap, Gamepad2, PencilRuler } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/hero";
import { FeatureCards } from "@/components/feature-cards";
import homeContent from '@/lib/content/home.json';
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Particles } from "@/components/particles";


export default function Home() {
  const { hero, featuresSection } = homeContent;

  const icons: { [key: string]: React.ReactNode } = {
    Music: <Music className="h-8 w-8 text-primary" />,
    Palette: <Palette className="h-8 w-8 text-primary" />,
    Shield: <Shield className="h-8 w-8 text-primary" />,
    Zap: <Zap className="h-8 w-8 text-primary" />,
    Gamepad2: <Gamepad2 className="h-8 w-8 text-primary" />,
    PencilRuler: <PencilRuler className="h-8 w-8 text-primary" />,
  };

  const featuresWithIcons = featuresSection.features.map(feature => ({
    ...feature,
    icon: icons[feature.icon],
  }));

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Particles className="absolute inset-0 -z-10" />
      <Header />
      
      <main className="flex-1">
        <Hero 
          badge={hero.badge}
          title={hero.title}
          description={hero.description}
          ctaPrimary={hero.ctaPrimary}
        />

        <section id="features" className="py-20 md:py-32 bg-secondary/20">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="font-headline text-3xl md:text-5xl font-extrabold">{featuresSection.title}</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                {featuresSection.description}
              </p>
            </div>
            <FeatureCards features={featuresWithIcons} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
