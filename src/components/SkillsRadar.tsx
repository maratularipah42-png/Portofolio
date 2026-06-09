import { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Crosshair, Award, Settings, Check, CheckSquare, EyeOff } from 'lucide-react';

interface Skill {
  name: string;
  level: number; // percentage
  desc: string;
}

export default function SkillsRadar({ onHide }: { onHide?: () => void }) {
  const [selectedTrack, setSelectedTrack] = useState<'HR' | 'Strategy' | 'Project'>('HR');

  const skills: Record<'HR' | 'Strategy' | 'Project', Skill[]> = {
    HR: [
      { name: 'Talent Acquisition & Sourcing', level: 92, desc: 'Pemetaan prospek magang berbakat melalui koordinasi mitra eksternal.' },
      { name: 'Employee Modern Onboarding Flows', level: 95, desc: 'Restrukturisasi sistem penyelarasan dokumen administrasi bebas lambat.' },
      { name: 'Evaluation Metric Formulas (KPI)', level: 88, desc: 'Penyusunan spreadsheet penilaian progres performa magang mingguan.' },
      { name: 'Training & Development Coordination', level: 85, desc: 'Pelatihan internal & sinkronisasi sasaran divisi fungsional strategis.' }
    ],
    Strategy: [
      { name: 'Market Competitiveness Auditing', level: 90, desc: 'Audit segmentasi pasar geografis UMKM untuk rekomendasi ekspansi.' },
      { name: 'Financial Feasibility Structuring', level: 86, desc: 'Formulasi proyeksi keuangan sederhana (Break-Event-Point, NPV).' },
      { name: 'Executive Presentation Delivery', level: 94, desc: 'Penyusunan struktur visual presentasi pemecah ide bisnis juara.' },
      { name: 'Circular Business Ecosystem Design', level: 89, desc: 'Reka rancang rantai nilai aliran limbah sirkular terintegrasi.' }
    ],
    Project: [
      { name: 'Sponsorship Pitching & Negotiations', level: 95, desc: 'Komunikasi strategis kemitraan korporasi untuk target pendanaan.' },
      { name: 'Operational Risk Analysis', level: 87, desc: 'Audit fungsional hambatan distribusi bisnis penyelarasan rantai pasok.' },
      { name: 'Agile Team Coordination', level: 91, desc: 'Membangun konsensus kerja tim 200+ anggota di 5 divisi organisasi.' },
      { name: 'Resource Budgeting Schedule', level: 89, desc: 'Mitigasi penggunaan kas operasional mingguan secara efisien.' }
    ]
  };

  const trackLabels = {
    HR: { title: 'Human Capital & HR Specialization', desc: 'Sangat cocok untuk tim Talent Recruiter, HR Business Partner, dan People Operations.' },
    Strategy: { title: 'Business Strategy & Advisor Track', desc: 'Sangat sesuai untuk Consultant Associate, Business Analyst, dan Corporate Strategy.' },
    Project: { title: 'Project Management & Campaign Lead', desc: 'Sangat andal untuk Associate Project Manager, Partnership Lead, dan Operational Planner.' }
  };

  return (
    <div id="skills-competencies-card" className="bg-white rounded-[2rem] border border-gray-100 p-6 shadow-sm flex flex-col flex-1 min-w-[300px]">
      <div className="mb-4 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <span className="bg-[#E6F4EA] text-[#1A3730] text-[10px] uppercase tracking-wider font-mono px-3 py-1 rounded-full border border-[#2A5248]/10 inline-block mb-1.5" id="skill-badge">
            Kecocokan Kompetensi
          </span>
          <h3 className="text-[#1A3730] font-semibold text-lg tracking-tight" id="skill-title">Uji Penyelarasan Peran</h3>
        </div>
      </div>

      {/* Track Selection Buttons */}
      <div className="grid grid-cols-3 gap-1.5 bg-gray-50 p-1 rounded-xl mb-4" id="skill-track-selector">
        {(['HR', 'Strategy', 'Project'] as const).map((track) => (
          <button
            key={track}
            id={`track-btn-${track}`}
            onClick={() => setSelectedTrack(track)}
            className={`py-2 rounded-lg text-[10px] font-bold tracking-tight transition-all cursor-pointer ${
              selectedTrack === track 
                ? 'bg-[#1A3730] text-white shadow-xs' 
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {track === 'HR' ? 'HC & SDM' : track === 'Strategy' ? 'Strategis' : 'Manajer Proyek'}
          </button>
        ))}
      </div>

      <div className="bg-[#1A3730]/03 p-4 rounded-xl border border-[#1A3730]/05 mb-4 text-left" id="track-summary-card">
        <h4 className="text-[11px] font-bold text-[#1A3730]" id="track-summary-title">{trackLabels[selectedTrack].title}</h4>
        <p className="text-[10px] text-gray-500 leading-normal" id="track-summary-desc">{trackLabels[selectedTrack].desc}</p>
      </div>

      {/* Visual Sliders displaying competencies of chosen track */}
      <div className="flex-1 space-y-4" id="competencies-bars">
        {skills[selectedTrack].map((sk) => (
          <div key={sk.name} className="text-left" id={`sk-row-${sk.name.replace(/\s/g, '')}`}>
            <div className="flex justify-between items-center mb-1" id={`sk-info-${sk.name.replace(/\s/g, '')}`}>
              <span className="text-[11px] font-bold text-[#1A3730] flex items-center gap-1.5">
                <CheckSquare className="w-3.5 h-3.5 text-emerald-600" /> {sk.name}
              </span>
              <span className="text-[11px] font-mono font-bold text-[#1A3730]">{sk.level}%</span>
            </div>
            
            {/* Elegant outer progress bar */}
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden" id={`sk-progress-bar-outer-${sk.name.replace(/\s/g, '')}`}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${sk.level}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="h-full bg-emerald-600 rounded-full"
                id={`sk-progress-bar-inner-${sk.name.replace(/\s/g, '')}`}
              />
            </div>
            
            <p className="text-[10px] text-gray-400 mt-1 pl-5" id={`sk-description-${sk.name.replace(/\s/g, '')}`}>
              {sk.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-100 mt-5 pt-3 flex items-center justify-between text-[10px] text-gray-400" id="toolstack-bar">
        <span className="font-mono">Penyusun Formulasi Model: Google Sheets | MS Excel | Canva | Asana</span>
      </div>
    </div>
  );
}
