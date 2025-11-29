"use client";

import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function HeroAnimation() {
    const heroRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 500);

        const titleWrapper = titleRef.current;
        if (titleWrapper) {
            titleWrapper.innerHTML = titleWrapper.textContent!.replace(/\S/g, "<span class='letter'>$&</span>");
            
            anime.timeline({loop: false})
              .add({
                targets: '.letter',
                translateY: [-50,0],
                opacity: [0,1],
                easing: "easeOutExpo",
                duration: 1400,
                delay: (el, i) => 30 * i,
                complete: () => {
                    if (heroRef.current) {
                        anime({
                            targets: heroRef.current.querySelectorAll(':scope > div, :scope > p'),
                            translateY: [20, 0],
                            opacity: [0, 1],
                            delay: anime.stagger(150),
                            easing: 'easeOutExpo'
                        });
                    }
                }
              });
        }

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <span className="loader"></span>;
    }

    return (
        <div ref={heroRef} className="flex flex-col gap-4 items-center">
            <div className="inline-block bg-primary/10 text-primary font-medium text-sm px-4 py-2 rounded-full opacity-0">
                A feature-rich, modern Discord bot
            </div>
            <h1 ref={titleRef} className="font-headline text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
              Arrkiii Latest
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl opacity-0">
              A feature-rich, modern Discord bot with a beautiful UI, best-in-class music system, advanced moderation, and automation tools. Built with the latest JavaScript libraries and MongoDB for performance and reliability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6 opacity-0">
              <Button size="lg" className="font-bold text-base">Add to Discord <ArrowRight /></Button>
              <Button size="lg" variant="outline" className="font-bold text-base">Learn More</Button>
            </div>
          </div>
    );
}
