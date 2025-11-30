
'use client';

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Particles } from "@/components/particles";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import commands from "@/lib/content/commands.json";
import { useEffect, useRef } from "react";
import anime from "animejs";

export default function CommandsPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (pageRef.current && titleRef.current) {
        const titleEl = titleRef.current;
        if (titleEl.textContent) {
            titleEl.innerHTML = titleEl.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
            anime.timeline({loop: false})
                .add({
                    targets: '.letter',
                    translateY: ["1.1em", 0],
                    translateX: ["0.55em", 0],
                    translateZ: 0,
                    rotateZ: [180, 0],
                    duration: 750,
                    easing: "easeOutExpo",
                    delay: anime.stagger(50)
                });
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        anime({
                            targets: entry.target.querySelectorAll('[data-animate]'),
                            translateY: [50, 0],
                            opacity: [0, 1],
                            delay: anime.stagger(100),
                            easing: 'easeOutExpo'
                        });
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elementsToAnimate = pageRef.current.querySelectorAll('[data-animate-group]');
        elementsToAnimate.forEach(el => observer.observe(el));

        return () => {
            elementsToAnimate.forEach(el => observer.unobserve(el));
        };
    }
  }, []);

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground" ref={pageRef}>
      <Particles className="absolute inset-0 -z-10" />
      <Header />
      <main className="flex-1">
        <div className="container py-20 md:py-32">
          <div className="max-w-6xl mx-auto">
            <h1 ref={titleRef} className="font-headline text-4xl md:text-6xl font-extrabold text-center mb-8">Commands</h1>
            <p className="text-lg text-muted-foreground text-center mb-16 max-w-3xl mx-auto">
              Explore the wide range of commands Arrkiii offers to manage and entertain your server.
            </p>

            {commands.categories.map((category) => (
              <section key={category.name} className="mb-16">
                <h2 className="font-headline text-3xl font-bold text-primary mb-8">{category.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-animate-group>
                  {category.commands.map((command) => (
                    <Card key={command.name} className="bg-card/80 backdrop-blur-sm transform hover:-translate-y-2 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-primary/20 opacity-0" data-animate>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span className="font-code text-lg">/{command.name}</span>
                          {command.badge && <Badge variant="secondary">{command.badge}</Badge>}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{command.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
