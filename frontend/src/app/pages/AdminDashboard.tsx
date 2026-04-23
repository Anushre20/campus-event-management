import { motion } from 'motion/react';
import {
  Check,
  X,
  Calendar,
  Users,
  Building,
  TrendingUp,
  Eye,
  Edit,
  Shield,
  BarChart3,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const pendingEvents = [
  {
    id: 10,
    name: 'Hackathon 2026',
    society: 'GDG',
    submittedBy: 'Ananya Verma',
    date: 'Apr 25-26',
    status: 'pending',
  },
  {
    id: 11,
    name: 'Photography Walk',
    society: 'Prekshya',
    submittedBy: 'Kavya Sharma',
    date: 'Apr 22',
    status: 'pending',
  },
];

const societies = [
  { id: 'gdg', name: 'GDG', category: 'Technical', events: 12, members: 245, status: 'active' },
  {
    id: 'tarannum',
    name: 'Tarannum',
    category: 'Cultural',
    events: 18,
    members: 189,
    status: 'active',
  },
  {
    id: 'enactus',
    name: 'Enactus',
    category: 'Social',
    events: 8,
    members: 156,
    status: 'active',
  },
];

const analyticsData = [
  { month: 'Jan', events: 12, registrations: 456 },
  { month: 'Feb', events: 15, registrations: 589 },
  { month: 'Mar', events: 20, registrations: 712 },
  { month: 'Apr', events: 18, registrations: 634 },
];

const recentUsers = [
  { name: 'Priya Singh', role: 'Student', email: 'priya@igdtuw.ac.in', joinedDays: 2 },
  { name: 'Ishita Roy', role: 'Organizer', email: 'ishita@igdtuw.ac.in', joinedDays: 5 },
  { name: 'Neha Kapoor', role: 'Student', email: 'neha@igdtuw.ac.in', joinedDays: 7 },
];

export function AdminDashboard() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-4xl">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage the entire platform</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-gradient-to-br from-primary to-primary/60 text-white rounded-3xl p-6"
            >
              <Calendar className="w-8 h-8 mb-3" />
              <p className="text-white/80 text-sm mb-1">Total Events</p>
              <p className="text-3xl">142</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="bg-gradient-to-br from-secondary to-secondary/60 text-white rounded-3xl p-6"
            >
              <Building className="w-8 h-8 mb-3" />
              <p className="text-white/80 text-sm mb-1">Societies</p>
              <p className="text-3xl">28</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="bg-gradient-to-br from-accent to-accent/60 text-white rounded-3xl p-6"
            >
              <Users className="w-8 h-8 mb-3" />
              <p className="text-white/80 text-sm mb-1">Total Users</p>
              <p className="text-3xl">1,847</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="bg-gradient-to-br from-soft-pink to-soft-pink/60 text-white rounded-3xl p-6"
            >
              <TrendingUp className="w-8 h-8 mb-3" />
              <p className="text-white/80 text-sm mb-1">Pending Approvals</p>
              <p className="text-3xl">{pendingEvents.length}</p>
            </motion.div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl mb-6">Pending Event Approvals</h2>

              <div className="space-y-4">
                {pendingEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="bg-card border border-border rounded-3xl p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="mb-1">{event.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          by {event.society} • Submitted by {event.submittedBy}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {event.date}
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs">
                        Pending Review
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <button className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2 rounded-xl hover:opacity-90 transition-all">
                        <Check className="w-5 h-5" />
                        Approve
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 border border-border py-2 rounded-xl hover:bg-muted transition-all">
                        <Eye className="w-5 h-5" />
                        Review
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 border border-destructive text-destructive py-2 rounded-xl hover:bg-destructive/10 transition-all">
                        <X className="w-5 h-5" />
                        Reject
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <BarChart3 className="w-6 h-6 text-primary" />
                <h2 className="text-2xl">Platform Analytics</h2>
              </div>

              <div className="bg-card border border-border rounded-3xl p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                    <YAxis stroke="var(--muted-foreground)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--card)',
                        border: '1px solid var(--border)',
                        borderRadius: '12px',
                      }}
                    />
                    <Bar dataKey="events" fill="var(--primary)" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="registrations" fill="var(--secondary)" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>

                <div className="flex items-center justify-center gap-6 mt-6">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-primary rounded" />
                    <span className="text-sm text-muted-foreground">Events</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-secondary rounded" />
                    <span className="text-sm text-muted-foreground">Registrations</span>
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h2 className="text-2xl mb-6">Manage Societies</h2>

              <div className="bg-card border border-border rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-4 text-sm">Society</th>
                        <th className="text-left p-4 text-sm">Category</th>
                        <th className="text-left p-4 text-sm">Events</th>
                        <th className="text-left p-4 text-sm">Members</th>
                        <th className="text-left p-4 text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {societies.map((society, index) => (
                        <tr key={society.id} className="border-t border-border">
                          <td className="p-4">{society.name}</td>
                          <td className="p-4">
                            <span className="px-3 py-1 bg-muted rounded-full text-xs">
                              {society.category}
                            </span>
                          </td>
                          <td className="p-4 text-muted-foreground">{society.events}</td>
                          <td className="p-4 text-muted-foreground">{society.members}</td>
                          <td className="p-4">
                            <button className="text-primary hover:underline text-sm">
                              Manage
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.section>
          </div>

          <div className="space-y-8">
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="sticky top-32"
            >
              <h2 className="text-2xl mb-6">Recent Users</h2>

              <div className="space-y-3">
                {recentUsers.map((user, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="bg-card border border-border rounded-2xl p-4"
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white flex-shrink-0">
                        {user.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm mb-1">{user.name}</h4>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2 py-1 bg-muted rounded-full">{user.role}</span>
                      <span className="text-muted-foreground">{user.joinedDays}d ago</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <button className="w-full mt-4 text-primary hover:underline text-sm py-2">
                View all users
              </button>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="text-2xl mb-6">Quick Actions</h2>

              <div className="bg-card border border-border rounded-3xl p-6 space-y-3">
                <button className="w-full flex items-center justify-between p-4 bg-muted/50 rounded-2xl hover:bg-muted transition-all text-left">
                  <span>Add Faculty Supervisor</span>
                  <Edit className="w-5 h-5" />
                </button>

                <button className="w-full flex items-center justify-between p-4 bg-muted/50 rounded-2xl hover:bg-muted transition-all text-left">
                  <span>Create New Society</span>
                  <Edit className="w-5 h-5" />
                </button>

                <button className="w-full flex items-center justify-between p-4 bg-muted/50 rounded-2xl hover:bg-muted transition-all text-left">
                  <span>Platform Settings</span>
                  <Edit className="w-5 h-5" />
                </button>

                <button className="w-full flex items-center justify-between p-4 bg-muted/50 rounded-2xl hover:bg-muted transition-all text-left">
                  <span>Export Reports</span>
                  <Edit className="w-5 h-5" />
                </button>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
}
