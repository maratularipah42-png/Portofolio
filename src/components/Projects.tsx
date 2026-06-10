import { useState, useEffect, FormEvent, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Calendar, Plus, Trash2, Link as LinkIcon, Tag, Sparkles, CheckCircle2, Info, ArrowUpRight, Filter, EyeOff, Pencil, Download, Play, Copy, Video, Image as ImageIcon, Upload } from 'lucide-react';
import { Project } from '../types';

export default function Projects({ onHide, isEditAllowed = false }: { onHide?: () => void; isEditAllowed?: boolean }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [linkOptionSelected, setLinkOptionSelected] = useState<Project | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // States for editing a project
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editYear, setEditYear] = useState('');
  const [editLink, setEditLink] = useState('');
  const [editCategory, setEditCategory] = useState('Poster & Grafis');
  const [editTags, setEditTags] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editImage, setEditImage] = useState('');
  const [editFormError, setEditFormError] = useState('');

  // Form states for adding a new design work
  const [newTitle, setNewTitle] = useState('');
  const [newYear, setNewYear] = useState(new Date().getFullYear().toString());
  const [newLink, setNewLink] = useState('');
  const [newCategory, setNewCategory] = useState('Poster & Grafis');
  const [newTags, setNewTags] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImage, setNewImage] = useState('');
  const [formError, setFormError] = useState('');

  const handleImageUpload = (file: File, type: 'new' | 'edit') => {
    if (!file) return;
    
    // Check file type is image
    if (!file.type.startsWith('image/')) {
      if (type === 'new') {
        setFormError('File harus berupa gambar (JPG/PNG)!');
      } else {
        setEditFormError('File harus berupa gambar (JPG/PNG)!');
      }
      return;
    }

    // Check size limit (e.g. 2.5MB target to avoid localstorage quota problems)
    if (file.size > 2.5 * 1024 * 1024) {
      if (type === 'new') {
        setFormError('Ukuran gambar terlalu besar! Harap unggah dengan ukuran di bawah 2.5MB agar penyimpanan lancar.');
      } else {
        setEditFormError('Ukuran gambar terlalu besar! Harap unggah dengan ukuran di bawah 2.5MB.');
      }
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        if (type === 'new') {
          setNewImage(event.target.result as string);
          setFormError('');
        } else {
          setEditImage(event.target.result as string);
          setEditFormError('');
        }
      }
    };
    reader.readAsDataURL(file);
  };
  const getYoutubeId = (url?: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return match[2];
    }
    if (url.includes('youtube.com/watch?v=')) {
      const parts = url.split('v=');
      if (parts[1]) {
        const id = parts[1].split('&')[0];
        if (id.length === 11) return id;
      }
    }
    return null;
  };

  const getProjectImageUrl = (imageSeed?: string) => {
    if (!imageSeed) return null;
    if (imageSeed.startsWith('data:image/') || imageSeed.startsWith('http://') || imageSeed.startsWith('https://')) {
      return imageSeed;
    }
    // Map keywords of default projects
    switch (imageSeed) {
      case 'motion-video':
        return 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=800&q=80';
      case 'mental-health-ux':
        return 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80';
      case 'coffee-infographics':
        return 'https://images.unsplash.com/photo-1511426463457-0571e247d816?auto=format&fit=crop&w=800&q=80';
      case 'branding-kopitulis':
        return 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80';
      default:
        return null;
    }
  };

  const defaultProjects: Project[] = [
    {
      id: 'd5',
      title: 'Filem Pendek "JERAT"',
      year: '2023',
      link: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
      category: 'Video & Animasi',
      description: 'Filem pendek yang berjudul JERAT merupakan karya dari kelas 22MN1 saat berada dibangku sekolah, dan peran saya dalam tim mencakup sebagai berkontribusi membuat konsep kreatif, kameramen, dan editor video.',
      fullDetails: 'Karya video sinematik semi-dokumenter yang mengisahkan realitas dinamika pertemanan dan pesan moral mendalam di lingkungan sekolah kelas 22MN1. Mengoperasikan perekaman visual, storyboard kreatif, sinkronisasi audio, dan efek transisi pasca-produksi.',
      tags: ['Desain Karya'],
      metrics: 'Karya Terbaik Kelas 22MN1',
      imageSeed: 'motion-video'
    },
    {
      id: 'd1',
      title: 'UI/UX Redesign - Aplikasi Kesehatan Mental "Tenang"',
      year: '2025',
      link: 'https://figma.com',
      category: 'Poster & Grafis',
      description: 'Redesain konseptual komprehensif antarmuka bimbingan konseling mahasiswa dengan pendekatan inklusif, estetika modern, dan navigasi ramah pengguna.',
      fullDetails: 'Menggunakan metodologi Design Thinking untuk merancang 15+ screen resolusi tinggi (High-Fidelity) di Figma. Menguji alur pengguna dengan 10 koresponden mahasiswa untuk mengukur kemudahan akses konseling krisis.',
      tags: ['Figma', 'Adobe Illustrator', 'User Research', 'Wireframing'],
      metrics: 'User Satisfaction rate 92%',
      imageSeed: 'mental-health-ux'
    },
    {
      id: 'd2',
      title: 'Video Animasi Promosi - Biomass Circular Economy Campaign',
      year: '2026',
      link: 'https://youtube.com',
      category: 'Video & Animasi',
      description: 'Produksi video promosi explainer durasi pendek (60 detik) bernuansa segar dan interaktif tentang keunggulan biomassa serabut kelapa.',
      fullDetails: 'Merancang naskah storyboard kreatif, menganimasikan grafik visual, mengedit sekuensial audio pendukung, serta melakukan color grading agar sesuai dengan karakter brand yang ramah lingkungan.',
      tags: ['After Effects', 'Premiere Pro', 'CapCut', 'Color Grading'],
      metrics: '60-Sec High Engagement Video',
      imageSeed: 'motion-video'
    },
    {
      id: 'd3',
      title: 'Infografis Interaktif - Pola Konsumsi Kopi Gen Z',
      year: '2025',
      link: 'https://canva.com',
      category: 'Poster & Grafis',
      description: 'Desain poster infografis modern menyajikan data statistik riset pasar kedai kopi lokal dengan palet warna bumi yang estetis.',
      fullDetails: 'Mengubah lembar riset angka membosankan menjadi ilustrasi ikonik beresolusi tinggi yang sangat ramah media sosial, memudahkan proses penyerapan informasi konsumen muda.',
      tags: ['Canva', 'CorelDraw', 'Data Visualization'],
      metrics: 'Secured Top Pitch Asset',
      imageSeed: 'coffee-infographics'
    },
    {
      id: 'd4',
      title: 'Brand Identity & Packaging Blueprint - Kedai "Kopitulis"',
      year: '2024',
      link: 'https://behance.net',
      category: 'Poster & Grafis',
      description: 'Panduan berkas komprehensif untuk logo, palet warna, tipografi, dan packaging ramah lingkungan untuk kedai UMKM lokal.',
      fullDetails: 'Mengembangkan identitas visual yang bercerita tentang keaslian kopi lokal. Menyusun guideline logo sekunder, struktur font merek, pola kemasan biodegradabel, serta mock-up seragam gerai.',
      tags: ['Photoshop', 'Illustrator', 'Branding Guideline'],
      metrics: 'Standardized UMKM Branding',
      imageSeed: 'branding-kopitulis'
    }
  ];

  // Load projects from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('design_projects_showcase');
    if (stored) {
      try {
        let parsed = JSON.parse(stored) as Project[];
        
        // Migrate old restricted YouTube links that threw Error 153 to highly compatible open URLs
        parsed = parsed.map(p => {
          if (p.id === 'd5' && (p.link === 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' || p.link.includes('dQw4w9WgXcQ'))) {
            return {
              ...p,
              link: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ'
            };
          }
          return p;
        });

        // Migrate old unsupported categories to Poster & Grafis
        parsed = parsed.map(p => {
          if (p.category === 'UI/UX Desain' || p.category === 'Identitas Visual' || p.category === 'Lainnya') {
            return {
              ...p,
              category: 'Poster & Grafis'
            };
          }
          return p;
        });

        const hasJerat = parsed.some(p => p.id === 'd5' || p.title.includes('JERAT'));
        if (!hasJerat) {
          // Prepend JERAT to ensure it appears as requested
          const jeratProject = {
            ...defaultProjects[0],
            link: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ'
          };
          const updated = [jeratProject, ...parsed];
          setProjects(updated);
          localStorage.setItem('design_projects_showcase', JSON.stringify(updated));
        } else {
          setProjects(parsed);
          localStorage.setItem('design_projects_showcase', JSON.stringify(parsed));
        }
      } catch (err) {
        setProjects(defaultProjects);
      }
    } else {
      setProjects(defaultProjects);
      localStorage.setItem('design_projects_showcase', JSON.stringify(defaultProjects));
    }
  }, []);

  // Save projects to localStorage whenever state changes
  const saveProjectsToStorage = (updatedList: Project[]) => {
    setProjects(updatedList);
    localStorage.setItem('design_projects_showcase', JSON.stringify(updatedList));
  };

  const handleAddProject = (e: FormEvent) => {
    e.preventDefault();

    if (!newTitle.trim()) {
      setFormError('Nama karya wajib diisi!');
      return;
    }
    if (!newYear.trim()) {
      setFormError('Tahun pembuatan wajib diisi!');
      return;
    }

    const tagsArray = newTags
      ? newTags.split(',').map(t => t.trim()).filter(Boolean)
      : ['Desain Karya'];

    const newProject: Project = {
      id: 'custom-' + Date.now().toString(),
      title: newTitle.trim(),
      year: newYear.trim(),
      link: newLink.trim() || undefined,
      category: newCategory,
      description: newDescription.trim() || 'Desain portofolio karya kreatif.',
      tags: tagsArray,
      metrics: 'Karya Baru Diinput',
      imageSeed: newImage.trim() || undefined,
    };

    const updated = [newProject, ...projects];
    saveProjectsToStorage(updated);

    // Reset Form
    setNewTitle('');
    setNewYear(new Date().getFullYear().toString());
    setNewLink('');
    setNewCategory('Poster & Grafis');
    setNewTags('');
    setNewDescription('');
    setNewImage('');
    setFormError('');
    setIsAddModalOpen(false);
  };

  const handleDeleteProject = (p: Project, e: MouseEvent) => {
    e.stopPropagation(); // Prevent opening details modal
    setProjectToDelete(p);
  };

  const handleEditProject = (e: FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    if (!editTitle.trim()) {
      setEditFormError('Nama karya wajib diisi!');
      return;
    }
    if (!editYear.trim()) {
      setEditFormError('Tahun pembuatan wajib diisi!');
      return;
    }

    const tagsArray = editTags
      ? editTags.split(',').map(t => t.trim()).filter(Boolean)
      : ['Desain Karya'];

    const updated = projects.map(p => {
      if (p.id === editingProject.id) {
        return {
          ...p,
          title: editTitle.trim(),
          year: editYear.trim(),
          link: editLink.trim() || undefined,
          category: editCategory,
          description: editDescription.trim() || 'Desain portofolio karya kreatif.',
          tags: tagsArray,
          imageSeed: editImage.trim() || undefined,
        };
      }
      return p;
    });

    saveProjectsToStorage(updated);
    setEditingProject(null);
  };



  const categories = ['All', 'Poster & Grafis', 'Video & Animasi'];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <div id="projects-showcase-section" className="bg-white rounded-[2rem] border border-gray-100 p-6 shadow-sm flex-1 min-w-[320px]">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <span className="bg-[#E6F4EA] text-[#1A3730] text-[10px] uppercase tracking-wider font-mono px-3 py-1 rounded-full border border-[#2A5248]/10 inline-block mb-1.5" id="proj-badge">
            Galeri Kreatif Portofolio
          </span>
          <h3 className="text-[#1A3730] font-bold text-xl tracking-tight" id="proj-title">Snowcase Karya Desain</h3>
        </div>

        {/* Action Button to Add New Design */}
        {isEditAllowed && (
          <div className="flex items-center gap-2 flex-wrap" id="proj-actions-wrap">
            <button
              id="btn-add-karya-trigger"
              onClick={() => setIsAddModalOpen(true)}
              className="bg-[#1A3730] hover:bg-[#254F45] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Tambah Karya
            </button>
          </div>
        )}
      </div>

      {/* Categories selector */}
      <div className="flex gap-1.5 bg-gray-50 p-1 rounded-xl flex-wrap mb-5 border border-gray-100" id="proj-cats-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            id={`cat-btn-${cat.replace(/\s+/g, '-')}`}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-[#1A3730] text-white shadow-xs'
                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100/50'
            }`}
          >
            {cat === 'All' ? 'Semua Karya' : cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="projects-grid-layout">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((p) => (
            <motion.div
              layout
              key={p.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={() => {
                setSelectedProject(p);
              }}
              className="group bg-[#FBFBFA] border border-gray-150 hover:border-[#1A3730]/30 rounded-[2rem] p-6 text-left transition-all hover:bg-white hover:shadow-lg cursor-pointer flex flex-col justify-between relative overflow-hidden"
              id={`project-card-${p.id}`}
            >
              {/* Top Accent line */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-transparent group-hover:bg-[#1A3730] transition-colors" />

              <div>
                <div className="flex items-center justify-between mb-4" id={`p-header-${p.id}`}>
                  <span className="text-[10px] font-bold text-gray-400 font-mono flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
                    <Tag className="w-3 h-3 text-[#1A3730]" /> {p.category}
                  </span>
                  
                  {/* Explicit Creation Date (Tanggal Pembuatan) Label */}
                  <span className="bg-[#E6F4EA] px-2.5 py-1 rounded-md text-[10px] font-mono text-[#1A3730] font-bold border border-[#2A5248]/15 flex items-center gap-1" id={`p-year-${p.id}`} title="Tanggal Pembuatan Karya">
                    <Calendar className="w-3 h-3 text-[#1A3730]" />
                    {p.year}
                  </span>
                </div>

                {getProjectImageUrl(p.imageSeed) && (
                  <div className="w-full aspect-video rounded-2xl overflow-hidden mb-4 border border-gray-150 relative bg-neutral-50 flex items-center justify-center shadow-3xs" id={`p-image-box-${p.id}`}>
                    <img 
                      src={getProjectImageUrl(p.imageSeed) || ''} 
                      alt={p.title} 
                      className="w-full h-full object-contain group-hover:scale-102 transition-transform duration-350"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                {/* Explicit Name (Nama Karya) Segment */}
                <div className="mb-3">
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#2E5E52]/60 block mb-0.5">Nama Karya</span>
                  <h4 className="text-base font-extrabold text-[#1A3730] group-hover:text-[#2E5E52] transition-colors leading-snug" id={`p-title-${p.id}`}>
                    {p.title}
                  </h4>
                </div>
                
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 mb-1" id={`p-desc-${p.id}`}>
                  {p.description}
                </p>
              </div>

              {/* Tags & Actions Footer */}
              <div className="mt-5 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3" id={`p-footer-${p.id}`}>
                <div className="flex gap-1 flex-wrap" id={`p-tags-${p.id}`}>
                  {p.tags.slice(0, 3).map((tg) => (
                    <span key={tg} className="text-[9px] font-mono text-gray-650 bg-gray-150/60 px-2.5 py-0.5 rounded-md border border-gray-200/20">
                      {tg}
                    </span>
                  ))}
                </div>

                {/* Highly Visible Action Buttons Container */}
                <div className="flex items-center gap-1.5 self-end sm:self-auto flex-wrap">
                  {p.link ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (p.link) {
                          window.open(p.link, '_blank', 'noopener,noreferrer');
                        }
                      }}
                      className="py-1.5 px-4 rounded-lg bg-[#E6F4EA] hover:bg-[#1A3730] text-[#1A3730] hover:text-white text-[10px] font-extrabold transition-all flex items-center gap-1 border border-[#2A5248]/20 shadow-2xs cursor-pointer active:scale-95"
                      title="Direct access"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      Buka
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(p);
                      }}
                      className="py-1.5 px-4 rounded-lg bg-[#E6F4EA] hover:bg-[#1A3730] text-[#1A3730] hover:text-white text-[10px] font-extrabold transition-all flex items-center gap-1 border border-[#2A5248]/20 shadow-2xs cursor-pointer active:scale-95"
                    >
                      Buka Rincian
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <div className="md:col-span-2 py-12 text-center text-gray-400 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <Info className="w-8 h-8 mx-auto text-gray-300 mb-2" />
            <p className="text-xs font-medium">Belum ada karya untuk kategori ini.</p>
          </div>
        )}
      </div>

      {/* DIALOG PILIHAN: BUKA YOUTUBE ATAU UNDUH / PILIH AKSI KARYA */}
      <AnimatePresence>
        {linkOptionSelected && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in" 
            id="link-options-modal-backdrop" 
            onClick={() => setLinkOptionSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[2rem] border border-gray-150 max-w-md w-full p-6 text-left shadow-2xl relative"
              id="link-options-modal-container"
            >
              {/* Header */}
              <div className="flex items-start justify-between border-b border-gray-100 pb-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 bg-[#E6F4EA] rounded-2xl text-[#1A3730] shrink-0">
                    <ExternalLink className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-[#1A3730] leading-snug">Opsi Akses Karya</h3>
                    <p className="text-[10px] text-gray-400">Tentukan cara untuk membuka atau menyimpan media hasil karya ini.</p>
                  </div>
                </div>
                <button
                  onClick={() => setLinkOptionSelected(null)}
                  className="w-7 h-7 rounded-full bg-gray-50 hover:bg-gray-150 flex items-center justify-center text-gray-500 font-bold text-xs cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Informative Label */}
              <div className="bg-gray-50/80 p-3 rounded-xl border border-gray-100 mb-4">
                <span className="text-[8px] uppercase tracking-wider font-extrabold text-gray-400 block mb-0.5">Nama Karya Terpilih</span>
                <p className="text-xs font-bold text-[#1A3730] line-clamp-1">{linkOptionSelected.title}</p>
                <div className="flex items-center gap-1.5 mt-1.5 text-[9px] text-[#2E5E52] font-mono">
                  <span className="bg-[#E6F4EA] px-2 py-0.5 rounded-sm font-bold">{linkOptionSelected.category}</span>
                  <span>🗓️ Tanggal Pembuatan: {linkOptionSelected.year}</span>
                </div>
              </div>

              {/* Quick Actions List */}
              <div className="space-y-2.5">
                {/* 1. Play / Open YouTube / Web Link */}
                <button
                  type="button"
                  onClick={() => {
                    if (linkOptionSelected.link) {
                      window.open(linkOptionSelected.link, '_blank', 'noopener,noreferrer');
                    }
                    setLinkOptionSelected(null);
                  }}
                  className="w-full bg-[#1A3730] hover:bg-[#254F45] text-white text-xs font-bold p-3.5 rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-between text-left border border-transparent group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-lg text-white group-hover:scale-105 transition-transform">
                      {getYoutubeId(linkOptionSelected.link) ? <Play className="w-4 h-4 fill-white text-white animate-pulse" /> : <ExternalLink className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="font-extrabold">
                        {getYoutubeId(linkOptionSelected.link) ? 'Buka & Putar di YouTube' : 'Kunjungi / Buka Tautan Resmi'}
                      </div>
                      <div className="text-[9.5px] text-[#E6F4EA]/80 font-normal">Satu klik langsung putar media video di browser / aplikasi</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#E6F4EA]" />
                </button>

                {/* 2. Download Media / Copy link option */}
                <button
                  type="button"
                  onClick={() => {
                    if (linkOptionSelected.link) {
                      const url = linkOptionSelected.link;
                      const ytId = getYoutubeId(url);
                      const isDirectFile = url.toLowerCase().endsWith('.mp4') || 
                                           url.toLowerCase().endsWith('.webm') || 
                                           url.toLowerCase().endsWith('.pdf') || 
                                           url.toLowerCase().endsWith('.zip') || 
                                           url.toLowerCase().endsWith('.png') || 
                                           url.toLowerCase().endsWith('.jpg');

                      if (isDirectFile) {
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = linkOptionSelected.title || 'unduhan-karya';
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                      } else if (ytId) {
                        // Redirect to savefrom.net with the YouTube URL prefilled!
                        const downloaderUrl = `https://en.savefrom.net/?url=${encodeURIComponent(url)}`;
                        navigator.clipboard.writeText(url);
                        window.open(downloaderUrl, '_blank', 'noopener,noreferrer');
                      } else {
                        // Copy link and redirect to default download/resource tab
                        navigator.clipboard.writeText(url);
                        window.open(url, '_blank', 'noopener,noreferrer');
                      }
                    }
                    setLinkOptionSelected(null);
                  }}
                  className="w-full bg-blue-50 hover:bg-blue-100/80 text-blue-900 text-xs font-bold p-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-between text-left border border-blue-200/50 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-200/50 rounded-lg text-blue-700 group-hover:scale-105 transition-transform">
                      <Download className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-extrabold text-blue-950">Unduh Berkas / Download Media</div>
                      <div className="text-[9.5px] text-blue-800/85 font-normal">
                        {getYoutubeId(linkOptionSelected.link) 
                          ? 'Otomatis salin link & buka pengunduh YouTube (SaveFrom)'
                          : 'Buka tautan unduhan langsung / Salin link'
                        }
                      </div>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-blue-700" />
                </button>

                {/* 3. View Detail of Description */}
                <button
                  type="button"
                  onClick={() => {
                    const p = linkOptionSelected;
                    setLinkOptionSelected(null);
                    // Defer slightly to allow clean transition
                    setTimeout(() => {
                      setSelectedProject(p);
                    }, 150);
                  }}
                  className="w-full bg-amber-50 hover:bg-amber-100/80 text-amber-900 text-xs font-bold p-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-between text-left border border-amber-200/50 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-200/30 rounded-lg text-amber-700 group-hover:scale-105 transition-transform">
                      <Info className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-extrabold text-amber-950">Lihat Deskripsi Lengkap</div>
                      <div className="text-[9.5px] text-amber-800/85 font-normal">Ulas konsep desain mendalam, alat pendukung, dan metrik dampak</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-amber-700" />
                </button>
              </div>

              {/* Cancel Button */}
              <div className="mt-5 pt-3.5 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setLinkOptionSelected(null)}
                  className="w-full bg-gray-50 hover:bg-gray-100 text-gray-500 font-bold py-2.5 rounded-xl hover:text-gray-700 transition-all text-xs cursor-pointer text-center border border-gray-100"
                >
                  Batal / Kembali
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FORM MODAL: ADD NEW DESIGN WORK */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 text-left" id="add-karya-modal-backdrop" onClick={() => setIsAddModalOpen(false)}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[2rem] border border-gray-100 max-w-lg w-full p-6 shadow-2xl relative max-h-[92vh] overflow-y-auto"
              id="add-karya-form-card"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-[#E6F4EA] rounded-xl text-[#1A3730]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#1A3730]">Cantumkan Karya Desain</h3>
                    <p className="text-[10px] text-gray-400">Tambahkan nama karya, tahun, tautan eksternal, dan deskripsi.</p>
                  </div>
                </div>
                <button
                  id="close-add-modal-btn"
                  onClick={() => setIsAddModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddProject} className="space-y-4">
                {formError && (
                  <div className="bg-red-50 text-red-600 text-[11px] p-2.5 rounded-xl border border-red-100 font-medium flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 shrink-0" /> {formError}
                  </div>
                )}

                {/* Nama Karya */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1.5">Nama Karya <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Contoh: Desain Feed Instagram UMKM Srikandi"
                    className="w-full bg-gray-50 border border-gray-200 focus:border-[#1A3730] focus:ring-1 focus:ring-[#1A3730] rounded-xl px-3 py-2 text-xs text-gray-800 outline-hidden transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Tahun Pembuatan */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1.5">Tahun Pembuatan <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      value={newYear}
                      onChange={(e) => setNewYear(e.target.value)}
                      placeholder="e.g. 2026"
                      className="w-full bg-gray-50 border border-gray-200 focus:border-[#1A3730] focus:ring-1 focus:ring-[#1A3730] rounded-xl px-3 py-2 text-xs text-gray-800 outline-hidden transition-all"
                    />
                  </div>

                  {/* Kategori */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1.5">Kategori Desain</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 focus:border-[#1A3730] focus:ring-1 focus:ring-[#1A3730] rounded-xl px-3 py-2 text-xs text-gray-800 outline-hidden transition-all"
                    >
                      <option value="Poster & Grafis">Poster & Grafis</option>
                      <option value="Video & Animasi">Video & Animasi</option>
                    </select>
                  </div>
                </div>

                {/* Link Karya */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1.5 flex items-center justify-between">
                    <span>Link Hasil Karya (URL)</span>
                    <span className="text-[9px] text-gray-400 font-normal">Tautan Behance, Canva, Drive, YT, dll</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-2.5 text-gray-400">
                      <LinkIcon className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type="url"
                      value={newLink}
                      onChange={(e) => setNewLink(e.target.value)}
                      placeholder="https://behance.net/portfolio-kamu"
                      className="w-full bg-gray-50 border border-gray-200 focus:border-[#1A3730] focus:ring-1 focus:ring-[#1A3730] rounded-xl pl-9 pr-3 py-2 text-xs text-gray-800 outline-hidden transition-all"
                    />
                  </div>
                </div>

                {/* Tambahkan Foto Karya */}
                <div className="bg-neutral-50/70 p-4 rounded-2xl border border-dashed border-gray-200" id="image-upload-wrapper">
                  <label className="block text-[10px] uppercase tracking-wider font-extrabold text-[#1A3730]/70 mb-2 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-[#1A3730]" /> Sematkan Foto / Desain Gambar <span className="text-slate-400 font-normal ml-1">(Opsional)</span>
                  </label>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
                    {/* Choice 1: Local File Upload */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[9px] font-bold text-gray-400 uppercase">Opsi A: Unggah dari Perangkat</span>
                      <label className="w-full h-24 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 flex flex-col items-center justify-center cursor-pointer transition-colors p-2 text-center border-dashed">
                        <Upload className="w-5 h-5 text-gray-400 mb-1" />
                        <span className="text-[9.5px] font-bold text-[#1A3730]">Pilih File Foto</span>
                        <span className="text-[8px] text-gray-400 mt-0.5">Maks. 2.5MB (PNG, JPG)</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(file, 'new');
                          }}
                        />
                      </label>
                    </div>

                    {/* Choice 2: Direct Image URL LINK */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[9px] font-bold text-gray-400 uppercase">Opsi B: Masukkan Link Gambar</span>
                      <div className="relative">
                        <div className="absolute left-2.5 top-2.5 text-gray-400">
                          <LinkIcon className="w-3.5 h-3.5" />
                        </div>
                        <input
                          type="text"
                          value={newImage.startsWith('data:image/') ? '' : newImage}
                          onChange={(e) => {
                            setNewImage(e.target.value);
                            setFormError('');
                          }}
                          placeholder="https://images.unsplash.com/... atau link gambar"
                          className="w-full bg-white border border-gray-200 focus:border-[#1A3730] focus:ring-1 focus:ring-[#1A3730] rounded-xl pl-8 pr-2 py-2 text-[10px] text-gray-800 outline-hidden transition-all h-24 whitespace-normal align-top leading-normal"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Active Preview Area */}
                  {newImage && (
                    <div className="mt-3 bg-white p-2 rounded-xl border border-gray-150 flex items-center justify-between gap-3 animate-fade-in" id="image-upload-preview-panel">
                      <div className="flex items-center gap-2">
                        <img 
                          src={newImage} 
                          alt="Pratinjau" 
                          className="w-12 h-12 rounded-lg object-cover border border-gray-100"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex flex-col">
                          <span className="text-[9.5px] font-bold text-[#1A3730]">Gambar Siap Dicantumkan</span>
                          <span className="text-[8px] text-gray-400 truncate max-w-[200px]">
                            {newImage.startsWith('data:image/') ? 'Format file lokal (Base64)' : newImage}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setNewImage('')}
                        className="px-2.5 py-1 text-[9px] font-extrabold bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg border border-rose-200/40 cursor-pointer transition-all"
                      >
                        Hapus Foto
                      </button>
                    </div>
                  )}
                </div>

                {/* Alat/Tags */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1.5">Alat yang Digunakan (Pisahkan dengan koma)</label>
                  <input
                    type="text"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    placeholder="Figma, Canva, Photoshop, CapCut"
                    className="w-full bg-gray-50 border border-gray-200 focus:border-[#1A3730] focus:ring-1 focus:ring-[#1A3730] rounded-xl px-3 py-2 text-xs text-gray-800 outline-hidden transition-all"
                  />
                </div>

                {/* Deskripsi */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1.5">Deskripsi Singkat Karya</label>
                  <textarea
                    rows={3}
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Ulas secara ringkas konsep, keunikan, atau tujuan dari karya desain Anda..."
                    className="w-full bg-gray-50 border border-gray-200 focus:border-[#1A3730] focus:ring-1 focus:ring-[#1A3730] rounded-xl px-3 py-2 text-xs text-gray-800 outline-hidden transition-all resize-none"
                  />
                </div>

                <div className="pt-3 border-t border-gray-100 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-600 text-xs font-semibold py-2.5 rounded-xl transition-all cursor-pointer text-center border border-gray-200"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#1A3730] hover:bg-[#254F45] text-white text-xs font-semibold py-2.5 rounded-xl transition-all cursor-pointer text-center"
                  >
                    Simpan Karya
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FORM MODAL: EDIT EXISTENT DESIGN WORK */}
      <AnimatePresence>
        {editingProject && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 text-left" id="edit-karya-modal-backdrop" onClick={() => setEditingProject(null)}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[2rem] border border-gray-100 max-w-lg w-full p-6 shadow-2xl relative max-h-[92vh] overflow-y-auto"
              id="edit-karya-form-card"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-[#E6F4EA] rounded-xl text-[#1A3730]">
                    <Pencil className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#1A3730]">Ubah Karya Desain</h3>
                    <p className="text-[10px] text-gray-400">Sunting informasi karya, tahun pembuatan, tautan eksternal, atau deskripsi karya.</p>
                  </div>
                </div>
                <button
                  id="close-edit-modal-btn"
                  onClick={() => setEditingProject(null)}
                  className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleEditProject} className="space-y-4">
                {editFormError && (
                  <div className="bg-red-50 text-red-600 text-[11px] p-2.5 rounded-xl border border-red-100 font-medium flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 shrink-0" /> {editFormError}
                  </div>
                )}

                {/* Nama Karya */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1.5">Nama Karya <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Contoh: Desain Feed Instagram UMKM Srikandi"
                    className="w-full bg-gray-50 border border-gray-200 focus:border-[#1A3730] focus:ring-1 focus:ring-[#1A3730] rounded-xl px-3 py-2 text-xs text-gray-800 outline-hidden transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Tahun Pembuatan */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1.5">Tahun Pembuatan <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      value={editYear}
                      onChange={(e) => setEditYear(e.target.value)}
                      placeholder="e.g. 2026"
                      className="w-full bg-gray-50 border border-gray-200 focus:border-[#1A3730] focus:ring-1 focus:ring-[#1A3730] rounded-xl px-3 py-2 text-xs text-gray-800 outline-hidden transition-all"
                    />
                  </div>

                  {/* Kategori */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1.5">Kategori Desain</label>
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 focus:border-[#1A3730] focus:ring-1 focus:ring-[#1A3730] rounded-xl px-3 py-2 text-xs text-gray-800 outline-hidden transition-all"
                    >
                      <option value="Poster & Grafis">Poster & Grafis</option>
                      <option value="Video & Animasi">Video & Animasi</option>
                    </select>
                  </div>
                </div>

                {/* Link Karya */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1.5 flex items-center justify-between">
                    <span>Link Hasil Karya (URL)</span>
                    <span className="text-[9px] text-gray-400 font-normal">Tautan Behance, Canva, Drive, YT, dll</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-2.5 text-gray-400">
                      <LinkIcon className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type="url"
                      value={editLink}
                      onChange={(e) => setEditLink(e.target.value)}
                      placeholder="https://behance.net/portfolio-kamu"
                      className="w-full bg-gray-50 border border-gray-200 focus:border-[#1A3730] focus:ring-1 focus:ring-[#1A3730] rounded-xl pl-9 pr-3 py-2 text-xs text-gray-800 outline-hidden transition-all"
                    />
                  </div>
                </div>

                {/* Tambahkan Foto Karya */}
                <div className="bg-neutral-50/70 p-4 rounded-2xl border border-dashed border-gray-200" id="edit-image-upload-wrapper">
                  <label className="block text-[10px] uppercase tracking-wider font-extrabold text-[#1A3730]/70 mb-2 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-[#1A3730]" /> Sematkan Foto / Desain Gambar <span className="text-slate-400 font-normal ml-1">(Opsional)</span>
                  </label>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
                    {/* Choice 1: Local File Upload */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[9px] font-bold text-gray-400 uppercase">Opsi A: Unggah dari Perangkat</span>
                      <label className="w-full h-24 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 flex flex-col items-center justify-center cursor-pointer transition-colors p-2 text-center border-dashed">
                        <Upload className="w-5 h-5 text-gray-400 mb-1" />
                        <span className="text-[9.5px] font-bold text-[#1A3730]">Pilih File Foto</span>
                        <span className="text-[8px] text-gray-400 mt-0.5">Maks. 2.5MB (PNG, JPG)</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(file, 'edit');
                          }}
                        />
                      </label>
                    </div>

                    {/* Choice 2: Direct Image URL LINK */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[9px] font-bold text-gray-400 uppercase">Opsi B: Masukkan Link Gambar</span>
                      <div className="relative">
                        <div className="absolute left-2.5 top-2.5 text-gray-400">
                          <LinkIcon className="w-3.5 h-3.5" />
                        </div>
                        <input
                          type="text"
                          value={editImage.startsWith('data:image/') ? '' : editImage}
                          onChange={(e) => {
                            setEditImage(e.target.value);
                            setEditFormError('');
                          }}
                          placeholder="https://images.unsplash.com/... atau link gambar"
                          className="w-full bg-white border border-gray-200 focus:border-[#1A3730] focus:ring-1 focus:ring-[#1A3730] rounded-xl pl-8 pr-2 py-2 text-[10px] text-gray-800 outline-hidden transition-all h-24 whitespace-normal align-top leading-normal"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Active Preview Area */}
                  {editImage && (
                    <div className="mt-3 bg-white p-2 rounded-xl border border-gray-150 flex items-center justify-between gap-3 animate-fade-in" id="edit-image-upload-preview-panel">
                      <div className="flex items-center gap-2">
                        <img 
                          src={editImage} 
                          alt="Pratinjau" 
                          className="w-12 h-12 rounded-lg object-cover border border-gray-100"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex flex-col">
                          <span className="text-[9.5px] font-bold text-[#1A3730]">Gambar Siap Dicantumkan</span>
                          <span className="text-[8px] text-gray-400 truncate max-w-[200px]">
                            {editImage.startsWith('data:image/') ? 'Format file lokal (Base64)' : editImage}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEditImage('')}
                        className="px-2.5 py-1 text-[9px] font-extrabold bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg border border-rose-200/40 cursor-pointer transition-all"
                      >
                        Hapus Foto
                      </button>
                    </div>
                  )}
                </div>

                {/* Alat/Tags */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1.5">Alat yang Digunakan (Pisahkan dengan koma)</label>
                  <input
                    type="text"
                    value={editTags}
                    onChange={(e) => setEditTags(e.target.value)}
                    placeholder="Figma, Canva, Photoshop, CapCut"
                    className="w-full bg-gray-50 border border-gray-200 focus:border-[#1A3730] focus:ring-1 focus:ring-[#1A3730] rounded-xl px-3 py-2 text-xs text-gray-800 outline-hidden transition-all"
                  />
                </div>

                {/* Deskripsi */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1.5">Deskripsi Singkat Karya</label>
                  <textarea
                    rows={3}
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Ulas secara ringkas konsep, keunikan, atau tujuan dari karya desain Anda..."
                    className="w-full bg-gray-50 border border-gray-200 focus:border-[#1A3730] focus:ring-1 focus:ring-[#1A3730] rounded-xl px-3 py-2 text-xs text-gray-800 outline-hidden transition-all resize-none"
                  />
                </div>

                <div className="pt-3 border-t border-gray-100 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingProject(null)}
                    className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-600 text-xs font-semibold py-2.5 rounded-xl transition-all cursor-pointer text-center border border-gray-200"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#1A3730] hover:bg-[#254F45] text-white text-xs font-semibold py-2.5 rounded-xl transition-all cursor-pointer text-center"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DIALOG KONFIRMASI HAPUS KARYA (Bypass Iframe Sandbox Alert block) */}
      <AnimatePresence>
        {projectToDelete && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in text-left" 
            id="delete-confirm-modal-backdrop"
            onClick={() => setProjectToDelete(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[2.5rem] border border-gray-150 max-w-sm w-full p-6 text-center shadow-2xl relative"
              id="delete-confirm-modal-container"
            >
              {/* Warning Trash Icon Indicator */}
              <div className="mx-auto w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mb-4 border border-rose-100">
                <Trash2 className="w-5 h-5 animate-pulse" />
              </div>

              {/* Title */}
              <h3 className="text-sm font-extrabold text-gray-900 mb-1.5">Hapus Karya Desain?</h3>
              
              {/* Project Card summary */}
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-150 mb-4 text-left">
                <span className="text-[8px] uppercase tracking-wider font-extrabold text-[#2E5E52]/60 block mb-0.5">Nama Karya Yang Ditarget</span>
                <p className="text-xs font-extrabold text-[#1A3730] line-clamp-1">{projectToDelete.title}</p>
                <div className="flex items-center gap-1.5 mt-1 text-[9px] text-gray-400 font-mono">
                  <span className="bg-gray-200/50 px-1.5 py-0.5 rounded-sm font-bold text-gray-500">{projectToDelete.category}</span>
                  <span>🗓️ {projectToDelete.year}</span>
                </div>
              </div>

              <p className="text-[11px] text-gray-500 leading-relaxed mb-6 text-center">
                Apakah Anda benar-benar yakin ingin menghapus karya ini? Tindakan ini akan menghapusnya secara permanen dari showcase Anda.
              </p>

              {/* Buttons Container */}
              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={() => setProjectToDelete(null)}
                  className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-gray-700 text-xs font-bold py-2.5 rounded-xl transition-all cursor-pointer border border-gray-150"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (projectToDelete) {
                      const updated = projects.filter(p => p.id !== projectToDelete.id);
                      saveProjectsToStorage(updated);
                      if (selectedProject?.id === projectToDelete.id) {
                        setSelectedProject(null);
                      }
                      setProjectToDelete(null);
                    }
                  }}
                  className="flex-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold py-2.5 rounded-xl shadow-md cursor-pointer transition-all active:scale-95 border border-transparent"
                >
                  Ya, Hapus Karya
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* LIGHTBOX / DETAIL MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 text-left" id="project-lightbox-backdrop" onClick={() => setSelectedProject(null)}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[2.5rem] border border-gray-100 max-w-4xl w-full p-6 md:p-8 shadow-2xl relative flex flex-col max-h-[92vh]"
              id="project-detail-modal"
            >
              {/* Top Header Row of Modal */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4 shrink-0" id="modal-top-bar">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-[#1A3730] text-white text-[9px] uppercase tracking-wider font-mono font-bold px-2 py-0.5 rounded-md inline-block">
                      {selectedProject.category}
                    </span>
                    <span className="bg-gray-100 text-[#1A3730] text-[9px] font-mono font-bold px-2 py-0.5 rounded-md inline-block">
                      🗓️ Dibuat: {selectedProject.year}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-[#1A3730] leading-snug" id="modal-project-title">{selectedProject.title}</h3>
                </div>
                <button
                  id="modal-close-btn"
                  onClick={() => setSelectedProject(null)}
                  className="w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-950 font-bold text-sm cursor-pointer transition-all border border-gray-200/50"
                >
                  ✕
                </button>
              </div>

              {/* Two Column Grid Body inside Scrollable or Fixed height */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 overflow-y-auto pr-1 flex-1 min-h-0" id="modal-grid-body">
                
                {/* LEFT COLUMN: Deep Dynamic Cinematic Player Deck (col-span-12 on Mobile, col-span-7 on Desktop) */}
                <div className="col-span-12 md:col-span-7 flex flex-col gap-4" id="modal-player-column">
                  
                  {/* Embedded / Interactive Media Section */}
                  {selectedProject.category === 'Poster & Grafis' ? (
                    <div className="flex flex-col gap-3" id="poster-image-cinematic-deck">
                      {/* SCREEN EMBED DECK FOR STATIC IMAGE */}
                      <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg bg-neutral-950 border border-gray-150 relative animate-fade-in flex items-center justify-center animate-fade-in" id="active-screen-frame">
                        {getProjectImageUrl(selectedProject.imageSeed) ? (
                          <img
                            src={getProjectImageUrl(selectedProject.imageSeed) || ''}
                            alt={selectedProject.title}
                            className="w-full h-full object-contain"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="text-center p-6 text-gray-500">
                            <ImageIcon className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                            <p className="text-xs font-bold">klik tombol hijau dibawah untuk membuka foto</p>
                          </div>
                        )}
                      </div>

                      {/* GOOGLE DRIVE LINK BUTTON */}
                      {selectedProject.link && (
                        <a
                          href={selectedProject.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#1A3730] hover:bg-[#254F45] text-white text-xs font-extrabold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-98 transition-all"
                          id="direct-drive-open-btn"
                        >
                          <ExternalLink className="w-4 h-4" /> Buka Karya di Google Drive
                        </a>
                      )}
                    </div>
                  ) : selectedProject.link ? (
                    (() => {
                      const ytId = getYoutubeId(selectedProject.link);
                      const isVideoFile = selectedProject.link.toLowerCase().endsWith('.mp4') || 
                                          selectedProject.link.toLowerCase().endsWith('.webm') || 
                                          selectedProject.link.toLowerCase().endsWith('.ogg');
                      
                      // Using a highly-compatible, open-source Google-hosted sample project video that never blocks due to referrers
                      const stockSampleVideoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

                      return (
                        <div className="flex flex-col gap-3" id="dynamic-cinematic-deck">

                          {/* SCREEN EMBED DECK */}
                          <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg bg-black border border-gray-200 relative animate-fade-in" id="active-screen-frame">
                            {/* ACTIVE VIDEO CONTAINER */}
                            {ytId ? (
                              getProjectImageUrl(selectedProject.imageSeed) ? (
                                <div 
                                  className="w-full h-full relative bg-neutral-50 flex items-center justify-center animate-fade-in group cursor-pointer" 
                                  id="embed-youtube-image-fallback" 
                                  onClick={() => window.open(selectedProject.link, '_blank', 'noopener,noreferrer')}
                                  title="Klik untuk memutar langsung di YouTube"
                                >
                                  <img
                                    src={getProjectImageUrl(selectedProject.imageSeed) || ''}
                                    alt={selectedProject.title}
                                    className="w-full h-full object-contain"
                                    referrerPolicy="no-referrer"
                                  />
                                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/45 transition-colors flex flex-col items-center justify-center gap-2">
                                    <div className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                                      <Play className="w-5 h-5 fill-current ml-0.5" />
                                    </div>
                                    <p className="text-white text-[10px] md:text-xs font-bold bg-black/60 px-3 py-1 rounded-full select-none shadow-sm backdrop-blur-[2px]">
                                      klik tombol merah dibawah untuk membuka video
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                <div 
                                  className="w-full h-full bg-neutral-900 flex flex-col items-center justify-center p-6 text-center text-white cursor-pointer" 
                                  id="embed-youtube-text-fallback" 
                                  onClick={() => window.open(selectedProject.link, '_blank', 'noopener,noreferrer')}
                                >
                                  <div className="w-14 h-14 rounded-full bg-rose-600/20 text-rose-500 flex items-center justify-center mb-4 border border-rose-500/30">
                                    <Video className="w-7 h-7" />
                                  </div>
                                  <p className="text-xs font-bold uppercase tracking-wider text-rose-500">Karya Video YouTube</p>
                                  <p className="text-[10px] text-neutral-400 mt-1.5 max-w-sm">klik tombol merah dibawah untuk membuka video</p>
                                </div>
                              )
                            ) : getProjectImageUrl(selectedProject.imageSeed) ? (
                              <div 
                                className="w-full h-full relative bg-neutral-50 flex items-center justify-center animate-fade-in group cursor-pointer" 
                                id="embed-custom-image-deck"
                                onClick={() => window.open(selectedProject.link, '_blank', 'noopener,noreferrer')}
                              >
                                <img
                                  src={getProjectImageUrl(selectedProject.imageSeed) || ''}
                                  alt={selectedProject.title}
                                  className="w-full h-full object-contain"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/45 transition-colors flex flex-col items-center justify-center gap-2">
                                  <div className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                                    <Play className="w-5 h-5 fill-current ml-0.5" />
                                  </div>
                                  <p className="text-white text-[10px] md:text-xs font-bold bg-black/60 px-3 py-1 rounded-full select-none shadow-sm backdrop-blur-[2px]">
                                    klik tombol merah dibawah untuk membuka video
                                  </p>
                                </div>
                              </div>
                            ) : (
                              /* NATIVE HTML5 RELIABLE STOCK PLAYER */
                              <div className="w-full h-full relative" id="embed-sample-mode">
                                <video
                                  className="w-full h-full object-cover"
                                  controls
                                  autoPlay
                                  loop
                                  muted
                                  preload="auto"
                                  referrerPolicy="no-referrer"
                                  src={isVideoFile ? selectedProject.link : stockSampleVideoUrl}
                                />
                                <div className="absolute top-2 left-2 z-10 bg-[#1A3730]/90 backdrop-blur-md text-white text-[8px] font-mono px-2 py-0.5 rounded-md font-bold uppercase tracking-wider border border-white/10 animate-pulse">
                                  {isVideoFile ? 'Berkas Video Langsung' : 'Sampel Video Portofolio'}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* DIRECT YOUTUBE LINK BUTTON AS ANCHOR FALLBACK */}
                          <a
                            href={selectedProject.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-rose-600/10 cursor-pointer active:scale-98 transition-all"
                            id="direct-youtube-watch-btn"
                          >
                            <ExternalLink className="w-4 h-4" /> Buka & Tonton Karya di YouTube Resmi
                          </a>

                        </div>
                      );
                    })()
                  ) : (
                    /* Display custom image or fallback illustrative placeholder image if no video link was set */
                    getProjectImageUrl(selectedProject.imageSeed) ? (
                      <div className="w-full aspect-video rounded-2xl overflow-hidden bg-neutral-50 border border-gray-200 relative shadow-md flex items-center justify-center" id="custom-image-display">
                        <img 
                          src={getProjectImageUrl(selectedProject.imageSeed) || ''} 
                          alt={selectedProject.title} 
                          className="w-full h-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ) : (
                      <div className="w-full aspect-video rounded-2xl overflow-hidden bg-gray-50 border border-gray-200 flex flex-col items-center justify-center p-6 text-center" id="no-media-placeholder">
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2.5 text-gray-400">
                          <Video className="w-6 h-6" />
                        </div>
                        <p className="text-xs font-bold text-gray-650">Media Karya Tersedia Khusus Tautan Resmi</p>
                        <p className="text-[10px] text-gray-450 mt-1 max-w-xs">Tautan utama karya desain dapat diakses langsung menggunakan tombol detail di bagian bawah.</p>
                      </div>
                    )
                  )}

                  {/* Quick Highlight Stats / Metrics of the Project removed as per user request */}
                </div>

                {/* RIGHT COLUMN: Dedicated Details and scrollable read deck (col-span-12 on Mobile, col-span-5 on Desktop) */}
                <div className="col-span-12 md:col-span-5 flex flex-col gap-4 md:border-l md:border-gray-150 md:pl-6 max-h-[75vh] md:overflow-y-auto" id="modal-details-column">
                  
                  {/* Detailed Description Panel (Sambil Membaca Deskripsi) */}
                  <div>
                    <h4 className="text-[9px] uppercase tracking-widest font-black text-gray-400 mb-1 flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-[#1A3730]" /> Mengenai Karya Ini
                    </h4>
                    <p className="text-[11.5px] text-gray-600 leading-relaxed font-normal bg-gray-50/80 p-3.5 rounded-xl border border-gray-150" id="modal-project-desc-text">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Process description */}
                  {selectedProject.fullDetails && (
                    <div id="modal-process-panel">
                      <h4 className="text-[9px] uppercase tracking-widest font-black text-gray-400 mb-1">Metodologi & Proses Kreatif</h4>
                      <div className="text-[11px] text-gray-500 leading-relaxed bg-gray-50/40 p-3 rounded-lg border border-gray-100">
                        {selectedProject.fullDetails}
                      </div>
                    </div>
                  )}

                  {/* Impact section */}
                  {selectedProject.impact && selectedProject.impact.length > 0 && (
                    <div className="bg-emerald-50/20 p-3.5 rounded-xl border border-emerald-600/10" id="modal-impact-card">
                      <h4 className="text-[9px] uppercase tracking-widest font-black text-emerald-800 flex items-center gap-1.5 mb-2">
                        💡 Nilai Tambah & Kontribusi
                      </h4>
                      <div className="space-y-1.5" id="modal-impact-list">
                        {selectedProject.impact.map((imp, idx) => (
                          <div key={idx} className="flex gap-2 items-start" id={`modal-impact-row-${idx}`}>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <p className="text-[11px] text-gray-600 leading-snug">{imp}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}



                  {/* Action Link to main legal files */}
                  {selectedProject.link && (
                    <div className="bg-[#E6F4EA]/30 p-3.5 rounded-xl border border-[#2A5248]/10 text-left mt-auto">
                      <h4 className="text-xs font-black text-[#1A3730] mb-0.5 flex items-center gap-1.5">
                        <LinkIcon className="w-3.5 h-3.5" /> Tautan Media Eksternal
                      </h4>
                      <p className="text-[9.5px] text-gray-500 mb-2">Akses berkas mentah penuh, resolusi penuh atau halaman platform pendukung.</p>
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        referrerPolicy="no-referrer"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-[#1A3730] hover:bg-[#254F45] text-white text-[10.5px] font-extrabold px-3.5 py-2 rounded-lg transition-all cursor-pointer"
                      >
                        Buka Tautan Asli <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}

                </div>
              </div>

               {/* Bottom bar controls */}
              <div className="mt-4 pt-4 border-t border-gray-150 flex gap-2 shrink-0 flex-wrap sm:flex-nowrap" id="modal-actions-bar">
                {isEditAllowed && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProject(selectedProject);
                        setEditTitle(selectedProject.title);
                        setEditYear(selectedProject.year);
                        setEditLink(selectedProject.link || '');
                        setEditCategory(selectedProject.category);
                        setEditTags(selectedProject.tags.join(', '));
                        setEditDescription(selectedProject.description);
                        setEditImage(selectedProject.imageSeed || '');
                        setEditFormError('');
                        setSelectedProject(null);
                      }}
                      className="px-4 py-3 bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-bold rounded-xl border border-amber-200/50 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 whitespace-nowrap grow sm:grow-0 justify-center"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      Ubah Karya
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        handleDeleteProject(selectedProject, e);
                        setSelectedProject(null);
                      }}
                      className="px-4 py-3 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold rounded-xl border border-rose-200/50 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 whitespace-nowrap grow sm:grow-0 justify-center"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Hapus
                    </button>
                  </>
                )}
                <button
                  id="modal-cta-quote-btn"
                  onClick={() => setSelectedProject(null)}
                  className="w-full bg-gray-50 hover:bg-gray-100 text-gray-600 text-xs font-extrabold py-3 rounded-xl transition-all cursor-pointer text-center border border-gray-150"
                >
                  Tutup Rincian Karya
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
