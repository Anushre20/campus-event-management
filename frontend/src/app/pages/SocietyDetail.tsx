import { useParams, Link } from 'react-router';
import { motion } from 'motion/react';
import { useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import {
  Calendar,
  MapPin,
  Heart,
  Instagram,
  Linkedin,
  Mail,
  Trophy,
  Users,
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';


export function SocietyDetail() {
  const { id } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);
  const [society, setSociety] = useState<any>(null);
  const [members, setMembers] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  useEffect(() => {
  const fetchSociety = async () => {
    if (!id) return;

    // 1. Fetch organizer (for about section)
    const { data: org } = await supabase
      .from('profiles')
      .select('society, about, instagram, linkedin, email_contact')
      .eq('society', id)
      .eq('role', 'organizer')
      .limit(1);

    if (org && org.length > 0) {
  const organizer = org[0];

  setSociety({
  name: organizer.society,
  about: organizer.about || "This society has not added description yet.",
  faculty: {
    name: "Not Assigned",
    designation: "",
  },
  upcomingEvents: [],
  pastEvents: [],
  socials: {
  instagram: organizer.instagram || "#",
  linkedin: organizer.linkedin || "#",
  email: organizer.email_contact || "",
},
  category: "General",
  tagline: "",
});
} else {
  setSociety({
  name: id,
  about: "This society has not added description yet.",
  faculty: {
    name: "Not Assigned",
    designation: "",
  },
  upcomingEvents: [],
  pastEvents: [],
  socials: {
    instagram: "#",
    linkedin: "#",
    email: "",
  },
  category: "General",
  tagline: "",
});
}

    // 2. Fetch members
    const { data: membersData } = await supabase
      .from('profiles')
      .select('name, role, email')
      .eq('society', id)
      .eq('role', 'society_member');

    setMembers(membersData || []);

    // 3. Fetch achievements
const { data: achData } = await supabase
  .from('achievements')
  .select('*')
  .ilike('society', id?.toLowerCase().trim());

  // 4. Fetch gallery
const { data: galleryData } = await supabase
  .from('gallery')
  .select('*')
  .ilike('society', id?.toLowerCase().trim());

console.log("GALLERY DATA:", galleryData);

setGallery(Array.isArray(galleryData) ? galleryData : []);

  console.log("ACH DATA:", achData);
console.log("ROUTE ID:", id);
console.log("MATCHING WITH:", id?.toLowerCase().trim());

setAchievements(Array.isArray(achData) ? achData : []);
  };

  fetchSociety();
}, [id]);
  if (!society) {
  return <div className="text-white p-6">Loading...</div>;
}
  return (
    <div className="min-h-screen">
      <section className={`${society.color} relative py-24 px-6`}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center text-5xl border-2 border-white/30">
              {society?.name?.[0] || "?"}
            </div>
            <h1 className="text-5xl mb-3">{society?.name || "Loading..."}</h1>
            <p className="text-xl text-white/90 mb-6">{society.tagline}</p>
            <div className="flex items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFollowing(!isFollowing)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                  isFollowing
                    ? 'bg-white/20 border-2 border-white/50'
                    : 'bg-white text-foreground'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFollowing ? 'fill-current' : ''}`} />
                {isFollowing ? 'Following' : 'Follow Society'}
              </motion.button>
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm border border-white/30">
                {society.category}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-6 h-6 text-primary" />
            <h2 className="text-3xl">About Society</h2>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl">
            {society?.about || "No description available"}
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Users className="w-6 h-6 text-primary" />
            <h2 className="text-3xl">Core Team</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {members.length === 0 ? (
    <p>No team members added yet.</p>
  ) : (
    members.map((member, index) => (
      <div
        key={index}
        className="bg-card border border-border rounded-2xl p-4 text-center"
      >
        <h4 className="font-semibold">{member.name || "Unnamed"}</h4>
        <p className="text-sm text-muted-foreground">{member.email}</p>
      </div>
    ))
  )}
</div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-muted/30 rounded-3xl p-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-xl">
              {society?.faculty?.name?.[0] || "?"}
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Faculty Supervisor</p>
              <h3 className="text-xl">{society?.faculty?.name || "N/A"}</h3>
              <p className="text-sm text-muted-foreground">{society?.faculty?.designation || "N/A"}</p>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Trophy className="w-6 h-6 text-primary" />
            <h2 className="text-3xl">Achievements & Highlights</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {!achievements || achievements.length === 0 ? (
  <p>No achievements added yet.</p>
) : (
  achievements.map((ach, index) => (
    <div
      key={index}
      className="bg-card border border-border rounded-2xl p-4"
    >
      <h4 className="font-semibold">{ach.title}</h4>
      <p className="text-sm text-muted-foreground">
        {ach.description}
      </p>
    </div>
  ))
)}
</div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-6 h-6 text-primary" />
              <h2 className="text-3xl">Upcoming Events</h2>
            </div>
            <Link to="/" className="text-primary hover:underline text-sm">
              View all events
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(society?.upcomingEvents || []).map((event: any, index: number) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
              >
                <Link
                  to={`/event/${event.id}`}
                  className="block bg-card border border-border rounded-3xl p-6 hover:shadow-xl hover:border-primary/50 transition-all group"
                >
                  <h3 className="text-xl mb-3 group-hover:text-primary transition-colors">
                    {event.name}
                  </h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {event.venue}
                    </div>
                  </div>
                  <button className="mt-4 w-full bg-primary text-primary-foreground py-2 rounded-xl hover:opacity-90 transition-all">
                    Register Now
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <h2 className="text-3xl mb-6">Past Events & Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {!gallery || gallery.length === 0 ? (
  <p>No images uploaded yet.</p>
) : (
  gallery.map((img, index) => (
    <img
      key={index}
      src={img.image_url}
      className="rounded-2xl"
    />
  ))
)}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center"
        >
          <h2 className="text-3xl mb-6">Connect With Us</h2>
          <div className="flex items-center justify-center gap-4">
            <a
              href={society?.socials?.instagram || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-gradient-to-br from-pink-500 to-purple-500 text-white rounded-2xl hover:shadow-lg transition-all"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href={society.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-gradient-to-br from-blue-600 to-blue-400 text-white rounded-2xl hover:shadow-lg transition-all"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href={`mailto:${society.socials.email}`}
              className="p-4 bg-gradient-to-br from-primary to-accent text-white rounded-2xl hover:shadow-lg transition-all"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
