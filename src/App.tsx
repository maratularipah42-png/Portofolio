import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, CheckCircle, Search, Sparkles, Briefcase, Award, GraduationCap, 
  Linkedin, Mail, Calendar, Camera, Globe, ChevronRight, Calculator, FileText,
  TrendingUp, Landmark, Video, Film, Sliders, Eye, EyeOff, Phone, Pencil
} from 'lucide-react';

import Experiences from './components/Experiences';
import Projects from './components/Projects';
import SkillsRadar from './components/SkillsRadar';
import ContactForm from './components/ContactForm';
import TranscriptModal from './components/TranscriptModal';
import ThankYou from './components/ThankYou';

// Direct static URL reference to the generated corporate portrait
const profileImg = "/src/assets/images/annisa_nurus_green_bg_1781023481072.png";

export default function App() {
  const isEditAllowed = false;

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>(() => {
    const defaults = {
      about: true,
      education: true,
      skillsToolset: true,
      experiences: true,
      projects: true,
      skillsRadar: true,
      planner: true,
      hireMePlanner: true,
      contact: true,
      contactForm: true,
      thankYou: true,
    };
    try {
      const saved = localStorage.getItem('annisa_portfolio_visible_sections');
      return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
    } catch (e) {
      return defaults;
    }
  });

  const toggleSection = (section: string) => {
    const updated = { ...visibleSections, [section]: !visibleSections[section] };
    setVisibleSections(updated);
    localStorage.setItem('annisa_portfolio_visible_sections', JSON.stringify(updated));
  };

  const sectionLabels: Record<string, string> = {
    about: 'Tentang Saya (About)',
    education: 'Pendidikan (Education)',
    skillsToolset: 'Keahlian & Aplikasi (Skills)',
    experiences: 'Lini Masa (Experiences)',
    projects: 'Galeri Karya Desain (Projects)',
    skillsRadar: 'Radar Kompetensi (Skills Radar)',
    hireMePlanner: 'Kalkulator Beban Kerja (Planner)',
    contactForm: 'Kontak Person & Formulir (Contact)',
    thankYou: 'Kartu Terima Kasih (Thank You Banner)'
  };

  // Custom static avatar state retrieved from previous uploads
  const [avatar] = useState<string>(() => {
    const saved = localStorage.getItem('annisa_portfolio_avatar');
    if (!saved || saved === "/src/assets/images/annisa_nurus_nobg_1780815394053.png" || saved === "/src/assets/images/annisa_nurus_avatar_1780808796605.png" || saved === "/src/assets/images/annisa_nurus_real_photo_1780811600265.png") {
      return profileImg;
    }
    return saved;
  });

  // Static "About Me" Section Values
  const [aboutText] = useState<string>(() => {
    return localStorage.getItem('annisa_portfolio_about_text') || 
      "I am Freshgraduate S1 Manajemen dengan IPK 3,77 dan pengalaman magang di PT Pertamina Patra Niaga Regional Sulawesi serta Kantor Perwakilan Bursa Efek Indonesia Sulawesi Selatan. Memiliki kemampuan administrasi, pengolahan data, dan penyusunan laporan menggunakan Microsoft Excel. Berpengalaman dalam kewirausahaan digital, organisasi, dan kegiatan volunteer yang membentuk kemampuan komunikasi, kepemimpinan, serta kerja tim. Siap berkontribusi pada posisi administrasi, corporate support, dan business support berbasis data.";
  });
  const [aboutPhoto] = useState<string>(() => {
    const saved = localStorage.getItem('annisa_portfolio_about_photo');
    if (!saved || saved === "/src/assets/images/annisa_nurus_nobg_1780815394053.png" || saved === "/src/assets/images/annisa_nurus_avatar_1780808796605.png" || saved === "/src/assets/images/annisa_nurus_real_photo_1780811600265.png") {
      return profileImg;
    }
    return saved;
  });
  const [aboutName] = useState<string>("Annisa");

  // Editable Education States
  const [schoolName, setSchoolName] = useState<string>(() => {
    return localStorage.getItem('annisa_portfolio_school') || "Sekolah Tinggi Ilmu Ekonomi Makassar Bongaya (STIEM BONGAYA)";
  });
  const [degreeGpa, setDegreeGpa] = useState<string>(() => {
    return localStorage.getItem('annisa_portfolio_degree') || "S1 Manajemen | IPK 3.77 / 4.00";
  });
  const [yearRange, setYearRange] = useState<string>(() => {
    return localStorage.getItem('annisa_portfolio_years') || "2021 - 2025";
  });
  const [educationDetailText, setEducationDetailText] = useState<string>(() => {
    return localStorage.getItem('annisa_portfolio_education_detail') || "Fokus utama studi meliputi Manajemen Sumber Daya Manusia (MSDM), Manajemen Operasi, dan Analisis Keputusan. Berkomitmen tinggi terhadap metodologi berbasis data dengan pencapaian predikat kelulusan sangat memuaskan (Cum Laude).";
  });
  const [educationPhoto, setEducationPhoto] = useState<string>(() => {
    return localStorage.getItem('annisa_portfolio_education_photo') || "/src/assets/images/stiem_campus_photo_1780815811779.png";
  });
  const [isEditingEducation, setIsEditingEducation] = useState(false);
  const [tempSchool, setTempSchool] = useState(schoolName);
  const [tempDegree, setTempDegree] = useState(degreeGpa);
  const [tempYears, setTempYears] = useState(yearRange);
  const [tempDetail, setTempDetail] = useState(educationDetailText);
  const [showEducationDetails, setShowEducationDetails] = useState(false);

  // Editable Skills & Toolset States
  const [hardSkills, setHardSkills] = useState<string[]>(() => {
    const saved = localStorage.getItem('annisa_portfolio_hard_skills');
    return saved ? JSON.parse(saved) : [
      "Microsoft Excel (Data Processing, Recap, Basic Analysis)",
      "Microsoft Word (Administrative Documents & Reporting)",
      "Microsoft PowerPoint (Presentation & Reporting)",
      "Administrative Support & Data Entry",
      "Data Collection & Survey Implementation",
      "Digital Marketing (Social Media & Marketplace)",
      "Online Sales & Customer Management",
      "Content Creation (Basic Graphic Design)",
      "Market Research Support"
    ];
  });

  const [softSkills, setSoftSkills] = useState<string[]>(() => {
    const saved = localStorage.getItem('annisa_portfolio_soft_skills');
    return saved ? JSON.parse(saved) : [
      "Communication Skills",
      "Leadership",
      "Teamwork & Collaboration",
      "Time Management",
      "Critical Thinking",
      "Problem Solving",
      "Adaptability",
      "Negotiation Skills",
      "Decision Making"
    ];
  });

  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [tempHardSkills, setTempHardSkills] = useState<string>("");
  const [tempSoftSkills, setTempSoftSkills] = useState<string>("");

  // Pop-up triggers for hero circle buttons
  const [showVerification, setShowVerification] = useState(false);
  const [showPhotoJournal, setShowPhotoJournal] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  // Hire me builder states
  const [inquiryType, setInquiryType] = useState<'Consulting' | 'HR' | 'Agile'>('HR');
  const [tier, setTier] = useState<'Associate' | 'Specialist'>('Associate');
  const [engagementType, setEngagementType] = useState<'Project' | 'FullTime'>('FullTime');

  // Interactive scorecard estimates based on selection
  const estimateWorkload = () => {
    let baseHours = engagementType === 'Project' ? 15 : 40;
    let title = '';
    let focus = [];
    
    if (inquiryType === 'HR') {
      title = `${tier === 'Associate' ? 'Junior HC Partner' : 'HC Specialist Lead'}`;
      focus = ['Audit Onboarding Pipeline', 'Penyusunan KPI Otomatis', 'Pemetaan Kontrak Magang'];
    } else if (inquiryType === 'Consulting') {
      title = `${tier === 'Associate' ? 'Strategic Business Associate' : 'Management Analyst Lead'}`;
      focus = ['Uji Kelayakan BEP/NPV', 'Audit Segmentasi Demografi', 'Visualisasi Pitch Deck'];
    } else {
      title = `${tier === 'Associate' ? 'Junior Project Manager' : 'Operational Sponsor Lead'}`;
      focus = ['Konsolidasi 5 Divisi', 'Sponsorship Pitching', 'Manajemen Anggaran Kas'];
    }

    return { baseHours, title, focus };
  };

  const { baseHours, title, focus } = estimateWorkload();

  const handleSmoothScroll = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const photoJournalImages = [
    { title: 'Persiapan Pitching Bisnis', desc: 'Pemetaan konsep sirkular biomassa nasional.', tag: 'Kompetisi' },
    { title: 'Nexus Enterprise Onboarding', desc: 'Sesi pengenalan database KPI karyawan.', tag: 'Magang Kerja' },
    { title: 'Senior Forum Rapat Paripurna', desc: 'Pengarahan pimpinan program webinar nasional.', tag: 'Kepemimpinan' }
  ];

  return (
    <div id="main-portfolio-container" className="min-h-screen bg-[#F4F3EF] px-4 py-8 md:px-8 text-neutral-800 selection:bg-[#1A3730] selection:text-white antialiased">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* TOP COMPACT BAR (Directly inspired by the mockup frame) */}
        <div id="top-mockup-control-bar" className="flex items-center justify-between bg-white rounded-full px-5 py-3 border border-gray-100 shadow-xs flex-wrap gap-3">
          <div className="flex items-center gap-3" id="top-bar-left">
            <div className="w-8 h-8 rounded-full bg-neutral-900 overflow-hidden text-white flex items-center justify-center shrink-0 border border-gray-100/50" id="avatar-circle-icon">
              {avatar ? (
                <img src={avatar} className="w-full h-full object-cover" alt="Annisa Avatar" />
              ) : (
                <User className="w-4 h-4" />
              )}
            </div>
            <span className="text-xs font-bold text-[#1A3730] tracking-tight font-display" id="avatar-lettering">Annisa Nurus Saidah, S.M.</span>
          </div>

          <div className="flex items-center gap-2" id="top-bar-right-pills">
            {/* Pulsing Readiness Status Badge */}
            <div 
              id="status-ready-pill"
              className="bg-gray-100 hover:bg-[#E6F4EA] px-4 py-1.5 rounded-full text-[10px] font-bold text-[#1A3730] border border-transparent hover:border-[#1A3730]/10 flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
              onClick={() => handleSmoothScroll('contact-form-bento')}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              Hi, im ready
            </div>

            {/* Current Year Badge */}
            <div id="year-pill" className="bg-gray-100 px-4 py-1.5 rounded-full text-[10px] font-bold text-gray-600 font-mono">
              2026
            </div>

            {/* Dynamic Find Out Explorer */}
            <button 
              id="find-out-search-pill"
              onClick={() => handleSmoothScroll('bento-grid-dashboard')}
              className="bg-[#1A3730] hover:bg-[#254F45] text-white px-5 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              Find Out
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* SECTION VISIBILITY PANEL - displayed when Edit Mode is active */}
        {isEditAllowed && (
          <div 
            id="section-visibility-manager" 
            className="w-full bg-[#1A3730]/03 border border-[#1A3730]/10 p-5 rounded-3xl mb-6 text-left animate-fade-in"
          >
            <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#1A3730]" />
                <span className="text-xs font-black text-[#1A3730] tracking-tight uppercase font-mono">
                  Pengatur Visibilitas Bagian (Tampilkan/Sembunyikan Menu)
                </span>
              </div>
              <span className="text-[10px] text-gray-400 font-medium">
                Klik tombol di bawah ini untuk menampilkan atau menyembunyikan halaman/kolom pada portofolio secara live.
              </span>
            </div>
            
            <div className="flex flex-wrap gap-2" id="visibility-toggles-dock">
              {Object.entries(sectionLabels).map(([key, label]) => {
                const isVisible = visibleSections[key] !== false;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleSection(key)}
                    className={`px-3.5 py-1.5 rounded-full text-[10.5px] font-extrabold border transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                      isVisible
                        ? 'bg-[#1A3730] text-emerald-300 border-transparent shadow-xs'
                        : 'bg-white text-gray-400 border-gray-150 hover:bg-gray-50'
                    }`}
                  >
                    {isVisible ? (
                      <Eye className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <EyeOff className="w-3.5 h-3.5 text-gray-300" />
                    )}
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* HERO BLOCK GRID (Direct alignment with the mockup layout sketch) */}
        <div id="hero-block-layout-grid" className="grid grid-cols-1 md:grid-cols-12 gap-5">
          
          {/* LEFT CONTAINER: Big Title "Portofolio" Card */}
          <div 
            id="hero-left-title-card" 
            className="md:col-span-8 bg-[#1A3730] rounded-[2rem] p-8 md:p-12 text-left flex flex-col justify-between min-h-[300px] relative overflow-hidden shadow-sm"
          >
            {/* Visual background ambient details */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-700/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="flex justify-end items-start" id="hero-tag-wrap">
              <button 
                onClick={() => setShowTranscript(true)}
                title="Lihat Detail Transkrip Nilai Sementara"
                className="bg-[#2A5248] hover:bg-[#34665a] text-white text-[10px] font-mono px-3 py-1.5 rounded-lg border border-[#3A6D60] cursor-pointer transition-all active:scale-95 flex items-center gap-1.5 shadow-sm"
              >
                <GraduationCap className="w-3.5 h-3.5 text-emerald-300" />
                IPK: 3.77 / 4.00
              </button>
            </div>

            {/* Big Bold Portofolio Heading */}
            <div className="my-6 md:my-0" id="hero-title-text-wrap">
              <h1 
                className="text-white font-display text-5xl md:text-7xl font-extrabold tracking-tight" 
                id="hero-portofolio-title"
                style={{ letterSpacing: '-0.03em' }}
              >
                Portofolio
              </h1>
            </div>

            {/* Underline Connected Pill Group for Name */}
            <div className="flex items-center gap-3 flex-wrap" id="hero-name-pill-row">
              <div 
                id="name-tag-capsule" 
                className="bg-white px-5 py-2.5 rounded-full text-xs font-bold text-[#1A3730] shadow-sm border border-gray-100 shrink-0 select-none"
              >
                Annisa Nurus Saidah, S.M.
              </div>
              
              {/* Horizontal layout extension line continuing behind the tag */}
              <div className="h-[1.5px] bg-[#2A5248] flex-1 min-w-[40px] opacity-60" id="name-underline-ext"></div>
            </div>
          </div>

          {/* RIGHT CONTAINER: Portrait Card with portrait picture and badge actions */}
          <div 
            id="hero-right-portrait-card" 
            className="md:col-span-4 flex flex-col gap-4 justify-between"
          >
            {/* Rounded Headshot image of candidate (Locked Static) */}
            <div 
              id="portrait-frame" 
              className="bg-[#1A3730] aspect-[1/1.05] rounded-[2rem] overflow-hidden shadow-sm relative border-2 border-transparent"
            >
              <img 
                src={avatar} 
                alt="Annisa Nurus Saidah, S.M." 
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain p-2"
                id="ahmad-portrait-photo"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
            </div>

            {/* SMALL CARDS: Action Circle Buttons directly reflecting the mockup buttons */}
            <div 
              id="mockup-action-circles-card" 
              className="bg-[#1A3730] rounded-2xl py-4.5 px-6 flex items-center justify-center gap-6 shadow-sm border border-[#2A5248]/20"
            >
              {/* Verified check badge button */}
              <button 
                id="action-circle-verify"
                onClick={() => {
                  setShowVerification(true);
                  setShowPhotoJournal(false);
                }}
                className="w-11 h-11 rounded-full bg-[#2A5248] hover:bg-[#34665A] active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer relative group shadow-sm border border-[#3E7D6F]/30"
              >
                <CheckCircle className="w-5 h-5 text-emerald-300 group-hover:rotate-6 transition-transform" />
                <span className="absolute -top-8 bg-[#1a352e] text-white text-[9px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-[#24453c]">
                  Cek Verifikasi
                </span>
              </button>

              {/* Shutter camera circle button */}
              <button 
                id="action-circle-camera"
                onClick={() => {
                  setShowPhotoJournal(true);
                  setShowVerification(false);
                }}
                className="w-11 h-11 rounded-full bg-[#2A5248] hover:bg-[#34665A] active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer relative group shadow-sm border border-[#3E7D6F]/30"
              >
                <Camera className="w-5 h-5 text-[#E7C783] group-hover:scale-11 transition-transform" />
                <span className="absolute -top-8 bg-[#1a352e] text-white text-[9px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-[#24453c]">
                  Galeri Aktivitas
                </span>
              </button>
            </div>

          </div>

        </div>

        {/* ABOUT ME SECTION (Fully customizable text & image) */}
        {visibleSections.about !== false && (
          <div id="about-me-section-card" className="bg-white rounded-[2.5rem] p-6 md:p-8 border border-gray-100 shadow-sm text-left relative overflow-hidden">
            {/* Top Bar matching mockup layout */}
            <div className="flex items-center justify-between gap-4 mb-6" id="about-top-control-bar">
              <div className="flex items-center gap-3" id="about-top-left">
                {/* Left badge replaced with beautiful Stock Exchange (Bursa Efek) / Cute Sparkles Icon */}
                <div 
                  className="w-10 h-10 rounded-full bg-[#1A3730] text-emerald-300 flex items-center justify-center relative shadow-sm border border-emerald-500/20 group cursor-help transition-all duration-300 hover:scale-105" 
                  id="about-badge-bursa-icon"
                  title="Bursa Efek Indonesia / Finansial & Investasi"
                >
                  <TrendingUp className="w-5 h-5 text-emerald-300 group-hover:scale-110 transition-transform" />
                  <Sparkles className="w-3 h-3 text-yellow-300 absolute -top-0.5 -right-0.5 animate-pulse" />
                </div>
                {/* Soft pill containing the profile name */}
                <div className="bg-neutral-100 text-neutral-850 px-4 py-1.5 rounded-full text-xs font-bold font-sans flex items-center gap-1 shadow-2xs border border-neutral-250 animate-fade-in" id="about-name-pill">
                  <span>{aboutName}</span>
                </div>
              </div>
              {/* Right actions and decorative pill */}
              <div className="flex items-center gap-2" id="about-section-actions">
                <div className="hidden sm:flex items-center gap-2 bg-neutral-50 border border-neutral-100 px-3.5 py-1.5 rounded-full text-gray-500 text-[11px] font-mono select-none" id="about-top-right-decor">
                  <span>Search Profile</span>
                  <Search className="w-3.5 h-3.5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Grid contents */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center" id="about-content-grid">
              
              {/* Left side: Photo with mockup overlays */}
              <div className="md:col-span-4 flex flex-col items-center justify-center" id="about-left-column">
                <div className="relative w-full max-w-[260px] aspect-[1/1.1] rounded-[2rem] bg-[#1A3730] flex items-center justify-center overflow-hidden" id="about-photo-wrapper">
                  {/* Overlapping Black Check Circle Badge ✓ on Top-Right */}
                  <div className="absolute -top-2.5 -right-2.5 bg-neutral-900 border border-neutral-800 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-xs select-none z-10">
                    ✓
                  </div>
                  
                  {/* Overlapping Deep Green Cross Circle Badge ✕ on Left boundary */}
                  <div className="absolute top-1/2 -left-2.5 -translate-y-1/2 bg-[#1A3730] border border-emerald-800 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-xs select-none z-10">
                    ✕
                  </div>

                  <img 
                    src={aboutPhoto} 
                    alt="About Annisa" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain p-2 rounded-[2rem]"
                  />

                  {/* Overlay gradient indicator */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none rounded-[2rem]"></div>
                </div>
              </div>

              {/* Right side: Large About Me header, silhouette magnifying badge, speech bubble biography text */}
              <div className="md:col-span-8 flex flex-col justify-between text-left" id="about-right-column">
                <div className="flex justify-between items-start flex-wrap gap-4" id="about-heading-and-badge-row">
                  <div>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1A3730] font-sans" id="about-me-main-title">
                      About Me
                    </h2>
                  </div>

                  {/* Interactive Profile Search Badge (User Silhouette inside a magnifying lens) */}
                  <div className="relative group block select-none" id="about-decorative-silhouette-badge">
                    <div className="w-11 h-11 rounded-full bg-neutral-100 border border-neutral-200/40 flex items-center justify-center relative shadow-2xs">
                      <User className="w-5 h-5 text-neutral-850" />
                      <div className="absolute bottom-[-2px] right-[-2px] bg-neutral-900 text-white w-5 h-5 rounded-full flex items-center justify-center">
                        <Search className="w-2.5 h-2.5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative wide grey capsule pill */}
                <div className="w-24 h-4.5 bg-neutral-300 rounded-full opacity-60 mb-4 mt-2" id="about-decorative-pill"></div>

                {/* Biography bubble text card selector */}
                <div className="bg-neutral-50/65 rounded-2xl border border-neutral-200/50 p-5 shadow-2xs relative" id="about-bubble-editor">
                  <div id="about-display-text" className="relative">
                    <p className="text-gray-750 text-xs md:text-sm leading-relaxed font-sans font-medium whitespace-pre-wrap text-justify">
                      {aboutText}
                    </p>
                  </div>
                </div>

                {/* Bottom decorative wide grey bar */}
                <div className="w-40 h-4.5 bg-neutral-305 rounded-full opacity-45 self-end mt-4" id="about-decorative-bottom-bar"></div>
              </div>

            </div>
          </div>
        )}

        {/* EDUCATION SECTION (Fully customizable text & image) */}
        {visibleSections.education !== false && (
          <div id="education-section-card" className="bg-white rounded-[2.5rem] p-6 md:p-8 border border-gray-100 shadow-sm text-left relative overflow-hidden mt-6">
            {/* Top Bar matching mockup layout */}
            <div className="flex items-center justify-between gap-4 mb-6" id="education-top-control-bar">
              <div className="flex items-center gap-3" id="education-top-left">
                {/* Left badge: elegant graduation cap themed badge matching bursa icon style */}
                <div 
                  className="w-10 h-10 rounded-full bg-[#1A3730] text-emerald-300 flex items-center justify-center relative shadow-sm border border-emerald-500/20 group cursor-help transition-all duration-300 hover:scale-105" 
                  id="education-badge-school-icon"
                  title="Pendidikan & Akademik Terverifikasi"
                >
                  <GraduationCap className="w-5 h-5 text-emerald-300 group-hover:scale-110 transition-transform" />
                  <Sparkles className="w-3 h-3 text-yellow-300 absolute -top-0.5 -right-0.5 animate-pulse" />
                </div>
                {/* Soft pill containing the label */}
                <div className="bg-neutral-100 text-neutral-850 px-4 py-1.5 rounded-full text-xs font-bold font-sans flex items-center gap-1 shadow-2xs border border-neutral-250 animate-fade-in" id="education-pill-label">
                  <span>Education</span>
                </div>
              </div>
              
              {/* Right actions */}
              <div className="flex items-center gap-2" id="education-top-right-actions">
                {/* Action edit button */}
                {isEditAllowed && !isEditingEducation && (
                  <button
                    type="button"
                    onClick={() => {
                      setTempSchool(schoolName);
                      setTempDegree(degreeGpa);
                      setTempYears(yearRange);
                      setTempDetail(educationDetailText);
                      setIsEditingEducation(true);
                    }}
                    className="bg-neutral-50 hover:bg-neutral-100 text-neutral-850 border border-neutral-200 text-[11px] font-bold px-3.5 py-1.5 rounded-xl transition-all cursor-pointer shadow-xs flex items-center gap-1.5 active:scale-97 animate-fade-in"
                  >
                    ✏️ Edit Informasi Pendidikan
                  </button>
                )}
              </div>
            </div>

          {/* Form for editing */}
          {isEditingEducation ? (
            <div className="bg-neutral-50/60 border border-neutral-200/50 rounded-2xl p-6 mb-4 space-y-4" id="education-edit-form">
              <h3 className="text-sm font-bold text-[#1A3730] uppercase tracking-wider font-sans mb-2 border-b pb-2">✏️ Ubah Informasi Pendidikan</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Nama Institusi / Universitas</label>
                  <input
                    type="text"
                    value={tempSchool}
                    onChange={(e) => setTempSchool(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-sans text-gray-700 font-medium focus:outline-none focus:border-[#1A3730]"
                    placeholder="Masukkan nama sekolah/universitas"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Tingkat Pendidikan, Jurusan & IPK</label>
                  <input
                    type="text"
                    value={tempDegree}
                    onChange={(e) => setTempDegree(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-sans text-gray-700 font-medium focus:outline-none focus:border-[#1A3730]"
                    placeholder="Contoh: S1 Manajemen | IPK 3.77 / 4.00"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Rentang Tahun Studi</label>
                  <input
                    type="text"
                    value={tempYears}
                    onChange={(e) => setTempYears(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-mono text-gray-700 focus:outline-none focus:border-[#1A3730]"
                    placeholder="Contoh: 2021 - 2025"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Ganti Foto Pendidikan</label>
                  <label className="w-full bg-white border border-gray-200 hover:bg-neutral-50 rounded-xl px-3 py-2 text-xs font-sans text-gray-600 block cursor-pointer text-left transition-all relative">
                    <span className="flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5 text-emerald-600" />
                      Pilih & Upload Foto Baru...
                    </span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            const b64 = reader.result as string;
                            setEducationPhoto(b64);
                            localStorage.setItem('annisa_portfolio_education_photo', b64);
                          };
                          reader.readAsDataURL(e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Detail Deskripsi Pendidikan</label>
                <textarea
                  value={tempDetail}
                  onChange={(e) => setTempDetail(e.target.value)}
                  rows={4}
                  className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-sans text-gray-700 leading-relaxed focus:outline-none focus:border-[#1A3730]"
                  placeholder="Masukkan detail mata kuliah unggulan, fokus, atau prestasi"
                />
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-neutral-200/50" id="education-form-actions">
                <button
                  type="button"
                  onClick={() => {
                    const defaultSchool = "Sekolah Tinggi Ilmu Ekonomi Makassar Bongaya (STIEM BONGAYA)";
                    const defaultDegree = "S1 Manajemen | IPK 3.77 / 4.00";
                    const defaultYears = "2021 - 2025";
                    const defaultDetailText = "Fokus utama studi meliputi Manajemen Sumber Daya Manusia (MSDM), Manajemen Operasi, dan Analisis Keputusan. Berkomitmen tinggi terhadap metodologi berbasis data dengan pencapaian predikat kelulusan sangat memuaskan (Cum Laude).";
                    setTempSchool(defaultSchool);
                    setTempDegree(defaultDegree);
                    setTempYears(defaultYears);
                    setTempDetail(defaultDetailText);
                    setEducationPhoto("/src/assets/images/stiem_campus_photo_1780815811779.png");
                    localStorage.removeItem('annisa_portfolio_education_photo');
                  }}
                  className="text-[10px] font-mono font-bold text-red-605 hover:underline cursor-pointer"
                >
                  Reset Standard
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingEducation(false)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSchoolName(tempSchool);
                      setDegreeGpa(tempDegree);
                      setYearRange(tempYears);
                      setEducationDetailText(tempDetail);
                      localStorage.setItem('annisa_portfolio_school', tempSchool);
                      localStorage.setItem('annisa_portfolio_degree', tempDegree);
                      localStorage.setItem('annisa_portfolio_years', tempYears);
                      localStorage.setItem('annisa_portfolio_education_detail', tempDetail);
                      setIsEditingEducation(false);
                    }}
                    className="bg-[#1A3730] hover:bg-[#254F45] text-white text-xs font-bold px-5 py-2 rounded-xl transition-colors cursor-pointer shadow-xs"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            </div>
          ) : null}

          {/* Grid contents */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch" id="education-content-grid">
            
            {/* Left side: Information description card & stylized graphics matching mockup */}
            <div className="col-span-1 md:col-span-8 flex flex-col justify-between text-left" id="education-left-column">
              
              <div>
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1A3730] font-sans mb-4" id="education-main-title">
                  Education
                </h2>

                {/* Hand-drawn Graduation Cap Outline Illustration */}
                <div className="flex items-center gap-6 mb-4 mt-2" id="education-mockup-graphics">
                  <div className="bg-neutral-50 rounded-2xl p-4 border border-dashed border-neutral-300 flex items-center justify-center shrink-0 w-16 h-16 shadow-3xs" id="grad-cap-illu">
                    <GraduationCap className="w-10 h-10 text-neutral-850 animate-bounce" />
                  </div>
                  <div className="h-0.5 bg-neutral-200 flex-1 relative" id="decor-dotted-line">
                    <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-1.5 h-1.5 bg-[#1A3730] rounded-full"></div>
                    <div className="absolute top-1/2 left-3/4 -translate-y-1/2 w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  </div>
                </div>

                {/* Main education information card block with left colored bar */}
                <div className="bg-neutral-50/70 border border-neutral-200/50 rounded-2xl p-6 relative flex items-start gap-4 shadow-3xs hover:shadow-2xs transition-shadow" id="education-item-display">
                  {/* Left solid vertical bar matching the mockup */}
                  <div className="w-1.5 bg-[#1A3730] self-stretch rounded-full" id="educ-left-bar"></div>
                  
                  <div className="space-y-2 flex-1" id="educ-texts">
                    <p className="text-[#1A3730] font-bold text-sm md:text-base leading-snug font-sans uppercase tracking-wide">
                      {schoolName}
                    </p>
                    <p className="text-gray-650 font-semibold text-xs md:text-sm font-sans">
                      {degreeGpa}
                    </p>
                    <p className="text-gray-400 font-mono text-xs">
                      {yearRange}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom stylized Pill Toggle Switch exactly as mockup drawing: clicking toggles detail text */}
              <div className="mt-8 flex flex-col gap-2.5 items-start" id="education-toggle-controller">
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider font-bold">Fokus utama studi</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowEducationDetails(!showEducationDetails)}
                    className={`w-14 h-7 rounded-full transition-colors relative focus:outline-none cursor-pointer ${
                      showEducationDetails ? 'bg-[#1A3730]' : 'bg-neutral-300'
                    }`}
                    id="educ-pill-switch"
                    title="Aktifkan untuk melihat detail mata kuliah unggulan"
                  >
                    <div 
                      className={`w-5.5 h-5.5 bg-white rounded-full absolute top-[3px] shadow-sm transition-transform ${
                        showEducationDetails ? 'translate-x-7.5' : 'translate-x-[4px]'
                      }`}
                    />
                  </button>
                  <span className="text-xs font-bold text-neutral-850 font-sans select-none">
                    {showEducationDetails ? 'Sembunyikan Deskripsi' : 'Tampilkan Deskripsi'}
                  </span>
                </div>

                {/* Expandable detail card matching the toggle state */}
                <AnimatePresence>
                  {showEducationDetails && (
                    <motion.div 
                      className="bg-[#E6F4EA]/40 border border-emerald-900/10 rounded-2xl p-4.5 mt-2 max-w-lg shadow-sm"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <p className="text-xs text-[#1A3730] font-sans leading-relaxed whitespace-pre-wrap text-justify">
                        {educationDetailText}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

            {/* Right side: Campus Photo Frame with border/gradient styles */}
            <div className="col-span-1 md:col-span-4 flex flex-col items-center justify-center relative min-h-[220px]" id="education-right-column">
              <div className="relative w-full aspect-[1/1.2] rounded-[2rem] bg-[#1A3730] flex items-center justify-center overflow-hidden border border-neutral-100 shadow-sm" id="education-photo-frame">
                
                {/* Overlapping Black Check Circle Badge ✓ on Top-Left */}
                <div className="absolute top-2.5 left-2.5 bg-neutral-900 border border-neutral-800 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-xs select-none z-10">
                  ✓
                </div>

                <img 
                  src={educationPhoto} 
                  alt="Campus Area" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-[2rem]"
                />

                {/* Overlying gradient to darken and beautify bottom frame of the image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none rounded-[2rem]"></div>
              </div>
            </div>

          </div>
        </div>
        )}

        {/* SKILLS & TOOLSET SECTION (Featuring custom SVG logo suites and dual timeline columns) */}
        {visibleSections.skillsToolset !== false && (
          <div id="skills-toolset-section-card" className="bg-white rounded-[2.5rem] p-6 md:p-8 border border-gray-100 shadow-sm text-left relative overflow-hidden mt-6">
            {/* Top Bar control panel */}
            <div className="flex items-center justify-between gap-4 mb-6" id="skills-top-control-bar">
              <div className="flex items-center gap-3" id="skills-top-left">
                {/* Badge replaced with beautiful Video / Film Editor Icon */}
                <div 
                  className="w-10 h-10 rounded-full bg-[#1A3730] text-emerald-300 flex items-center justify-center relative shadow-sm border border-emerald-500/20 group cursor-help transition-all duration-300 hover:scale-105" 
                  id="skills-badge-editor-icon"
                  title="Keahlian Video Editing & Creative Toolset"
                >
                  <Video className="w-5 h-5 text-emerald-300 group-hover:scale-110 transition-transform" />
                  <Film className="w-3 h-3 text-yellow-300 absolute -bottom-0.5 -right-0.5 animate-pulse" />
                </div>
                {/* Soft pill containing the label */}
                <div className="bg-neutral-100 text-neutral-850 px-4 py-1.5 rounded-full text-xs font-bold font-sans flex items-center gap-1 shadow-2xs border border-neutral-250" id="skills-pill-label">
                  <span>SKILL & TOOLSET</span>
                </div>
              </div>
              
              {/* Right actions */}
              <div className="flex items-center gap-2" id="skills-top-right-actions">
                {/* Action edit button */}
                {isEditAllowed && !isEditingSkills && (
                  <button
                    type="button"
                    onClick={() => {
                      setTempHardSkills(hardSkills.join('\n'));
                      setTempSoftSkills(softSkills.join('\n'));
                      setIsEditingSkills(true);
                    }}
                    className="bg-neutral-50 hover:bg-neutral-100 text-neutral-850 border border-neutral-200 text-[11px] font-bold px-3.5 py-1.5 rounded-xl transition-all cursor-pointer shadow-xs flex items-center gap-1.5 active:scale-97 animate-fade-in"
                  >
                    ✏️ Edit Skill & Toolset
                  </button>
                )}
              </div>
            </div>

          {/* Form for editing */}
          {isEditingSkills ? (
            <div className="bg-neutral-50/60 border border-neutral-200/50 rounded-2xl p-6 mb-6 space-y-4" id="skills-edit-form">
              <h3 className="text-sm font-bold text-[#1A3730] uppercase tracking-wider font-sans mb-2 border-b pb-2">✏️ Ubah Daftar Keahlian</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Daftar Hard Skills (Satu baris untuk satu keahlian)</label>
                  <textarea
                    value={tempHardSkills}
                    onChange={(e) => setTempHardSkills(e.target.value)}
                    rows={10}
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-sans text-gray-700 leading-relaxed focus:outline-none focus:border-[#1A3730]"
                    placeholder="Masukkan satu keahlian per baris"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Daftar Soft Skills (Satu baris untuk satu keahlian)</label>
                  <textarea
                    value={tempSoftSkills}
                    onChange={(e) => setTempSoftSkills(e.target.value)}
                    rows={10}
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-sans text-gray-700 leading-relaxed focus:outline-none focus:border-[#1A3730]"
                    placeholder="Masukkan satu keahlian per baris"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-neutral-200/50" id="skills-form-actions">
                <button
                  type="button"
                  onClick={() => {
                    const defaultHard = [
                      "Microsoft Excel (Data Processing, Recap, Basic Analysis)",
                      "Microsoft Word (Administrative Documents & Reporting)",
                      "Microsoft PowerPoint (Presentation & Reporting)",
                      "Administrative Support & Data Entry",
                      "Data Collection & Survey Implementation",
                      "Digital Marketing (Social Media & Marketplace)",
                      "Online Sales & Customer Management",
                      "Content Creation (Basic Graphic Design)",
                      "Market Research Support"
                    ];
                    const defaultSoft = [
                      "Communication Skills",
                      "Leadership",
                      "Teamwork & Collaboration",
                      "Time Management",
                      "Critical Thinking",
                      "Problem Solving",
                      "Adaptability",
                      "Negotiation Skills",
                      "Decision Making"
                    ];
                    setTempHardSkills(defaultHard.join('\n'));
                    setTempSoftSkills(defaultSoft.join('\n'));
                  }}
                  className="text-[10px] font-mono font-bold text-red-600 hover:underline cursor-pointer"
                >
                  Reset ke Bawaan
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingSkills(false)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const parsedHard = tempHardSkills.split('\n').map(item => item.trim()).filter(item => item.length > 0);
                      const parsedSoft = tempSoftSkills.split('\n').map(item => item.trim()).filter(item => item.length > 0);
                      setHardSkills(parsedHard);
                      setSoftSkills(parsedSoft);
                      localStorage.setItem('annisa_portfolio_hard_skills', JSON.stringify(parsedHard));
                      localStorage.setItem('annisa_portfolio_soft_skills', JSON.stringify(parsedSoft));
                      setIsEditingSkills(false);
                    }}
                    className="bg-[#1A3730] hover:bg-[#254F45] text-white text-xs font-bold px-5 py-2 rounded-xl transition-colors cursor-pointer shadow-xs"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            </div>
          ) : null}

          {/* Core layout split down the middle by a green vertical bar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-1 items-stretch" id="skills-layout-grid">
            
            {/* Left Column: Custom SVG Icons & Groups */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-8 pr-2 lg:pr-6" id="skills-logos-column">
              
              {/* Category 1: Microsoft Office */}
              <div className="space-y-4" id="skill-group-ms-office">
                <h4 className="text-[#1A3730] font-extrabold text-sm flex items-center gap-1.5 font-sans">
                  <span className="text-[#1A3730] font-bold text-lg leading-none">•</span> Microsoft Office
                </h4>
                
                {/* Side-by-side Microsoft app cards */}
                <div className="flex items-center gap-3" id="ms-office-cards">
                  {/* MS Word Card */}
                  <div className="flex flex-col items-center bg-gray-50 border border-gray-150 p-2 rounded-2xl w-20 h-20 justify-between hover:scale-105 transition-transform" title="Microsoft Word">
                    <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="100" height="100" rx="20" fill="#2B579A"/>
                      <rect x="25" y="25" width="50" height="50" rx="8" fill="white"/>
                      <path d="M35 35H65M35 48H65M35 61H53" stroke="#2B579A" strokeWidth="6" strokeLinecap="round"/>
                      <circle cx="72" cy="72" r="10" fill="#184282"/>
                      <text x="68" y="76" fill="white" fontSize="12" fontWeight="bold" fontFamily="sans-serif">W</text>
                    </svg>
                    <span className="text-[10px] font-sans text-gray-800 font-bold">Word</span>
                  </div>

                  {/* MS PPT Card */}
                  <div className="flex flex-col items-center bg-gray-50 border border-gray-150 p-2 rounded-2xl w-20 h-20 justify-between hover:scale-105 transition-transform" title="Microsoft PowerPoint">
                    <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="100" height="100" rx="20" fill="#D04423"/>
                      <rect x="25" y="25" width="50" height="50" rx="8" fill="white"/>
                      <circle cx="50" cy="50" r="15" stroke="#D04423" strokeWidth="5"/>
                      <path d="M50 35V50L60 55" stroke="#D04423" strokeWidth="5" strokeLinecap="round"/>
                      <circle cx="72" cy="72" r="10" fill="#A83015"/>
                      <text x="68" y="76" fill="white" fontSize="12" fontWeight="bold" fontFamily="sans-serif">P</text>
                    </svg>
                    <span className="text-[10px] font-sans text-gray-800 font-bold truncate max-w-full">PowerPoint</span>
                  </div>

                  {/* MS Excel Card */}
                  <div className="flex flex-col items-center bg-gray-50 border border-gray-150 p-2 rounded-2xl w-20 h-20 justify-between hover:scale-105 transition-transform" title="Microsoft Excel">
                    <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="100" height="100" rx="20" fill="#217346"/>
                      <rect x="25" y="25" width="50" height="50" rx="8" fill="white"/>
                      <line x1="32" y1="41" x2="68" y2="41" stroke="#217346" strokeWidth="4"/>
                      <line x1="32" y1="58" x2="68" y2="58" stroke="#217346" strokeWidth="4"/>
                      <line x1="48" y1="25" x2="48" y2="75" stroke="#217346" strokeWidth="4"/>
                      <circle cx="72" cy="72" r="10" fill="#104D2E"/>
                      <text x="68" y="76" fill="white" fontSize="12" fontWeight="bold" fontFamily="sans-serif">X</text>
                    </svg>
                    <span className="text-[10px] font-sans text-gray-800 font-bold">Excel</span>
                  </div>
                </div>
              </div>

              {/* Category 2: Editing */}
              <div className="space-y-4" id="skill-group-editing">
                <h4 className="text-[#1A3730] font-extrabold text-sm flex items-center gap-1.5 font-sans">
                  <span className="text-[#1A3730] font-bold text-lg leading-none">•</span> Editing
                </h4>
                
                {/* Side-by-side editing program cards */}
                <div className="flex items-center gap-3 overflow-x-auto pb-1" id="editing-cards">
                  {/* InShot Card */}
                  <div className="flex flex-col items-center bg-gray-50 border border-gray-150 p-2.5 rounded-2xl w-14 h-18 justify-between hover:scale-105 transition-transform shrink-0" title="InShot">
                    <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="100" height="100" rx="22" fill="url(#inshot-grad)"/>
                      <rect x="26" y="26" width="48" height="48" rx="11" fill="none" stroke="white" strokeWidth="7"/>
                      <path d="M22 33 h10 V22 M78 67 h-10 V78" stroke="white" strokeWidth="7" strokeLinecap="round"/>
                      <circle cx="50" cy="50" r="12.5" fill="white"/>
                      <defs>
                        <linearGradient id="inshot-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#ff1153" />
                          <stop offset="50%" stopColor="#ff4b3a" />
                          <stop offset="100%" stopColor="#ff7020" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className="text-[10px] font-mono text-gray-500 font-bold">InShot</span>
                  </div>

                  {/* Wink Card */}
                  <div className="flex flex-col items-center bg-gray-50 border border-gray-150 p-2.5 rounded-2xl w-14 h-18 justify-between hover:scale-105 transition-transform shrink-0" title="Wink">
                    <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="100" height="100" rx="22" fill="#111111"/>
                      <rect x="28" y="44" width="8" height="15" rx="4" fill="white"/>
                      <path d="M48 49 C48 43, 62 43, 62 49" stroke="white" strokeWidth="7" strokeLinecap="round" fill="none"/>
                      <path d="M28 67 C28 78, 72 78, 72 67" stroke="white" strokeWidth="7" strokeLinecap="round" fill="none"/>
                      <path d="M72 18 Q72 27 81 27 Q72 27 72 36 Q72 27 63 27 Q72 27 72 18 Z" fill="white"/>
                    </svg>
                    <span className="text-[10px] font-mono text-gray-500 font-bold">Wink</span>
                  </div>

                  {/* Meitu Card */}
                  <div className="flex flex-col items-center bg-gray-50 border border-gray-150 p-2.5 rounded-2xl w-14 h-18 justify-between hover:scale-105 transition-transform shrink-0" title="Meitu">
                    <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="100" height="100" rx="22" fill="url(#meitu-grad)"/>
                      <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="5.5" fill="none"/>
                      <path d="M33 55 C33 46, 40 42, 44 48 C48 42, 55 46, 55 55 L67 51" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                      <defs>
                        <linearGradient id="meitu-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#ff3a70" />
                          <stop offset="100%" stopColor="#ff649e" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className="text-[10px] font-mono text-gray-500 font-bold">Meitu</span>
                  </div>

                  {/* Canva Card */}
                  <div className="flex flex-col items-center bg-gray-50 border border-gray-150 p-2.5 rounded-2xl w-14 h-18 justify-between hover:scale-105 transition-transform shrink-0" title="Canva">
                    <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="50" cy="50" r="50" fill="url(#canva-grad)"/>
                      <text x="14" y="56" fill="white" fontSize="22" fontWeight="black" fontFamily="serif" fontStyle="italic">Canva</text>
                      <defs>
                        <linearGradient id="canva-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#7D2AE8" />
                          <stop offset="50%" stopColor="#00C4CC" />
                          <stop offset="100%" stopColor="#FF66C4" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className="text-[10px] font-mono text-gray-500 font-bold">Canva</span>
                  </div>

                  {/* CapCut Card */}
                  <div className="flex flex-col items-center bg-gray-50 border border-gray-150 p-2.5 rounded-2xl w-14 h-18 justify-between hover:scale-105 transition-transform shrink-0" title="CapCut">
                    <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="100" height="100" rx="22" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
                      <path d="M30 33 C30 31.3 31.3 30 33 30 H67 C68.7 30 70 31.3 70 33 V41 C70 41.8 69.5 42.6 68.8 43 L55 50 L68.8 57 C69.5 57.4 70 58.2 70 59V67 C70 68.7 68.7 70 67 70 H33 C31.3 70 30 68.7 30 67 V59 C30 58.2 30.5 57.4 31.2 57 L45 50 L31.2 43 C30.5 42.6 30 41.8 30 41 Z" fill="black"/>
                      <path d="M39 39 L47 45 H39 Z" fill="white"/>
                      <path d="M61 39 L53 45 H61 Z" fill="white"/>
                      <path d="M39 61 L47 55 H39 Z" fill="white"/>
                      <path d="M61 61 L53 55 H61 Z" fill="white"/>
                    </svg>
                    <span className="text-[10px] font-mono text-gray-500 font-bold">CapCut</span>
                  </div>

                  {/* Miro Card */}
                  <div className="flex flex-col items-center bg-gray-50 border border-gray-150 p-2.5 rounded-2xl w-14 h-18 justify-between hover:scale-105 transition-transform shrink-0" title="Miro">
                    <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="100" height="100" rx="22" fill="#FFD02F"/>
                      <g fill="#050038">
                        <path d="M24 28 C26.5 28 29.5 30 31.5 34.5 L40.5 54.5 C42 58 39.5 61.5 35.5 61.5 C32.5 61.5 30.5 59.5 29.5 56.5 L23 42 L21 54 C20 58.5 16 61.5 12 60.5 C8.5 59.5 7 55.5 8 51.5 L15.5 34 C17.5 29.5 21 28 24 28 Z" />
                        <path d="M46 28 C48.5 28 51.5 30 53.5 34.5 L62.5 54.5 C64 58 61.5 61.5 57.5 61.5 C54.5 61.5 52.5 59.5 51.5 56.5 L45 42 L43 54 C42 58.5 38 61.5 34 60.5 C30.5 59.5 29 55.5 30 51.5 L37.5 34 C39.5 29.5 43 28 46 28 Z" />
                        <path d="M68 28 C70.5 28 73.5 30 75.5 34.5 L84.5 54.5 C86 58 83.5 61.5 79.5 61.5 C76.5 61.5 74.5 59.5 73.5 56.5 L67 42 L65 54 C64 58.5 60 61.5 56 60.5 C52.5 59.5 51 55.5 52 51.5 L59.5 34 C61.5 29.5 65 28 68 28 Z" />
                      </g>
                    </svg>
                    <span className="text-[10px] font-mono text-gray-500 font-bold">Miro</span>
                  </div>
                </div>
              </div>

              {/* Category 3: Google Workspace */}
              <div className="space-y-4" id="skill-group-gw">
                <h4 className="text-[#1A3730] font-extrabold text-sm flex items-center gap-1.5 font-sans">
                  <span className="text-[#1A3730] font-bold text-lg leading-none">•</span> Google Workspace
                </h4>
                
                {/* Side-by-side workspace cards */}
                <div className="flex items-center gap-3 overflow-x-auto pb-1" id="gw-cards">
                  {/* Gmail Icon */}
                  <div className="flex flex-col items-center bg-gray-50 border border-gray-150 p-2 rounded-2xl w-11 h-15 justify-between hover:scale-105 transition-transform shrink-0" title="Gmail">
                    <svg className="w-6.5 h-6.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#EA4335" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 6L12 13L2 6" stroke="#EA4335" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-[8px] font-mono text-gray-400 font-bold">Gmail</span>
                  </div>

                  {/* GDrive Icon */}
                  <div className="flex flex-col items-center bg-gray-50 border border-gray-150 p-2 rounded-2xl w-11 h-15 justify-between hover:scale-105 transition-transform shrink-0" title="Google Drive">
                    <svg className="w-6.5 h-6.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 17L6 10L14 10L10 17H2Z" fill="#00D2FF"/>
                      <path d="M14 10L18 3L10 3L6 10L14 10Z" fill="#FFC700"/>
                      <path d="M10 17L14 10L22 10L18 17H10Z" fill="#34A853"/>
                    </svg>
                    <span className="text-[8px] font-mono text-gray-400 font-bold">Drive</span>
                  </div>

                  {/* GDocs Icon */}
                  <div className="flex flex-col items-center bg-gray-50 border border-gray-150 p-2 rounded-2xl w-11 h-15 justify-between hover:scale-105 transition-transform shrink-0" title="Google Docs">
                    <svg className="w-6.5 h-6.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="#4285F4"/>
                      <path d="M14 2V8H20L14 2Z" fill="#A0C2F9" stroke="#4285F4" strokeWidth="1"/>
                      <line x1="8" y1="12" x2="16" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      <line x1="8" y1="16" x2="14" y2="16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span className="text-[8px] font-mono text-gray-400 font-bold">Docs</span>
                  </div>

                  {/* GSheets Icon */}
                  <div className="flex flex-col items-center bg-gray-50 border border-gray-150 p-2 rounded-2xl w-11 h-15 justify-between hover:scale-105 transition-transform shrink-0" title="Google Sheets">
                    <svg className="w-6.5 h-6.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="#0F9D58"/>
                      <path d="M14 2V8H20L14 2Z" fill="#87DBB0" stroke="#0F9D58" strokeWidth="1"/>
                      <rect x="7" y="11" width="10" height="8" rx="1" stroke="white" strokeWidth="1.5" fill="none"/>
                    </svg>
                    <span className="text-[8px] font-mono text-gray-400 font-bold">Sheets</span>
                  </div>

                  {/* GMeet Icon */}
                  <div className="flex flex-col items-center bg-gray-50 border border-gray-150 p-2 rounded-2xl w-11 h-15 justify-between hover:scale-105 transition-transform shrink-0" title="Google Meet">
                    <svg className="w-6.5 h-6.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2005/svg">
                      <rect x="2" y="5" width="14" height="14" rx="3" fill="#34A853"/>
                      <path d="M18 9L22 6V18L18 15V9Z" fill="#EA4335"/>
                      <circle cx="9" cy="12" r="3" fill="white"/>
                    </svg>
                    <span className="text-[8px] font-mono text-gray-400 font-bold">Meet</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Middle connecting line representing the elegant green vertical border bar in the mockup */}
            <div className="hidden lg:flex lg:col-span-1 justify-center items-stretch relative" id="divider-green-column">
              <div className="w-1 bg-[#1A3730] rounded-full opacity-80 h-full"></div>
            </div>

            {/* Right Column: Beautiful Connected Cards (Hard Skill/Soft Skill list views) */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6 lg:pl-4" id="skills-lists-column">
              
              {/* Hard Skill Section with Circle Node styling */}
              <div className="flex gap-4 items-start relative group" id="hard-skills-list-item">
                {/* Attached Interactive Ring Node Icon exactly matching drawing layout */}
                <div className="flex-col items-center shrink-0 hidden sm:flex pt-3" id="hard-node-icon">
                  <div className="w-7 h-7 rounded-full bg-neutral-900 border-2 border-emerald-500/20 text-white flex items-center justify-center p-1 font-bold shadow-xs select-none relative group">
                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 animate-pulse"></div>
                    <div className="absolute right-[-10px] w-2.5 h-[1.5px] bg-neutral-900"></div>
                  </div>
                </div>

                {/* Hard Skill Bubble Card representation */}
                <div className="bg-[#F8F9FA] border border-gray-150/80 rounded-3xl p-5 shadow-3xs hover:shadow-2xs transition-all flex-1 text-left" id="hard-skills-display-card">
                  <p className="font-extrabold text-[#1A3730] text-sm font-sans uppercase mb-3.5 tracking-wider">
                    Hard Skill
                  </p>
                  
                  {/* Skill bullet point lists */}
                  <ul className="space-y-2 mt-2" id="hard-skills-bullets">
                    {hardSkills.map((hSkill, index) => (
                      <li key={index} className="text-xs text-gray-700 leading-relaxed font-sans font-medium flex items-start gap-1.5" id={`h-skill-${index}`}>
                        <span className="text-[#1A3730] font-black text-lg leading-[12px]">•</span>
                        <span>{hSkill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Soft Skill Section with Circle Node styling */}
              <div className="flex gap-4 items-start relative group" id="soft-skills-list-item">
                {/* Attached Interactive Ring Node Icon exactly matching drawing layout */}
                <div className="flex-col items-center shrink-0 hidden sm:flex pt-3" id="soft-node-icon">
                  <div className="w-7 h-7 rounded-full bg-neutral-900 border-2 border-emerald-500/20 text-white flex items-center justify-center p-1 font-bold shadow-xs select-none relative group">
                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-450 animate-pulse"></div>
                    <div className="absolute right-[-10px] w-2.5 h-[1.5px] bg-neutral-900"></div>
                  </div>
                </div>

                {/* Soft Skill Bubble Card representation */}
                <div className="bg-[#F8F9FA] border border-gray-150/80 rounded-3xl p-5 shadow-3xs hover:shadow-2xs transition-all flex-1 text-left" id="soft-skills-display-card">
                  <p className="font-extrabold text-[#1A3730] text-sm font-sans uppercase mb-3.5 tracking-wider">
                    Soft Skill
                  </p>
                  
                  {/* Skill bullet point lists */}
                  <ul className="space-y-2 mt-2" id="soft-skills-bullets">
                    {softSkills.map((sSkill, index) => (
                      <li key={index} className="text-xs text-gray-700 leading-relaxed font-sans font-medium flex items-start gap-1.5" id={`s-skill-${index}`}>
                        <span className="text-[#1A3730] font-black text-lg leading-[12px]">•</span>
                        <span>{sSkill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

          </div>
        </div>
        )}

        {/* INTERACTIVE POPUPS FOR CIRCLE BUTTONS */}
        <AnimatePresence>
          {showVerification && (
            <motion.div 
              id="verification-popup"
              className="bg-white rounded-[2rem] border border-gray-100 p-6 shadow-md text-left"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex justify-between items-start mb-4" id="v-popup-top">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#1A3730]" />
                  <h4 className="text-sm font-bold text-[#1A3730]">Sistem Verifikasi Otentikasi Karir (Annisa Nurus Saidah, S.M.)</h4>
                </div>
                <button id="close-v-btn" onClick={() => setShowVerification(false)} className="text-gray-400 hover:text-gray-900 font-bold text-xs">Tutup ✕</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs" id="v-pills-list">
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100" id="vp-degree">
                  <p className="text-[9px] text-gray-400 uppercase tracking-wider font-mono">Gelar Pendidikan</p>
                  <p className="font-bold text-[#1A3730] mt-1">S.M. (Sarjana Manajemen)</p>
                  <span className="text-[10px] text-emerald-600 font-medium">✓ Terverifikasi PDDikti</span>
                </div>
                <button 
                  onClick={() => setShowTranscript(true)}
                  title="Lihat Detail Transkrip Nilai Sementara"
                  className="bg-emerald-50/40 hover:bg-emerald-50 hover:border-emerald-200 active:scale-98 cursor-pointer p-4 rounded-2xl border border-emerald-100/60 transition-all text-left flex flex-col justify-between h-full group" 
                  id="vp-gpa"
                >
                  <div>
                    <p className="text-[9px] text-gray-400 uppercase tracking-wider font-mono">Indeks Prestasi Kumulatif</p>
                    <p className="font-bold text-[#1A3730] mt-1 text-sm flex items-center gap-1">
                      IPK: 3.77 / 4.00
                      <GraduationCap className="w-3.5 h-3.5 text-emerald-700 opacity-60 group-hover:opacity-100 transition-opacity" />
                    </p>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-medium mt-2 block">
                    ✓ Cum Laude • Klik untuk Transkrip
                  </span>
                </button>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100" id="vp-champion">
                  <p className="text-[9px] text-gray-400 uppercase tracking-wider font-mono">Kehadiran Pitching</p>
                  <p className="font-bold text-[#1A3730] mt-1">Juara 1 Nasional 2025</p>
                  <span className="text-[10px] text-emerald-600 font-medium">✓ Award Trophy Verified</span>
                </div>
              </div>
            </motion.div>
          )}

          {showPhotoJournal && (
            <motion.div 
              id="photojournal-popup"
              className="bg-white rounded-[2rem] border border-gray-100 p-6 shadow-md text-left"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex justify-between items-start mb-4" id="pj-popup-top">
                <div className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-[#1A3730]" />
                  <h4 className="text-sm font-bold text-[#1A3730]">Galeri Dokumentasi & Riwayat Lapangan</h4>
                </div>
                <button id="close-pj-btn" onClick={() => setShowPhotoJournal(false)} className="text-gray-400 hover:text-gray-900 font-bold text-xs">Tutup ✕</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" id="pj-photos-wrap">
                {photoJournalImages.map((img, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-xl p-3 border border-gray-100 text-left" id={`pj-photo-card-${idx}`}>
                    <span className="bg-[#1A3730]/10 text-[#1A3730] px-2 py-0.5 rounded-md text-[9px] font-mono uppercase font-bold inline-block mb-2">
                      {img.tag}
                    </span>
                    <h5 className="text-xs font-bold text-[#1A3730] mb-1">{img.title}</h5>
                    <p className="text-[11px] text-gray-500 leading-normal">{img.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CENTRAL SECTION HEADER */}
        {visibleSections.experiences !== false && (
          <>
            <div className="pt-4 flex items-center justify-between" id="bento-grid-dashboard">
              <div className="text-left">
                <h2 className="text-2xl font-bold font-display text-[#1A3730] tracking-tight">Showcase Karya Desain</h2>
              </div>
            </div>

            {/* MAIN BENTO DASHBOARD RUNTIMES (Bento Grid Area) */}
            <div id="dashboard-bento-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              
              {/* Timeline & Experiences: spanning 12 cols as the AI chatbot was removed */}
              <div className="lg:col-span-12 flex flex-col h-full" id="timeline-bento-parent">
                <Experiences />
              </div>
              
            </div>
          </>
        )}

        {/* WORK SAMPLES & COMPETENCY CALIBRATOR */}
        {(visibleSections.projects !== false || visibleSections.skillsRadar !== false) && (
          <div id="secondary-bento-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch mt-6">
            
            {/* Projects */}
            {visibleSections.projects !== false && (
              <div 
                className={`${visibleSections.skillsRadar === false ? 'lg:col-span-12' : 'lg:col-span-7'} flex flex-col h-full`} 
                id="projects-bento-parent"
              >
                <Projects onHide={() => toggleSection('projects')} isEditAllowed={isEditAllowed} />
              </div>
            )}

            {/* Skills competence role-fit radar slider */}
            {visibleSections.skillsRadar !== false && (
              <div 
                className={`${visibleSections.projects === false ? 'lg:col-span-12' : 'lg:col-span-5'} flex flex-col h-full`} 
                id="skills-bento-parent"
              >
                <SkillsRadar onHide={() => toggleSection('skillsRadar')} />
              </div>
            )}

          </div>
        )}

        {/* NEW ADDITION METRIC PLATFORM: "HIRE ME PLANNER" */}
        {visibleSections.hireMePlanner !== false && (
          <div id="inbox-planner-bento-grid" className="grid grid-cols-1 gap-5 items-stretch mt-6">
            <div id="hire-me-planner-card" className="bg-white rounded-[2rem] border border-gray-100 p-6 shadow-sm text-left flex flex-col justify-between">
              <div>
                <div className="mb-4 flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <span className="bg-[#E6F4EA] text-[#1A3730] text-[10px] uppercase tracking-wider font-mono px-3 py-1 rounded-full border border-[#2A5248]/10 inline-block mb-1.5" id="planner-badge">
                      Kalkulator Kerja
                    </span>
                    <h3 className="text-[#1A3730] font-semibold text-lg tracking-tight" id="planner-title">Perencana Beban Kerja Karir</h3>
                    <p className="text-xs text-gray-400">Pilih kualifikasi target, spesifikasi peran, dan format hubungan untuk menghasilkan scorecard rekomendasi.</p>
                  </div>
                </div>

                {/* Interactive buttons */}
                <div className="space-y-3.5 mb-6" id="planner-options-wrap">
                  {/* Track selection query */}
                  <div id="sel-inquiry-track" className="text-left">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">1. Pilih Domain Pekerjaan</label>
                    <div className="grid grid-cols-3 gap-1.5" id="p-opt-track">
                      <button 
                        id="opt-track-hr"
                        onClick={() => setInquiryType('HR')}
                        className={`py-1.5 rounded-lg text-[9px] font-bold cursor-pointer border ${inquiryType === 'HR' ? 'bg-[#1A3730] text-white border-transparent' : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'}`}
                      >
                        HC & HR SDM
                      </button>
                      <button 
                        id="opt-track-strategy"
                        onClick={() => setInquiryType('Consulting')}
                        className={`py-1.5 rounded-lg text-[9px] font-bold cursor-pointer border ${inquiryType === 'Consulting' ? 'bg-[#1A3730] text-white border-transparent' : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'}`}
                      >
                        Analisis Strategis
                      </button>
                      <button 
                        id="opt-track-pm"
                        onClick={() => setInquiryType('Agile')}
                        className={`py-1.5 rounded-lg text-[9px] font-bold cursor-pointer border ${inquiryType === 'Agile' ? 'bg-[#1A3730] text-white border-transparent' : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'}`}
                      >
                        Manajemen Proyek
                      </button>
                    </div>
                  </div>

                  {/* Level Tier selection query */}
                  <div id="sel-tier" className="text-left">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">2. Pilih Kategori Keahlian</label>
                    <div className="grid grid-cols-2 gap-1.5" id="p-opt-tier">
                      <button 
                        id="opt-tier-associate"
                        onClick={() => setTier('Associate')}
                        className={`py-1.5 rounded-lg text-[9px] font-bold cursor-pointer border ${tier === 'Associate' ? 'bg-[#1A3730] text-white border-transparent' : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'}`}
                      >
                        Associate / Pelaksana (Entry)
                      </button>
                      <button 
                        id="opt-tier-specialist"
                        onClick={() => setTier('Specialist')}
                        className={`py-1.5 rounded-lg text-[9px] font-bold cursor-pointer border ${tier === 'Specialist' ? 'bg-[#1A3730] text-white border-transparent' : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'}`}
                      >
                        Spesialis / Lead Koordinator
                      </button>
                    </div>
                  </div>

                  {/* Engagement Type selection query */}
                  <div id="sel-engagement" className="text-left">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">3. Format Hubungan Kerja</label>
                    <div className="grid grid-cols-2 gap-1.5" id="p-opt-engagement">
                      <button 
                        id="opt-engage-project"
                        onClick={() => setEngagementType('Project')}
                        className={`py-1.5 rounded-lg text-[9px] font-bold cursor-pointer border ${engagementType === 'Project' ? 'bg-[#1A3730] text-white border-transparent' : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'}`}
                      >
                        Kontrak Per Proyek (Part-time)
                      </button>
                      <button 
                        id="opt-engage-fulltime"
                        onClick={() => setEngagementType('FullTime')}
                        className={`py-1.5 rounded-lg text-[9px] font-bold cursor-pointer border ${engagementType === 'FullTime' ? 'bg-[#1A3730] text-white border-transparent' : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'}`}
                      >
                        Karyawan Penuh / Asosiasi Tetap
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Simulated computed scorecard results in a beautiful invoice format */}
              <div className="bg-gray-50 p-4.5 rounded-2xl border border-gray-100" id="planner-result-invoice">
                <div className="flex justify-between items-center mb-3 pb-2.5 border-b border-gray-200/60" id="invoice-header">
                  <span className="text-[10px] text-gray-400 font-mono">MATRIKS REKOMENDASI KERJA</span>
                  <span className="bg-[#1A3730]/10 text-[#1A3730] text-[9px] font-mono px-2 py-0.5 rounded font-bold">ALIGNED FIT</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs mb-3" id="invoice-metrics">
                  <div id="metric-role-title">
                    <p className="text-[9px] text-gray-400 font-mono">Usulan Jabatan Peran</p>
                    <p className="font-bold text-[#1A3730]">{title}</p>
                  </div>
                  <div id="metric-workload">
                    <p className="text-[9px] text-gray-400 font-mono">Alokasi Waktu Maksimal</p>
                    <p className="font-bold text-[#1A3730]">~{baseHours} Jam / Minggu</p>
                  </div>
                </div>
                <div className="text-xs" id="invoice-focus-points">
                  <p className="text-[9px] text-gray-400 font-mono mb-1.5">Deliverables Hasil Karya Utama</p>
                  <div className="space-y-1" id="focus-points-rows">
                    {focus.map((fc, i) => (
                      <div key={i} className="flex gap-1.5 items-center text-[11px] text-gray-600" id={`f-point-row-${i}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                        {fc}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FULL WIDTH DEDICATED NEW SECTION: "CONTACT FORM" (as requested in screenshot) */}
        {visibleSections.contactForm !== false && (
          <div className="w-full mt-6" id="contact-bento-parent">
            <ContactForm onHide={() => toggleSection('contactForm')} isEditAllowed={isEditAllowed} />
          </div>
        )}

        {/* THANK YOU BANNER (as requested in screenshot) */}
        {visibleSections.thankYou !== false && (
          <div className="w-full mt-6 mb-10" id="thankyou-banner-parent">
            <ThankYou isEditAllowed={isEditAllowed} />
          </div>
        )}

        {/* FOOTER SECTION BRANDING */}
        <div id="portfolio-footer" className="pt-8 border-t border-gray-200 flex justify-between items-center text-xs text-gray-400 flex-wrap gap-4 pb-12">
          <div className="text-left" id="footer-left">
            <p className="font-bold text-[#1A3730] font-display">Annisa Nurus Saidah, S.M.</p>
            <p className="mt-1">© Portofolio 2026</p>
          </div>
          <div className="flex gap-4" id="footer-right-links">
            <a 
              href="tel:082180691350" 
              id="phone-footer"
              className="flex items-center gap-1 hover:text-[#1A3730] transition-colors"
            >
              <Phone className="w-3.5 h-3.5" /> No. HP: 082180691350
            </a>
            <a 
              href="mailto:annisasaidah09@gmail.com" 
              id="mail-footer"
              className="flex items-center gap-1 hover:text-[#1A3730] transition-colors"
            >
              <Mail className="w-3.5 h-3.5" /> annisasaidah09@gmail.com
            </a>
          </div>
        </div>

        {/* TRANSCRIPT DETAILED MODAL SECTION */}
        <TranscriptModal isOpen={showTranscript} onClose={() => setShowTranscript(false)} />

      </div>
    </div>
  );
}
