import { Button } from "@/components/ui/button";
import { Brain, Menu, X, Languages } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import UserProfile from "@/components/UserProfile";
import ThemeToggle from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'pt' | 'en'>('pt');

  const handleAuthClick = (mode: 'login' | 'signup') => {
    navigate('/auth', { state: { mode } });
    setIsMenuOpen(false);
  };

  const handleMobileLogout = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2 group cursor-pointer">
              <div className="p-2 rounded-xl bg-gradient-primary transition-transform duration-300 group-hover:scale-110">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                NexusAI
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a 
                href="#recursos" 
                className="relative text-foreground hover:text-primary transition-all duration-300 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
              >
                Recursos
              </a>
              <a 
                href="#sobre" 
                className="relative text-foreground hover:text-primary transition-all duration-300 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
              >
                Sobre
              </a>
              <a 
                href="#contato" 
                className="relative text-foreground hover:text-primary transition-all duration-300 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
              >
                Contato
              </a>
            </nav>

            {/* Auth Buttons / User Profile */}
            <div className="hidden md:flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="hover-scale">
                    <Languages className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setLanguage('pt')} className={language === 'pt' ? 'bg-primary/10' : ''}>
                    🇧🇷 Português
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage('en')} className={language === 'en' ? 'bg-primary/10' : ''}>
                    🇺🇸 English
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <ThemeToggle />
              {user ? (
                <UserProfile />
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-105"
                    onClick={() => handleAuthClick('login')}
                  >
                    Login
                  </Button>
                  <Button 
                    className="bg-gradient-primary hover:opacity-90 shadow-nexus transition-all duration-300 transform hover:scale-105 hover:shadow-glow"
                    onClick={() => handleAuthClick('signup')}
                  >
                    Cadastrar
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-all duration-300 transform hover:scale-110"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-border animate-fade-in">
              <nav className="flex flex-col space-y-4">
                <a 
                  href="#recursos" 
                  className="text-foreground hover:text-primary transition-all duration-300 py-2 hover:translate-x-2"
                >
                  Recursos
                </a>
                <a 
                  href="#sobre" 
                  className="text-foreground hover:text-primary transition-all duration-300 py-2 hover:translate-x-2"
                >
                  Sobre
                </a>
                <a 
                  href="#contato" 
                  className="text-foreground hover:text-primary transition-all duration-300 py-2 hover:translate-x-2"
                >
                  Contato
                </a>
                <div className="flex flex-col space-y-2 pt-4">
                  <ThemeToggle />
                  {user ? (
                    <>
                      <Button 
                        variant="outline" 
                        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                        onClick={() => navigate('/dashboard')}
                      >
                        Dashboard
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={handleMobileLogout}
                      >
                        Sair
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        variant="outline" 
                        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                        onClick={() => handleAuthClick('login')}
                      >
                        Login
                      </Button>
                      <Button 
                        className="bg-gradient-primary hover:opacity-90 shadow-nexus transition-all duration-300"
                        onClick={() => handleAuthClick('signup')}
                      >
                        Cadastrar
                      </Button>
                    </>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

    </>
  );
};

export default Header;