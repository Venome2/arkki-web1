'use client';

import { Menu, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import navigation from '@/lib/content/navigation.json';
import Link from "next/link";

export function Header() {
  const { headerLinks } = navigation;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Logo />
          <p className="text-xl font-bold font-headline">BAILEY</p>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          {headerLinks.map(link => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button className="group breathing-button">
            Add to Discord 
            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
        
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="sr-only">Menu</SheetTitle>
              </SheetHeader>
              <div className="grid gap-4 py-6">
                <div className="flex items-center gap-3 mb-4">
                  <Logo />
                  <p className="text-xl font-bold font-headline">BAILEY</p>
                </div>
                <nav className="grid gap-4">
                  {headerLinks.map(link => (
                    <Link key={link.href} href={link.href} className="text-base font-medium text-foreground hover:text-primary">
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <Button className="breathing-button mt-4">
                  Add to Discord <ArrowRight />
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
