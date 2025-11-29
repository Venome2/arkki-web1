import { Bot, Gavel, Music, Palette, Shield, Database, Smile, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import CommandReference from "@/components/command-reference";
import { Logo } from "@/components/logo";
import { HeroAnimation } from "@/components/hero-animation";
import { FeatureCards } from "@/components/feature-cards";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: <Palette className="h-8 w-8 text-primary" />,
      title: "Aesthetic UI",
      description: "Engaging and beautiful user interfaces powered by Canvas for a unique server experience.",
    },
    {
      icon: <Music className="h-8 w-8 text-primary" />,
      title: "Advanced Music System",
      description: "High-quality music streaming using Kazagumo and Shoukaku for lossless audio.",
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Anti-Nuke & Automod",
      description: "Top-tier security features to protect your server from raids and malicious users.",
    },
    {
      icon: <Gavel className="h-8 w-8 text-primary" />,
      title: "Powerful Moderation",
      description: "A comprehensive suite of moderation tools to manage your community effectively.",
    },
    {
      icon: <Bot className="h-8 w-8 text-primary" />,
      title: "Full Automation",
      description: "Auto-responders, auto-react, voice roles, and more to automate server tasks.",
    },
    {
      icon: <Database className="h-8 w-8 text-primary" />,
      title: "Persistent Data",
      description: "All settings, profiles, and playlists are securely stored using MongoDB.",
    },
    {
      icon: <Smile className="h-8 w-8 text-primary" />,
      title: "Fun & Engaging",
      description: "Keep your community active with fun modules, games, and social commands."
    },
    {
      icon: <PartyPopper className="h-8 w-8 text-primary" />,
      title: "Custom Profiles",
      description: "Playlist-enabled welcome messages and customizable user profile cards."
    }
  ];

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-br from-primary/20 via-transparent to-transparent -z-10" />
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
        <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo />
            <p className="text-xl font-bold font-headline">ChronoBot</p>
          </div>
          <Button>
            Add to Discord <ArrowRight />
          </Button>
        </div>
      </header>
      
      <main className="flex-1">
        <section className="container text-center py-24 md:py-40">
          <HeroAnimation />
        </section>

        <section id="features" className="py-20 md:py-32 bg-secondary/80">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <h2 className="font-headline text-3xl md:text-5xl font-extrabold">Everything Your Server Needs</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                ChronoBot is packed with features to create a vibrant and secure community.
              </p>
            </div>
            <FeatureCards features={features} />
          </div>
        </section>

        <section id="commands" className="py-20 md:py-32">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <h2 className="font-headline text-3xl md:text-5xl font-extrabold">Command Reference</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Find all the commands you need to master ChronoBot.
              </p>
            </div>
            <CommandReference />
          </div>
        </section>
      </main>

      <footer className="py-6 border-t border-border/40">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} ChronoBot Showcase. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
