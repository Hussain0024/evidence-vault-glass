
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { SkipLinks } from '@/components/Accessibility/SkipLinks';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-screen bg-transparent">
      <SkipLinks />
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main id="main-content" className="flex-1 overflow-auto p-6" tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  );
}
