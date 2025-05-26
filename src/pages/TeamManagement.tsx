
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Users, UserPlus, Mail, Shield, Trash2, Edit } from 'lucide-react';

export function TeamManagement() {
  const { user } = useAuth();
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('user');
  const [isInviting, setIsInviting] = useState(false);

  // Mock team data
  const teamMembers = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@company.com',
      role: 'admin',
      status: 'active',
      lastActive: '2024-01-15T10:30:00Z',
      joinDate: '2023-06-15',
      evidenceCount: 45
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@company.com',
      role: 'user',
      status: 'active',
      lastActive: '2024-01-15T09:15:00Z',
      joinDate: '2023-08-22',
      evidenceCount: 23
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@company.com',
      role: 'auditor',
      status: 'pending',
      lastActive: null,
      joinDate: '2024-01-10',
      evidenceCount: 0
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@company.com',
      role: 'user',
      status: 'inactive',
      lastActive: '2023-12-20T14:22:00Z',
      joinDate: '2023-05-10',
      evidenceCount: 67
    }
  ];

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsInviting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Invitation Sent",
      description: `Invitation sent to ${inviteEmail} with ${inviteRole} role.`,
    });

    setInviteEmail('');
    setInviteRole('user');
    setIsInviting(false);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500/20 text-red-400 border-red-500';
      case 'auditor': return 'bg-purple-500/20 text-purple-400 border-purple-500';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
      case 'inactive': return 'bg-gray-500/20 text-gray-400 border-gray-500';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const isAdmin = user?.role === 'admin';

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Team Management</h1>
          <p className="text-gray-400 mt-1">Manage team members, roles, and permissions</p>
        </div>
        <Badge 
          variant="outline" 
          className="text-blue-400 border-blue-500"
          aria-label={`Total team members: ${teamMembers.length}`}
        >
          {teamMembers.length} Members
        </Badge>
      </div>

      {/* Invite New Member */}
      {isAdmin && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <UserPlus className="w-5 h-5 mr-2" />
              Invite Team Member
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleInvite} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="invite-email" className="text-white">Email Address</Label>
                  <Input
                    id="invite-email"
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="colleague@company.com"
                    required
                    className="glass-button border-white/20 bg-white/5"
                    aria-describedby="invite-email-help"
                  />
                  <p id="invite-email-help" className="sr-only">Enter the email address of the person you want to invite</p>
                </div>
                
                <div>
                  <Label htmlFor="invite-role" className="text-white">Role</Label>
                  <select
                    id="invite-role"
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value)}
                    className="w-full h-10 px-3 rounded-md glass-button border-white/20 bg-white/5 text-white"
                    aria-describedby="invite-role-help"
                  >
                    <option value="user">User</option>
                    <option value="auditor">Auditor</option>
                    <option value="admin">Admin</option>
                  </select>
                  <p id="invite-role-help" className="sr-only">Select the role for the new team member</p>
                </div>
              </div>
              
              <Button 
                type="submit" 
                disabled={isInviting}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                aria-label="Send invitation"
              >
                {isInviting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Send Invitation
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Team Members List */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Team Members
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div 
                key={member.id}
                className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                role="article"
                aria-labelledby={`member-name-${member.id}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 id={`member-name-${member.id}`} className="font-medium text-white">{member.name}</h3>
                      <p className="text-sm text-gray-400">{member.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant="outline"
                      className={getRoleColor(member.role)}
                      aria-label={`Role: ${member.role}`}
                    >
                      {member.role}
                    </Badge>
                    <Badge 
                      variant="outline"
                      className={getStatusColor(member.status)}
                      aria-label={`Status: ${member.status}`}
                    >
                      {member.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm mb-3">
                  <div>
                    <span className="text-gray-400">Joined: </span>
                    <span className="text-white">{formatDate(member.joinDate)}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Evidence Files: </span>
                    <span className="text-white">{member.evidenceCount}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Last Active: </span>
                    <span className="text-white">
                      {member.lastActive ? formatDate(member.lastActive) : 'Never'}
                    </span>
                  </div>
                  <div className="md:col-span-1">
                    {isAdmin && (
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="glass-button text-blue-400 hover:text-blue-300"
                          aria-label={`Edit ${member.name}'s details`}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="glass-button text-red-400 hover:text-red-300"
                          aria-label={`Remove ${member.name} from team`}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Team Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-400">Active Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {teamMembers.filter(m => m.status === 'active').length}
            </div>
            <p className="text-xs text-green-400 mt-1">
              {Math.round((teamMembers.filter(m => m.status === 'active').length / teamMembers.length) * 100)}% of team
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-400">Pending Invitations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {teamMembers.filter(m => m.status === 'pending').length}
            </div>
            <p className="text-xs text-yellow-400 mt-1">Awaiting acceptance</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-400">Total Evidence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {teamMembers.reduce((sum, m) => sum + m.evidenceCount, 0)}
            </div>
            <p className="text-xs text-blue-400 mt-1">Files managed by team</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
