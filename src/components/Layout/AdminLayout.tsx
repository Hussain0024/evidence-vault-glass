
import { AdminHeader } from './AdminHeader';
import { AdminSidebar } from './AdminSidebar';
import { SkipLinks } from '@/components/Accessibility/SkipLinks';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex h-screen bg-gradient-to-br from-red-950/20 to-orange-950/20">
      <SkipLinks />
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main id="main-content" className="flex-1 overflow-auto p-6" tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  );
}
