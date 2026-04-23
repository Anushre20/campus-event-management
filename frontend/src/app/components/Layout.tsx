import { Outlet } from 'react-router';
import { Navigation } from './Navigation';
import { ThemeProvider } from './ThemeProvider';

export function Layout() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main>
          <Outlet />
        </main>
      </div>
    </ThemeProvider>
  );
}
