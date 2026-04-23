import { motion } from 'motion/react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import {
  Plus,
  Calendar,
  Users,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  MessageSquare,
} from 'lucide-react';
import { useState, useEffect } from 'react';



const myEvents = [
  {
    id: 1,
    name: 'Open Mic Night',
    status: 'live',
    registrations: 127,
    date: 'Today',
  },
  {
    id: 2,
    name: 'AI/ML Workshop',
    status: 'upcoming',
    registrations: 85,
    date: 'Tomorrow',
  },
  {
    id: 7,
    name: 'Classical Music Night',
    status: 'upcoming',
    registrations: 45,
    date: 'Apr 18',
  },
];

const participants = [
  { name: 'Ananya Sharma', email: 'ananya@igdtuw.ac.in', event: 'AI/ML Workshop' },
  { name: 'Priya Kumar', email: 'priya@igdtuw.ac.in', event: 'AI/ML Workshop' },
  { name: 'Ishita Roy', email: 'ishita@igdtuw.ac.in', event: 'Open Mic Night' },
];


export function OrganizerDashboard() {
  const { user } = useAuth();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [eventName, setEventName] = useState('');
  const [editingEvent, setEditingEvent] = useState<any | null>(null);
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
const [eventTime, setEventTime] = useState('');
const [eventVenue, setEventVenue] = useState('');
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const myEventIds = events.map(e => e.id);

const myRegistrations = registrations.filter(r =>
  myEventIds.includes(r.event_id)
);
  const [deletedEvent, setDeletedEvent] = useState<any | null>(null);
const [showUndo, setShowUndo] = useState(false);
  useEffect(() => {
  const fetchEvents = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('created_by', user.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setEvents(data);
    } else {
      console.log("Fetch error:", error);
    }
  };

  fetchEvents();
}, [user]);

useEffect(() => {
  const fetchRegistrations = async () => {
    if (!user) return;

    const { data, error } = await supabase
  .from('registrations')
  .select(`
    user_id,
    event_id,
    events (*)
  `);

    if (!error && data) {
      // extract all user_ids
const userIds = data.map((r: any) => r.user_id);

// fetch profiles separately
const { data: profilesData } = await supabase
  .from('profiles')
  .select('id, name, email')
  .in('id', userIds);

// merge profiles into registrations
const merged = data.map((reg: any) => ({
  ...reg,
  profiles: profilesData?.find(p => String(p.id) === String(reg.user_id)) || null,
}));
console.log("PROFILES:", profilesData);
console.log("MERGED:", merged);
setRegistrations(merged);
      
    } else {
      console.log("Registration fetch error:", error);
    }
  };

  fetchRegistrations();
}, [user]);

const handleArchive = async (id: string, currentStatus: boolean) => {
  const { error } = await supabase
    .from('events')
    .update({ is_archived: !currentStatus })
    .eq('id', id);

  if (!error) {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, is_archived: !currentStatus } : e
      )
    );
  } else {
    alert("Error updating visibility");
  }
};

const handleDelete = (event: any) => {
  const confirmDelete = confirm("Are you sure you want to delete this event?");
  if (!confirmDelete) return;

  // remove from UI instantly
  setEvents((prev) => prev.filter((e) => e.id !== event.id));

  // store deleted event for undo
  setDeletedEvent(event);
  setShowUndo(true);

  // ⛔ IMPORTANT FIX: use event.id directly (NOT deletedEvent)
  deleteTimeout = setTimeout(async () => {
  await supabase
    .from('events')
    .delete()
    .eq('id', event.id);

  setDeletedEvent(null);
  setShowUndo(false);
}, 5000);
};

  const handleEdit = (event: any) => {
  setEditingEvent(event);
  setEventName(event.title);
  setEventDescription(event.description);
  setEventDate(event.date || '');
  setEventTime(event.time || '');
  setEventVenue(event.venue || '');
  setShowCreateForm(true);
};

  const handleCreateEvent = async (e: any) => {
  e.preventDefault();

  let error;

if (editingEvent) {
  const res = await supabase
    .from('events')
    .update({
  title: eventName,
  description: eventDescription,
  date: eventDate,        // ✅ ADD
  time: eventTime,        // ✅ ADD
  venue: eventVenue,      // ✅ ADD
})
    .eq('id', editingEvent.id);

  error = res.error;

  if (!error) {
    // ✅ update UI manually (SAFE)
    setEvents((prev) =>
      prev.map((e) =>
        e.id === editingEvent.id
          ? { ...e, title: eventName, description: eventDescription }
          : e
      )
    );
  }
} else {
  // CREATE
  const res = await supabase.from('events').insert([
  {
    title: eventName,
    description: eventDescription,
    society: 'Your Society',
    date: eventDate,          // ✅ FIX
    time: eventTime,          // ✅ NEW
    venue: eventVenue,        // ✅ FIX
    category: 'General',
    created_by: user?.id || user?.user?.id,
  },
]);

  error = res.error;
}

  if (!error) {
    alert(editingEvent ? "Event updated successfully ✨" : "Event created successfully 🎉");
    setShowCreateForm(false);
    setEventName('');
    setEventDescription('');
    setEditingEvent(null);
    setEventDate('');
setEventTime('');
setEventVenue('');
  } else {
    console.log("FULL ERROR:", error);
    alert(error.message);
  }
};

