import { useParams, Link } from 'react-router';
import { motion } from 'motion/react';
import { supabase } from '../../lib/supabase';
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Heart,
  Share2,
  Info,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';
import { useState, useEffect } from 'react';



export function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState<any>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
  const fetchEvent = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();

    if (!error && data) {
  const { count } = await supabase
    .from("registrations")
    .select("*", { count: "exact", head: true })
    .eq("event_id", data.id)
    .eq("attended", true);

  setEvent({
    ...data,
    attendance_count: count || 0,
  });
}

    const user = (await supabase.auth.getUser()).data.user;

if (user) {
  const { data: reg } = await supabase
    .from('registrations')
    .select('*')
    .eq('event_id', data.id)
    .eq('user_id', user.id)
    .single();

  if (reg) setIsRegistered(true);

  const { data: saved } = await supabase
  .from('saved_events')
  .select('*')
  .eq('event_id', data.id)
  .eq('user_id', user.id)
  .maybeSingle();

if (saved) setIsSaved(true);
}
  };

  if (id) fetchEvent();
}, [id]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      if (!event?.date || !event?.time) return;

const startTime = event.time.split(' - ')[0];
const eventDate = new Date(`${event.date} ${startTime}`);
      const now = new Date();
      const diff = eventDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft('Event started!');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [event]);

  if (!event) return <div className="p-10">Loading...</div>;

  const handleRegister = async () => {
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;

  if (!user) {
    alert("Please login first");
    return;
  }

  if (isRegistered) return;

  const { error } = await supabase.from('registrations').insert([
    {
      user_id: user.id,
      event_id: event.id,
    },
  ]);

  if (!error) {
    setIsRegistered(true);
    alert("Registered successfully 🎉");
  } else {
    alert(error.message);
  }
};

const handleSave = async () => {
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;

  if (!user) {
    alert("Please login first");
    return;
  }

  if (isSaved) {
    await supabase
      .from('saved_events')
      .delete()
      .eq('event_id', event.id)
      .eq('user_id', user.id);

    setIsSaved(false);
  } else {
    const { error } = await supabase.from('saved_events').insert([
      {
        user_id: user.id,
        event_id: event.id,
      },
    ]);

    if (!error) setIsSaved(true);
  }
};

const handleAttendance = async () => {
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;

  if (!user) return alert("Login first");

  // 🔍 Step 1: find the exact registration row
  const { data: regData, error: fetchError } = await supabase
    .from("registrations")
    .select("*")
    .eq("event_id", event.id)
    .eq("user_id", user.id)
    .single();

  if (fetchError || !regData) {
    alert("Registration not found ❌");
    console.log(fetchError);
    return;
  }

  // 🔁 Step 2: update using exact match
  const { data: updated, error } = await supabase
  .from("registrations")
  .update({ attended: true })
  .eq("id", regData.id)   // ✅ FIX HERE
  .select();
    console.log("UPDATED:", updated);
console.log("ERROR:", error);



  if (!error) {
  alert("Attendance marked ✅");

  // 🔁 REFETCH attendance count
  const { count } = await supabase
    .from("registrations")
    .select("*", { count: "exact", head: true })
    .eq("event_id", event.id)
    .eq("attended", true);

    console.log("COUNT FROM DB:", count);

  setEvent((prev: any) => ({
    ...prev,
    attendance_count: count || 0,
  }));
}
};
  return (
    <div className="min-h-screen">
      <section className={`bg-primary relative py-32 px-6`}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />

        {event.isLive && (
          <div className="absolute top-8 right-8 bg-destructive text-white px-6 py-3 rounded-full flex items-center gap-2 animate-pulse">
            <span className="w-3 h-3 bg-white rounded-full" />
            Live Now
          </div>
        )}

        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white max-w-4xl"
          >
            <Link
              to={`/society/${event.society}`}
              className="inline-flex items-center gap-2 mb-4 text-white/80 hover:text-white transition-colors"
            >
              Organized by {event.society}
            </Link>
            <h1 className="text-6xl mb-6">{event.title}</h1>
            <div className="flex flex-wrap gap-6 text-lg">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {event.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {event.time || new Date(event.date).toLocaleTimeString()}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                {event.venue}
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                {event.attendance_count || 0} attending
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="sticky top-20 z-40 bg-glass-bg backdrop-blur-xl border-b border-border py-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary" />
              <span className="font-medium">{timeLeft}</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleSave}
                className="p-2 rounded-full hover:bg-muted transition-colors"
              >
                <Heart className={`w-5 h-5 ${isSaved ? 'fill-current text-destructive' : ''}`} />
              </button>
              <button className="p-2 rounded-full hover:bg-muted transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <motion.button
  onClick={handleRegister}
  disabled={isRegistered}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className={`px-8 py-3 rounded-full transition-all ${
    isRegistered
      ? "bg-green-500 text-white"
      : "bg-primary text-primary-foreground hover:opacity-90"
  }`}
>
  {isRegistered ? "Registered ✓" : "Register Now"}
</motion.button>
{isRegistered &&
 event.attendance_enabled &&
 new Date() >= new Date(event.attendance_start) &&
 new Date() <= new Date(event.attendance_end) && (
  <button
    onClick={handleAttendance}
    className="px-6 py-2 bg-green-600 text-white rounded-full"
  >
    Mark Attendance
  </button>
)}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Info className="w-6 h-6 text-primary" />
            <h2 className="text-3xl">About Event</h2>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl">
            {event.description}
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-3xl mb-6">Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(event.highlights || []).map((highlight: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-start gap-3 bg-card border border-border rounded-2xl p-4"
              >
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <p>{highlight}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-muted/30 rounded-3xl p-8"
        >
          <h2 className="text-2xl mb-4">Eligibility & Rules</h2>
          <p className="text-muted-foreground">{event.eligibility}</p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-3xl mb-6">Past Glimpses</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(event.gallery || []).map((item: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.05 }}
                className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center hover:shadow-lg transition-all"
              >
                <p className="text-sm text-center p-4">{item}</p>
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
            <HelpCircle className="w-6 h-6 text-primary" />
            <h2 className="text-3xl">FAQs</h2>
          </div>
          <div className="space-y-4">
            {(event.faqs || []).map((faq: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6"
              >
                <h3 className="mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
