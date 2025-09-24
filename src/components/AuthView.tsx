import React, { useState } from 'react';
import { Star, Mail, Lock, User, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AuthViewProps {
  onAuthSuccess: () => void;
}

const AuthView: React.FC<AuthViewProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const CosmicBackground = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`min-h-screen bg-gradient-to-br from-purple-900 via-violet-900 to-cyan-900 relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-purple-900 to-violet-800 opacity-90"></div>
      <div className="absolute inset-0" style={{background: "radial-gradient(circle, transparent 0%, rgba(147, 51, 234, 0.3) 50%, rgba(22, 78, 99, 0.5) 100%)"}}></div>
      
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              filter: `brightness(${0.8 + Math.random() * 0.4})`
            }}
          >
            <div className="w-1 h-1 bg-white rounded-full" style={{ boxShadow: '0 0 6px rgba(255,255,255,0.8)' }} />
          </div>
        ))}
        
        {[...Array(8)].map((_, i) => (
          <div
            key={`bright-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            <Star className="w-3 h-3 text-white" fill="currentColor" style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.8))' }} />
          </div>
        ))}
      </div>
      
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-purple-500/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-cyan-400/15 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-violet-400/20 rounded-full filter blur-2xl"></div>
      </div>
      
      {children}
    </div>
  );

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        
        // Update the profile with the user's name after signup
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase
            .from('profiles')
            .update({ name: name || 'Goddess' })
            .eq('id', user.id);
        }
      }
      
      onAuthSuccess();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CosmicBackground>
      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className="bg-black/20 backdrop-blur-md rounded-3xl p-8 border border-violet-400/30 shadow-lg shadow-purple-500/20 w-full max-w-md">
          <div className="text-center mb-8">
            <Sparkles className="w-16 h-16 text-violet-300 mx-auto mb-4" style={{ filter: 'drop-shadow(0 0 12px rgba(139, 92, 246, 0.6))' }} />
            <h1 className="text-3xl font-bold text-white mb-2">
              {isLogin ? 'Welcome Back' : 'Join the Cosmic Journey'}
            </h1>
            <p className="text-slate-300">
              {isLogin ? 'Continue your manifestation journey' : 'Begin your spiritual transformation'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-violet-300" />
                <input
                  type="text"
                  placeholder="Your magical name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/10 border border-violet-300/30 rounded-xl p-3 pl-12 text-white placeholder-slate-300 focus:outline-none focus:border-cyan-300 transition-colors"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-violet-300" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/10 border border-violet-300/30 rounded-xl p-3 pl-12 text-white placeholder-slate-300 focus:outline-none focus:border-cyan-300 transition-colors"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-violet-300" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-white/10 border border-violet-300/30 rounded-xl p-3 pl-12 text-white placeholder-slate-300 focus:outline-none focus:border-cyan-300 transition-colors"
              />
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-400/30 rounded-xl p-3 text-red-300 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-violet-500 to-cyan-500 text-white py-4 rounded-2xl font-semibold hover:from-violet-600 hover:to-cyan-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : (isLogin ? 'Sign In ✨' : 'Create Account ✨')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-cyan-300 hover:text-cyan-200 transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </CosmicBackground>
  );
};

export default AuthView;