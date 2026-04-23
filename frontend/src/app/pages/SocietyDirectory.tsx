import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Search, Code, Music, BookOpen, Camera, Heart, Trophy, Zap } from 'lucide-react';
import { useState } from 'react';

const societies = {
  Technical: [
    { id: 'gdg', name: 'GDG', description: 'Google Developer Group - Building tech together' },
    { id: 'msc', name: 'MSC', description: 'Microsoft Student Community' },
    { id: 'ieee', name: 'IEEE Student Chapter', description: 'Advancing technology for humanity' },
    { id: 'techneeds', name: 'Techneeds', description: 'Tech for social good' },
    { id: 'leanin', name: 'Lean In', description: 'Women in tech empowerment' },
    { id: 'aws', name: 'AWS', description: 'Cloud computing enthusiasts' },
    { id: 'nirvana', name: 'Nirvana', description: 'Innovation and research' },
    { id: 'ai-club', name: 'AI Club', description: 'Artificial Intelligence exploration' },
    { id: 'codebenders', name: 'CodeBenders', description: 'Competitive programming' },
  ],
  Cultural: [
    { id: 'tarannum', name: 'Tarannum', description: 'Music society - Find your voice' },
    { id: 'zena', name: 'Zena', description: 'Dance and movement' },
    { id: 'rahnuma', name: 'Rahnuma', description: 'Drama and theatre' },
    { id: 'hypnotics', name: 'Hypnotics', description: 'Dance crew' },
  ],
  Literary: [
    { id: 'finivesta', name: 'Finivesta', description: 'Finance and investment club' },
    { id: 'bhav', name: 'B.H.A.V.', description: 'Literary and debating society' },
  ],
  Media: [
    { id: 'prekshya', name: 'Prekshya', description: 'Photography and videography' },
    { id: 'soch', name: 'Soch', description: 'Design and creative arts' },
  ],
  Social: [
    { id: 'enactus', name: 'Enactus', description: 'Social entrepreneurship' },
    { id: 'rotaract', name: 'Rotaract', description: 'Community service' },
    { id: 'greensphere', name: 'Greensphere', description: 'Environmental awareness' },
  ],
  Sports: [
    { id: 'avira', name: 'AVIRA', description: 'Sports committee' },
    { id: 'synergy', name: 'Synergy', description: 'Fitness and wellness' },
  ],
  'Fest Organising': [
    { id: 'taarangana', name: 'Taarangana', description: 'Annual cultural fest' },
    { id: 'innerve', name: 'Innerve', description: 'Technical fest' },
    { id: 'ignite', name: 'Ignite', description: 'Startup and innovation fest' },
  ],
};

const categoryIcons: Record<string, any> = {
  Technical: Code,
  Cultural: Music,
  Literary: BookOpen,
  Media: Camera,
  Social: Heart,
  Sports: Trophy,
  'Fest Organising': Zap,
};

const categoryColors: Record<string, string> = {
  Technical: 'from-primary to-primary/60',
  Cultural: 'from-secondary to-secondary/60',
  Literary: 'from-accent to-accent/60',
  Media: 'from-soft-blue to-soft-blue/60',
  Social: 'from-soft-pink to-soft-pink/60',
  Sports: 'from-mint to-mint/60',
  'Fest Organising': 'from-lavender to-peach',
};

export function SocietyDirectory() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl mb-4">Society Directory</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Discover communities that match your passion
          </p>

          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search societies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
        </motion.div>

        <div className="space-y-16">
          {Object.entries(societies).map(([category, societyList], categoryIndex) => {
            const Icon = categoryIcons[category];
            const gradient = categoryColors[category];

            return (
              <motion.section
                key={category}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${gradient}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl">{category}</h2>
                    <p className="text-sm text-muted-foreground">{societyList.length} societies</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {societyList.map((society, index) => (
                    <motion.div
                      key={society.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: categoryIndex * 0.1 + index * 0.05 }}
                      whileHover={{ y: -4 }}
                    >
                      <Link
                        to={`/society/${society.id}`}
                        className="block bg-card border border-border rounded-3xl p-6 hover:shadow-xl hover:border-primary/50 transition-all group"
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-xl flex-shrink-0`}
                          >
                            {society.name[0]}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="mb-1 group-hover:text-primary transition-colors truncate">
                              {society.name}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {society.description}
                            </p>
                            <div className="mt-3 inline-block px-3 py-1 bg-muted rounded-full text-xs">
                              {category}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
