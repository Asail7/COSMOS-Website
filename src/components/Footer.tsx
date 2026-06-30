import { useLanguage } from "../hooks/useLanguage";
import { Link } from "wouter";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/10 bg-background/80 backdrop-blur-md pt-16 pb-8 mt-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-3xl font-bold tracking-[0.3em] text-white mb-6 inline-block">
              COSMOS
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              An immersive educational experience designed to spark curiosity about the universe. Explore planets, galaxies, and the history of space exploration.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold tracking-wider mb-6">EXPLORE</h4>
            <ul className="space-y-3">
              <li><Link href="/solar-system" className="text-sm text-muted-foreground hover:text-accent transition-colors">{t.nav.solarSystem}</Link></li>
              <li><Link href="/galaxies" className="text-sm text-muted-foreground hover:text-accent transition-colors">{t.nav.galaxies}</Link></li>
              <li><Link href="/missions" className="text-sm text-muted-foreground hover:text-accent transition-colors">{t.nav.missions}</Link></li>
              <li><Link href="/quiz" className="text-sm text-muted-foreground hover:text-accent transition-colors">{t.nav.quiz}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold tracking-wider mb-6">INFO</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">{t.footer.about}</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">{t.footer.contact}</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">{t.footer.privacy}</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">{t.footer.news}</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex justify-center">
          <p className="text-xs text-muted-foreground">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
