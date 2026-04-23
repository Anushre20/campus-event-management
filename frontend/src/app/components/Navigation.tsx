import { Link, useLocation, useNavigate } from 'react-router';
import { Moon, Sun, Bell, Heart, User, Sparkles } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { motion } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { useState } from 'react';

export function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const { user } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const handleLogout = async () => {
  await supabase.auth.signOut();
  window.location.href = "/login";
};
  if (isAuthPage) return null;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 border-b border-border bg-glass-bg backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Sparkles className="w-6 h-6 text-primary transition-transform group-hover:rotate-12" />
            <span className="font-semibold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              SeeYouThere
            </span>
          </Link>

          <div className="flex items-center gap-8">
            <Link
              to="/societies"
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              Societies
            </Link>
            <Link
              to="/"
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              Events
            </Link>

            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-border">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </button>

              <button className="p-2 rounded-full hover:bg-muted transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full" />
              </button>

              <button className="p-2 rounded-full hover:bg-muted transition-colors">
                <Heart className="w-5 h-5" />
              </button>

              <div className="relative">
  <button
    onClick={() => setShowProfileMenu(!showProfileMenu)}
    className="p-2 rounded-full hover:bg-muted transition-colors"
  >
    <User className="w-5 h-5" />
  </button>

  {showProfileMenu && (
    <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-2xl shadow-lg p-4 z-50">
      
      {/* USER INFO */}
      <div className="mb-3">
        <p className="text-sm font-medium">{user?.email}</p>
        <button
  onClick={async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    console.log("ROLE DATA:", data, error); // debug

    if (error || !data) {
      alert("Role not found");
      return;
    }

    if (data.role === 'organizer') {
      navigate('/dashboard/organizer');
    } else if (data.role === 'student') {
      navigate('/dashboard/student');
    } else if (data.role === 'faculty') {
      navigate('/dashboard/admin');
    } else {
      navigate('/');
    }
  }}
  className="text-xs text-muted-foreground hover:text-primary hover:underline text-left w-full"
>
  Dashboard
</button>
      </div>

      <div className="border-t border-border my-2" />

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted text-sm"
      >
        Logout
      </button>
    </div>
  )}
</div>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
