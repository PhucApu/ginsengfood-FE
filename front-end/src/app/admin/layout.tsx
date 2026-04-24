import type { ReactNode } from 'react';
import AdminTopBar from './components/AdminTopBar';
import AdminSidebar from './components/AdminSidebar';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="bg-background text-on-surface font-body font-normal text-base antialiased min-h-screen flex flex-col md:flex-row">
      <AdminTopBar />
      <AdminSidebar />
      <main className="flex-1 md:ml-64 pt-16 md:pt-0">
        {children}
      </main>
    </div>
  );
}
