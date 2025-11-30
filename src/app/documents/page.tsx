
'use client';

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Particles } from "@/components/particles";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import docs from "@/lib/content/documents.json";
import { useEffect, useRef } from "react";
import anime from "animejs";

export default function DocumentsPage() {
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
        
        const elementToAnimate = pageRef.current.querySelector('[data-animate-group]');
        if (elementToAnimate) {
            observer.observe(elementToAnimate);
        }

        return () => {
            if (elementToAnimate) {
                observer.unobserve(elementToAnimate);
            }
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
            <h1 ref={titleRef} className="font-headline text-4xl md:text-6xl font-extrabold text-center mb-8">{docs.title}</h1>
            <p className="text-lg text-muted-foreground text-center mb-16 max-w-3xl mx-auto">
              {docs.description}
            </p>

            <Accordion type="single" collapsible className="w-full" data-animate-group>
              {docs.categories.map((category) => (
                <AccordionItem key={category.title} value={category.title} className="opacity-0" data-animate>
                  <AccordionTrigger className="text-xl font-headline hover:no-underline">{category.title}</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    <p className="font-bold text-primary mb-4">{category.description}</p>
                    {category.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
