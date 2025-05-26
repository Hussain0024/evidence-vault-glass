
import { Bell, Search, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export function AdminHeader() {
  return (
    <header className="glass-card border-b border-red-500/20 px-6 py-4 bg-gradient-to-r from-red-500/10 to-orange-500/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-red-400" />
            <span className="text-sm font-medium text-red-400">ADMIN PANEL</span>
          </div>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search users, evidence, system logs..."
              className="pl-10 glass-button border-red-500/20 bg-red-500/5"
              aria-label="Search admin panel"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="relative glass-button border-red-500/20">
            <Bell className="h-5 w-5 text-red-400" />
            <Badge className="absolute -top-1 -right-1 px-1 min-w-[1.25rem] h-5 bg-red-500 hover:bg-red-500">
              5
            </Badge>
            <span className="sr-only">5 new system alerts</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