const handleUndo = () => {
  if (deletedEvent) {
    clearTimeout(deleteTimeout); // 🧠 stop delete

    setEvents((prev) => [deletedEvent, ...prev]);
    setDeletedEvent(null);
    setShowUndo(false);
  }
};

let deleteTimeout: any;

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl mb-2">Organizer Dashboard</h1>
              <p className="text-muted-foreground">Manage your events and society</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreateForm(true)}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full hover:opacity-90 transition-all"
            >
              <Plus className="w-5 h-5" />
              {editingEvent ? "Update Event" : "Create Event"}
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-gradient-to-br from-primary to-primary/60 text-white rounded-3xl p-6"
            >
              <Calendar className="w-8 h-8 mb-3" />
              <p className="text-white/80 text-sm mb-1">Total Events</p>
              <p className="text-3xl">{events.length}</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="bg-gradient-to-br from-secondary to-secondary/60 text-white rounded-3xl p-6"
            >
              <Users className="w-8 h-8 mb-3" />
              <p className="text-white/80 text-sm mb-1">Total Registrations</p>
              <p className="text-3xl">
  {myRegistrations.length}
</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="bg-gradient-to-br from-accent to-accent/60 text-white rounded-3xl p-6"
            >
              <TrendingUp className="w-8 h-8 mb-3" />
              <p className="text-white/80 text-sm mb-1">Avg. Attendance</p>
              <p className="text-3xl">92%</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="bg-gradient-to-br from-soft-blue to-soft-blue/60 text-white rounded-3xl p-6"
            >
              <MessageSquare className="w-8 h-8 mb-3" />
              <p className="text-white/80 text-sm mb-1">Feedback Score</p>
              <p className="text-3xl">4.8</p>
            </motion.div>
          </div>
        </motion.div>

        {showCreateForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12 bg-card border border-border rounded-3xl p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl">Create New Event</h2>
              <button
                onClick={() => setShowCreateForm(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm">Event Name</label>
                  <input
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="e.g., Tech Talk on AI"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm">Category</label>
                  <select className="w-full px-4 py-3 bg-input-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
                    <option>Tech</option>
                    <option>Cultural</option>
                    <option>Literary</option>
                    <option>Sports</option>
                    <option>Social</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm">Date</label>
                  <input
  type="date"
  value={eventDate}
  onChange={(e) => setEventDate(e.target.value)}
  className="w-full px-4 py-3 bg-input-background border border-border rounded-2xl"
/>
                </div>

                <div>
                  <label className="block mb-2 text-sm">Time</label>
                  <input
  type="time"
  value={eventTime}
  onChange={(e) => setEventTime(e.target.value)}
  className="w-full px-4 py-3 bg-input-background border border-border rounded-2xl"
/>
                </div>

                <div>
                  <label className="block mb-2 text-sm">Venue</label>
                  <input
  type="text"
  value={eventVenue}
  onChange={(e) => setEventVenue(e.target.value)}
  className="w-full px-4 py-3 bg-input-background border border-border rounded-2xl"
  placeholder="e.g., Auditorium"
/>
                </div>

                <div>
                  <label className="block mb-2 text-sm">Max Participants</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="e.g., 100"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm">Description</label>
                <textarea
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                  placeholder="Tell students about your event..."
                />
              </div>

              <div>
                <label className="block mb-2 text-sm">Event Highlights (one per line)</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                  placeholder="Hands-on workshop&#10;Certificates provided&#10;Guest speaker from industry"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm">Event Poster/Banner</label>
                <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-primary/50 transition-all cursor-pointer">
                  <Plus className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-muted-foreground">Click to upload or drag and drop</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-primary text-primary-foreground py-3 rounded-2xl hover:opacity-90 transition-all"
                >
                  Create Event
                </button>
                <button
                  type="button"
                  className="px-6 border border-border py-3 rounded-2xl hover:bg-muted transition-all"
                >
                  Save as Draft
                </button>
              </div>
            </form>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
  <h2 className="text-2xl">Your Events</h2>

  <button
    onClick={() => setShowAllEvents(!showAllEvents)}
    className="text-sm text-primary hover:underline"
  >
    {showAllEvents ? "Show Less" : "See Full List"}
  </button>
</div>

              <div className="space-y-4">
                {(showAllEvents ? events : events.slice(0, 2)).map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="bg-card border border-border rounded-3xl p-6 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3>{event.title}</h3>
                          {event.status === 'live' && (
                            <span className="px-3 py-1 bg-destructive text-white rounded-full text-xs animate-pulse">
                              Live
                            </span>
                          )}
                          {event.status === 'upcoming' && (
                            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">
                              Upcoming
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            {
  myRegistrations.filter(r => r.event_id === event.id).length
} registered
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
  onClick={() => handleArchive(event.id, event.is_archived)}
  className="p-2 hover:bg-muted rounded-lg transition-colors"
>
  <Eye
  className={`w-5 h-5 ${
    event.is_archived ? "text-muted-foreground opacity-50" : "text-primary"
  }`}
/>
</button>
                        <button
  onClick={() => handleEdit(event)}
  className="p-2 hover:bg-muted rounded-lg transition-colors"
>
  <Edit className="w-5 h-5" />
</button>
                        <button
  onClick={() => handleDelete(event)}
  className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors"
>
  <Trash2 className="w-5 h-5" />
</button>
                      </div>
                      <button
  onClick={async () => {
    const { error } = await supabase
      .from("events")
      .update({
        attendance_enabled: !event.attendance_enabled,
        attendance_start: new Date(),
        attendance_end: new Date(Date.now() + 2 * 60 * 60 * 1000),
      })
      .eq("id", event.id);

    if (!error) {
      setEvents(prev =>
        prev.map(e =>
          e.id === event.id
            ? { ...e, attendance_enabled: !event.attendance_enabled }
            : e
        )
      );
    }
  }}
  className={`mt-3 px-4 py-2 rounded-xl text-sm ${
    event.attendance_enabled
      ? "bg-green-500 text-white"
      : "bg-primary text-white"
  }`}
>
  {event.attendance_enabled ? "Disable Attendance" : "Enable Attendance"}
</button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="text-2xl mb-6">Recent Registrations</h2>

              <div className="bg-card border border-border rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-4 text-sm">Name</th>
                        <th className="text-left p-4 text-sm">Email</th>
                        <th className="text-left p-4 text-sm">Event</th>
                        <th className="text-left p-4 text-sm">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myRegistrations.slice(0, 5).map((reg, index) => (
  <tr key={index} className="border-t border-border">
    <td className="p-4">
  {reg.profiles?.name || "Unknown"}
</td>
    <td className="p-4 text-muted-foreground text-sm">
  {reg.profiles?.email || "No email"}
</td>
    <td className="p-4 text-sm">
      {reg.events?.title}
    </td>
    <td className="p-4">
      <button className="text-primary hover:underline text-sm">
        View Details
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

          <div>
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="sticky top-32"
            >
              <h2 className="text-2xl mb-6">Society Page</h2>

              <div className="bg-card border border-border rounded-3xl p-6 space-y-4">
                <button className="w-full flex items-center justify-between p-4 bg-muted/50 rounded-2xl hover:bg-muted transition-all">
                  <span>Update About Section</span>
                  <Edit className="w-5 h-5" />
                </button>

                <button className="w-full flex items-center justify-between p-4 bg-muted/50 rounded-2xl hover:bg-muted transition-all">
                  <span>Manage Team Members</span>
                  <Edit className="w-5 h-5" />
                </button>

                <button className="w-full flex items-center justify-between p-4 bg-muted/50 rounded-2xl hover:bg-muted transition-all">
                  <span>Add Achievements</span>
                  <Edit className="w-5 h-5" />
                </button>

                <button className="w-full flex items-center justify-between p-4 bg-muted/50 rounded-2xl hover:bg-muted transition-all">
                  <span>Upload Gallery</span>
                  <Edit className="w-5 h-5" />
                </button>

                <button className="w-full flex items-center justify-between p-4 bg-muted/50 rounded-2xl hover:bg-muted transition-all">
                  <span>Update Social Links</span>
                  <Edit className="w-5 h-5" />
                </button>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
      {showUndo && (
  <div className="fixed bottom-6 right-6 bg-black text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-4">
    <span>Event deleted</span>
    <button
      onClick={handleUndo}
      className="underline font-semibold"
    >
      Undo
    </button>
  </div>
)}
    </div>
  );
}
