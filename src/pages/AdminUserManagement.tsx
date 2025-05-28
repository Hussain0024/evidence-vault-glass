
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Users, UserPlus, UserX, Settings as SettingsIcon, Search, Mail } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'auditor';
  sector: string;
  status: 'active' | 'inactive' | 'pending';
  lastActive: string;
}

export function AdminUserManagement() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@legal.com',
      role: 'user',
      sector: 'Legal',
      status: 'active',
      lastActive: '2 hours ago'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@healthcare.com',
      role: 'auditor',
      sector: 'Healthcare',
      status: 'active',
      lastActive: '1 day ago'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@finance.com',
      role: 'user',
      sector: 'Finance',
      status: 'pending',
      lastActive: 'Never'
    }
  ]);

  const handleInviteUser = () => {
    toast({
      title: "User Invited",
      description: "Invitation sent successfully."
    });
  };

  const handleDeleteUser = (userId: string) => {
    toast({
      title: "User Removed",
      description: "User has been removed from the system.",
      variant: "destructive"
    });
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">User Management</h1>
          <p className="text-gray-400 mt-1">Manage system users and permissions</p>
        </div>
        <Button onClick={handleInviteUser} className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700">
          <UserPlus className="w-4 h-4 mr-2" />
          Invite User
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 glass-button border-red-500/20 bg-red-500/5"
          />
        </div>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Users className="w-5 h-5 mr-2" />
            System Users ({filteredUsers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">{user.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium text-white">{user.name}</p>
                    <p className="text-sm text-gray-400">{user.email}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {user.role}
                      </Badge>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-400">{user.sector}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge 
                    variant={user.status === 'active' ? 'default' : user.status === 'pending' ? 'secondary' : 'destructive'}
                    className={
                      user.status === 'active' ? 'bg-green-500/20 text-green-400 border-green-500' :
                      user.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500' :
                      'bg-red-500/20 text-red-400 border-red-500'
                    }
                  >
                    {user.status}
                  </Badge>
                  <span className="text-xs text-gray-400">Last: {user.lastActive}</span>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                      <Mail className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-300">
                      <SettingsIcon className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-400 hover:text-red-300"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <UserX className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
