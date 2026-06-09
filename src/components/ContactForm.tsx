import React, { useState, useRef, FormEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Mail, 
  Instagram, 
  Linkedin, 
  Pencil, 
  Check, 
  X, 
  Upload, 
  Trash2,
  Plus,
  Link as LinkIcon, 
  Share2, 
  Pause, 
  Play, 
  RefreshCw,
  Sparkles,
  MessageSquare,
  Send,
  Eye,
  CheckCircle2,
  Music,
  Search,
  Compass,
  Loader2,
  Award,
  ShieldCheck,
  Download,
  ExternalLink,
  FileText,
  Briefcase,
  TrendingUp,
  GraduationCap
} from 'lucide-react';

interface ContactConfig {
  badgeNum: string;
  badgeLabel: string;
  title: string;
  whatsapp: string;
  email: string;
  instagram: string;
  linkedin: string;
  photo1: string;
  photo2: string;
  musicUrl: string;
  musicTitle: string;
}

const DEFAULT_CONFIG: ContactConfig = {
  badgeNum: '10',
  badgeLabel: 'Kontak Person',
  title: 'Kontak',
  whatsapp: '0895-8066-13868',
  email: 'ahmadfaiz2810@gmail.com',
  instagram: '@ahmd.faiizz',
  linkedin: 'linkedin.com/in/ahmad-faiz-isyraqi/',
  photo1: '/src/assets/images/ahmad_faidz_avatar_1780808065413.png',
  photo2: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80',
  musicUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  musicTitle: 'Lofi Chill Ambient Theme',
};

const CERTIFICATES = [
  {
    id: 'stiem-sm',
    title: 'Sertifikat Kelulusan Sarjana (S.M.)',
    issuer: 'Sekolah Tinggi Ilmu Ekonomi Makassar Bongaya (STIEM BONGAYA)',
    recipient: 'Annisa Nurus Saidah, S.M.',
    credentialId: '30222/STIEMB/S1-M/2025',
    date: '31 Januari 2025',
    details: 'Program Studi S1 Manajemen dengan peminatan Manajemen Sumber Daya Manusia (MSDM) dan Analisis Operasional.',
    grade: 'IPK: 3.77 (Predikat Kelulusan: Cum Laude)',
    status: 'Terverifikasi Akreditasi BAN-PT & PDDikti',
    icon: 'GraduationCap',
    bgTheme: 'from-[#0F2D24] to-[#1F4A3F]',
    borderColor: 'border-emerald-500/35',
    tag: 'Akademik'
  },
  {
    id: 'pertamina-intern',
    title: 'Surat Keterangan Magang Industri',
    issuer: 'PT Pertamina Patra Niaga Regional Sulawesi',
    recipient: 'Annisa Nurus Saidah',
    credentialId: 'HR/PPN-REG7/INTERN/2024-084',
    date: 'Maret - Mei 2024',
    details: 'Praktek Kerja Lapangan di Bagian Corporate Support & Administration Operasional, mengolah data logistik, rekapitulasi presensi, & kearsipan digital menggunakan MS Excel.',
    grade: 'Penilaian Kinerja: Sangat Baik / Excellent',
    status: 'Terverifikasi Divisi Human Capital PT Pertamina Patra Niaga',
    icon: 'Briefcase',
    bgTheme: 'from-[#0B1E2E] to-[#1E3E5C]',
    borderColor: 'border-blue-500/35',
    tag: 'Magang Industri'
  },
  {
    id: 'poi-idx',
    title: 'Sertifikat Penghargaan Magang Pendidikan',
    issuer: 'Kantor Perwakilan Bursa Efek Indonesia (BEI) Sulawesi Selatan',
    recipient: 'Annisa Nurus Saidah',
    credentialId: 'IDX-SS/EDU/2023-401',
    date: 'September - Desember 2023',
    details: 'Berperan aktif sebagai asisten Literasi Keuangan & Pasar Modal, menyosialisasikan investasi cerdas dan aman ke komunitas masyarakat, kampus, dan pelaku UMKM regional.',
    grade: 'Predikat: Outstanding Performance',
    status: 'Terverifikasi Kepala Perwakilan BEI Sulsel',
    icon: 'TrendingUp',
    bgTheme: 'from-[#2A1115] to-[#4D1F26]',
    borderColor: 'border-rose-500/35',
    tag: 'Pasar Modal'
  },
  {
    id: 'national-biz',
    title: 'Sertifikat Juara 1 Kompetisi Bisnis Nasional 2025',
    issuer: 'Ikatan Mahasiswa Manajemen Indonesia & Asosiasi Pengusaha Energi Hijau',
    recipient: 'Annisa Nurus Saidah & Tim',
    credentialId: 'MGMT-NAT/BIZ-PLAN/I/2025',
    date: 'Maret 2025',
    details: 'Juara 1 dalam National Business Plan & Pitching Competition 2025 untuk Inovasi Rencana Bisnis Lestari "Nexus Circular Biomass Project" (Konsep Pemanfaatan Limbah Pertanian Berbasis Komunitas).',
    grade: 'Peringkat: Juara 1 Nasional (Gold Medalist)',
    status: 'Terverifikasi Dewan Juri Akademisi & Industri',
    icon: 'Award',
    bgTheme: 'from-[#2F2104] to-[#4F3908]',
    borderColor: 'border-amber-500/35',
    tag: 'Kompetensi'
  },
];

