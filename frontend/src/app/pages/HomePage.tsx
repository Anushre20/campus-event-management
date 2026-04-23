import { Link } from 'react-router';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import {
  Calendar,
  MapPin,
  Users,
  Code,
  Music,
  BookOpen,
  Camera,
  Heart,
  Trophy,
  Sparkles,
  ChevronRight,
  Clock,
} from 'lucide-react';

const categories = [
  { name: 'Tech', icon: Code, color: 'bg-primary/10 text-primary' },
  { name: 'Cultural', icon: Music, color: 'bg-secondary/10 text-secondary' },
  { name: 'Literary', icon: BookOpen, color: 'bg-accent/10 text-accent' },
  { name: 'Media', icon: Camera, color: 'bg-soft-blue/10 text-soft-blue' },
  { name: 'Social', icon: Heart, color: 'bg-soft-pink/10 text-soft-pink' },
  { name: 'Sports', icon: Trophy, color: 'bg-mint/10 text-mint' },
];


const dummyEvents = [
  {
    id: 2,
    name: 'AI/ML Workshop',
    society: 'AI Club',
    date: 'Tomorrow, 4:00 PM',
    venue: 'Lab 301',
    category: 'Tech',
    color: 'bg-primary',
  },
];


const featuredSocieties = [
  { id: 'gdg', name: 'GDG', tagline: 'Google Developer Group', category: 'Technical' },
  { id: 'tarannum', name: 'Tarannum', tagline: 'Music Society', category: 'Cultural' },
  { id: 'enactus', name: 'Enactus', tagline: 'Social Entrepreneurship', category: 'Social' },
  { id: 'ieee', name: 'IEEE', tagline: 'Tech Innovation', category: 'Technical' },
];

export function HomePage() {
  const [realEvents, setRealEvents] = useState<any[]>([]);
  const now = new Date();

const liveEvents = realEvents.filter((e: any) => {
  const eventDate = new Date(e.date);
  return eventDate <= now; // already started
});


  useEffect(() => {
  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('events')
.select('*')
.eq('is_archived', false)
.order('created_at', { ascending: false });

    if (!error && data) {
      setRealEvents(data);
    }
  };

  fetchEvents();
}, []);

const allEvents = realEvents.map((e: any) => ({
    id: e.id,
    name: e.title,
    society: e.society,
    date: e.date,
    venue: e.venue,
    category: e.category,
    color: 'bg-primary',
  }));

  return (
    <div className="min-h-screen">
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-lavender/30 via-peach/20 to-mint/30" />
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="relative max-w-7xl mx-auto px-6 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Find your next moment.
              <br />
              SeeYouThere.
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              All IGDTUW events in one place
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/societies"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full hover:opacity-90 transition-all shadow-lg shadow-primary/20"
              >
                Explore Events
                <ChevronRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {liveEvents.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="relative">
                <Sparkles className="w-6 h-6 text-primary" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full animate-pulse" />
              </div>
              <h2 className="text-3xl">Happening Now</h2>
            </div>

            <div className="grid gap-6">
              {liveEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={`/event/${event.id}`}
                    className="block bg-card border-2 border-primary rounded-3xl p-6 hover:shadow-xl hover:shadow-primary/10 transition-all group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 bg-destructive text-white px-4 py-2 rounded-bl-2xl flex items-center gap-2 animate-pulse">
                      <span className="w-2 h-2 bg-white rounded-full" />
                      {event.time}
                    </div>

                    <div className="pr-32">
                      <h3 className="text-2xl mb-2 group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">by {event.society}</p>
                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {event.venue}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {event.attendees || 0} attending
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl">Upcoming Events</h2>
            <Link to="/societies" className="text-primary hover:underline flex items-center gap-1">
              View all
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {allEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Link
                  to={`/event/${event.id}`}
                  className="block bg-card border border-border rounded-3xl overflow-hidden hover:shadow-xl hover:border-primary/50 transition-all group"
                >
                  <div className={`h-48 ${event.color} relative`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                      {event.category}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="mb-2 group-hover:text-primary transition-colors">
                      {event.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">by {event.society}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {event.venue}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl mb-8 text-center">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={category.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${category.color} rounded-2xl p-6 flex flex-col items-center gap-3 hover:shadow-lg transition-all`}
                >
                  <Icon className="w-8 h-8" />
                  <span>{category.name}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl mb-8 text-center">Featured Societies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredSocieties.map((society, index) => (
              <motion.div
                key={society.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Link
                  to={`/society/${society.id}`}
                  className="block bg-card border border-border rounded-3xl p-6 hover:shadow-xl hover:border-primary/50 transition-all text-center group"
                >
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-white text-2xl">
                    {society.name[0]}
                  </div>
                  <h3 className="mb-1 group-hover:text-primary transition-colors">
                    {society.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">{society.tagline}</p>
                  <span className="inline-block px-3 py-1 bg-muted rounded-full text-xs">
                    {society.category}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
