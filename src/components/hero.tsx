"use client";

import { useEffect, useRef } from 'react';
import anime from 'animejs';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
    badge: string;
    title: string;
    description: string;
    ctaPrimary: string;
}

export function Hero({ badge, title, description, ctaPrimary }: HeroProps) {
    const heroRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (heroRef.current && titleRef.current) {
            anime({
                targets: heroRef.current.querySelectorAll('[data-animate]'),
                translateY: [20, 0],
                opacity: [0, 1],
                delay: anime.stagger(150, { start: 400 }),
                duration: 800,
                easing: 'easeOutExpo'
            });

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
    }, []);
    
    return (
        <section className="container py-24 md:py-40">
            <div ref={heroRef} className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
                <div data-animate className="inline-block bg-primary/10 text-primary font-medium text-sm px-4 py-2 rounded-full opacity-0">
                    {badge}
                </div>
                <h1 ref={titleRef} data-animate className="font-headline text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight opacity-1">
                  {title}
                </h1>
                <p data-animate className="max-w-3xl text-muted-foreground md:text-xl opacity-0">
                  {description}
                </p>
                <div data-animate className="flex flex-col sm:flex-row gap-4 mt-6 opacity-0">
                  <Button size="lg" className="font-bold text-base group breathing-button">
                    {ctaPrimary}
                    <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </div>
            </div>
        </section>
    );
}
