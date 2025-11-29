"use client";

import { useEffect, useRef } from 'react';
import anime from 'animejs';
import { Button } from '@/components/ui/button';

export function HeroAnimation() {
    const heroRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (heroRef.current) {
            anime({
                targets: heroRef.current.children,
                translateY: [20, 0],
                opacity: [0, 1],
                delay: anime.stagger(100),
                easing: 'easeOutExpo'
            });
        }
        if (titleRef.current) {
            const textWrapper = titleRef.current;
            textWrapper.innerHTML = textWrapper.textContent!.replace(/\S/g, "<span class='letter'>$&</span>");
            
            anime.timeline({loop: false})
              .add({
                targets: '.letter',
                translateY: [-50,0],
                opacity: [0,1],
                easing: "easeOutExpo",
                duration: 1400,
                delay: (el, i) => 30 * i
              });
        }
    }, []);

    return (
        <div ref={heroRef} className="flex flex-col gap-4 items-center">
            <h1 ref={titleRef} className="font-headline text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter">
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
    );
}
