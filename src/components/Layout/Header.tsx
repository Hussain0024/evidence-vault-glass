
import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export function Header() {
  return (
    <header className="glass-card border-b border-white/10 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search evidence, cases, or users..."
              className="pl-10 glass-button border-white/20 bg-white/5"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="relative glass-button">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 px-1 min-w-[1.25rem] h-5 bg-red-500 hover:bg-red-500">
              3
            </Badge>
          </Button>
        </div>
      </div>
    </header>
  );
}
