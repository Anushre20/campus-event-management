import { Link } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import {
  Calendar,
  MapPin,
  Heart,
  Sparkles,
  Clock,
  ArrowRight,
  User,
  Bell,
} from 'lucide-react';


export function StudentDashboard() {
  const { user } = useAuth();
    const [registeredEvents, setRegisteredEvents] = useState<any[]>([]);
const [savedEvents, setSavedEvents] = useState<any[]>([]);
const [allEvents, setAllEvents] = useState<any[]>([]);
const [showAllNotifications, setShowAllNotifications] = useState(false);

const getTimeLeft = (dateString: string) => {
  const now = new Date();
  const eventDate = new Date(dateString);
  const diff = eventDate.getTime() - now.getTime();

  if (diff <= 0) return "Started";

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? "s" : ""} left`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} left`;

  return "Starting soon";
};
  useEffect(() => {
  const fetchRegistered = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('registrations')
      .select(`
        event_id,
        events (*)
      `)
      .eq('user_id', user.id);

    if (data) {
      const events = data.map((item: any) => item.events).filter(Boolean);
      setRegisteredEvents(events);
    }
  };

  fetchRegistered();
}, [user]);

useEffect(() => {
  const fetchSaved = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('saved_events')
      .select(`
        event_id,
        events (*)
      `)
      .eq('user_id', user.id);

    if (data) {
      const events = data.map((item: any) => item.events).filter(Boolean);
      setSavedEvents(events);
    }
  };

  fetchSaved();
}, [user]);

useEffect(() => {
  const fetchAllEvents = async () => {
    const { data } = await supabase
      .from('events')
      .select('*')
      .eq('is_archived', false);

    setAllEvents(data || []);
  };

  fetchAllEvents();
}, []);


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
              <h1 className="text-4xl mb-2">
  Welcome back, {user?.email?.split('@')[0]} ✨
</h1>
<p className="text-muted-foreground">{user?.email}</p>
            </div>
            <Link
  to="/login"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <User className="w-5 h-5" />
              Profile
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-gradient-to-br from-primary to-primary/60 text-white rounded-3xl p-6"
            >
              <Calendar className="w-8 h-8 mb-3" />
              <p className="text-white/80 text-sm mb-1">Registered Events</p>
              <p className="text-3xl">{registeredEvents.length}</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="bg-gradient-to-br from-secondary to-secondary/60 text-white rounded-3xl p-6"
            >
              <Heart className="w-8 h-8 mb-3" />
              <p className="text-white/80 text-sm mb-1">Saved Events</p>
              <p className="text-3xl">{savedEvents.length}</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="bg-gradient-to-br from-accent to-accent/60 text-white rounded-3xl p-6"
            >
              <Sparkles className="w-8 h-8 mb-3" />
              <p className="text-white/80 text-sm mb-1">Suggestions</p>
              <p className="text-3xl">
  {allEvents.filter((event) => {
    const isRegistered = registeredEvents.some(e => e.id === event.id);
    const isSaved = savedEvents.some(e => e.id === event.id);
    return !isRegistered && !isSaved;
  }).length}
</p>
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
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl">Your Events</h2>
                </div>
                <Link to="/" className="text-primary hover:underline text-sm flex items-center gap-1">
                  View all
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="space-y-4">
                {registeredEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <Link
                      to={`/event/${event.id}`}
                      className="block bg-card border border-border rounded-3xl p-6 hover:shadow-xl hover:border-primary/50 transition-all group"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-16 h-16 ${event.color} rounded-2xl flex-shrink-0`}>
                          <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="mb-1 group-hover:text-primary transition-colors">
                            {event.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3">by {event.society}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              {new Date(event.date).toLocaleString()}
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              {event.venue}
                            </div>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">
                          Registered
                        </span>
                      </div>
                    </Link>
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
                <Heart className="w-6 h-6 text-primary" />
                <h2 className="text-2xl">Saved Events</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {savedEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ y: -4 }}
                  >
                    <Link
                      to={`/event/${event.id}`}
                      className="block bg-card border border-border rounded-3xl overflow-hidden hover:shadow-xl hover:border-primary/50 transition-all group"
                    >
                      <div className={`h-32 ${event.color}`}>
                        <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent" />
                      </div>
                      <div className="p-4">
                        <h3 className="mb-1 group-hover:text-primary transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">by {event.society}</p>
                        <div className="space-y-1 text-xs text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3" />
                            {new Date(event.date).toLocaleString()}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3 h-3" />
                            {event.venue}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-6 h-6 text-primary" />
                <h2 className="text-2xl">You might like</h2>
              </div>

              <div className="space-y-4">
                {allEvents
  .filter((event) => {
    const isRegistered = registeredEvents.some(e => e.id === event.id);
    const isSaved = savedEvents.some(e => e.id === event.id);
    return !isRegistered && !isSaved;
  })
  .slice(0, 3)
  .map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                  >
                    <Link
                      to={`/event/${event.id}`}
                      className="block bg-card border border-border rounded-3xl p-6 hover:shadow-xl hover:border-primary/50 transition-all group"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-16 h-16 ${event.color} rounded-2xl flex-shrink-0`}>
                          <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-1">
                            <h3 className="group-hover:text-primary transition-colors">
                              {event.title}
                            </h3>
                            <span className="px-2 py-1 bg-accent/20 text-accent rounded-full text-xs">
                              {event.match}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">by {event.society}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {new Date(event.date).toLocaleString()}
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              {event.venue}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
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
              <div className="flex items-center gap-2 mb-6">
                <Bell className="w-6 h-6 text-primary" />
                <h2 className="text-2xl">Notifications</h2>
              </div>

              <div className="space-y-3">
                {allEvents
  .filter(event => new Date(event.date) > new Date()) // only future
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) // nearest first
  .slice(0, 3)
  .map((event, index) => (
  <motion.div
    key={event.id}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 + index * 0.1 }}
    className="bg-card border border-border rounded-2xl p-4 hover:shadow-lg transition-all"
  >
    <p className="text-sm mb-2">
      {getTimeLeft(event.date) === "Started"
  ? `${event.title} is live now 🔴`
  : `${event.title} starts in ${getTimeLeft(event.date)}`}
    </p>
    <p className="text-xs text-muted-foreground">
      {new Date(event.date).toLocaleString()}
    </p>
  </motion.div>
))}

                <button
  onClick={() => setShowAllNotifications(!showAllNotifications)}
  className="w-full text-primary hover:underline text-sm py-2"
>
                  View all notifications
                </button>

                {showAllNotifications && (
  <div className="mt-4 space-y-2">
    {allEvents
  .filter(event => new Date(event.date) > new Date())
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  .map((event) => (
      <div key={event.id} className="text-sm">
        {event.title} → {getTimeLeft(event.date)}
      </div>
    ))}
  </div>
)}

              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
}
