import { BarChart3, ChevronRight, Clapperboard, Crown, Home as HomeIcon, LockKeyhole, Sparkles } from "lucide-react";
import { useLocation } from "wouter";
import Home from "./pages/Home";
import Vote from "./pages/Vote";
import Results from "./pages/Results";
import Ranking from "./pages/Ranking";
import NotFound from "./pages/NotFound";
import { getCurrentUser } from "./lib/storage";
import { getParticipant } from "./data/awards";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

function Header() {
  const [location, navigate] = useLocation();
  const selectedUser = getParticipant(getCurrentUser() ?? "");
  const links = [
    { href: "/", label: "Reëls", icon: HomeIcon },
    { href: "/vote", label: "Stem", icon: Sparkles },
    { href: "/results", label: "Resultate", icon: Crown },
    { href: "/ranking", label: "Ranking", icon: BarChart3 },
  ];

  return (
    <header className="site-header">
      <button className="brand" onClick={() => navigate("/")} aria-label="Gaan na tuisblad">
        <span className="brand-mark"><Clapperboard size={17} strokeWidth={2.2} /></span>
        <span><strong>Vriende</strong><em>OSCARS</em></span>
      </button>
      <nav className="top-nav" aria-label="Hoof navigasie">
        {links.map(({ href, label, icon: Icon }) => (
          <button key={href} className={`nav-link ${location === href ? "active" : ""}`} onClick={() => navigate(href)}>
            <Icon size={15} />{label}
          </button>
        ))}
      </nav>
      <div className="header-user">
        {selectedUser ? <><img src={selectedUser.photo} alt="" /><span>{selectedUser.shortName}</span></> : <><LockKeyhole size={14} /><span>Geen kieser</span></>}
      </div>
    </header>
  );
}

function PageShell({ children }: { children: React.ReactNode }) {
  return <div className="app-shell"><Header /><main>{children}</main><footer className="site-footer"><span>Vriende Oscars 2026</span><span className="footer-dot" /> <span>’n Klein aand. Groot menings.</span></footer></div>;
}

function Router() {
  const [location] = useLocation();
  let page: React.ReactNode;
  if (location === "/") page = <Home />;
  else if (location === "/vote") page = <Vote />;
  else if (location === "/results") page = <Results />;
  else if (location === "/ranking") page = <Ranking />;
  else page = <NotFound />;
  return <PageShell>{page}</PageShell>;
}

function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}

export default App;
