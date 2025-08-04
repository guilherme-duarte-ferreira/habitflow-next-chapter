import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Menu, Home, FileText, Settings, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import AddHabitForm from './AddHabitForm';
import HabitsList from './HabitsList';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setSidebarCollapsed(true);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Anotações Gerais', href: '/notes', icon: FileText },
    { name: 'Configurações', href: '/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside 
          className={cn(
            "glassmorphism border-r border-border flex flex-col transition-all duration-300 z-40",
            sidebarCollapsed ? "w-0 overflow-hidden" : "w-64",
            isMobile && !sidebarCollapsed && "absolute h-full"
          )}
        >
          <div className="flex items-center justify-between p-4">
            <div className="flex-grow">
              <h1 className="text-2xl font-bold tracking-wide cursor-pointer">
                HabitFlow 2.0
              </h1>
              <p className="text-sm text-muted-foreground">
                Seu companheiro de hábitos
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="hover:bg-accent"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="mb-4">
            <ul className="space-y-2 px-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center p-2 rounded-lg transition",
                        isActive 
                          ? "bg-primary text-primary-foreground" 
                          : "hover:bg-accent"
                      )}
                      onClick={() => isMobile && setSidebarCollapsed(true)}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex-1 flex flex-col min-h-0 pt-4 border-t border-border">
            <div className="mb-2 px-4">
              <h3 className="text-sm font-semibold text-muted-foreground">
                MEUS HÁBITOS
              </h3>
            </div>
            
            <div className="px-4 pb-2">
              <AddHabitForm />
            </div>

            <div className="flex-1 flex flex-col min-h-0 px-4 mt-2 pt-2">
              <HabitsList onHabitClick={() => isMobile && setSidebarCollapsed(true)} />
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {isMobile && !sidebarCollapsed && (
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30"
            onClick={() => setSidebarCollapsed(true)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto relative">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className={cn(
              "absolute top-6 left-6 z-20",
              !sidebarCollapsed && "hidden"
            )}
          >
            <Menu className="h-6 w-6" />
          </Button>

          {/* Main header title (shown when sidebar is collapsed) */}
          <h1
            className={cn(
              "absolute top-6 left-1/2 transform -translate-x-1/2 text-2xl font-bold tracking-wide z-10",
              !sidebarCollapsed && "hidden"
            )}
          >
            HabitFlow 2.0
          </h1>

          <div className="p-6 mt-16">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;