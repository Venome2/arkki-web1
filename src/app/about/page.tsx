
'use client';

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Particles } from "@/components/particles";
import content from "@/lib/content/about.json";
import Image from "next/image";
import { useEffect, useRef } from "react";
import anime from "animejs";

export default function AboutPage() {
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
                            translateY: [20, 0],
                            opacity: [0, 1],
                            delay: anime.stagger(100),
                            easing: 'easeOutExpo',
                            duration: 800
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
          <div className="max-w-4xl mx-auto">
            <h1 ref={titleRef} className="font-headline text-4xl md:text-6xl font-extrabold text-center mb-8">{content.title}</h1>
            <p className="text-lg text-muted-foreground text-center mb-16 max-w-3xl mx-auto">{content.subtitle}</p>
            
            <div data-animate-group>
              <Image 
                src="https://picsum.photos/seed/about-us/1200/600" 
                alt="About Arrkiii" 
                width={1200}
                height={600}
                className="rounded-lg shadow-2xl mb-16 opacity-0"
                data-animate
                data-ai-hint="team computers"
              />
            </div>

            <div className="prose prose-invert lg:prose-xl mx-auto" data-animate-group>
              {content.sections.map((section, index) => (
                <div key={index} className="mb-8 opacity-0" data-animate>
                  <h2 className="font-headline text-2xl md:text-3xl font-bold text-primary mb-4">{section.title}</h2>
                  <p className="text-muted-foreground">{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
