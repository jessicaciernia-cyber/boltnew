
import React, { useState, useEffect } from 'react';
import { Star, Moon, Sun, Heart, Sparkles, Target, BookOpen, Camera, Share2, Calendar, Clock, Users, Zap, Brain, Gift, TrendingUp, Award, Bell, Settings, User, Home, Search, Play, Pause, Volume2 } from 'lucide-react';

const CosmicApp = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [dailyIntention, setDailyIntention] = useState('');
  const [moodRating, setMoodRating] = useState(0);
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [currentAffirmation, setCurrentAffirmation] = useState('');
  const [journalEntry, setJournalEntry] = useState('');
  const [meditationTime, setMeditationTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(7);
  const [selectedRitual, setSelectedRitual] = useState(null);
  const [crystalOfDay, setCrystalOfDay] = useState('');
  const [moonPhase, setMoonPhase] = useState('');
  const [userProfile, setUserProfile] = useState({
    name: 'Goddess',
    birthDate: '',
    birthTime: '',
    birthLocation: '',
    sunSign: '',
    moonSign: '',
    risingSign: ''
  });
  const [notificationSettings, setNotificationSettings] = useState({
    morning: true,
    evening: true,
    moonPhases: true,
    personalizedInsights: true
  });
  const [todaysPersonalizedInsight, setTodaysPersonalizedInsight] = useState('');
  const [realAstrologyData, setRealAstrologyData] = useState(null);
  const [isLoadingAstrology, setIsLoadingAstrology] = useState(false);
  const [visionBoardItems, setVisionBoardItems] = useState([]);
  const [showAddVision, setShowAddVision] = useState(false);
  const [newVisionTitle, setNewVisionTitle] = useState('');
  const [newVisionDescription, setNewVisionDescription] = useState('');
  const [selectedVisionCategory, setSelectedVisionCategory] = useState('career');

  // Astrology API configuration
  const ASTROLOGY_API_KEY = 'gdbZhlxy9sagGmcSWSC9P5qBvAaW9ogo9Ajeg66s';
  const ASTROLOGY_BASE_URL = 'https://api.vedicastroapi.com/v3-json';

  const affirmations = [
    "I am aligned with my highest self and deepest desires",
    "The universe conspires to bring me everything I need",
    "I trust the divine timing of my life",
    "My energy attracts my tribe and my dreams",
    "I am worthy of all the magic I'm creating",
    "I manifest with ease and flow",
    "My intuition guides me perfectly",
    "I am a magnet for abundance and joy",
    "Every challenge is leading me to my breakthrough",
    "I choose love over fear in every moment"
  ];

  const crystals = [
    "Amethyst - for spiritual growth and intuition",
    "Rose Quartz - for self-love and heart healing",
    "Citrine - for abundance and manifestation",
    "Clear Quartz - for amplifying your intentions",
    "Black Tourmaline - for protection and grounding",
    "Selenite - for cleansing and clarity",
    "Carnelian - for creativity and courage",
    "Moonstone - for divine feminine energy"
  ];

  const moonPhases = ["New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous", "Full Moon", "Waning Gibbous", "Third Quarter", "Waning Crescent"];

  const rituals = [
    {
      id: 1,
      title: "Morning Manifestation",
      duration: "10 min",
      description: "Set powerful intentions for your day",
      steps: ["Light a candle", "State your intention 3x", "Visualize your desired outcome", "Journal your feelings"]
    },
    {
      id: 2,
      title: "Full Moon Release",
      duration: "20 min",
      description: "Release what no longer serves you",
      steps: ["Write down what you want to release", "Burn the paper safely", "Take a cleansing bath", "Set new intentions"]
    },
    {
      id: 3,
      title: "Gratitude Abundance",
      duration: "5 min",
      description: "Attract more blessings into your life",
      steps: ["List 5 things you're grateful for", "Feel the emotion of gratitude", "Thank the universe", "Visualize more abundance coming"]
    }
  ];

  const challenges = [
    { id: 1, title: "7-Day Manifestation", progress: 4, total: 7, reward: "Crystal Reading" },
    { id: 2, title: "21-Day Gratitude", progress: 12, total: 21, reward: "Premium Content" },
    { id: 3, title: "Full Moon Cycle", progress: 1, total: 4, reward: "Personal Reading" }
  ];

  useEffect(() => {
    setCurrentAffirmation(affirmations[Math.floor(Math.random() * affirmations.length)]);
    setCrystalOfDay(crystals[Math.floor(Math.random() * crystals.length)]);
    setMoonPhase(moonPhases[Math.floor(Math.random() * moonPhases.length)]);
    generatePersonalizedInsight();
    fetchRealAstrologyData();
  }, []);

  const fetchRealAstrologyData = async () => {
    setIsLoadingAstrology(true);
    try {
      // Get today's date for API call
      const today = new Date();
      const day = today.getDate();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();

      // Fetch daily horoscope for sun signs
      const horoscopeResponse = await fetch(`${ASTROLOGY_BASE_URL}/horoscope/daily-sun?dob=15/08/1990&tz=5.5&lat=28.6139&lon=77.2090&api_key=${ASTROLOGY_API_KEY}`);
      const horoscopeData = await horoscopeResponse.json();

      // Fetch moon phase data
      const moonResponse = await fetch(`${ASTROLOGY_BASE_URL}/extended-horoscope/moon-phase?date=${day}/${month}/${year}&api_key=${ASTROLOGY_API_KEY}`);
      const moonData = await moonResponse.json();

      // Fetch planetary positions
      const planetResponse = await fetch(`${ASTROLOGY_BASE_URL}/horoscope/planet-position?dob=15/08/1990&tob=14:20&lat=28.6139&lon=77.2090&tz=5.5&api_key=${ASTROLOGY_API_KEY}`);
      const planetData = await planetResponse.json();

      setRealAstrologyData({
        horoscope: horoscopeData,
        moonPhase: moonData,
        planets: planetData
      });

      // Update moon phase with real data
      if (moonData && moonData.response && moonData.response.moon_phase) {
        setMoonPhase(moonData.response.moon_phase);
      }

    } catch (error) {
      console.log('Astrology API error:', error);
      // Fallback to static data if API fails
    } finally {
      setIsLoadingAstrology(false);
    }
  };

  const getUserBirthChart = async (birthDate, birthTime, lat, lon) => {
    if (!birthDate) return null;
    
    try {
      const [year, month, day] = birthDate.split('-');
      const formattedDate = `${day}/${month}/${year}`;
      const formattedTime = birthTime || '12:00';

      const response = await fetch(`${ASTROLOGY_BASE_URL}/horoscope/birth-chart?dob=${formattedDate}&tob=${formattedTime}&lat=${lat || 28.6139}&lon=${lon || 77.2090}&tz=5.5&api_key=${ASTROLOGY_API_KEY}`);
      const data = await response.json();
      
      return data;
    } catch (error) {
      console.log('Birth chart error:', error);
      return null;
    }
  };

  const getDailyTransits = async () => {
    try {
      const today = new Date();
      const day = today.getDate();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();

      const response = await fetch(`${ASTROLOGY_BASE_URL}/horoscope/daily-nakshatra-prediction?date=${day}/${month}/${year}&api_key=${ASTROLOGY_API_KEY}`);
      const data = await response.json();
      
      return data;
    } catch (error) {
      console.log('Daily transits error:', error);
      return null;
    }
  };

  const addVisionBoardItem = () => {
    if (newVisionTitle.trim() && newVisionDescription.trim()) {
      const newItem = {
        id: Date.now(),
        title: newVisionTitle,
        description: newVisionDescription,
        category: selectedVisionCategory,
        dateAdded: new Date().toLocaleDateString()
      };
      setVisionBoardItems([...visionBoardItems, newItem]);
      setNewVisionTitle('');
      setNewVisionDescription('');
      setShowAddVision(false);
    }
  };

  const removeVisionBoardItem = (id) => {
    setVisionBoardItems(visionBoardItems.filter(item => item.id !== id));
  };

  const generatePersonalizedInsight = async () => {
    try {
      // Get real astrology data for more accurate insights
      const transits = await getDailyTransits();
      const realHoroscope = realAstrologyData?.horoscope?.response?.prediction || '';
      const realMoonPhase = realAstrologyData?.moonPhase?.response?.moon_phase || moonPhase;

      const prompt = `Create a personalized daily spiritual insight for someone with these details:
      - Name: ${userProfile.name}
      - Real Moon Phase: ${realMoonPhase}
      - Current Mood Rating: ${moodRating}/5
      - Today's Intention: ${dailyIntention || 'manifestation and growth'}
      - Crystal of the Day: ${crystalOfDay}
      - Real Astrological Insight: ${realHoroscope ? realHoroscope.substring(0, 200) : 'Focus on cosmic alignment'}
      - Birth Date: ${userProfile.birthDate || 'Not provided'}
      
      Write a mystical, encouraging daily insight that feels personal and magical. Include:
      - How today's REAL cosmic energy affects them specifically
      - Reference the actual moon phase and its influence
      - One actionable spiritual guidance based on real astrology
      - A manifestation tip
      - Keep it under 150 words, warm and empowering
      
      Format as a single paragraph that sounds like it's from their cosmic bestie who knows real astrology.`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 200,
          messages: [
            { role: "user", content: prompt }
          ]
        })
      });

      const data = await response.json();
      const insight = data.content[0].text;
      setTodaysPersonalizedInsight(insight);
    } catch (error) {
      console.log('Using fallback insight');
      const fallbackInsight = `${userProfile.name}, the universe is aligning perfectly for your manifestation journey today. With ${moonPhase} energy and ${crystalOfDay.split(' - ')[0]} supporting you, focus on trusting your intuition. Today's magic happens when you embrace both your inner wisdom and take inspired action. ✨`;
      setTodaysPersonalizedInsight(fallbackInsight);
    }
  };

  const CosmicBackground = ({ children, className = "" }) => (
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

  const Dashboard = () => (
    <CosmicBackground>
      <div className="relative z-10 p-6 pb-24">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white" style={{ textShadow: '0 0 20px rgba(255,255,255,0.5)' }}>Good Morning, {userProfile.name} ✨</h1>
            <p className="text-slate-300">Day {currentStreak} of your journey</p>
          </div>
          <div className="flex space-x-2">
            <div className="bg-black/20 backdrop-blur-md rounded-full p-2 border border-violet-400/30">
              <Bell className="w-5 h-5 text-cyan-300" />
            </div>
            <button 
              onClick={() => setCurrentView('profile')}
              className="bg-black/20 backdrop-blur-md rounded-full p-2 border border-violet-400/30 hover:bg-black/30 transition-all"
            >
              <Settings className="w-5 h-5 text-violet-300" />
            </button>
          </div>
        </div>

        <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 mb-6 border border-violet-400/30 shadow-lg shadow-purple-500/20">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <Moon className="w-6 h-6 text-cyan-300 mx-auto mb-1" style={{ filter: 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.6))' }} />
              <p className="text-xs text-cyan-200">{moonPhase}</p>
              {isLoadingAstrology && <div className="text-xs text-violet-300">Loading...</div>}
            </div>
            <div>
              <Sparkles className="w-6 h-6 text-violet-300 mx-auto mb-1" style={{ filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.6))' }} />
              <p className="text-xs text-violet-200">{currentStreak} Day Streak</p>
            </div>
            <div>
              <Star className="w-6 h-6 text-white mx-auto mb-1" style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))' }} />
              <p className="text-xs text-slate-200">High Vibe</p>
            </div>
          </div>
        </div>

        <div className="bg-black/20 backdrop-blur-md rounded-3xl p-6 mb-6 border border-violet-400/30 shadow-lg shadow-purple-500/20">
          <div className="flex items-center mb-4">
            <Sparkles className="w-6 h-6 text-cyan-300 mr-2" style={{ filter: 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.6))' }} />
            <h2 className="text-xl font-semibold text-white">Your Personal Cosmic Insight</h2>
            {realAstrologyData && <span className="ml-2 text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">Real Astrology</span>}
          </div>
          <p className="text-slate-100 text-lg leading-relaxed mb-4">
            {todaysPersonalizedInsight || "Generating your personalized cosmic guidance using real astrological data..."}
          </p>
          <div className="flex justify-between items-center">
            <div className="bg-violet-500/20 rounded-2xl p-3 border border-cyan-400/20 flex-1 mr-3">
              <p className="text-sm text-cyan-200">✨ Crystal Energy: {crystalOfDay}</p>
              {realAstrologyData?.horoscope?.response?.prediction && (
                <p className="text-xs text-violet-200 mt-1">🌟 Live Astrology Connected</p>
              )}
            </div>
            <button 
              onClick={() => {
                fetchRealAstrologyData();
                generatePersonalizedInsight();
              }}
              disabled={isLoadingAstrology}
              className="bg-gradient-to-r from-violet-500 to-cyan-500 text-white px-4 py-2 rounded-xl font-semibold hover:from-violet-600 hover:to-cyan-600 transition-all text-sm disabled:opacity-50"
            >
              {isLoadingAstrology ? 'Loading...' : 'Refresh Insight'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <QuickActionCard 
            icon={Heart} 
            title="Check-In" 
            subtitle={hasCheckedIn ? "Complete" : "Set intention"}
            onClick={() => setCurrentView('checkin')}
            completed={hasCheckedIn}
          />
          <QuickActionCard 
            icon={Sparkles} 
            title="Affirmation" 
            subtitle="Daily power"
            onClick={() => setCurrentView('affirmation')}
          />
          <QuickActionCard 
            icon={BookOpen} 
            title="Journal" 
            subtitle="Sacred space"
            onClick={() => setCurrentView('journal')}
          />
          <QuickActionCard 
            icon={Target} 
            title="Vision Board" 
            subtitle="Manifest dreams"
            onClick={() => setCurrentView('visionboard')}
          />
        </div>

        <div className="bg-black/20 backdrop-blur-md rounded-3xl p-6 border border-violet-400/30 shadow-lg shadow-purple-500/20">
          <h3 className="text-lg font-semibold text-white mb-4">Your Challenges</h3>
          {challenges.slice(0, 2).map(challenge => (
            <div key={challenge.id} className="mb-4 last:mb-0">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-medium">{challenge.title}</span>
                <span className="text-cyan-200 text-sm">{challenge.progress}/{challenge.total}</span>
              </div>
              <div className="bg-slate-800/50 rounded-full h-2 border border-violet-500/30">
                <div 
                  className="bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 h-2 rounded-full transition-all shadow-sm"
                  style={{ 
                    width: `${(challenge.progress / challenge.total) * 100}%`,
                    filter: 'drop-shadow(0 0 4px rgba(139, 92, 246, 0.6))'
                  }}
                />
              </div>
            </div>
          ))}
          <button 
            onClick={() => setCurrentView('challenges')}
            className="w-full mt-4 text-cyan-300 text-sm hover:text-cyan-200 transition-colors"
          >
            View All Challenges →
          </button>
        </div>
      </div>
    </CosmicBackground>
  );

  const QuickActionCard = ({ icon: Icon, title, subtitle, onClick, completed = false }) => (
    <button 
      onClick={onClick}
      className={`bg-black/20 backdrop-blur-md rounded-2xl p-4 border border-violet-400/30 hover:bg-black/30 hover:border-cyan-400/40 transition-all text-left shadow-lg shadow-purple-500/10 ${
        completed ? 'ring-2 ring-cyan-400/50 shadow-cyan-400/20' : ''
      }`}
    >
      <Icon className={`w-8 h-8 mb-2 ${completed ? 'text-cyan-400' : 'text-violet-300'}`} 
           style={{ filter: completed ? 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.6))' : 'drop-shadow(0 0 6px rgba(139, 92, 246, 0.4))' }} />
      <p className="text-white font-semibold">{title}</p>
      <p className="text-slate-300 text-sm">{subtitle}</p>
      {completed && <div className="mt-2 text-cyan-400 text-xs">✓ Complete</div>}
    </button>
  );

  const ProfileSetupView = () => (
    <CosmicBackground>
      <div className="relative z-10 p-6 pb-24">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => setCurrentView('dashboard')}
            className="text-cyan-200 hover:text-white mr-4 text-lg"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold text-white">Cosmic Profile Setup</h1>
        </div>

        <div className="space-y-6">
          <div className="bg-black/20 backdrop-blur-md rounded-3xl p-6 border border-violet-400/30">
            <h2 className="text-xl font-semibold text-white mb-4">Tell us about yourself</h2>
            <div className="space-y-4">
              <input
                placeholder="Your magical name"
                value={userProfile.name}
                onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                className="w-full bg-white/10 border border-violet-300/30 rounded-xl p-3 text-white placeholder-slate-300 focus:outline-none focus:border-cyan-300"
              />
              <input
                type="date"
                placeholder="Birth Date"
                value={userProfile.birthDate}
                onChange={(e) => setUserProfile({...userProfile, birthDate: e.target.value})}
                className="w-full bg-white/10 border border-violet-300/30 rounded-xl p-3 text-white placeholder-slate-300 focus:outline-none focus:border-cyan-300"
              />
              <input
                type="time"
                placeholder="Birth Time (optional)"
                value={userProfile.birthTime}
                onChange={(e) => setUserProfile({...userProfile, birthTime: e.target.value})}
                className="w-full bg-white/10 border border-violet-300/30 rounded-xl p-3 text-white placeholder-slate-300 focus:outline-none focus:border-cyan-300"
              />
              <input
                placeholder="Birth Location (City, State)"
                value={userProfile.birthLocation}
                onChange={(e) => setUserProfile({...userProfile, birthLocation: e.target.value})}
                className="w-full bg-white/10 border border-violet-300/30 rounded-xl p-3 text-white placeholder-slate-300 focus:outline-none focus:border-cyan-300"
              />
            </div>
          </div>

          <div className="bg-black/20 backdrop-blur-md rounded-3xl p-6 border border-violet-400/30">
            <h2 className="text-xl font-semibold text-white mb-4">Notification Preferences</h2>
            <div className="space-y-3">
              {Object.entries(notificationSettings).map(([key, value]) => (
                <label key={key} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setNotificationSettings({...notificationSettings, [key]: e.target.checked})}
                    className="w-5 h-5 rounded border-violet-400 bg-white/10 focus:ring-cyan-500"
                  />
                  <span className="text-white capitalize">
                    {key === 'personalizedInsights' ? 'AI Personalized Insights' : key.replace(/([A-Z])/g, ' $1')}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={async () => {
              await fetchRealAstrologyData();
              await generatePersonalizedInsight();
              setCurrentView('dashboard');
            }}
            className="w-full bg-gradient-to-r from-violet-500 to-cyan-500 text-white py-4 rounded-2xl font-semibold hover:from-violet-600 hover:to-cyan-600 transition-all"
          >
            Save Profile & Generate My Cosmic Insights ✨
          </button>
        </div>
      </div>
    </CosmicBackground>
  );

  const CheckInView = () => (
    <CosmicBackground>
      <div className="relative z-10 p-6 pb-24">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => setCurrentView('dashboard')}
            className="text-cyan-200 hover:text-white mr-4 text-lg"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold text-white">Daily Check-In</h1>
        </div>

        <div className="space-y-6">
          <div className="bg-black/20 backdrop-blur-md rounded-3xl p-6 border border-violet-400/30">
            <h2 className="text-xl font-semibold text-white mb-4">How's your energy today?</h2>
            <div className="flex justify-between">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setMoodRating(rating)}
                  className={`w-12 h-12 rounded-full border-2 transition-all ${
                    moodRating >= rating 
                      ? 'bg-gradient-to-r from-violet-500 to-cyan-500 border-violet-300' 
                      : 'border-violet-400 hover:border-violet-300'
                  }`}
                >
                  <span className="text-white text-lg">✨</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-black/20 backdrop-blur-md rounded-3xl p-6 border border-violet-400/30">
            <h2 className="text-xl font-semibold text-white mb-4">Today's Intention</h2>
            <textarea
              value={dailyIntention}
              onChange={(e) => setDailyIntention(e.target.value)}
              placeholder="What do you want to manifest today?"
              className="w-full bg-white/10 border border-violet-300/30 rounded-2xl p-4 text-white placeholder-slate-300 focus:outline-none focus:border-cyan-300 resize-none"
              rows={3}
            />
          </div>

          <button
            onClick={async () => {
              setHasCheckedIn(true);
              
              // If user has birth info, get their personal chart
              if (userProfile.birthDate) {
                const birthChart = await getUserBirthChart(
                  userProfile.birthDate, 
                  userProfile.birthTime,
                  28.6139, // Default to Delhi coordinates, could be improved with location
                  77.2090
                );
                console.log('Birth chart data:', birthChart);
              }
              
              await generatePersonalizedInsight();
              setCurrentView('dashboard');
            }}
            disabled={!moodRating || !dailyIntention.trim()}
            className="w-full bg-gradient-to-r from-violet-500 to-cyan-500 text-white py-4 rounded-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-violet-600 hover:to-cyan-600 transition-all"
          >
            Complete Check-In ✨
          </button>
        </div>
      </div>
    </CosmicBackground>
  );

  const AffirmationView = () => (
    <CosmicBackground>
      <div className="relative z-10 p-6 pb-24">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => setCurrentView('dashboard')}
            className="text-cyan-200 hover:text-white mr-4 text-lg"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold text-white">Daily Affirmation</h1>
        </div>

        <div className="bg-black/20 backdrop-blur-md rounded-3xl p-8 border border-violet-400/30 text-center mb-6">
          <Sparkles className="w-16 h-16 text-violet-300 mx-auto mb-6" style={{ filter: 'drop-shadow(0 0 12px rgba(139, 92, 246, 0.6))' }} />
          <p className="text-2xl font-light text-white leading-relaxed mb-8">
            "{currentAffirmation}"
          </p>
          <div className="flex space-x-4 justify-center">
            <button className="bg-black/20 backdrop-blur-md rounded-full p-3 border border-violet-400/30 hover:bg-black/30 transition-all">
              <Camera className="w-6 h-6 text-cyan-300" />
            </button>
            <button className="bg-black/20 backdrop-blur-md rounded-full p-3 border border-violet-400/30 hover:bg-black/30 transition-all">
              <Share2 className="w-6 h-6 text-cyan-300" />
            </button>
          </div>
        </div>

        <button
          onClick={() => setCurrentAffirmation(affirmations[Math.floor(Math.random() * affirmations.length)])}
          className="w-full mb-4 bg-gradient-to-r from-violet-500 to-cyan-500 text-white py-4 rounded-2xl font-semibold hover:from-violet-600 hover:to-cyan-600 transition-all"
        >
          New Affirmation ✨
        </button>

        <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 border border-violet-400/30 text-center">
          <p className="text-slate-300 text-sm mb-2">Create custom affirmations with Premium</p>
          <button className="text-cyan-300 hover:text-cyan-200 transition-colors text-sm">
            Upgrade Now →
          </button>
        </div>
      </div>
    </CosmicBackground>
  );

  const JournalView = () => (
    <CosmicBackground>
      <div className="relative z-10 p-6 pb-24">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => setCurrentView('dashboard')}
            className="text-cyan-200 hover:text-white mr-4 text-lg"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold text-white">Sacred Journal</h1>
        </div>

        <div className="bg-black/20 backdrop-blur-md rounded-3xl p-6 mb-6 border border-violet-400/30">
          <h2 className="text-lg font-semibold text-white mb-4">Today's Prompt</h2>
          <p className="text-slate-200 mb-4">"What is my soul calling me to embrace today?"</p>
          <textarea
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
            placeholder="Let your thoughts flow freely..."
            className="w-full bg-white/10 border border-violet-300/30 rounded-2xl p-4 text-white placeholder-slate-300 focus:outline-none focus:border-cyan-300 resize-none"
            rows={8}
          />
          <button className="w-full mt-4 bg-gradient-to-r from-violet-500 to-cyan-500 text-white py-3 rounded-2xl font-semibold hover:from-violet-600 hover:to-cyan-600 transition-all">
            Save Entry ✨
          </button>
        </div>

        <div className="bg-black/20 backdrop-blur-md rounded-3xl p-6 border border-violet-400/30">
          <h2 className="text-lg font-semibold text-white mb-4">Three Gratitudes</h2>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <input
                key={i}
                placeholder={`Gratitude ${i}...`}
                className="w-full bg-white/10 border border-violet-300/30 rounded-xl p-3 text-white placeholder-slate-300 focus:outline-none focus:border-cyan-300"
              />
            ))}
          </div>
        </div>
      </div>
    </CosmicBackground>
  );

  const VisionBoardView = () => (
    <CosmicBackground>
      <div className="relative z-10 p-6 pb-24">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => setCurrentView('dashboard')}
            className="text-cyan-200 hover:text-white mr-4 text-lg"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold text-white">Vision Board</h1>
        </div>

        {!showAddVision ? (
          <>
            <div className="bg-black/20 backdrop-blur-md rounded-3xl p-6 border border-violet-400/30 mb-6">
              <div className="text-center py-8">
                <Target className="w-16 h-16 text-violet-300 mx-auto mb-4" style={{ filter: 'drop-shadow(0 0 12px rgba(139, 92, 246, 0.6))' }} />
                <h2 className="text-xl font-semibold text-white mb-2">Create Your Vision</h2>
                <p className="text-slate-300 mb-6">Start manifesting your dreams into reality</p>
                <button 
                  onClick={() => setShowAddVision(true)}
                  className="bg-gradient-to-r from-violet-500 to-cyan-500 text-white px-8 py-3 rounded-2xl font-semibold hover:from-violet-600 hover:to-cyan-600 transition-all"
                >
                  Add Your First Vision ✨
                </button>
              </div>
            </div>

            {visionBoardItems.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">Your Visions</h3>
                {visionBoardItems.map(item => (
                  <div key={item.id} className="bg-black/20 backdrop-blur-md rounded-2xl p-4 border border-violet-400/30">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="text-white font-semibold capitalize">{item.title}</h4>
                        <p className="text-slate-300 text-sm mt-1">{item.description}</p>
                        <div className="flex items-center mt-2">
                          <span className="text-xs bg-violet-500/20 text-violet-300 px-2 py-1 rounded-full capitalize">
                            {item.category}
                          </span>
                          <span className="text-xs text-slate-400 ml-2">{item.dateAdded}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeVisionBoardItem(item.id)}
                        className="text-red-400 hover:text-red-300 ml-4"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
                <button 
                  onClick={() => setShowAddVision(true)}
                  className="w-full bg-gradient-to-r from-violet-500 to-cyan-500 text-white py-3 rounded-2xl font-semibold hover:from-violet-600 hover:to-cyan-600 transition-all"
                >
                  Add Another Vision ✨
                </button>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 border border-violet-400/30">
                <h3 className="text-white font-semibold mb-2">Career Goals</h3>
                <p className="text-slate-300 text-sm">
                  {visionBoardItems.filter(item => item.category === 'career').length} visions
                </p>
              </div>
              <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 border border-violet-400/30">
                <h3 className="text-white font-semibold mb-2">Relationships</h3>
                <p className="text-slate-300 text-sm">
                  {visionBoardItems.filter(item => item.category === 'relationships').length} visions
                </p>
              </div>
              <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 border border-violet-400/30">
                <h3 className="text-white font-semibold mb-2">Abundance</h3>
                <p className="text-slate-300 text-sm">
                  {visionBoardItems.filter(item => item.category === 'abundance').length} visions
                </p>
              </div>
              <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 border border-violet-400/30">
                <h3 className="text-white font-semibold mb-2">Wellness</h3>
                <p className="text-slate-300 text-sm">
                  {visionBoardItems.filter(item => item.category === 'wellness').length} visions
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-black/20 backdrop-blur-md rounded-3xl p-6 border border-violet-400/30">
            <h2 className="text-xl font-semibold text-white mb-6">Add New Vision</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-white text-sm mb-2 block">Vision Title</label>
                <input
                  value={newVisionTitle}
                  onChange={(e) => setNewVisionTitle(e.target.value)}
                  placeholder="What do you want to manifest?"
                  className="w-full bg-white/10 border border-violet-300/30 rounded-xl p-3 text-white placeholder-slate-300 focus:outline-none focus:border-cyan-300"
                />
              </div>

              <div>
                <label className="text-white text-sm mb-2 block">Description</label>
                <textarea
                  value={newVisionDescription}
                  onChange={(e) => setNewVisionDescription(e.target.value)}
                  placeholder="Describe your vision in detail..."
                  className="w-full bg-white/10 border border-violet-300/30 rounded-xl p-3 text-white placeholder-slate-300 focus:outline-none focus:border-cyan-300 resize-none"
                  rows={3}
                />
              </div>

              <div>
                <label className="text-white text-sm mb-2 block">Category</label>
                <select
                  value={selectedVisionCategory}
                  onChange={(e) => setSelectedVisionCategory(e.target.value)}
                  className="w-full bg-white/10 border border-violet-300/30 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-300"
                >
                  <option value="career">Career Goals</option>
                  <option value="relationships">Relationships</option>
                  <option value="abundance">Abundance</option>
                  <option value="wellness">Wellness</option>
                </select>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={addVisionBoardItem}
                  disabled={!newVisionTitle.trim() || !newVisionDescription.trim()}
                  className="flex-1 bg-gradient-to-r from-violet-500 to-cyan-500 text-white py-3 rounded-2xl font-semibold hover:from-violet-600 hover:to-cyan-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Vision ✨
                </button>
                <button
                  onClick={() => {
                    setShowAddVision(false);
                    setNewVisionTitle('');
                    setNewVisionDescription('');
                  }}
                  className="px-6 py-3 bg-slate-600 text-white rounded-2xl font-semibold hover:bg-slate-500 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </CosmicBackground>
  );

  const RitualsView = () => (
    <CosmicBackground>
      <div className="relative z-10 p-6 pb-24">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => setCurrentView('dashboard')}
            className="text-cyan-200 hover:text-white mr-4 text-lg"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold text-white">Sacred Rituals</h1>
        </div>

        <div className="space-y-4">
          {rituals.map(ritual => (
            <div key={ritual.id} className="bg-black/20 backdrop-blur-md rounded-3xl p-6 border border-violet-400/30">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{ritual.title}</h3>
                  <p className="text-slate-300">{ritual.duration} • {ritual.description}</p>
                </div>
                <button 
                  onClick={() => setSelectedRitual(selectedRitual === ritual.id ? null : ritual.id)}
                  className="text-cyan-300 hover:text-cyan-200 text-2xl font-bold"
                >
                  {selectedRitual === ritual.id ? '−' : '+'}
                </button>
              </div>
              
              {selectedRitual === ritual.id && (
                <div className="space-y-2">
                  {ritual.steps.map((step, i) => (
                    <div key={i} className="flex items-center text-slate-200">
                      <span className="w-6 h-6 bg-violet-500/30 rounded-full flex items-center justify-center text-xs mr-3">
                        {i + 1}
                      </span>
                      {step}
                    </div>
                  ))}
                  <button className="w-full mt-4 bg-gradient-to-r from-violet-500 to-cyan-500 text-white py-3 rounded-2xl font-semibold hover:from-violet-600 hover:to-cyan-600 transition-all">
                    Begin Ritual ✨
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </CosmicBackground>
  );

  const ChallengesView = () => (
    <CosmicBackground>
      <div className="relative z-10 p-6 pb-24">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => setCurrentView('dashboard')}
            className="text-cyan-200 hover:text-white mr-4 text-lg"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold text-white">Cosmic Challenges</h1>
        </div>

        <div className="space-y-4">
          {challenges.map(challenge => (
            <div key={challenge.id} className="bg-black/20 backdrop-blur-md rounded-3xl p-6 border border-violet-400/30">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-white">{challenge.title}</h3>
                <div className="text-right">
                  <p className="text-slate-300 text-sm">{challenge.progress}/{challenge.total} days</p>
                  <div className="bg-slate-800/50 rounded-full h-2 w-20 border border-violet-500/30">
                    <div 
                      className="bg-gradient-to-r from-violet-400 to-cyan-400 h-2 rounded-full transition-all"
                      style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Reward: {challenge.reward}</span>
                <Award className="w-5 h-5 text-yellow-400" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-black/20 backdrop-blur-md rounded-3xl p-6 border border-violet-400/30 text-center">
          <Gift className="w-12 h-12 text-violet-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Join Premium Challenges</h3>
          <p className="text-slate-300 mb-4">Unlock exclusive 30-day transformations</p>
          <button className="bg-gradient-to-r from-violet-500 to-cyan-500 text-white px-6 py-3 rounded-2xl font-semibold hover:from-violet-600 hover:to-cyan-600 transition-all">
            Upgrade Now ✨
          </button>
        </div>
      </div>
    </CosmicBackground>
  );

  const MeditationView = () => (
    <CosmicBackground>
      <div className="relative z-10 p-6 pb-24">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => setCurrentView('dashboard')}
            className="text-cyan-200 hover:text-white mr-4 text-lg"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold text-white">Sacred Meditation</h1>
        </div>

        <div className="bg-black/20 backdrop-blur-md rounded-3xl p-8 mb-6 border border-violet-400/30 text-center">
          <div className="text-6xl font-light text-white mb-4">
            {Math.floor(meditationTime / 60).toString().padStart(2, '0')}:
            {(meditationTime % 60).toString().padStart(2, '0')}
          </div>
          <button
            onClick={() => {
              setIsPlaying(!isPlaying);
              if (!isPlaying && meditationTime === 0) {
                setMeditationTime(600); // Default 10 minutes
              }
            }}
            className="bg-gradient-to-r from-violet-500 to-cyan-500 text-white rounded-full p-4 hover:from-violet-600 hover:to-cyan-600 transition-all"
          >
            {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
          </button>
          <div className="mt-4">
            <p className="text-slate-300 text-sm">
              {isPlaying ? 'Meditation in progress...' : 'Ready to begin meditation'}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { title: "Manifestation Meditation", duration: "10 min", theme: "Abundance" },
            { title: "Chakra Alignment", duration: "15 min", theme: "Balance" },
            { title: "Moon Cycle Ritual", duration: "20 min", theme: "Release" }
          ].map((meditation, i) => (
            <div key={i} className="bg-black/20 backdrop-blur-md rounded-2xl p-4 border border-violet-400/30 flex justify-between items-center">
              <div>
                <h3 className="text-white font-semibold">{meditation.title}</h3>
                <p className="text-slate-300 text-sm">{meditation.duration} • {meditation.theme}</p>
              </div>
              <button 
                onClick={() => {
                  setMeditationTime(parseInt(meditation.duration) * 60);
                  setIsPlaying(true);
                }}
                className="bg-violet-500/30 text-violet-200 px-4 py-2 rounded-full hover:bg-violet-500/50 transition-all"
              >
                <Play className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </CosmicBackground>
  );

  const BottomNav = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-black/30 backdrop-blur-md border-t border-violet-400/30 p-4 shadow-lg shadow-purple-500/20 z-50">
      <div className="flex justify-around max-w-md mx-auto">
        <NavButton icon={Home} label="Home" view="dashboard" />
        <NavButton icon={Heart} label="Check-In" view="checkin" />
        <NavButton icon={BookOpen} label="Journal" view="journal" />
        <NavButton icon={Target} label="Vision" view="visionboard" />
        <NavButton icon={Clock} label="Meditate" view="meditation" />
        <NavButton icon={User} label="Profile" view="profile" />
      </div>
    </div>
  );

  const NavButton = ({ icon: Icon, label, view }) => (
    <button
      onClick={() => setCurrentView(view)}
      className={`flex flex-col items-center p-2 rounded-xl transition-all ${
        currentView === view 
          ? 'bg-violet-500/30 text-cyan-300 shadow-lg shadow-violet-500/30' 
          : 'text-slate-300 hover:text-cyan-200'
      }`}
    >
      <Icon className="w-5 h-5 mb-1" style={{ 
        filter: currentView === view ? 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.6))' : 'none' 
      }} />
      <span className="text-xs">{label}</span>
    </button>
  );

  const renderView = () => {
    switch (currentView) {
      case 'checkin':
        return <CheckInView />;
      case 'affirmation':
        return <AffirmationView />;
      case 'visionboard':
        return <VisionBoardView />;
      case 'journal':
        return <JournalView />;
      case 'profile':
        return <ProfileSetupView />;
      case 'rituals':
        return <RitualsView />;
      case 'challenges':
        return <ChallengesView />;
      case 'meditation':
        return <MeditationView />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="relative">
      {renderView()}
      <BottomNav />
    </div>
  );
};

export default CosmicApp;
        