import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, Users, Award, Calendar, ChevronRight, GraduationCap, CheckCircle } from 'lucide-react';
import { Experience } from '../types';

export default function Experiences() {
  const [activeTab, setActiveTab] = useState<'All' | 'Work' | 'Organization' | 'Award'>('All');
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);

  const experiences: Experience[] = [
    {
      id: 'exp1',
      role: 'HR Consultant Intern (Human Capital)',
      company: 'Nexus Tech Enterprise Partner',
      period: 'Juni 2025 - Des 2025',
      category: 'Work',
      description: 'Menganalisis sistem manajemen talenta dan memperbarui alur onboarding karyawan magang serta karyawan tetap.',
      achievements: [
        'Merancang dan mereposisi repositori alur onboarding digital baru, menyelaraskan dengan tujuan performa perusahaan.',
        'Mengonstruksi lembar evaluasi digital mingguan berkemampuan KPI otomatis, memangkas durasi administrasi manual sebesar 15 Jam per bulan.',
        'Mempercepat waktu penyesuaian awal magang (Onboarding Velocity) hingga 25% lebih cepat berdasarkan feedback komparatif.'
      ]
    },
    {
      id: 'exp2',
      role: 'General President, Student Business Forum',
      company: 'Senior Executive Forum Bisnis',
      period: 'Maret 2025 - Sekarang',
      category: 'Organization',
      description: 'Memimpin organisasi kemahasiswaan fokus pada akselerasi karir manajemen dan pengembangan analisis studi kasus bisnis.',
      achievements: [
        'Mengoordinasikan agenda strategis untuk 200+ anggota aktif dan 5 divisi fungsional strategis.',
        'Keberhasilan menyelenggarakan 3 Webinar Karir Nasional dengan akumulasi total 500+ partisipan.',
        'Menjalin aliansi kemitraan dengan 4 praktisi korporat senior tingkat manajerial sebagai mentor tahunan.'
      ]
    },
    {
      id: 'exp3',
      role: 'Juara 1 Nasional - Business Pitch Championship',
      company: 'National Creative Future Summit 2025',
      period: 'Oktober 2025',
      category: 'Award',
      description: 'Memformulasikan kanvas model bisnis sirkular terintegrasi untuk menyaring limbah biomassa menjadi biogas perkotaan.',
      achievements: [
        'Meraih Juara Pertama dari 120+ proposal bisnis dari universitas-universitas terkemuka nasional.',
        'Memaparkan rencana kelayakan finansial mendetail (NPV, IRR 5 tahun) di hadapan panel ahli modal ventura.',
        'Merancang visual presentasi eksekutif interaktif memakai prinsip kemudahan penyampaian ide komparatif.'
      ]
    },
    {
      id: 'exp4',
      role: 'Asisten Peneliti & Konsultan Bisnis Junior',
      company: 'Pusat Inkubasi Bisnis Mahasiswa UI/UGM',
      period: 'Feb 2024 - Jan 2025',
      category: 'Work',
      description: 'Membantu pelaku UMKM lokal melakukan penataan struktur organisasi dan manajemen biaya operasional terstruktur.',
      achievements: [
        'Melaksanakan audit operasional sederhana untuk 3 UMKM bidang F&B dan kriya kreatif.',
        'Membuat buku panduan manajemen kas sederhana berbasis lembar sebar otomatis yang mudah dipahami pemilik usaha.',
        'Memberikan kajian komparatif kesiapan ekspansi cabang luar daerah dengan proyeksi optimasi kelayakan lokal.'
      ]
    }
  ];

  const filteredExperiences = activeTab === 'All' 
    ? experiences 
    : experiences.filter(exp => exp.category === activeTab);

  const getIcon = (category: string) => {
    switch(category) {
      case 'Work': return <Briefcase className="w-4 h-4 text-emerald-600" />;
      case 'Organization': return <Users className="w-4 h-4 text-[#A17C3D]" />;
      case 'Award': return <Award className="w-4 h-4 text-purple-600" />;
      default: return <Briefcase className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div id="experiences-bento" className="bg-white rounded-[2rem] border border-gray-100 p-6 shadow-sm flex flex-col flex-1 min-w-[320px] md:min-w-[480px]">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <span className="bg-[#E6F4EA] text-[#1A3730] text-[10px] uppercase tracking-wider font-mono px-3 py-1 rounded-full border border-[#2A5248]/10 inline-block mb-1.5" id="timeline-badge">
            Karir & Relevansi
          </span>
          <h3 className="text-[#1A3730] font-semibold text-lg tracking-tight" id="timeline-title">Lini Masa Perjalanan</h3>
        </div>
        {/* Navigation tabs inside header */}
        <div className="flex bg-gray-100 rounded-full p-1" id="timeline-tab-bar">
          {(['All', 'Work', 'Organization', 'Award'] as const).map((tab) => (
            <button
              key={tab}
              id={`tab-btn-${tab}`}
              onClick={() => {
                setActiveTab(tab);
                setSelectedExp(null);
              }}
              className={`px-3 py-1.5 rounded-full text-[10px] font-medium transition-all cursor-pointer ${
                activeTab === tab 
                  ? 'bg-white text-[#1A3730] shadow-xs font-semibold' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {tab === 'All' ? 'Semua' : tab === 'Work' ? 'Magang' : tab === 'Organization' ? 'Organisasi' : 'Prestasi'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-6" id="experiences-grid">
        {/* Left column: List */}
        <div className={`${selectedExp ? 'md:col-span-6' : 'md:col-span-12'} space-y-3 max-h-[380px] overflow-y-auto pr-1 transition-all duration-300`} id="exp-list-container">
          <AnimatePresence mode="popLayout">
            {filteredExperiences.map((exp) => (
              <motion.div
                key={exp.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => setSelectedExp(selectedExp?.id === exp.id ? null : exp)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer text-left flex items-start gap-4 ${
                  selectedExp?.id === exp.id 
                    ? 'border-[#1A3730] bg-[#1A3730]/05' 
                    : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                }`}
                id={`exp-item-${exp.id}`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  selectedExp?.id === exp.id ? 'bg-[#1A3730] text-white' : 'bg-gray-100'
                }`} id={`exp-icon-wrap-${exp.id}`}>
                  {selectedExp?.id === exp.id ? <CheckCircle className="w-4 h-4" /> : getIcon(exp.category)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1" id={`exp-item-header-${exp.id}`}>
                    <span className="text-[10px] text-gray-400 font-mono flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {exp.period}
                    </span>
                    <ChevronRight className={`w-3.5 h-3.5 text-gray-400 transition-transform ${selectedExp?.id === exp.id ? 'rotate-90 text-[#1A3730]' : ''}`} />
                  </div>
                  <h4 className="text-xs font-semibold text-[#1A3730]" id={`exp-role-${exp.id}`}>{exp.role}</h4>
                  <p className="text-[11px] text-gray-500 font-medium" id={`exp-company-${exp.id}`}>{exp.company}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Right column: Highlights and Achievements of selected item */}
        {selectedExp && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="md:col-span-6 bg-gray-50/50 rounded-2xl p-5 border border-gray-100 text-left flex flex-col"
            id="exp-details-panel"
          >
            <div className="mb-4" id="details-header">
              <span className={`text-[9px] uppercase tracking-wider font-mono font-bold px-2 py-0.5 rounded-md inline-block mb-1.5 ${
                selectedExp.category === 'Work' 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                  : selectedExp.category === 'Organization' 
                    ? 'bg-amber-50 text-[#A17C3D] border border-amber-100'
                    : 'bg-purple-50 text-purple-700 border border-purple-100'
              }`}>
                {selectedExp.category === 'Work' ? 'Magang Manajemen' : selectedExp.category === 'Organization' ? 'Organisasi Mahasiswa' : 'Prestasi Nasional'}
              </span>
              <h4 className="text-[#1A3730] font-bold text-sm" id="details-role">{selectedExp.role}</h4>
              <p className="text-gray-500 text-xs font-medium" id="details-company">{selectedExp.company}</p>
            </div>

            <p className="text-xs text-gray-600 mb-4 leading-relaxed border-b border-gray-100 pb-3" id="details-desc">
              {selectedExp.description}
            </p>

            <div className="flex-1 space-y-2.5 overflow-y-auto max-h-[170px]" id="details-achievements">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-1" id="impact-headline">Sorotan Dampak & Kinerja</p>
              {selectedExp.achievements.map((ach, idx) => (
                <div key={idx} className="flex gap-2 items-start" id={`ach-row-${idx}`}>
                  <div className="w-4 h-4 rounded-full bg-[#1A3730] text-white flex items-center justify-center shrink-0 text-[9px] mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-xs text-gray-700 leading-snug">{ach}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <div className="bg-[#1A3730]/05 mt-6 px-4 py-3 rounded-2xl border border-gray-100 flex items-center gap-3.5 text-left" id="academic-card">
        <div className="w-10 h-10 rounded-full bg-[#1A3730] text-white flex items-center justify-center shrink-0" id="aca-icon">
          <GraduationCap className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-[#1A3730]" id="aca-degree">Bachelor of Management / Sarjana Manajemen (S.M.)</h4>
          <p className="text-[11px] text-gray-500" id="aca-school">Predikat Kelulusan: Dengan Pujian (Cum Laude, IPK: 3.77 / 4.00)</p>
        </div>
      </div>
    </div>
  );
}
