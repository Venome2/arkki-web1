"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Feature = {
    icon: React.ReactNode;
    title: string;
    description: string;
};

export function FeatureCards({ features }: { features: Feature[] }) {
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        anime({
                            targets: gridRef.current?.children,
                            translateY: [50, 0],
                            opacity: [0, 1],
                            delay: anime.stagger(100),
                            easing: 'easeOutExpo',
                        });
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (gridRef.current) {
            observer.observe(gridRef.current);
        }

        return () => {
            if (gridRef.current) {
                observer.unobserve(gridRef.current);
            }
        };
    }, []);

    return (
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
                <Card key={feature.title} className="bg-card/80 backdrop-blur-sm transform hover:-translate-y-2 transition-transform duration-300 ease-in-out shadow-lg opacity-0 border border-transparent hover:border-primary/50 hover:shadow-primary/20">
                    <CardHeader className="flex flex-col items-center text-center gap-4">
                        {feature.icon}
                        <CardTitle className="font-headline">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
