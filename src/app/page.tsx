import { Bot, Gavel, Music, Palette, Shield, Database, Smile, PartyPopper } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CommandReference from "@/components/command-reference";
import ChronoBotModel from "@/components/chrono-bot-model";
import { Logo } from "@/components/logo";

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
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo />
            <p className="text-xl font-bold font-headline">ChronoBot</p>
          </div>
          <Button>
            Add to Discord
          </Button>
        </div>
      </header>
      
      <main className="flex-1">
        <section className="container grid lg:grid-cols-2 gap-12 items-center py-20 md:py-32 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex flex-col gap-4">
            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter">
              The All-in-One Discord Bot
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Meet ChronoBot. Enhance your server with advanced music, powerful moderation, and full automation in one sleek package.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button size="lg" className="font-bold">Add to Discord</Button>
              <Button size="lg" variant="outline">Learn More</Button>
            </div>
          </div>
          <div className="w-full h-[400px] lg:h-[500px]">
             <ChronoBotModel />
          </div>
        </section>

        <section id="features" className="py-20 md:py-32 bg-secondary/50">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <h2 className="font-headline text-3xl md:text-4xl font-bold">Everything Your Server Needs</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                ChronoBot is packed with features to create a vibrant and secure community.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, i) => (
                <Card key={feature.title} className="bg-card/50 backdrop-blur-sm transform hover:-translate-y-2 transition-transform duration-300 ease-in-out shadow-lg" style={{ animationDelay: `${i * 100}ms` }}>
                  <CardHeader className="flex flex-col items-center text-center gap-4">
                    {feature.icon}
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="commands" className="py-20 md:py-32">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <h2 className="font-headline text-3xl md:text-4xl font-bold">Command Reference</h2>
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
