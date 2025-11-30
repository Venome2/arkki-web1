import navigation from '@/lib/content/navigation.json';
import Link from 'next/link';
import { Logo } from './logo';

export function Footer() {
  const { footerLinks } = navigation;

  return (
    <footer className="py-12 border-t border-border/40">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <Logo />
            <div>
              <p className="text-xl font-bold font-headline">Arrkiii</p>
              <p className="text-sm text-muted-foreground mt-1">The only Discord bot you'll ever need.</p>
            </div>
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
            {footerLinks.map(link => (
              <Link key={link.label} href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-8 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Arrkiii. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
