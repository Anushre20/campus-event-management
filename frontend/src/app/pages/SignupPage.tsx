import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Sparkles, Mail, Lock, User, Chrome } from 'lucide-react';
import { supabase } from '../../lib/supabase';

type Role = 
  | 'student' 
  | 'outsider' 
  | 'society_member' 
  | 'organizer' 
  | 'faculty';

export function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('student');
  const [society, setSociety] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
  e.preventDefault();

  // Step 1: Signup
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  const user = data.user;

  if (error) {
    alert(error.message);
    return;
  }

  // Step 2: Login immediately (IMPORTANT 🔥)
  // const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
  //   email,
  //   password,
  // });

  // if (loginError) {
  //   alert(loginError.message);
  //   return;
  // }

  // const user = loginData.user;

  // Step 3: Insert profile
  if (user) {
    const { error: profileError } = await supabase.from('profiles').insert([
  {
    id: user.id,
    name: name,
    email: email,
    role: role,
    society: society || null,
  },
]);

    if (profileError) {
      alert(profileError.message);
      return;
    }
  }

  alert('Signup successful 🎉');
  navigate('/');
};
  const roles: { value: Role; label: string }[] = [
  { value: 'student', label: 'Student' },
  { value: 'outsider', label: 'Outsider' },
  { value: 'society_member', label: 'Society Member' },
  { value: 'organizer', label: 'Organizer' },
  { value: 'faculty', label: 'Faculty Supervisor' },
];

const requiresSociety =
  role === 'organizer' ||
  role === 'faculty' ||
  role === 'society_member';

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-mint/20 via-soft-blue/20 to-soft-pink/20" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg relative"
      >
        <div className="bg-card border border-border rounded-3xl p-8 shadow-xl backdrop-blur-sm">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-3">
              <Sparkles className="w-8 h-8 text-primary" />
              <span className="font-semibold text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                SeeYouThere
              </span>
            </div>
            <h1 className="text-3xl mb-2">Join us ✨</h1>
            <p className="text-muted-foreground">Create your account</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block mb-2 text-sm">I am a</label>
              <div className="flex flex-wrap gap-2">
                {roles.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setRole(r.value)}
                    className={`px-4 py-2 rounded-xl border-2 transition-all whitespace-nowrap ${
                      role === r.value
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm">Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-input-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="Your name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-input-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="your.email@igdtuw.ac.in"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-input-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

                {requiresSociety && (
  <div>
    <label className="block mb-2 text-sm">Society Name</label>
    <input
      type="text"
      value={society}
      onChange={(e) => setSociety(e.target.value)}
      className="w-full px-4 py-3 bg-input-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
      placeholder="Enter your society name"
      required
    />
  </div>
)}

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 rounded-2xl hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Create Account
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-card text-muted-foreground">or continue with</span>
              </div>
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 border border-border py-3 rounded-2xl hover:bg-muted transition-all"
            >
              <Chrome className="w-5 h-5" />
              Google
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
