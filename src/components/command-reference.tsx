"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search } from "lucide-react";
import anime from "animejs";

const commands = [
  { category: "Music", name: "/play", description: "Plays a song from YouTube, Spotify, etc." },
  { category: "Music", name: "/skip", description: "Skips the current song." },
  { category: "Music", name: "/queue", description: "Shows the server's music queue." },
  { category: "Music", name: "/volume", description: "Adjusts the music volume." },
  { category: "Moderation", name: "/kick", description: "Kicks a member from the server." },
  { category: "Moderation", name: "/ban", description: "Bans a member from the server." },
  { category: "Moderation", name: "/mute", description: "Mutes a member in text channels." },
  { category: "Moderation", name: "/warn", description: "Warns a member." },
  { category: "Fun", name: "/meme", description: "Shows a random meme." },
  { category: "Fun", name: "/8ball", description: "Ask the magic 8-ball a question." },
  { category: "Fun", name: "/avatar", description: "Displays a user's avatar." },
  { category: "Utility", name: "/userinfo", description: "Shows information about a user." },
  { category: "Utility", name: "/serverinfo", description: "Shows information about the server." },
  { category: "Utility", name: "/ping", description: "Checks the bot's latency." },
];

export default function CommandReference() {
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        anime({
                            targets: entry.target.children,
                            translateY: [20, 0],
                            opacity: [0, 1],
                            delay: anime.stagger(100, { start: 200 }),
                            easing: 'easeOutExpo'
                        });
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }
  }, []);

  const groupedCommands = useMemo(() => {
    const filteredCommands = commands.filter(
      (cmd) =>
        cmd.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cmd.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cmd.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filteredCommands.reduce((acc, cmd) => {
      if (!acc[cmd.category]) {
        acc[cmd.category] = [];
      }
      acc[cmd.category].push(cmd);
      return acc;
    }, {} as Record<string, typeof commands>);
  }, [searchTerm]);

  return (
    <div className="w-full max-w-4xl mx-auto" ref={containerRef}>
      <div className="relative mb-8 opacity-0">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for commands..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 h-12 text-lg"
        />
      </div>
      
      {Object.keys(groupedCommands).length > 0 ? (
        <div className="space-y-6 opacity-0">
          {Object.entries(groupedCommands).map(([category, cmds]) => (
            <div key={category}>
              <h3 className="text-2xl font-bold mb-4 text-primary font-headline">{category}</h3>
              <Accordion type="single" collapsible className="w-full space-y-2">
                {cmds.map((cmd) => (
                  <AccordionItem key={cmd.name} value={cmd.name} className="border bg-card rounded-lg px-4 data-[state=open]:border-primary/50 transition-colors shadow-sm hover:border-primary/50">
                    <AccordionTrigger className="text-lg font-mono hover:no-underline py-4">{cmd.name}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base pb-4">
                      {cmd.description}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground text-lg py-8 opacity-0">No commands found matching your search.</p>
      )}
    </div>
  );
}
