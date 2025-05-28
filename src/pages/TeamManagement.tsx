
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, 
  UserPlus, 
  Mail, 
  Shield,
  MoreHorizontal,
  Search,
  Filter
} from 'lucide-react';

export function TeamManagement() {
  const { toast } = useToast();
  const [isInviting, setIsInviting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('viewer');

  const teamMembers = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.j@company.com',
      role: 'admin',
      status: 'active',
      joinedDate: '2024-01-15',
      lastActive: '2 hours ago',
      evidenceCount: 45
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'mike.chen@company.com',
      role: 'editor',
      status: 'active',
      joinedDate: '2024-02-03',
      lastActive: '1 day ago',
      evidenceCount: 32
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily.r@company.com',
      role: 'viewer',
      status: 'pending',
      joinedDate: '2024-02-20',
      lastActive: 'Never',
      evidenceCount: 0
    },
    {
      id: '4',
      name: 'David Park',
      email: 'david.park@company.com',
      role: 'editor',
      status: 'active',
      joinedDate: '2024-01-28',
      lastActive: '3 hours ago',
      evidenceCount: 28
    }
  ];

  const roleColors = {
    admin: 'bg-red-500/20 text-red-400 border-red-500',
    editor: 'bg-blue-500/20 text-blue-400 border-blue-500',
    viewer: 'bg-green-500/20 text-green-400 border-green-500'
  };

  const statusColors = {
    active: 'bg-green-500/20 text-green-400',
    pending: 'bg-yellow-500/20 text-yellow-400',
    inactive: 'bg-gray-500/20 text-gray-400'
  };

  const handleInviteMember = async () => {
    setIsInviting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Invitation sent",
        description: `An invitation has been sent to ${newMemberEmail}`
      });
      setNewMemberEmail('');
      setNewMemberRole('viewer');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send invitation. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsInviting(false);
    }
  };

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Team Management</h1>
          <p className="text-gray-400 mt-1">Manage team members and their access permissions</p>
        </div>
        <Button 
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          onClick={() => setIsInviting(true)}
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Invite Member
        </Button>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{teamMembers.length}</p>
                <p className="text-sm text-gray-400">Total Members</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {teamMembers.filter(m => m.status === 'active').length}
                </p>
                <p className="text-sm text-gray-400">Active Members</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {teamMembers.filter(m => m.status === 'pending').length}
                </p>
                <p className="text-sm text-gray-400">Pending Invites</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {teamMembers.reduce((sum, m) => sum + m.evidenceCount, 0)}
                </p>
                <p className="text-sm text-gray-400">Total Evidence</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invite Member Form */}
      {isInviting && (
        <Card className="glass-card border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <UserPlus className="w-5 h-5 mr-2" />
              Invite New Member
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email"
                  type="email"
                  placeholder="colleague@company.com"
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  className="bg-white/5 border-white/10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <select 
                  id="role"
                  value={newMemberRole}
                  onChange={(e) => setNewMemberRole(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white"
                >
                  <option value="viewer">Viewer</option>
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button 
                onClick={handleInviteMember}
                disabled={!newMemberEmail}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                Send Invitation
              </Button>
              <Button variant="outline" onClick={() => setIsInviting(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filter */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Team Members</CardTitle>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input 
                  placeholder="Search members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {member.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-white">{member.name}</h3>
                      <Badge className={roleColors[member.role as keyof typeof roleColors]}>
                        {member.role}
                      </Badge>
                      <Badge className={statusColors[member.status as keyof typeof statusColors]}>
                        {member.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400">{member.email}</p>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                      <span>Joined {member.joinedDate}</span>
                      <span>•</span>
                      <span>Last active {member.lastActive}</span>
                      <span>•</span>
                      <span>{member.evidenceCount} evidence files</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
