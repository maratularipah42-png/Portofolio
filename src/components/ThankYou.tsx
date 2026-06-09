import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, 
  Send, 
  Sparkles 
} from 'lucide-react';

interface ThankYouConfig {
  title: string;
  sliderValue: number;
  badgeLabel: string;
  cardColor: string;
  textColor: string;
  showBell: boolean;
  showAirplane: boolean;
  showSlider: boolean;
}

const DEFAULT_CONFIG: ThankYouConfig = {
  title: 'Thank You',
  sliderValue: 50,
  badgeLabel: 'Sukses Terkirim',
  cardColor: '#1A3730',
  textColor: '#FFFFFF',
  showBell: true,
  showAirplane: true,
  showSlider: true
};

export default function ThankYou({ isEditAllowed = false }: { isEditAllowed?: boolean }) {
  const [config] = useState<ThankYouConfig>(() => {
    const saved = localStorage.getItem('annisa_portfolio_thankyou_config');
    if (saved) {
      try {
        return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
      } catch (e) {
        return DEFAULT_CONFIG;
      }
    }
    return DEFAULT_CONFIG;
  });

  const [copiedNotification, setCopiedNotification] = useState(false);

  const notifyClick = () => {
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  return (
    <div 
      className="w-full bg-white rounded-3xl border border-gray-150 p-6 md:p-8 text-center relative overflow-hidden mt-6 shadow-3xs"
      id="thankyou-section-container"
    >
      {/* Main visual display mockup */}
      <div className="flex flex-col items-center justify-center py-6 w-full" id="thankyou-mockup-wrapper">
        <div className="relative w-full max-w-xl mx-auto flex flex-col items-center select-none">
          
          {/* Solid Dark Rounded Card */}
          <div 
            className="w-full rounded-[2.2rem] min-h-[160px] md:min-h-[180px] flex items-center justify-center px-12 py-10 relative overflow-hidden transition-all duration-300 hover:scale-[1.01]"
            style={{ backgroundColor: config.cardColor }}
            id="thankyou-solid-card"
          >
            {/* Bell Floating Overlap on Left side of the card */}
            {config.showBell && (
              <button
                type="button"
                onClick={notifyClick}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[40%] text-white w-13 h-13 rounded-full flex items-center justify-center border-[2.5px] border-white cursor-pointer shadow-md transition-all duration-300 hover:scale-115 active:scale-90"
                style={{ backgroundColor: '#202624' }}
                title="Tekan lonceng tanda terima kasih!"
                id="floating-bell-button"
              >
                <div className="relative">
                  <Bell className="w-5 h-5 text-white animate-bounce-slow" />
                  {/* Glowing white dot indicator at original bottom */}
                  <div className="absolute right-0.5 bottom-0 w-2 h-2 bg-yellow-300 rounded-full border border-[#202624]" />
                </div>
              </button>
            )}

            {/* Centered Large Bold Display Typography */}
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-black tracking-wide font-sans text-center transition-all duration-300 select-none cursor-default pr-2"
              style={{ color: config.textColor, textShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
              id="thankyou-badge-title"
            >
              {config.title}
            </h2>

            {/* Paper Airplane Accent Outline on Top-Right Corner */}
            {config.showAirplane && (
              <div 
                className="absolute top-4 right-6 w-16 h-16 md:w-20 md:h-20 text-white/12 select-none pointer-events-none transform rotate-[15deg] transition-transform hover:translate-x-1 hover:-translate-y-1 duration-500"
                id="floating-airplane-decoration"
              >
                <Send className="w-full h-full stroke-[1px] rotate-[-5deg]" />
              </div>
            )}
          </div>

          {/* Symmetrical Slider Track Bar underneath */}
          {config.showSlider && (
            <div className="w-48 md:w-56 mt-6 flex flex-col items-center gap-1.5" id="thankyou-slider-container">
              <div className="w-full h-[6px] bg-neutral-100 rounded-full border border-gray-250/20 relative overflow-visible" id="thankyou-slider-track">
                {/* Active range progress bar */}
                <div 
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${config.sliderValue}%`, backgroundColor: config.cardColor }}
                />
                {/* Thumb circle handle centered on calculated percent value */}
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-4.5 h-4.5 rounded-full border-[2.5px] bg-white shadow-xs transition-all duration-300"
                  style={{ 
                    left: `calc(${config.sliderValue}% - 9px)`,
                    borderColor: config.cardColor
                  }}
                  id="thankyou-slider-handle"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tiny feedback notification alert popup box */}
      <AnimatePresence>
        {copiedNotification && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="fixed bottom-6 right-6 bg-[#1A3730] text-emerald-300 py-2.5 px-4 rounded-xl text-xs font-bold border border-emerald-500/20 shadow-xl flex items-center gap-2 z-50 pointer-events-none"
          >
            <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
            Terima kasih telah berkunjung ke portofolio saya! 😊
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
