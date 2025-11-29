import { Music, Palette, Shield, Zap, Gamepad2, PencilRuler, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { FeatureCards } from "@/components/feature-cards";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/hero";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Particles } from "@/components/particles";

export default function Home() {
  const features = [
    {
      icon: <Music className="h-8 w-8 text-primary" />,
      title: "Music System",
      description: "High-quality, lag-free music supporting YouTube, Spotify, and more with playlists and lyrics.",
    },
    {
      icon: <Palette className="h-8 w-8 text-primary" />,
      title: "Aesthetic UI",
      description: "Canvas-based welcome banners, profile cards, and customizable templates.",
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Security & Moderation",
      description: "Advanced anti-nuke, automod for spam/mentions, and full moderation tools.",
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Automation & Roles",
      description: "Auto-responder, auto-react, auto-pfp, and voice role assignment.",
    },
    {
      icon: <Gamepad2 className="h-8 w-8 text-primary" />,
      title: "Fun & Utility",
      description: "Engaging games, memes, interactive commands, user profiles, and leveling.",
    },
    {
      icon: <PencilRuler className="h-8 w-8 text-primary" />,
      title: "Modern Tech Stack",
      description: "Built with discord.js, Kazagumo, Shoukaku, and Mongoose for performance.",
    },
  ];

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Particles className="absolute inset-0 -z-10" />
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
        <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo />
            <p className="text-xl font-bold font-headline">Arrkiii</p>
          </div>
          <div className="hidden md:block">
            <Button className="group">
              Add to Discord 
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle className="sr-only">Menu</SheetTitle>
                </SheetHeader>
                <div className="grid gap-4 py-6">
                  <div className="flex items-center gap-3">
                    <Logo />
                    <p className="text-xl font-bold font-headline">Arrkiii</p>
                  </div>
                  <Button>
                    Add to Discord <ArrowRight />
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <Hero />

        <section id="features" className="py-20 md:py-32 bg-secondary/20">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <h2 className="font-headline text-3xl md:text-5xl font-extrabold">Everything Your Server Needs</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Arrkiii is packed with features to create a vibrant and secure community.
              </p>
            </div>
            <FeatureCards features={features} />
          </div>
        </section>
      </main>

      <footer className="py-6 border-t border-border/40">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Arrkiii. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
