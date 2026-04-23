import { useParams, Link } from 'react-router';
import { motion } from 'motion/react';
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

const societyData: Record<string, any> = {
  gdg: {
    name: 'GDG IGDTUW',
    tagline: 'Google Developer Group - Building tech together',
    category: 'Technical',
    color: 'bg-primary',
    about:
      'GDG on Campus IGDTUW is a community of students passionate about Google technologies. We organize workshops, hackathons, and study jams to help students learn and grow in the tech field.',
    faculty: {
      name: 'Dr. Priya Sharma',
      designation: 'Associate Professor, CSE Department',
    },
    team: [
      { name: 'Ananya Verma', role: 'President', photo: '' },
      { name: 'Sakshi Gupta', role: 'Vice President', photo: '' },
      { name: 'Riya Singh', role: 'Technical Lead', photo: '' },
      { name: 'Neha Rao', role: 'Event Lead', photo: '' },
    ],
    achievements: [
      'Organized Solution Challenge 2025 with 200+ participants',
      'Hosted Cloud Study Jam with Google Cloud certification',
      'Winner of Best GDG Chapter Award 2024',
      'Conducted 15+ workshops on various Google technologies',
    ],
    upcomingEvents: [
      {
        id: 2,
        name: 'AI/ML Workshop',
        date: 'Tomorrow, 4:00 PM',
        venue: 'Lab 301',
      },
      {
        id: 6,
        name: 'Flutter Bootcamp',
        date: 'Apr 20, 2:00 PM',
        venue: 'Seminar Hall',
      },
    ],
    pastEvents: [
      'Solution Challenge Hackathon',
      'Android Study Jam',
      'Cloud Computing Workshop',
      'DevFest 2025',
    ],
    socials: {
      instagram: 'https://instagram.com/gdg.igdtuw',
      linkedin: 'https://linkedin.com/company/gdg-igdtuw',
      email: 'gdg@igdtuw.ac.in',
    },
  },
  tarannum: {
    name: 'Tarannum',
    tagline: 'Music Society - Find your voice',
    category: 'Cultural',
    color: 'bg-secondary',
    about:
      'Tarannum is the official music society of IGDTUW. We celebrate all forms of music - from classical to contemporary. Our mission is to provide a platform for students to explore their musical talents.',
    faculty: {
      name: 'Prof. Anjali Mehta',
      designation: 'Associate Professor, Humanities',
    },
    team: [
      { name: 'Ishita Kapoor', role: 'President', photo: '' },
      { name: 'Meera Joshi', role: 'Vice President', photo: '' },
      { name: 'Kavya Sharma', role: 'Music Director', photo: '' },
    ],
    achievements: [
      'First Place at Inter-College Music Competition 2025',
      'Performed at Taarangana Main Stage',
      'Organized successful Open Mic series with 500+ attendees',
      'Released original music album "Harmony"',
    ],
    upcomingEvents: [
      {
        id: 7,
        name: 'Classical Music Night',
        date: 'Apr 18, 7:00 PM',
        venue: 'Auditorium',
      },
    ],
    pastEvents: [
      'Open Mic Night',
      'Acoustic Evening',
      'Battle of Bands',
      'Music Therapy Workshop',
    ],
    socials: {
      instagram: 'https://instagram.com/tarannum.igdtuw',
      linkedin: 'https://linkedin.com/company/tarannum-igdtuw',
      email: 'tarannum@igdtuw.ac.in',
    },
  },
};

export function SocietyDetail() {
  const { id } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);

  const society = societyData[id || 'gdg'] || societyData.gdg;

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
              {society.name[0]}
            </div>
            <h1 className="text-5xl mb-3">{society.name}</h1>
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
            {society.about}
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
            {society.team.map((member: any, index: number) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-card border border-border rounded-3xl p-6 text-center hover:shadow-lg transition-all"
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-2xl">
                  {member.name[0]}
                </div>
                <h3 className="mb-1">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
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
          <div className="flex items-center gap-2 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-xl">
              {society.faculty.name[0]}
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Faculty Supervisor</p>
              <h3 className="text-xl">{society.faculty.name}</h3>
              <p className="text-sm text-muted-foreground">{society.faculty.designation}</p>
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
            {society.achievements.map((achievement: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-start gap-3 bg-card border border-border rounded-2xl p-4"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Trophy className="w-4 h-4 text-primary" />
                </div>
                <p className="text-muted-foreground">{achievement}</p>
              </motion.div>
            ))}
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
            {society.upcomingEvents.map((event: any, index: number) => (
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
            {society.pastEvents.map((event: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1 + index * 0.05 }}
                className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center p-4 text-center hover:shadow-lg transition-all"
              >
                <p className="text-sm">{event}</p>
              </motion.div>
            ))}
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
              href={society.socials.instagram}
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
