"use client";

import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function Hero() {
    const heroRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoader(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!showLoader && heroRef.current && titleRef.current) {
            // Animate hero content
            anime({
                targets: heroRef.current.querySelectorAll('[data-animate]'),
                translateY: [20, 0],
                opacity: [0, 1],
                delay: anime.stagger(150, { start: 400 }),
                duration: 800,
                easing: 'easeOutExpo'
            });

            // Animate title letters
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
        }
    }, [showLoader]);
    
    return (
        <section className="container py-24 md:py-40">
          {showLoader ? (
            <div className="flex justify-center items-center h-[280px]">
              <span className="loader"></span>
            </div>
          ) : (
            <div ref={heroRef} className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
                <div data-animate className="inline-block bg-primary/10 text-primary font-medium text-sm px-4 py-2 rounded-full opacity-0">
                    A feature-rich, modern Discord bot
                </div>
                <h1 ref={titleRef} data-animate className="font-headline text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight opacity-1">
                  Arrkiii Latest
                </h1>
                <p data-animate className="max-w-[700px] text-muted-foreground md:text-xl opacity-0">
                  A feature-rich, modern Discord bot with a beautiful UI, best-in-class music system, advanced moderation, and automation tools. Built with the latest JavaScript libraries and MongoDB for performance and reliability.
                </p>
                <div data-animate className="flex flex-col sm:flex-row gap-4 mt-6 opacity-0">
                  <Button size="lg" className="font-bold text-base group">
                    Add to Discord 
                    <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                  <Button size="lg" variant="outline" className="font-bold text-base">Learn More</Button>
                </div>
              </div>
          )}
        </section>
    );
}