export default function ContactForm({ onHide, isEditAllowed = true }: { onHide?: () => void; isEditAllowed?: boolean }) {
  // State for config
  const [config, setConfig] = useState<ContactConfig>(() => {
    const saved = localStorage.getItem('annisa_portfolio_contact_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Automatically migrate to the real local photo asset if older unsplash generic placeholder was stored
        if (!parsed.photo1 || parsed.photo1.includes('images.unsplash.com/photo-1507003211169') || parsed.photo1 === '') {
          parsed.photo1 = '/src/assets/images/ahmad_faidz_avatar_1780808065413.png';
        }
        return { ...DEFAULT_CONFIG, ...parsed };
      } catch (e) {
        return DEFAULT_CONFIG;
      }
    }
    return DEFAULT_CONFIG;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isMusicCustomizerOpen, setIsMusicCustomizerOpen] = useState(false);
  const [isCertificatesOpen, setIsCertificatesOpen] = useState(false);
  const [activeCertId, setActiveCertId] = useState('stiem-sm');

  // Dynamic Certificates List supporting base64 uploaded files
  const [certs, setCerts] = useState<Array<{
    id: string;
    title: string;
    issuer: string;
    recipient: string;
    credentialId: string;
    date: string;
    details: string;
    grade: string;
    status: string;
    icon: string;
    bgTheme: string;
    borderColor: string;
    tag: string;
    uploadedImage?: string;
  }>>(() => {
    try {
      const stored = localStorage.getItem('annisa_certificates_list_v2');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Gagal memuat sertifikat:", e);
    }
    return CERTIFICATES;
  });

  // Keep localStorage in sync when certs array updates
  useEffect(() => {
    try {
      localStorage.setItem('annisa_certificates_list_v2', JSON.stringify(certs));
    } catch (e) {
      console.error("Gagal menyimpan sertifikat:", e);
    }
  }, [certs]);

  // Handler for uploading files converting them to base64
  const handleCertificateUpload = (certId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check size limit (e.g. 1.2MB for keeping localStorage safe)
    if (file.size > 1.2 * 1024 * 1024) {
      alert("Maaf, ukuran berkas terlalu besar (maksimal 1.2 MB untuk penyimpanan lokal). Silakan perkecil atau kompres dokumen.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setCerts(prevCerts => prevCerts.map(c => 
        c.id === certId ? { ...c, uploadedImage: base64String } : c
      ));
    };
    reader.readAsDataURL(file);
  };

  // Handler for clearing uploaded certificate images and falling back to digital template
  const handleRemoveCertificateImage = (certId: string) => {
    setCerts(prevCerts => prevCerts.map(c => 
      c.id === certId ? { ...c, uploadedImage: undefined } : c
    ));
  };

  const handleSaveNewCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCertTitle.trim() || !newCertIssuer.trim()) {
      alert("Nama Sertifikat dan Instansi Penerbit wajib diisi!");
      return;
    }
    const newId = 'cert-' + Date.now();
    const newObj = {
      id: newId,
      title: newCertTitle,
      issuer: newCertIssuer,
      recipient: newCertRecipient || 'Annisa Nurus Saidah, S.M.',
      tag: newCertTag,
      credentialId: newCertCredentialId || '-',
      date: newCertDate || '-',
      grade: newCertGrade || '-',
      details: newCertDetails || '-',
      status: 'Terverifikasi Mandiri / Diunggah',
      icon: 'Award',
      bgTheme: newCertTag === 'Akademik' ? 'from-[#0F2D24] to-[#1F4A3F]' :
               newCertTag === 'Magang Industri' ? 'from-[#0B1E2E] to-[#1E3E5C]' :
               newCertTag === 'Pasar Modal' ? 'from-[#2A1115] to-[#4D1F26]' : 'from-[#2F2104] to-[#4F3908]',
      borderColor: newCertTag === 'Akademik' ? 'border-emerald-500/35' :
                   newCertTag === 'Magang Industri' ? 'border-blue-500/35' :
                   newCertTag === 'Pasar Modal' ? 'border-rose-500/35' : 'border-amber-500/35',
      uploadedImage: newCertImage || undefined
    };

    setCerts(prev => [...prev, newObj]);
    setActiveCertId(newId);
    setIsAddingCert(false);

    // Reset fields
    setNewCertTitle('');
    setNewCertIssuer('');
    setNewCertCredentialId('');
    setNewCertDate('');
    setNewCertGrade('');
    setNewCertDetails('');
    setNewCertImage('');
  };

  const handleSaveEditCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editCertTitle.trim() || !editCertIssuer.trim()) {
      alert("Nama Sertifikat dan Instansi Penerbit wajib diisi!");
      return;
    }
    setCerts(prev => prev.map(c => {
      if (c.id === editingCertId) {
        return {
          ...c,
          title: editCertTitle,
          issuer: editCertIssuer,
          recipient: editCertRecipient || '-',
          tag: editCertTag,
          credentialId: editCertCredentialId || '-',
          date: editCertDate || '-',
          grade: editCertGrade || '-',
          details: editCertDetails || '-',
          uploadedImage: editCertImage || c.uploadedImage,
          bgTheme: editCertTag === 'Akademik' ? 'from-[#0F2D24] to-[#1F4A3F]' :
                   editCertTag === 'Magang Industri' ? 'from-[#0B1E2E] to-[#1E3E5C]' :
                   editCertTag === 'Pasar Modal' ? 'from-[#2A1115] to-[#4D1F26]' : 'from-[#2F2104] to-[#4F3908]',
          borderColor: editCertTag === 'Akademik' ? 'border-emerald-500/35' :
                       editCertTag === 'Magang Industri' ? 'border-blue-500/35' :
                       editCertTag === 'Pasar Modal' ? 'border-rose-500/35' : 'border-amber-500/35',
        };
      }
      return c;
    }));
    setEditingCertId(null);
  };

  const [certToDeleteId, setCertToDeleteId] = useState<string | null>(null);

  const handleDeleteCert = (idToDel: string) => {
    setCertToDeleteId(idToDel);
  };

  const confirmDeleteCertStatus = () => {
    if (!certToDeleteId) return;
    const idToDel = certToDeleteId;
    setCerts(prev => {
      const next = prev.filter(c => c.id !== idToDel);
      if (activeCertId === idToDel) {
        if (next.length > 0) {
          setActiveCertId(next[0].id);
        } else {
          setActiveCertId('');
        }
      }
      return next;
    });
    setEditingCertId(null);
    setCertToDeleteId(null);
  };

  // Custom certificate upload & addition states
  const [isAddingCert, setIsAddingCert] = useState(false);
  const [newCertTitle, setNewCertTitle] = useState('');
  const [newCertIssuer, setNewCertIssuer] = useState('');
  const [newCertTag, setNewCertTag] = useState('Akademik');
  const [newCertImage, setNewCertImage] = useState('');
  const [newCertRecipient, setNewCertRecipient] = useState('Annisa Nurus Saidah, S.M.');
  const [newCertCredentialId, setNewCertCredentialId] = useState('');
  const [newCertDate, setNewCertDate] = useState('');
  const [newCertGrade, setNewCertGrade] = useState('');
  const [newCertDetails, setNewCertDetails] = useState('');

  // Editing individual certificate details
  const [editingCertId, setEditingCertId] = useState<string | null>(null);
  const [editCertTitle, setEditCertTitle] = useState('');
  const [editCertIssuer, setEditCertIssuer] = useState('');
  const [editCertTag, setEditCertTag] = useState('Akademik');
  const [editCertRecipient, setEditCertRecipient] = useState('');
  const [editCertCredentialId, setEditCertCredentialId] = useState('');
  const [editCertDate, setEditCertDate] = useState('');
  const [editCertGrade, setEditCertGrade] = useState('');
  const [editCertDetails, setEditCertDetails] = useState('');
  const [editCertImage, setEditCertImage] = useState('');
  
  // Audio Lyrics Karaoke States
  const [isLyricsOpen, setIsLyricsOpen] = useState(false);
  const [lyricsLoading, setLyricsLoading] = useState(false);
  const [lyricsData, setLyricsData] = useState<{
    title: string;
    artist: string;
    lyrics: string;
    funFact: string;
  } | null>(null);
  const [lyricsError, setLyricsError] = useState('');
  
  // Spotify integration search states
  const [spotifySearchQuery, setSpotifySearchQuery] = useState('');
  const [spotifyTracks, setSpotifyTracks] = useState<Array<{
    id: string;
    name: string;
    artist: string;
    album: string;
    imageUrl: string;
    previewUrl: string;
    isFullVersion?: boolean;
    duration?: number;
  }>>([]);
  const [isSpotifySearching, setIsSpotifySearching] = useState(false);
  
  // Tab control: "Info Kontak" vs "Kirim Pesan" representation
  const [activeTab, setActiveTab] = useState<'info' | 'message'>('info');

  // Temp editing state variables
  const [editBadgeNum, setEditBadgeNum] = useState(config.badgeNum);
  const [editBadgeLabel, setEditBadgeLabel] = useState(config.badgeLabel);
  const [editTitle, setEditTitle] = useState(config.title);
  const [editWhatsapp, setEditWhatsapp] = useState(config.whatsapp);
  const [editEmail, setEditEmail] = useState(config.email);
  const [editInstagram, setEditInstagram] = useState(config.instagram);
  const [editLinkedin, setEditLinkedin] = useState(config.linkedin);
  const [editPhoto1, setEditPhoto1] = useState(config.photo1);
  const [editPhoto2, setEditPhoto2] = useState(config.photo2);
  const [editMusicUrl, setEditMusicUrl] = useState(config.musicUrl || DEFAULT_CONFIG.musicUrl);
  const [editMusicTitle, setEditMusicTitle] = useState(config.musicTitle || DEFAULT_CONFIG.musicTitle);
  const [formError, setFormError] = useState('');

  // Floating Message Form states
  const [clientName, setClientName] = useState('');
  const [clientMessage, setClientMessage] = useState('');
  const [isSendingMsg, setIsSendingMsg] = useState(false);
  const [messageReply, setMessageReply] = useState<string | null>(null);

  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Handle local image upload base64 converting
  const handleImageUpload = (file: File, target: 'photo1' | 'photo2') => {
    if (file.size > 3 * 1024 * 1024) {
      setFormError('Ukuran file foto maksimal adalah 3MB!');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const b64 = e.target?.result as string;
      if (b64) {
        if (target === 'photo1') setEditPhoto1(b64);
        if (target === 'photo2') setEditPhoto2(b64);
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle direct image upload in View Mode
  const handleDirectPhotoUpdate = (file: File, target: 'photo1' | 'photo2') => {
    if (file.size > 3 * 1024 * 1024) {
      alert('Ukuran file foto maksimal adalah 3MB!');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const b64 = e.target?.result as string;
      if (b64) {
        const newConfig = { ...config, [target]: b64 };
        setConfig(newConfig);
        localStorage.setItem('annisa_portfolio_contact_config', JSON.stringify(newConfig));
      }
    };
    reader.readAsDataURL(file);
  };

  // Direct music update helper
  const handleDirectMusicUpdate = (url: string, title: string) => {
    const newConfig = { ...config, musicUrl: url, musicTitle: title };
    setConfig(newConfig);
    localStorage.setItem('annisa_portfolio_contact_config', JSON.stringify(newConfig));
    setEditMusicUrl(url);
    setEditMusicTitle(title);
    setIsPlaying(true); // Auto play next track
  };

  const handleDirectAudioUpload = (file: File) => {
    const localUrl = URL.createObjectURL(file);
    const fileNameCleaned = file.name.replace(/\.[^/.]+$/, "");
    handleDirectMusicUpdate(localUrl, fileNameCleaned);
  };

  // Handle Spotify music search request
  const handleSpotifySearch = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!spotifySearchQuery.trim()) return;
    setIsSpotifySearching(true);
    try {
      const res = await fetch(`/api/spotify/search?q=${encodeURIComponent(spotifySearchQuery)}`);
      if (res.ok) {
        const data = await res.json();
        setSpotifyTracks(data.tracks || []);
      }
    } catch (err) {
      console.error("Spotify music search error:", err);
    } finally {
      setIsSpotifySearching(false);
    }
  };

  // Fetch full lyrics handler using Gemini API
  const fetchLyrics = async (songTitle: string, songArtist: string) => {
    setLyricsLoading(true);
    setLyricsError('');
    try {
      let cleanTitle = songTitle;
      let cleanArtist = songArtist;
      if (songTitle.includes(' - ')) {
        const parts = songTitle.split(' - ');
        cleanTitle = parts[0].trim();
        cleanArtist = parts[1].trim();
      }
      
      const res = await fetch(`/api/spotify/lyrics?track=${encodeURIComponent(cleanTitle)}&artist=${encodeURIComponent(cleanArtist)}`);
      if (res.ok) {
        const data = await res.json();
        setLyricsData(data);
      } else {
        throw new Error('Gagal memuat lirik');
      }
    } catch (err) {
      console.error("Error fetching lyrics:", err);
      setLyricsError('Gagal memuat lirik lengkap secara otomatis. Silakan coba lagi.');
    } finally {
      setLyricsLoading(false);
    }
  };

  // Sync lyrics when lyrics modal is opened or current song changes
  useEffect(() => {
    if (isLyricsOpen && config.musicTitle) {
      let title = config.musicTitle;
      let artist = "Artis Terkait";
      if (config.musicTitle.includes(' - ')) {
        const parts = config.musicTitle.split(' - ');
        title = parts[0].trim();
        artist = parts[1].trim();
      }
      fetchLyrics(title, artist);
    }
  }, [isLyricsOpen, config.musicTitle]);

  // Preload popular trending hits on first popover interaction
  useEffect(() => {
    if (isMusicCustomizerOpen && spotifyTracks.length === 0) {
      setIsSpotifySearching(true);
      fetch('/api/spotify/search?q=hits%20global%20indonesia')
        .then(res => {
          if (res.ok) return res.json();
          throw new Error('Gagal memuat dynamic list');
        })
        .then(data => {
          setSpotifyTracks(data.tracks || []);
        })
        .catch(err => console.error("Error preloading trending music:", err))
        .finally(() => setIsSpotifySearching(false));
    }
  }, [isMusicCustomizerOpen]);

  // Sync Audio Playback if the URL changes during play
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(e => {
          console.log("Audio play blocked: ", e);
          setIsPlaying(false);
        });
      }
    }
  }, [config.musicUrl]);

  // Audio Playback trigger helper
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log("Audio play error:", err);
        // Fallback for click events
        audioRef.current?.play().then(() => {
          setIsPlaying(true);
        });
      });
    }
  };

  const handleSave = () => {
    if (!editTitle.trim()) {
      setFormError('Judul Utama tidak boleh kosong!');
      return;
    }
    const newConfig: ContactConfig = {
      badgeNum: editBadgeNum,
      badgeLabel: editBadgeLabel,
      title: editTitle,
      whatsapp: editWhatsapp,
      email: editEmail,
      instagram: editInstagram,
      linkedin: editLinkedin,
      photo1: editPhoto1,
      photo2: editPhoto2,
      musicUrl: editMusicUrl,
      musicTitle: editMusicTitle,
    };
    setConfig(newConfig);
    localStorage.setItem('annisa_portfolio_contact_config', JSON.stringify(newConfig));
    setIsEditing(false);
    setFormError('');
  };

  const handleShare = () => {
    const textToCopy = `Kontak Info:
📱 WhatsApp: ${config.whatsapp}
✉️ Email: ${config.email}
📸 Instagram: ${config.instagram}
💼 LinkedIn: ${config.linkedin}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const submitClientMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientMessage.trim()) return;

    setIsSendingMsg(true);
    setTimeout(() => {
      setIsSendingMsg(false);
      setMessageReply(`Terima kasih Bpk/Ibu ${clientName}! Pesan Anda telah dianalis sistem asisten AI. Kami akan segera menghubungi kembali lewat WhatsApp (${config.whatsapp}) atau email.`);
      setClientName('');
      setClientMessage('');
    }, 800);
  };

  return (
    <div id="contact-bento" className="relative w-full">
      {/* Native background audio tag */}
      <audio ref={audioRef} src={config.musicUrl} loop />
      <style>{`
        @keyframes musicWave {
          0%, 100% { height: 4px; }
          50% { height: 14px; }
        }
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-100%, 0, 0); }
        }
        .animate-marquee {
          display: inline-block;
          padding-left: 100%;
          animation: marquee 16s linear infinite;
        }
      `}</style>

      {/* Dynamic Edit Enable Indicator / Trigger */}
      {isEditAllowed && (
        <div className="flex justify-end mb-4" id="contact-tab-row">
          <button
            type="button"
            onClick={() => {
              if (!isEditing) {
                setEditBadgeNum(config.badgeNum);
                setEditBadgeLabel(config.badgeLabel);
                setEditTitle(config.title);
                setEditWhatsapp(config.whatsapp);
                setEditEmail(config.email);
                setEditInstagram(config.instagram);
                setEditLinkedin(config.linkedin);
                setEditPhoto1(config.photo1);
                setEditPhoto2(config.photo2);
                setEditMusicUrl(config.musicUrl || DEFAULT_CONFIG.musicUrl);
                setEditMusicTitle(config.musicTitle || DEFAULT_CONFIG.musicTitle);
                setIsEditing(true);
              } else {
                setIsEditing(false);
              }
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[10px] font-extrabold transition-all duration-200 cursor-pointer ${
              isEditing
                ? 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100 font-sans'
                : 'bg-[#1A3730]/5 border-[#1A3730]/10 text-[#1A3730] hover:bg-[#1A3730]/10 font-sans'
            }`}
          >
            {isEditing ? (
              <>
                <X className="w-3.5 h-3.5" /> Batal Ubah
              </>
            ) : (
              <>
                <Pencil className="w-3.5 h-3.5" /> Ubah Kontak
              </>
            )}
          </button>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key="showcase-tab"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 md:p-8 bg-white border border-gray-150 rounded-[2.5rem] shadow-sm relative overflow-hidden"
          id="premium-contact-container"
        >
            {/* View Mode Layout */}
            {!isEditing ? (
              <>
                {/* Left Column (col-span-12 md:col-span-6): Info, Badge, Title & Social items */}
                <div className="col-span-12 md:col-span-6 flex flex-col justify-between text-left" id="contact-info-col">
                  <div>
                    {/* Floating Badge Header Row with Elegant Phone Logo */}
                    <div className="flex items-center gap-2 mb-4" id="contact-badge-header">
                      <div className="w-10 h-10 rounded-full bg-[#1A3730] text-emerald-300 flex items-center justify-center relative shadow-sm border border-emerald-500/20 group cursor-help transition-all duration-300 hover:scale-105" title="Nomor Telepon & Kontak Person">
                        <Phone className="w-4 h-4 text-emerald-300" />
                        <Sparkles className="w-2.5 h-2.5 text-yellow-300 absolute -top-0.5 -right-0.5 animate-pulse" />
                      </div>
                      {config.badgeLabel && (
                        <div className="bg-neutral-50 px-4 py-2 rounded-full border border-gray-250/60 text-xs font-semibold text-[#1A3730]/80">
                          {config.badgeLabel}
                        </div>
                      )}
                    </div>

                    {/* Highly Styled Font Heading */}
                    <h2 className="text-5xl md:text-6xl font-black text-[#1A3730] mb-8 tracking-tight font-display" id="contact-display-title">
                      {config.title}
                    </h2>

                    {/* Social cards list items wrapped in grey plate container */}
                    <div className="bg-neutral-50/70 p-6 md:p-8 rounded-[2rem] border border-gray-150 space-y-4 shadow-3xs" id="social-accounts-box">
                      {/* WhatsApp / Phone */}
                      {config.whatsapp && (
                        <a
                          href={`https://wa.me/${config.whatsapp.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-4 hover:translate-x-1 transition-all group"
                        >
                          <div className="w-10 h-10 rounded-full bg-[#1A3730] flex items-center justify-center text-white border border-white/10 group-hover:scale-105 transition-transform shrink-0">
                            <Phone className="w-4 h-4 fill-current text-white" />
                          </div>
                          <span className="text-sm md:text-base font-bold text-[#1A3730]/90 font-sans">{config.whatsapp}</span>
                        </a>
                      )}

                      {/* Email Address */}
                      {config.email && (
                        <a
                          href={`mailto:${config.email}`}
                          className="flex items-center gap-4 hover:translate-x-1 transition-all group"
                        >
                          <div className="w-10 h-10 rounded-full bg-[#1A3730] flex items-center justify-center text-white border border-white/10 group-hover:scale-105 transition-transform shrink-0">
                            <Mail className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-sm md:text-base font-bold text-[#1A3730]/90 font-sans">{config.email}</span>
                        </a>
                      )}

                      {/* Instagram */}
                      {config.instagram && (
                        <a
                          href={`https://instagram.com/${config.instagram.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-4 hover:translate-x-1 transition-all group"
                        >
                          <div className="w-10 h-10 rounded-full bg-[#1A3730] flex items-center justify-center text-white border border-white/10 group-hover:scale-105 transition-transform shrink-0">
                            <Instagram className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-sm md:text-base font-bold text-[#1A3730]/90 font-sans">{config.instagram}</span>
                        </a>
                      )}

                      {/* LinkedIn URL */}
                      {config.linkedin && (
                        <a
                          href={config.linkedin.startsWith('http') ? config.linkedin : `https://${config.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-4 hover:translate-x-1 transition-all group"
                        >
                          <div className="w-10 h-10 rounded-full bg-[#1A3730] flex items-center justify-center text-white border border-white/10 group-hover:scale-105 transition-transform shrink-0">
                            <Linkedin className="w-4 h-4 text-white fill-current" />
                          </div>
                          <span className="text-sm md:text-base font-bold text-[#1A3730]/90 font-sans truncate">{config.linkedin}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column (col-span-12 md:col-span-6): Twin Portrait Staggered Photos Section */}
                <div className="col-span-12 md:col-span-6 flex flex-col justify-between relative mt-4 md:mt-0" id="contact-photos-col">
                  {/* Photo container stack */}
                  <div className="flex items-end gap-4 flex-1 mb-4 h-full min-h-[220px]" id="photo-twin-dock">
                    {/* Portrait Photo 1 (Middle) - Beautiful Tall vertical */}
                    <div className="w-1/2 aspect-[3/4] md:aspect-[2/3] rounded-[2rem] overflow-hidden shadow-lg border-3 border-white bg-neutral-100 animate-fade-in relative group flex items-center justify-center">
                      <img
                        src={config.photo1}
                        alt="Foto Kontak Utama"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      {isEditAllowed && (
                        <label className="absolute inset-0 bg-[#1A3730]/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer gap-1.5 text-center p-3 rounded-[2rem]">
                          <Upload className="w-5 h-5 text-emerald-300 animate-bounce" />
                          <span className="text-[10px] font-extrabold tracking-tight font-sans text-emerald-100">Ganti Foto Kiri/Utama</span>
                          <span className="text-[8px] text-gray-300 font-medium">Klik untuk unggah</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleDirectPhotoUpdate(file, 'photo1');
                            }}
                          />
                        </label>
                      )}
                    </div>

                    {/* Portrait Photo 2 (Far Right Offset Slightly Bottom) */}
                    <div className="w-1/2 aspect-[3/4] md:aspect-[2/3] rounded-[2rem] overflow-hidden shadow-lg border-3 border-white bg-[#1A3730]/10 relative -bottom-4 animate-fade-in group flex items-center justify-center" id="photo-twin-offset">
                      <img
                        src={config.photo2}
                        alt="Foto Kontak Sekunder"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      {isEditAllowed && (
                        <label className="absolute inset-0 bg-[#1A3730]/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer gap-1.5 text-center p-3 rounded-[2rem]">
                          <Upload className="w-5 h-5 text-emerald-300 animate-bounce" />
                          <span className="text-[10px] font-extrabold tracking-tight font-sans text-emerald-100">Ganti Foto Kanan</span>
                          <span className="text-[8px] text-gray-300 font-medium">Klik untuk unggah</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleDirectPhotoUpdate(file, 'photo2');
                            }}
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Music Player & Twin Buttons Row in the bottom right corner */}
                  <div className="flex flex-col items-end gap-2 mt-4 mr-2.5 z-10 w-full relative" id="media-action-buttons-container">


                    {/* Popover Music Settings Panel */}
                    <AnimatePresence>
                      {isMusicCustomizerOpen && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: 10 }}
                          className="absolute bottom-full right-0 mb-3 w-[310px] bg-[#07110E] rounded-2xl border border-emerald-900/30 p-4 shadow-2xl z-30 text-left"
                          id="popover-music-settings"
                        >
                          <div className="flex justify-between items-center mb-2.5 pb-2 border-b border-emerald-950/40">
                            <span className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-400 flex items-center gap-1.5 font-mono">
                              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                              SPOTIFY MUSIC ENGINE
                            </span>
                            <button 
                              type="button" 
                              onClick={() => setIsMusicCustomizerOpen(false)}
                              className="text-gray-400 hover:text-emerald-400 transition-colors p-1"
                              title="Tutup Panel"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="space-y-3">
                            {/* Fast Live Search Bar */}
                            <div>
                              <form 
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  handleSpotifySearch();
                                }} 
                                className="flex gap-1.5 items-center"
                              >
                                <div className="relative flex-1">
                                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-emerald-600" />
                                  <input 
                                    type="text" 
                                    placeholder="Cari lagu / artis di Spotify..."
                                    className="w-full text-[10px] pl-8 pr-2 py-1.5 bg-[#0D1E1A] border border-[#193F36] rounded-xl text-white placeholder-emerald-800/60 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/20 font-sans"
                                    value={spotifySearchQuery}
                                    onChange={(e) => setSpotifySearchQuery(e.target.value)}
                                  />
                                </div>
                                <button 
                                  type="submit"
                                  className="bg-emerald-500 hover:bg-emerald-400 text-[#07110E] font-black text-[9.5px] px-3.5 py-1.5 rounded-xl transition-all hover:shadow-xs active:scale-95"
                                >
                                  Cari
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setIsMusicCustomizerOpen(false)}
                                  className="bg-[#1C1C1E] hover:bg-red-500 hover:text-white text-gray-400 w-8 h-8 rounded-xl flex items-center justify-center transition-all active:scale-90 border border-emerald-900/20 shrink-0"
                                  title="Tutup Panel"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </form>
                            </div>

                            {/* Live Search List & Hits */}
                            <div className="bg-[#040A08] rounded-xl p-2 border border-emerald-950/50">
                              <span className="text-[7.5px] font-black text-emerald-600 uppercase block mb-1.5 tracking-wider font-mono">
                                DAFTAR LAGU TRENDING GLOBAL:
                              </span>
                              
                              <div className="max-h-[160px] overflow-y-auto space-y-1 pr-0.5 scrollbar-thin scrollbar-thumb-emerald-950">
                                {isSpotifySearching ? (
                                  <div className="flex flex-col items-center justify-center py-8 text-emerald-600 gap-1.5">
                                    <Loader2 className="w-5 h-5 text-emerald-400 animate-spin" />
                                    <span className="text-[9px] font-black tracking-wider animate-pulse uppercase font-mono">Mengkoneksikan...</span>
                                  </div>
                                ) : spotifyTracks.length === 0 ? (
                                  <div className="text-center py-8 text-gray-500 text-[9px] font-medium">
                                    Ketik lagu favorit Anda pada kolom pencarian di atas!
                                  </div>
                                ) : (
                                  spotifyTracks.map((track) => (
                                    <button
                                      key={track.id}
                                      type="button"
                                      onClick={() => handleDirectMusicUpdate(track.previewUrl, `${track.name} - ${track.artist}`)}
                                      className={`w-full p-1.5 rounded-lg flex items-center gap-2 transition-all text-left group border border-transparent ${
                                        config.musicUrl === track.previewUrl
                                          ? 'bg-[#122A24] text-emerald-300 border-emerald-800/30'
                                          : 'hover:bg-[#0D1C18] text-gray-300'
                                      }`}
                                    >
                                      <div className="relative shrink-0">
                                        <img 
                                          src={track.imageUrl} 
                                          alt={track.name} 
                                          className="w-7.5 h-7.5 rounded object-cover border border-emerald-950/50"
                                        />
                                        {config.musicUrl === track.previewUrl && isPlaying && (
                                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded">
                                            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
                                          </div>
                                        )}
                                      </div>
                                      
                                      <div className="flex-1 min-w-0">
                                        <p className="text-[9.5px] font-extrabold truncate text-white block leading-snug group-hover:text-emerald-400 transition-colors">
                                          {track.name}
                                        </p>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                          <p className="text-[8px] text-gray-400 truncate max-w-[120px] block">
                                            {track.artist}
                                          </p>
                                          <span className="text-[6.5px] px-1 py-[0.5px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/15 rounded font-mono shrink-0">
                                            LAGU LENGKAP
                                          </span>
                                        </div>
                                      </div>

                                      <div className="shrink-0 leading-none">
                                        {config.musicUrl === track.previewUrl && isPlaying ? (
                                          <span className="w-4 h-4 rounded-full bg-emerald-400 text-[#07110E] flex items-center justify-center">
                                            <Pause className="w-2.5 h-2.5 fill-current" />
                                          </span>
                                        ) : (
                                          <span className="w-4 h-4 rounded-full bg-neutral-900 border border-emerald-950 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-[#07110E] transition-colors">
                                            <Play className="w-2.5 h-2.5 pl-0.5 fill-current" />
                                          </span>
                                        )}
                                      </div>
                                    </button>
                                  ))
                                )}
                              </div>
                            </div>

                            {/* Additional Tools Rows: Upload & Presets */}
                            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-emerald-950/50">
                              <div>
                                <span className="text-[7.5px] font-black text-emerald-800 uppercase block mb-1 font-mono">FILE LOKAL:</span>
                                <label className="w-full bg-[#0D1D19] border border-dashed border-[#18352D] text-emerald-400 py-1.5 px-2 rounded-xl cursor-pointer hover:bg-[#122B24] transition-all flex items-center justify-center gap-1 text-[8px] font-extrabold">
                                  <Upload className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                  <span className="truncate">Unggah MP3</span>
                                  <input
                                    type="file"
                                    accept="audio/*"
                                    className="hidden"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) handleDirectAudioUpload(file);
                                    }}
                                  />
                                </label>
                              </div>

                              <div>
                                <span className="text-[7.5px] font-black text-emerald-800 uppercase block mb-1 font-mono">LINK AUDIO MP3:</span>
                                <div className="relative">
                                  <input 
                                    type="text"
                                    placeholder="https://...mp3"
                                    className="w-full text-[8.5px] py-1.5 px-2 bg-[#0D1D19] border border-[#18352D] rounded-xl focus:outline-none focus:border-emerald-400 text-white placeholder-emerald-900/50 h-7 font-sans"
                                    value={config.musicUrl.startsWith('blob:') ? '' : config.musicUrl}
                                    onChange={(e) => {
                                      const val = e.target.value.trim();
                                      if (val) {
                                        const parsedName = val.substring(val.lastIndexOf('/') + 1) || 'Lagu Pilihan';
                                        handleDirectMusicUpdate(val, parsedName.replace(/\.[^/.]+$/, ""));
                                      }
                                    }}
                                  />
                                </div>
                              </div>
                            </div>

                            <p className="text-[7.5px] text-gray-500 leading-normal font-sans">
                              🎵 Cari sepuasnya secara gratis! Lagu pilihan Anda tersimpan permanen di perangkat & akan diputar sebagai lagu latar selamat datang.
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex gap-2 items-center">
                      <button
                        type="button"
                        onClick={() => setIsMusicCustomizerOpen(!isMusicCustomizerOpen)}
                        className={`w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all active:scale-90 shadow-sm ${
                          isMusicCustomizerOpen 
                            ? 'bg-[#1A3730] text-emerald-400 border border-emerald-500/40 ring-2 ring-emerald-500/20' 
                            : 'bg-[#1A3730] hover:bg-[#254F45] text-white'
                        }`}
                        title="Ganti Musik Latar Pilihan"
                      >
                        <Music className="w-4 h-4 text-emerald-300" />
                      </button>

                      <button
                        type="button"
                        onClick={togglePlay}
                        className="w-9 h-9 rounded-full bg-[#1A3730] hover:bg-[#254F45] text-white flex items-center justify-center cursor-pointer transition-all active:scale-90 shadow-sm"
                        title={isPlaying ? 'Pause Musik Latar' : 'Putar Musik Latar'}
                      >
                        {isPlaying ? <Pause className="w-4 h-4 text-emerald-300" /> : <Play className="w-4 h-4 text-white pl-0.5" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => setIsCertificatesOpen(true)}
                        className={`w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all active:scale-90 shadow-sm relative ${
                          isCertificatesOpen
                            ? 'bg-[#1A3730] text-emerald-400 border border-emerald-500/40 ring-2 ring-emerald-505/20'
                            : 'bg-[#1A3730] hover:bg-[#254F45] text-white'
                        }`}
                        title="Lihat Sertifikat & Penghargaan Saya"
                      >
                        <FileText className="w-4 h-4 text-emerald-300" />
                        <span className="absolute top-0 right-0 w-2 h-2 bg-yellow-400 rounded-full animate-pulse border border-[#07110E]"></span>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* Custom Live-Editing Panel within showcasing card block */
              <div className="col-span-12 flex flex-col gap-4 text-left" id="contact-inline-editor">
                <div className="flex items-center gap-2 mb-1 border-b border-gray-100 pb-3">
                  <Sparkles className="text-[#1A3730] w-4 h-4 animate-pulse" />
                  <h3 className="text-sm font-extrabold text-[#1A3730]">Kustomisasi Panel Kontak Person</h3>
                </div>

                {formError && (
                  <div className="bg-rose-50 text-rose-600 text-[10px] p-2 rounded-xl border border-rose-100 font-semibold mb-2">
                    ⚠️ {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Badge & Title */}
                  <div className="space-y-2">
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-gray-400">Section Branding</span>
                    <div>
                      <label className="text-[9px] font-bold text-gray-500 pl-1 block mb-0.5">Label Kategori Badge</label>
                      <input
                        type="text"
                        value={editBadgeLabel}
                        onChange={(e) => setEditBadgeLabel(e.target.value)}
                        placeholder="e.g. Kontak Person"
                        className="w-full text-xs px-2.5 py-2 border border-gray-200 rounded-lg focus:outline-[#1A3730]"
                      />
                    </div>
                    
                    <div>
                      <label className="text-[9px] font-bold text-gray-500 pl-1 block mb-0.5">Judul Utama Seksi</label>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        placeholder="e.g. Kontak"
                        className="w-full text-xs px-2.5 py-2 border border-gray-200 rounded-lg focus:outline-[#1A3730]"
                      />
                    </div>
                  </div>

                  {/* Social links handles */}
                  <div className="space-y-2">
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-gray-400">Media Penghubung</span>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>
                        <label className="text-[9px] font-bold text-gray-500 pl-1 block mb-0.5">No. HP/WhatsApp</label>
                        <input
                          type="text"
                          value={editWhatsapp}
                          onChange={(e) => setEditWhatsapp(e.target.value)}
                          placeholder="e.g. 0895-8066-13868"
                          className="w-full text-[11px] px-2.5 py-1.5 border border-gray-200 rounded-lg focus:outline-[#1A3730]"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-gray-500 pl-1 block mb-0.5">Email resmi</label>
                        <input
                          type="email"
                          value={editEmail}
                          onChange={(e) => setEditEmail(e.target.value)}
                          placeholder="e.g. ahmad@gmail.com"
                          className="w-full text-[11px] px-2.5 py-1.5 border border-gray-200 rounded-lg focus:outline-[#1A3730]"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-gray-500 pl-1 block mb-0.5">Instagram</label>
                        <input
                          type="text"
                          value={editInstagram}
                          onChange={(e) => setEditInstagram(e.target.value)}
                          placeholder="e.g. @ahmd.faiizz"
                          className="w-full text-[11px] px-2.5 py-1.5 border border-gray-200 rounded-lg focus:outline-[#1A3730]"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-gray-500 pl-1 block mb-0.5">LinkedIn</label>
                        <input
                          type="text"
                          value={editLinkedin}
                          onChange={(e) => setEditLinkedin(e.target.value)}
                          placeholder="e.g. linkedin.com/in/..."
                          className="w-full text-[11px] px-2.5 py-1.5 border border-gray-200 rounded-lg focus:outline-[#1A3730]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Media twin pictures custom uploads */}
                <div className="border-t border-gray-100 mt-2 pt-4">
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-gray-400 block mb-2">Unggah Foto Pendukung Utama (Twin Staggered Grid)</span>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Image 1 uploads controls */}
                    <div className="p-3 bg-neutral-50/70 rounded-2xl border border-dashed border-gray-200 flex flex-col justify-between">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[9.5px] font-bold text-[#1A3730]">Foto Kiri (Utama)</span>
                        <img src={editPhoto1} alt="Preview Kiri" className="w-8 h-8 rounded-md object-cover border" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="w-full bg-white p-2 border rounded-lg cursor-pointer hover:bg-neutral-100 transition-colors flex items-center justify-center gap-1.5 text-[9.5px]">
                          <Upload className="w-3.5 h-3.5 text-gray-400" />
                          Unggah File Lokal (PNG, JPG)
                          <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef1}
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleImageUpload(file, 'photo1');
                            }}
                          />
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={editPhoto1.startsWith('data:image/') ? '' : editPhoto1}
                            onChange={(e) => setEditPhoto1(e.target.value)}
                            placeholder="Atau salin Link URL foto disini..."
                            className="w-full bg-white text-[9px] p-1.5 pl-5 border rounded-lg"
                          />
                          <LinkIcon className="w-3 h-3 text-gray-400 absolute left-1.5 top-2.5" />
                        </div>
                      </div>
                    </div>

                    {/* Image 2 upload controls */}
                    <div className="p-3 bg-neutral-50/70 rounded-2xl border border-dashed border-gray-200 flex flex-col justify-between">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[9.5px] font-bold text-[#1A3730]">Foto Kanan (Kedua / Offset)</span>
                        <img src={editPhoto2} alt="Preview Kanan" className="w-8 h-8 rounded-md object-cover border" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="w-full bg-white p-2 border rounded-lg cursor-pointer hover:bg-neutral-100 transition-colors flex items-center justify-center gap-1.5 text-[9.5px]">
                          <Upload className="w-3.5 h-3.5 text-gray-400" />
                          Unggah File Lokal (PNG, JPG)
                          <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef2}
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleImageUpload(file, 'photo2');
                            }}
                          />
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={editPhoto2.startsWith('data:image/') ? '' : editPhoto2}
                            onChange={(e) => setEditPhoto2(e.target.value)}
                            placeholder="Atau salin Link URL foto disini..."
                            className="w-full bg-white text-[9px] p-1.5 pl-5 border rounded-lg"
                          />
                          <LinkIcon className="w-3 h-3 text-gray-400 absolute left-1.5 top-2.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Custom Background Music Options */}
                <div className="border-t border-gray-100 mt-4 pt-4">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Sparkles className="text-[#1A3730] w-3.5 h-3.5 animate-pulse" />
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#1A3730]">Kustomisasi Musik Latar Portofolio</span>
                  </div>
                  
                  <div className="bg-neutral-50/70 p-4 rounded-2xl border border-dashed border-gray-200 space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[9px] font-bold text-gray-500 pl-1 block mb-0.5">Judul Lagu / Track</label>
                        <input
                          type="text"
                          value={editMusicTitle}
                          onChange={(e) => setEditMusicTitle(e.target.value)}
                          placeholder="e.g. Lofi Chill Cafe Session"
                          className="w-full text-[11px] px-2.5 py-1.5 border border-gray-200 rounded-lg focus:outline-[#1A3730]"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-gray-500 pl-1 block mb-0.5">Unggah File Audio (*.mp3, *.wav)</label>
                        <label className="w-full bg-white p-1.5 border border-gray-200 rounded-lg cursor-pointer hover:bg-neutral-100 transition-all flex items-center justify-center gap-1.5 text-[9.5px]">
                          <Upload className="w-3.5 h-3.5 text-gray-400" />
                          Pilih MP3 dari Perangkat Anda
                          <input
                            type="file"
                            accept="audio/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                // Create local Object URL
                                const localUrl = URL.createObjectURL(file);
                                setEditMusicUrl(localUrl);
                                setEditMusicTitle(file.name.replace(/\.[^/.]+$/, ""));
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="text-[9px] font-bold text-gray-500 pl-1 block mb-0.5">Link URL Audio Musik Online (Contoh: MP3 dari internet)</label>
                      <input
                        type="text"
                        value={editMusicUrl}
                        onChange={(e) => setEditMusicUrl(e.target.value)}
                        placeholder="e.g. https://domain.com/track.mp3"
                        className="w-full text-[10px] px-2.5 py-1.5 border border-gray-200 rounded-lg focus:outline-[#1A3730]"
                      />
                    </div>

                    <div className="flex gap-2 flex-wrap items-center pt-1">
                      <span className="text-[9px] font-black text-[#1A3730] uppercase font-mono tracking-tight pr-1">Pilihan Preset Musik:</span>
                      <button
                        type="button"
                        onClick={() => {
                          setEditMusicUrl('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
                          setEditMusicTitle('Lofi Chill Café Session');
                        }}
                        className={`px-2.5 py-1 rounded-full text-[8.5px] font-bold transition-all border ${
                          editMusicUrl === 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
                            ? 'bg-[#1A3730] text-white border-[#1A3730]'
                            : 'bg-white text-[#1A3730] border-gray-200 hover:bg-neutral-100/80'
                        }`}
                      >
                        ☕ Lofi Chill Café
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditMusicUrl('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3');
                          setEditMusicTitle('Cozy Retro Sunset Jazz');
                        }}
                        className={`px-2.5 py-1 rounded-full text-[8.5px] font-bold transition-all border ${
                          editMusicUrl === 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
                            ? 'bg-[#1A3730] text-white border-[#1A3730]'
                            : 'bg-white text-[#1A3730] border-gray-200 hover:bg-neutral-100/80'
                        }`}
                      >
                        🌇 Sunset Retro Jazz
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditMusicUrl('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3');
                          setEditMusicTitle('Guitar Acoustic Melodies');
                        }}
                        className={`px-2.5 py-1 rounded-full text-[8.5px] font-bold transition-all border ${
                          editMusicUrl === 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
                            ? 'bg-[#1A3730] text-white border-[#1A3730]'
                            : 'bg-white text-[#1A3730] border-gray-200 hover:bg-neutral-100/80'
                        }`}
                      >
                        🎸 Akustik Santai
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditMusicUrl('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3');
                          setEditMusicTitle('Summer Horizon Chillbeat');
                        }}
                        className={`px-2.5 py-1 rounded-full text-[8.5px] font-bold transition-all border ${
                          editMusicUrl === 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
                            ? 'bg-[#1A3730] text-white border-[#1A3730]'
                            : 'bg-white text-[#1A3730] border-gray-200 hover:bg-neutral-100/80'
                        }`}
                      >
                        🏖️ Summer Ocean
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditMusicUrl('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3');
                          setEditMusicTitle('Deep Focus Ambient Piano');
                        }}
                        className={`px-2.5 py-1 rounded-full text-[8.5px] font-bold transition-all border ${
                          editMusicUrl === 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3'
                            ? 'bg-[#1A3730] text-white border-[#1A3730]'
                            : 'bg-white text-[#1A3730] border-gray-200 hover:bg-neutral-100/80'
                        }`}
                      >
                        🎹 Fokus Belajar
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditMusicUrl('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3');
                          setEditMusicTitle('Cosmic Synth Ambientscape');
                        }}
                        className={`px-2.5 py-1 rounded-full text-[8.5px] font-bold transition-all border ${
                          editMusicUrl === 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3'
                            ? 'bg-[#1A3730] text-white border-[#1A3730]'
                            : 'bg-white text-[#1A3730] border-gray-200 hover:bg-neutral-100/80'
                        }`}
                      >
                        🌌 Space Healing
                      </button>
                    </div>

                    {/* Spotify Search Integration inside Editor Dashboard */}
                    <div className="bg-[#050C0A] p-3.5 rounded-2xl border border-emerald-900/30 font-sans space-y-2.5 mt-2.5 text-left">
                      <span className="text-[9px] font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                        Cari Musik dari Spotify untuk Dijadikan Default
                      </span>
                      
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Ketik judul lagu / nama penyanyi..."
                          value={spotifySearchQuery}
                          onChange={(e) => setSpotifySearchQuery(e.target.value)}
                          className="flex-1 text-[11px] px-3 py-1.5 bg-[#0D1F1B] border border-[#193F36] text-white rounded-xl focus:outline-none focus:border-emerald-400 placeholder-emerald-900/40"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleSpotifySearch();
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => handleSpotifySearch()}
                          className="bg-emerald-500 hover:bg-emerald-400 text-[#050C0A] text-[10px] font-black px-4.5 py-1.5 rounded-xl transition-all active:scale-95 hover:shadow-xs"
                        >
                          Cari
                        </button>
                      </div>

                      {/* Display Results inside Editor Dashboard */}
                      {isSpotifySearching ? (
                        <div className="flex items-center justify-center gap-2 py-3 text-emerald-600 text-[10px] font-mono">
                          <Loader2 className="w-4 h-4 text-emerald-400 animate-spin" />
                          MENGKONEKSIKAN...
                        </div>
                      ) : spotifyTracks.length > 0 ? (
                        <div className="max-h-[140px] overflow-y-auto space-y-1 mt-1 pr-1 scrollbar-thin scrollbar-thumb-emerald-950">
                          {spotifyTracks.map((track) => (
                            <button
                              key={track.id + '-editor'}
                              type="button"
                              onClick={() => {
                                setEditMusicUrl(track.previewUrl);
                                setEditMusicTitle(`${track.name} - ${track.artist}`);
                              }}
                              className={`w-full p-2 rounded-xl flex items-center gap-2.5 transition-all text-left border border-transparent ${
                                editMusicUrl === track.previewUrl
                                  ? 'bg-[#122A24] text-emerald-300 border-emerald-800/30'
                                  : 'hover:bg-[#0C1A16] text-gray-300'
                              }`}
                            >
                              <img 
                                src={track.imageUrl} 
                                alt={track.name} 
                                className="w-7 h-7 rounded object-cover border border-emerald-950" 
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-[10px] font-extrabold truncate text-white block leading-tight">{track.name}</p>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <p className="text-[8.5px] text-gray-400 truncate max-w-[150px] block">{track.artist}</p>
                                </div>
                              </div>
                              {editMusicUrl === track.previewUrl ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              ) : (
                                <span className="text-[7.5px] text-emerald-600 font-mono font-bold uppercase ring-1 ring-emerald-950 px-1 py-0.5 rounded shrink-0">Set</span>
                              )}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[8px] text-emerald-900/60 leading-normal block font-mono">
                          💡 Ketik lagu favorit Anda di kolom atas lalu klik 'Cari' untuk memuat lagu Spotify instan!
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Editor Submit Block */}
                <div className="flex gap-2 justify-end border-t border-gray-100 pt-3.5 mt-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setFormError('');
                    }}
                    className="px-4 py-2 border border-gray-200 hover:bg-neutral-50 text-gray-500 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="px-5 py-2 bg-[#1A3730] hover:bg-[#254F45] text-white rounded-xl text-xs font-bold cursor-pointer flex items-center gap-1.5 shadow-sm"
                  >
                    <Check className="w-3.5 h-3.5" /> Simpan Perubahan
                  </button>
                </div>
              </div>
            )}
          </motion.div>
      </AnimatePresence>

      {/* PROFESSIONAL CERTIFICATE SHIELD & LEDGER MODAL */}
      <AnimatePresence>
        {isCertificatesOpen && (
          <div 
            id="certificates-modal-overlay"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto"
          >
            {(() => {
              const hasCerts = certs.length > 0;
              const cert = hasCerts ? (certs.find(c => c.id === activeCertId) || certs[0]) : null;

              // Compute dynamic styling properties for interactive vibrant layouts
              const isAcademic = cert ? cert.tag === 'Akademik' : true;
              const isIntern = cert ? cert.tag === 'Magang Industri' : false;
              const isMarket = cert ? cert.tag === 'Pasar Modal' : false;
              const isBusiness = cert ? cert.tag === 'Kompetensi' : false;

              let themeColor = 'emerald';
              let accentHex = '#10b981';
              let borderCol = 'border-emerald-500/40 bg-emerald-[#091512]';
              let badgeBg = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
              let gradientText = 'from-emerald-400 to-teal-300';

              if (isIntern) {
                themeColor = 'blue';
                accentHex = '#3b82f6';
                borderCol = 'border-blue-500/40 bg-blue-950/20';
                badgeBg = 'bg-blue-500/10 text-blue-400 border-blue-500/30';
                gradientText = 'from-blue-400 to-indigo-300';
              } else if (isMarket) {
                themeColor = 'rose';
                accentHex = '#f43f5e';
                borderCol = 'border-rose-500/40 bg-rose-950/20';
                badgeBg = 'bg-rose-500/10 text-rose-405 border-rose-500/30';
                gradientText = 'from-rose-400 to-pink-300';
              } else if (isBusiness) {
                themeColor = 'amber';
                accentHex = '#f59e0b';
                borderCol = 'border-amber-500/40 bg-amber-950/20';
                badgeBg = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
                gradientText = 'from-amber-400 to-[#e0a800]';
              }

              return (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="relative bg-[#050B09] text-white w-full max-w-5xl rounded-[2.5rem] shadow-2xl flex flex-col max-h-[92vh] overflow-hidden border border-emerald-900/30"
                  id="certificates-modal-card"
                  style={{
                    boxShadow: `0 20px 50px -10px ${accentHex}25, inset 0 1px 0 0 rgba(255,255,255,0.06)`
                  }}
                >
                  {/* MODAL HEADER */}
                  <div className="p-6 md:p-8 border-b border-emerald-950/40 bg-gradient-to-r from-[#0C1E19] to-[#142D26] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20" id="cert-icon-container">
                        <Award className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div>
                        <h2 className="text-base md:text-lg font-bold font-display tracking-tight text-white flex items-center gap-2">
                          Sertifikat
                        </h2>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setIsCertificatesOpen(false);
                        setIsAddingCert(false);
                        setEditingCertId(null);
                      }}
                      className="p-2 hover:bg-emerald-500/10 text-gray-400 hover:text-white rounded-xl transition-all cursor-pointer active:scale-95 border border-transparent hover:border-emerald-500/10"
                      title="Tutup Halaman"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* MODAL BODY */}
                  <div className="flex flex-col md:flex-row flex-1 overflow-hidden" id="certificates-modal-body">
                    {/* LEFT SIDEBAR: TAB LIST */}
                    <div className="w-full md:w-[290px] p-4 bg-[#07110E] border-b md:border-b-0 md:border-r border-emerald-950/45 overflow-y-auto flex flex-col gap-3">
                      
                      {/* TAMBAH SERTIFIKAT BARU BUTTON */}
                      {isEditAllowed && (
                        <button
                          type="button"
                          onClick={() => {
                            setIsAddingCert(true);
                            setEditingCertId(null);
                            setNewCertTitle('');
                            setNewCertIssuer('');
                            setNewCertRecipient('Annisa Nurus Saidah, S.M.');
                            setNewCertTag('Akademik');
                            setNewCertCredentialId('');
                            setNewCertDate('');
                            setNewCertGrade('');
                            setNewCertDetails('');
                            setNewCertImage('');
                          }}
                          className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black text-xs font-black tracking-wide flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md active:scale-95 shrink-0"
                        >
                          <Plus className="w-4 h-4" /> Tambah Sertifikat
                        </button>
                      )}

                      <div className="flex items-center justify-between px-1">
                        <p className="text-[9px] uppercase tracking-wider text-emerald-500/70 font-black font-mono">
                          Daftar Sertifikat ({certs.length})
                        </p>
                      </div>

                      <div className="space-y-2 flex-1 overflow-y-auto pr-1">
                        {certs.map((c) => {
                          const isActive = cert && activeCertId === c.id;
                          const isC_Academic = c.tag === 'Akademik';
                          const isC_Intern = c.tag === 'Magang Industri';
                          const isC_Market = c.tag === 'Pasar Modal';
                          
                          // Active and hover styles colorful for each item
                          let tabColorTheme = 'hover:bg-emerald-500/5 group-hover:text-emerald-400';
                          let tabPrimaryHex = 'text-emerald-400';
                          let tabBadgeStyle = 'bg-emerald-500/10 text-emerald-400';
                          
                          if (isC_Intern) {
                             tabColorTheme = 'hover:bg-blue-500/5 group-hover:text-blue-400';
                             tabPrimaryHex = 'text-blue-400';
                             tabBadgeStyle = 'bg-blue-500/10 text-blue-400';
                          } else if (isC_Market) {
                             tabColorTheme = 'hover:bg-rose-500/5 group-hover:text-rose-450';
                             tabPrimaryHex = 'text-rose-400';
                             tabBadgeStyle = 'bg-rose-500/10 text-rose-450';
                          } else if (c.tag === 'Kompetensi') {
                             tabColorTheme = 'hover:bg-amber-500/5 group-hover:text-amber-400';
                             tabPrimaryHex = 'text-amber-400';
                             tabBadgeStyle = 'bg-amber-500/10 text-amber-400';
                          }

                          let activeTabBtnStyle = isActive 
                            ? isC_Academic ? 'bg-emerald-500/15 border-emerald-500/60 text-white shadow-md'
                              : isC_Intern ? 'bg-blue-500/15 border-blue-500/60 text-white shadow-md'
                              : isC_Market ? 'bg-rose-500/15 border-rose-500/60 text-white shadow-md'
                              : 'bg-amber-500/15 border-amber-500/60 text-white shadow-md'
                            : 'bg-[#091512]/50 border-transparent hover:bg-white/5 text-gray-400';

                          return (
                            <button
                              key={c.id}
                              type="button"
                              onClick={() => {
                                setIsAddingCert(false);
                                setEditingCertId(null);
                                setActiveCertId(c.id);
                              }}
                              className={`w-full p-2.5 rounded-2xl text-left transition-all duration-200 cursor-pointer flex items-start gap-2 border group ${activeTabBtnStyle}`}
                            >
                              <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                                isActive 
                                  ? isC_Academic ? 'bg-emerald-500/20 text-emerald-400'
                                    : isC_Intern ? 'bg-blue-500/20 text-blue-400'
                                    : isC_Market ? 'bg-rose-500/20 text-rose-400'
                                    : 'bg-amber-500/20 text-amber-400'
                                  : `bg-neutral-900 ${tabPrimaryHex}`
                              }`}>
                                {c.id === 'stiem-sm' ? <GraduationCap className="w-3.5 h-3.5" /> :
                                 c.id === 'pertamina-intern' ? <Briefcase className="w-3.5 h-3.5" /> :
                                 c.id === 'poi-idx' ? <TrendingUp className="w-3.5 h-3.5" /> :
                                 c.id === 'national-biz' ? <Award className="w-3.5 h-3.5 text-amber-400" /> :
                                 isC_Academic ? <GraduationCap className="w-3.5 h-3.5" /> :
                                 isC_Intern ? <Briefcase className="w-3.5 h-3.5" /> :
                                 isC_Market ? <TrendingUp className="w-3.5 h-3.5" /> :
                                 <Award className="w-3.5 h-3.5" />}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className={`text-[10.5px] font-bold truncate leading-tight ${isActive ? 'text-white font-extrabold' : 'text-gray-300'}`}>
                                  {c.title}
                                </p>
                                <p className="text-[8.5px] text-gray-500 truncate font-mono mt-0.5">
                                  {c.issuer}
                                </p>
                                <span className={`inline-block text-[7px] px-1.5 py-[0.5px] font-black tracking-wide font-mono mt-1 rounded ${tabBadgeStyle}`}>
                                  {c.tag}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* RIGHT PREVIEW WORKSPACE */}
                    <div className="flex-1 p-5 md:p-7 bg-[#040A08] overflow-y-auto flex flex-col" id="certificates-preview-workspace">
                      
                      {/* CASE 1: NO CERTIFICATES AT ALL */}
                      {!hasCerts && !isAddingCert && (
                        <div className="m-auto text-center py-12 max-w-sm flex flex-col items-center space-y-4">
                          <Award className="w-12 h-12 text-emerald-500/30 animate-pulse" />
                          <div>
                            <h3 className="text-base font-bold text-white mb-1">Daftar Sertifikat Kosong</h3>
                            <p className="text-xs text-gray-400">Anda telah menghapus seluruh sertifikat dari sistem local storage.</p>
                          </div>
                          {isEditAllowed && (
                            <button
                              type="button"
                              onClick={() => {
                                setIsAddingCert(true);
                                setNewCertTitle('');
                                setNewCertIssuer('');
                                setNewCertRecipient('Annisa Nurus Saidah, S.M.');
                                setNewCertTag('Akademik');
                                setNewCertCredentialId('');
                                setNewCertDate('');
                                setNewCertGrade('');
                                setNewCertDetails('');
                                setNewCertImage('');
                              }}
                              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold rounded-xl transition-all cursor-pointer"
                            >
                              Tambah Sertifikasi Pertama
                            </button>
                          )}
                        </div>
                      )}

                      {/* CASE 2: FORM TAMBAH SERTIFIKAT BARU */}
                      {isAddingCert && (
                        <form onSubmit={handleSaveNewCert} className="w-full space-y-5 bg-[#091512]/60 p-5 rounded-3xl border border-emerald-500/10">
                          <div className="flex items-center justify-between border-b border-emerald-500/10 pb-3">
                            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                              <Plus className="w-4 h-4" /> Form Tambah Sertifikat Baru
                            </h3>
                            <button
                              type="button"
                              onClick={() => setIsAddingCert(false)}
                              className="text-gray-400 hover:text-white text-xs px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800"
                            >
                              Batal
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5Col">
                              <label className="text-[10px] font-bold text-emerald-500/80 uppercase tracking-wider font-mono">Nama Sertifikat *</label>
                              <input 
                                type="text"
                                required
                                value={newCertTitle}
                                onChange={(e) => setNewCertTitle(e.target.value)}
                                placeholder="Contoh: Sertifikasi Keahlian Analisis Saham"
                                className="w-full text-xs bg-black/40 border border-emerald-500/20 rounded-xl px-3 py-2 text-white focus:outline-emerald-500 focus:border-transparent"
                              />
                            </div>
                            <div className="space-y-1.5Col">
                              <label className="text-[10px] font-bold text-emerald-500/80 uppercase tracking-wider font-mono">Instansi Penerbit *</label>
                              <input 
                                type="text"
                                required
                                value={newCertIssuer}
                                onChange={(e) => setNewCertIssuer(e.target.value)}
                                placeholder="Contoh: IDX Indonesia / STIEM Sidoarjo"
                                className="w-full text-xs bg-black/40 border border-emerald-500/20 rounded-xl px-3 py-2 text-white focus:outline-emerald-500 focus:border-transparent"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5Col">
                              <label className="text-[10px] font-bold text-emerald-500/80 uppercase tracking-wider font-mono">Nama Penerima</label>
                              <input 
                                type="text"
                                value={newCertRecipient}
                                onChange={(e) => setNewCertRecipient(e.target.value)}
                                placeholder="Contoh: Annisa Nurus Saidah, S.M."
                                className="w-full text-xs bg-black/40 border border-emerald-500/20 rounded-xl px-3 py-2 text-white focus:outline-emerald-500 focus:border-transparent"
                              />
                            </div>
                            <div className="space-y-1.5Col">
                              <label className="text-[10px] font-bold text-emerald-500/80 uppercase tracking-wider font-mono">Kategori / Tag</label>
                              <select 
                                value={newCertTag}
                                onChange={(e) => setNewCertTag(e.target.value)}
                                className="w-full text-xs bg-[#0b1c18] border border-emerald-500/20 rounded-xl px-3 py-2 text-white focus:outline-emerald-500 focus:border-transparent cursor-pointer"
                              >
                                <option value="Akademik">Akademik</option>
                                <option value="Magang Industri">Magang Industri</option>
                                <option value="Pasar Modal">Pasar Modal</option>
                                <option value="Kompetensi">Kompetensi</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="text-[10px] font-bold text-emerald-500/80 uppercase tracking-wider font-mono block mb-1">No. Kredensial / ID</label>
                              <input 
                                type="text"
                                value={newCertCredentialId}
                                onChange={(e) => setNewCertCredentialId(e.target.value)}
                                placeholder="Contoh: ID-99381-X"
                                className="w-full text-xs bg-black/40 border border-emerald-500/20 rounded-xl px-3 py-2 text-white focus:outline-emerald-500"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-bold text-emerald-500/80 uppercase tracking-wider font-mono block mb-1">Tanggal Penerbitan</label>
                              <input 
                                type="text"
                                value={newCertDate}
                                onChange={(e) => setNewCertDate(e.target.value)}
                                placeholder="Contoh: 31 Januari 2025"
                                className="w-full text-xs bg-black/40 border border-emerald-500/20 rounded-xl px-3 py-2 text-white focus:outline-emerald-500"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-bold text-emerald-500/80 uppercase tracking-wider font-mono block mb-1">Predikat / Nilai</label>
                              <input 
                                type="text"
                                value={newCertGrade}
                                onChange={(e) => setNewCertGrade(e.target.value)}
                                placeholder="Contoh: Cum Laude / Grade A"
                                className="w-full text-xs bg-black/40 border border-emerald-500/20 rounded-xl px-3 py-2 text-white focus:outline-emerald-500"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-[10px] font-bold text-emerald-500/80 uppercase tracking-wider font-mono block mb-1">Keterangan / Detail Singkat</label>
                            <textarea 
                              rows={2}
                              value={newCertDetails}
                              onChange={(e) => setNewCertDetails(e.target.value)}
                              placeholder="Uraikan kelulusan, materi yang ditekuni, atau pencapaian spesifik..."
                              className="w-full text-xs bg-black/40 border border-emerald-500/20 rounded-xl px-3 py-2 text-white resize-none focus:outline-emerald-500"
                            />
                          </div>

                          {/* IMAGE CHOOSE AREA FOR NEW CERTIFICATE */}
                          <div className="border border-dashed border-emerald-500/20 bg-black/30 p-4 rounded-2xl flex flex-col items-center text-center space-y-2">
                            {newCertImage ? (
                              <div className="relative max-w-xs rounded-lg overflow-hidden border border-emerald-500/20 p-4 bg-black/50 flex flex-col items-center justify-center min-w-[200px]">
                                {newCertImage.startsWith('data:application/pdf') ? (
                                  <div className="flex flex-col items-center justify-center p-3 animate-fade-in">
                                    <FileText className="w-12 h-12 text-rose-500 animate-pulse mb-1.5" />
                                    <p className="text-[10px] text-gray-200 font-bold truncate max-w-[150px]">Laporan Sertifikat PDF</p>
                                    <p className="text-[8px] text-gray-400">Siap disimpan</p>
                                  </div>
                                ) : (
                                  <img src={newCertImage} alt="Preview" className="max-h-[140px] object-contain mx-auto rounded" />
                                )}
                                <button
                                  type="button"
                                  onClick={() => setNewCertImage('')}
                                  className="absolute top-1 right-1 bg-rose-650 hover:bg-rose-600 text-white p-1 rounded-md text-[10px] font-bold cursor-pointer"
                                >
                                  Hapus Berkas
                                </button>
                              </div>
                            ) : (
                              <>
                                <Upload className="w-7 h-7 text-emerald-500/40" />
                                <p className="text-[11px] text-gray-300 font-medium">Unggah Berkas Gambar / PDF Sertifikat Fisik</p>
                                <p className="text-[9px] text-gray-500">Mendukung JPG, PNG, WEBP, PDF (Maksimal 1.2MB)</p>
                                <label className="inline-flex items-center gap-1.5 bg-neutral-900 border border-emerald-500/25 hover:border-emerald-500 text-white rounded-xl px-3 py-1.5 text-[10px] font-bold transition-all cursor-pointer">
                                  Pilih Berkas / PDF
                                  <input 
                                    type="file" 
                                    accept="image/*,application/pdf" 
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        if (file.size > 1.2 * 1024 * 1024) {
                                          alert("Ukuran berkas melebihi batas 1.2 MB. Harap perkecil atau kompres terlebih dahulu.");
                                          return;
                                        }
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                          setNewCertImage(reader.result as string);
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }}
                                    className="hidden" 
                                  />
                                </label>
                              </>
                            )}
                          </div>

                          <div className="flex justify-end gap-3 pt-2">
                            <button
                              type="button"
                              onClick={() => setIsAddingCert(false)}
                              className="px-4 py-2 rounded-xl text-xs font-bold text-gray-400 hover:text-white"
                            >
                              Batal
                            </button>
                            <button
                              type="submit"
                              className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black text-xs font-black rounded-xl transition-all shadow-md active:scale-95"
                            >
                              Simpan Sertifikat Baru
                            </button>
                          </div>
                        </form>
                      )}

                      {/* CASE 3: FORM EDIT SERTIFIKAT YANG SUDAH ADA */}
                      {editingCertId && cert && (
                        <form onSubmit={handleSaveEditCert} className="w-full space-y-5 bg-[#091512]/60 p-5 rounded-3xl border border-emerald-500/10">
                          <div className="flex items-center justify-between border-b border-emerald-500/10 pb-3">
                            <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                              <Pencil className="w-4 h-4" /> Form Edit Rincian Sertifikat
                            </h3>
                            <button
                              type="button"
                              onClick={() => setEditingCertId(null)}
                              className="text-gray-400 hover:text-white text-xs px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800"
                            >
                              Batal
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-bold text-amber-500/80 uppercase tracking-wider font-mono">Nama Sertifikat *</label>
                              <input 
                                type="text"
                                required
                                value={editCertTitle}
                                onChange={(e) => setEditCertTitle(e.target.value)}
                                className="w-full text-xs bg-black/40 border border-amber-500/20 rounded-xl px-3 py-2 text-white focus:outline-amber-500"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-bold text-amber-500/80 uppercase tracking-wider font-mono">Instansi Penerbit *</label>
                              <input 
                                type="text"
                                required
                                value={editCertIssuer}
                                onChange={(e) => setEditCertIssuer(e.target.value)}
                                className="w-full text-xs bg-black/40 border border-amber-500/20 rounded-xl px-3 py-2 text-white focus:outline-amber-500"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-bold text-amber-500/80 uppercase tracking-wider font-mono">Nama Penerima</label>
                              <input 
                                type="text"
                                value={editCertRecipient}
                                onChange={(e) => setEditCertRecipient(e.target.value)}
                                className="w-full text-xs bg-black/40 border border-amber-500/20 rounded-xl px-3 py-2 text-white focus:outline-amber-500"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-bold text-amber-500/80 uppercase tracking-wider font-mono">Kategori / Tag</label>
                              <select 
                                value={editCertTag}
                                onChange={(e) => setEditCertTag(e.target.value)}
                                className="w-full text-xs bg-[#241a0b] border border-amber-500/20 rounded-xl px-3 py-2 text-white focus:outline-amber-500 font-mono cursor-pointer"
                              >
                                <option value="Akademik">Akademik</option>
                                <option value="Magang Industri">Magang Industri</option>
                                <option value="Pasar Modal">Pasar Modal</option>
                                <option value="Kompetensi">Kompetensi</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="text-[10px] font-bold text-amber-500/80 uppercase tracking-wider font-mono block mb-1">No. Kredensial / ID</label>
                              <input 
                                type="text"
                                value={editCertCredentialId}
                                onChange={(e) => setEditCertCredentialId(e.target.value)}
                                className="w-full text-xs bg-black/40 border border-amber-500/20 rounded-xl px-3 py-2 text-white focus:outline-amber-500"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-bold text-amber-500/80 uppercase tracking-wider font-mono block mb-1">Tanggal Penerbitan</label>
                              <input 
                                type="text"
                                value={editCertDate}
                                onChange={(e) => setEditCertDate(e.target.value)}
                                className="w-full text-xs bg-black/40 border border-amber-500/20 rounded-xl px-3 py-2 text-white focus:outline-amber-500"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-bold text-amber-500/80 uppercase tracking-wider font-mono block mb-1">Predikat / Nilai</label>
                              <input 
                                type="text"
                                value={editCertGrade}
                                onChange={(e) => setEditCertGrade(e.target.value)}
                                className="w-full text-xs bg-black/40 border border-amber-500/20 rounded-xl px-3 py-2 text-white focus:outline-amber-500"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-[10px] font-bold text-amber-500/80 uppercase tracking-wider font-mono block mb-1">Keterangan / Detail Singkat</label>
                            <textarea 
                              rows={2}
                              value={editCertDetails}
                              onChange={(e) => setEditCertDetails(e.target.value)}
                              className="w-full text-xs bg-black/40 border border-amber-500/20 rounded-xl px-3 py-2 text-white resize-none focus:outline-amber-500"
                            />
                          </div>

                          <div className="space-y-1.5 p-1">
                            <label className="text-[10px] font-bold text-amber-500/80 uppercase tracking-wider font-mono block">Berkas Sertifikat (Foto / PDF)</label>
                            <div className="flex items-center gap-3 bg-black/30 p-3 rounded-xl border border-amber-500/10">
                              {editCertImage ? (
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                  {editCertImage.startsWith('data:application/pdf') ? (
                                    <FileText className="w-5 h-5 text-rose-500 shrink-0" />
                                  ) : (
                                    <Award className="w-5 h-5 text-emerald-400 shrink-0" />
                                  )}
                                  <span className="text-[10px] text-gray-300 truncate flex-1 font-mono">
                                    {editCertImage.startsWith('data:application/pdf') ? 'Sertifikat_Terunggah.pdf' : 'Sertifikat_Terunggah.png'}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => setEditCertImage('')}
                                    className="text-[9px] font-bold text-rose-400 hover:text-rose-300 px-2 py-0.5 rounded bg-rose-500/10 cursor-pointer transition-all"
                                  >
                                    Hapus
                                  </button>
                                </div>
                              ) : (
                                <span className="text-[10px] text-gray-500 flex-1">Belum ada file terunggah</span>
                              )}
                              
                              <label className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-black text-[10px] font-black rounded-lg cursor-pointer transition-all active:scale-95 shrink-0 select-none">
                                Pilih File Baru
                                <input 
                                  type="file"
                                  accept="image/*,application/pdf"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      if (file.size > 1.2 * 1024 * 1024) {
                                        alert("Ukuran berkas melebihi batas 1.2 MB. Harap kompres/perkecil file.");
                                        return;
                                      }
                                      const reader = new FileReader();
                                      reader.onloadend = () => {
                                        setEditCertImage(reader.result as string);
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                  className="hidden"
                                />
                              </label>
                            </div>
                          </div>

                          <div className="flex justify-between items-center gap-3 pt-2">
                            <button
                              type="button"
                              onClick={() => handleDeleteCert(cert.id)}
                              className="px-4 py-2 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 flex items-center gap-1.5 transition-all"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Hapus Sertifikat
                            </button>
                            
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => setEditingCertId(null)}
                                className="px-4 py-2 rounded-xl text-xs font-bold text-gray-400 hover:text-white"
                              >
                                Batal
                              </button>
                              <button
                                type="submit"
                                className="px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black text-xs font-black rounded-xl transition-all shadow-md active:scale-95"
                              >
                                Simpan Perubahan
                              </button>
                            </div>
                          </div>
                        </form>
                      )}
                                    {/* CASE 4: STANDARD CERTIFICATE VIEWER (PREVIEW) */}
                      {hasCerts && !isAddingCert && !editingCertId && cert && (
                        <div className="w-full flex flex-col items-center justify-center gap-6 h-full py-4 text-center">
                          
                          {/* THE CERTIFICATE IMAGE ONLY */}
                          {cert.uploadedImage ? (
                            <div className="relative group max-w-full w-full rounded-2xl overflow-hidden border border-emerald-500/10 bg-[#020504] flex flex-col items-center justify-center p-2 shadow-2xl">
                              {cert.uploadedImage.startsWith('data:application/pdf') ? (
                                <div className="w-full flex flex-col items-center justify-center p-3 md:p-6 space-y-4">
                                  <div className="w-16 h-16 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center mb-1">
                                    <FileText className="w-8 h-8 text-red-500" />
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-bold text-white px-2 mb-1">{cert.title}</h4>
                                    <p className="text-[10px] text-gray-400 font-mono">Sertifikat Format PDF Terunggah</p>
                                  </div>

                                  {/* Embed PDF inline inside iframe */}
                                  <div className="w-full h-[400px] md:h-[480px] rounded-xl border border-neutral-800/80 overflow-hidden bg-[#121214] relative">
                                    <iframe 
                                      src={cert.uploadedImage} 
                                      className="w-full h-full border-0" 
                                      title={cert.title}
                                    />
                                  </div>

                                  <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                                    <a
                                      href={cert.uploadedImage}
                                      download={`${cert.title.replace(/\s+/g, '_')}.pdf`}
                                      className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-450 hover:to-teal-450 text-black text-[10px] font-black rounded-xl transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-md select-none"
                                    >
                                      <Download className="w-3.5 h-3.5" /> Unduh PDF
                                    </a>
                                    <a
                                      href={cert.uploadedImage}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-gray-300 text-[10px] font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 select-none"
                                    >
                                      <ExternalLink className="w-3.5 h-3.5" /> Buka Tab Baru
                                    </a>
                                  </div>
                                </div>
                              ) : (
                                <img 
                                  src={cert.uploadedImage} 
                                  alt={cert.title} 
                                  className="max-h-[440px] md:max-h-[500px] object-contain rounded-xl shadow-lg transition-transform duration-300"
                                />
                              )}
                            </div>
                          ) : (
                            /* PRETTY CARD DIGITAL DECORATIVE PLACEHOLDER MOCK */
                            <div className={`relative w-full max-w-lg aspect-video rounded-2xl border-2 border-dashed bg-[#091512] flex flex-col items-center justify-center text-center p-6 ${borderCol}`}>
                              <div className="p-3.5 bg-white/5 rounded-full mb-3" style={{ border: `1px solid ${accentHex}20` }}>
                                <Award className="w-6 h-6" style={{ color: accentHex }} />
                              </div>
                              <h4 className="text-[11px] font-mono uppercase tracking-widest text-gray-400">Belum Ada Berkas Sertifikat</h4>
                              {isEditAllowed ? (
                                <>
                                  <p className="text-[10px] text-gray-500 max-w-xs mt-1.5 mb-4 leading-normal">
                                    Silakan unggah berkas foto atau dokumen PDF sertifikat fisik Anda dengan mengklik tombol di bawah ini.
                                  </p>
                                  <label className="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-[10px] px-3.5 py-1.5 rounded-lg transition-all active:scale-95 cursor-pointer shadow-sm select-none">
                                    <Upload className="w-3.5 h-3.5" /> Pilih File Berkas (Foto / PDF)
                                    <input 
                                      type="file" 
                                      accept="image/*,application/pdf" 
                                      onChange={(e) => handleCertificateUpload(cert.id, e)} 
                                      className="hidden" 
                                    />
                                  </label>
                                </>
                              ) : (
                                <p className="text-[10px] text-gray-500 max-w-xs mt-1.5 leading-normal">
                                  Dokumen fisik belum tersedia untuk saat ini.
                                </p>
                              )}
                            </div>
                          )}

                          {/* SMALL ACTION PANEL FOR CERTIFICATE ENVELOPE */}
                          {isEditAllowed && (
                            <div className="flex gap-2 max-w-xs w-full">
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingCertId(cert.id);
                                  setEditCertTitle(cert.title);
                                  setEditCertIssuer(cert.issuer);
                                  setEditCertRecipient(cert.recipient || '');
                                  setEditCertTag(cert.tag);
                                  setEditCertCredentialId(cert.credentialId || '');
                                  setEditCertDate(cert.date || '');
                                  setEditCertGrade(cert.grade || '');
                                  setEditCertDetails(cert.details || '');
                                  setEditCertImage(cert.uploadedImage || '');
                                }}
                                className="flex-1 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-[#2dffbe]/10 text-emerald-400 text-[10px] font-black tracking-wide flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                              >
                                <Pencil className="w-3.5 h-3.5" /> Edit Data / Ganti Foto
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteCert(cert.id)}
                                className="px-3 py-1.5 bg-gradient-to-r from-rose-950/40 to-red-950/40 hover:from-rose-900 border border-rose-500/20 rounded-xl text-rose-300 text-[10px] font-bold flex items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer"
                                title="Hapus Sertifikat"
                              >
                                <Trash2 className="w-3.5 h-3.5" /> Hapus
                              </button>
                            </div>
                          )}

                        </div>
                      )}

                    </div>
                  </div>
                </motion.div>
              );
            })()}
          </div>
        )}
      </AnimatePresence>

      {/* DIALOG KONFIRMASI HAPUS SERTIFIKAT (Bypass Iframe Sandbox Alert block) */}
      <AnimatePresence>
        {certToDeleteId && (
          <div 
            id="cert-delete-confirm-overlay"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setCertToDeleteId(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative bg-[#050C0A] text-white w-full max-w-sm rounded-[2rem] p-6 shadow-2xl border border-red-500/20 text-center"
              id="cert-delete-confirm-card"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-auto w-12 h-12 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center mb-4 border border-red-500/20 animate-bounce">
                <Trash2 className="w-5 h-5 animate-pulse" />
              </div>

              <h3 className="text-sm font-bold text-white tracking-tight mb-2">Hapus Sertifikat Ini?</h3>
              <p className="text-[11px] text-gray-400 leading-relaxed mb-6">
                Apakah Anda yakin ingin menghapus data sertifikat ini dari daftar internal secara permanen? Tindakan ini tidak dapat dibatalkan.
              </p>

              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={() => setCertToDeleteId(null)}
                  className="flex-1 py-2 bg-neutral-900 hover:bg-neutral-800 text-gray-300 rounded-xl text-xs font-semibold border border-transparent transition-all cursor-pointer active:scale-95"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={confirmDeleteCertStatus}
                  className="flex-1 py-1.5 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-650 text-white rounded-xl text-xs font-semibold shadow-md transition-all cursor-pointer active:scale-95"
                >
                  Ya, Hapus
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


    </div>
  );
}
