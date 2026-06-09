import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, 
  Send, 
  Sliders, 
  Sparkles, 
  Check, 
  Edit3,
  X
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

export default function ThankYou({ isEditAllowed = true }: { isEditAllowed?: boolean }) {
  const [config, setConfig] = useState<ThankYouConfig>(() => {
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

  const [isEditing, setIsEditing] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Form states for Editing
  const [editTitle, setEditTitle] = useState(config.title);
  const [editSliderValue, setEditSliderValue] = useState(config.sliderValue);
  const [editShowBell, setEditShowBell] = useState(config.showBell);
  const [editShowAirplane, setEditShowAirplane] = useState(config.showAirplane);
  const [editShowSlider, setEditShowSlider] = useState(config.showSlider);
  const [editCardColor, setEditCardColor] = useState(config.cardColor);
  const [editTextColor, setEditTextColor] = useState(config.textColor);

  const handleSave = () => {
    const newConfig = {
      title: editTitle.trim() || 'Thank You',
      sliderValue: Number(editSliderValue),
      badgeLabel: config.badgeLabel,
      cardColor: editCardColor,
      textColor: editTextColor,
      showBell: editShowBell,
      showAirplane: editShowAirplane,
      showSlider: editShowSlider
    };
    setConfig(newConfig);
    localStorage.setItem('annisa_portfolio_thankyou_config', JSON.stringify(newConfig));
    setIsEditing(false);
  };

  const notifyClick = () => {
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  return (
    <div 
      className="w-full bg-white rounded-3xl border border-gray-150 p-6 md:p-8 text-center relative overflow-hidden mt-6 shadow-3xs"
      id="thankyou-section-container"
    >
      <div className="flex justify-end items-center mb-6" id="thankyou-header">
        {isEditAllowed && (
          <button
            type="button"
            onClick={() => {
              setEditTitle(config.title);
              setEditSliderValue(config.sliderValue);
              setEditShowBell(config.showBell);
              setEditShowAirplane(config.showAirplane);
              setEditShowSlider(config.showSlider);
              setEditCardColor(config.cardColor);
              setEditTextColor(config.textColor);
              setIsEditing(!isEditing);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 border border-gray-250/60 text-[10px] font-extrabold text-[#1A3730] hover:bg-neutral-200 transition-all cursor-pointer shadow-3xs select-none"
            id="btn-edit-thankyou"
          >
            <Edit3 className="w-3 h-3" />
            {isEditing ? 'Batal Edit' : 'Edit Banner'}
          </button>
        )}
      </div>

      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-neutral-50 border border-neutral-200/60 p-4 rounded-2xl mb-6 text-left"
            id="editor-thankyou-panel"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-[11px] font-black text-[#1A3730] uppercase font-mono tracking-tight">
                Menu Kustomisasi Banner & Slider
              </span>
              <button 
                type="button"
                onClick={() => setIsEditing(false)} 
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-[9px] font-extrabold text-[#1A3730] tracking-wider pl-1 mb-1 block">Teks Utama ("Thank You")</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="e.g. Thank You"
                  className="w-full text-xs px-3 py-2 border border-gray-200 bg-white rounded-lg focus:outline-[#1A3730]"
                />
              </div>

              <div>
                <label className="text-[9px] font-extrabold text-[#1A3730] tracking-wider pl-1 mb-1 block">Posisi Handle Slider (0% - 100%)</label>
                <div className="flex gap-3 items-center">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={editSliderValue}
                    onChange={(e) => setEditSliderValue(Number(e.target.value))}
                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1A3730]"
                  />
                  <span className="w-8 text-right font-mono font-bold text-[#1A3730]">{editSliderValue}%</span>
                </div>
              </div>

              <div>
                <label className="text-[9px] font-extrabold text-[#1A3730] tracking-wider pl-1 mb-1 block">Tampilan Elemen Tambahan</label>
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setEditShowBell(!editShowBell)}
                    className={`px-3 py-1 rounded-full text-[10px] font-extrabold border transition-colors ${
                      editShowBell
                        ? 'bg-[#1A3730] text-emerald-300 border-transparent'
                        : 'bg-white text-gray-400 border-gray-200 hover:bg-neutral-50'
                    }`}
                  >
                    Lonceng Bel
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditShowAirplane(!editShowAirplane)}
                    className={`px-3 py-1 rounded-full text-[10px] font-extrabold border transition-colors ${
                      editShowAirplane
                        ? 'bg-[#1A3730] text-emerald-300 border-transparent'
                        : 'bg-white text-gray-400 border-gray-200 hover:bg-neutral-50'
                    }`}
                  >
                    Pesawat Kertas
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditShowSlider(!editShowSlider)}
                    className={`px-3 py-1 rounded-full text-[10px] font-extrabold border transition-colors ${
                      editShowSlider
                        ? 'bg-[#1A3730] text-emerald-300 border-transparent'
                        : 'bg-white text-gray-400 border-gray-200 hover:bg-neutral-50'
                    }`}
                  >
                    Slider Bawah
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[9px] font-extrabold text-[#1A3730] tracking-wider pl-1 mb-1 block">Warna Kartu</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={editCardColor}
                      onChange={(e) => setEditCardColor(e.target.value)}
                      className="w-10 h-8 p-0 cursor-pointer border rounded-md"
                    />
                    <input
                      type="text"
                      value={editCardColor.toUpperCase()}
                      onChange={(e) => setEditCardColor(e.target.value)}
                      className="w-full text-[10px] px-2 py-1.5 border rounded-lg focus:outline-[#1A3730] uppercase font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[9px] font-extrabold text-[#1A3730] tracking-wider pl-1 mb-1 block">Warna Teks</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={editTextColor}
                      onChange={(e) => setEditTextColor(e.target.value)}
                      className="w-10 h-8 p-0 cursor-pointer border rounded-md"
                    />
                    <input
                      type="text"
                      value={editTextColor.toUpperCase()}
                      onChange={(e) => setEditTextColor(e.target.value)}
                      className="w-full text-[10px] px-2 py-1.5 border rounded-lg focus:outline-[#1A3730] uppercase font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-gray-150 pt-3 mt-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-1.5 text-[10.5px] font-extrabold rounded-lg bg-white border border-gray-200 text-gray-500 hover:bg-neutral-50 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-1.5 text-[10.5px] font-extrabold rounded-lg bg-[#1A3730] text-emerald-300 hover:bg-[#254F45] cursor-pointer"
              >
                Simpan Desain
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
