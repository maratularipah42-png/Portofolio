import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, GraduationCap, Award, BookOpen, Clock, FileText, ChevronDown, ListFilter, AlertCircle } from 'lucide-react';

interface Course {
  no: number;
  kode: string;
  nama: string;
  nilai: string;
  am: number;
  sks: number;
  bobot: number;
}

interface TranscriptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const COURSES: Course[] = [
  { no: 1, kode: "EAK101", nama: "Dasar-Dasar Akuntansi", nilai: "A", am: 4.00, sks: 3, bobot: 12 },
  { no: 2, kode: "EIE100", nama: "Teori Ekonomi Mikro", nilai: "A", am: 4.00, sks: 3, bobot: 12 },
  { no: 3, kode: "EMA102", nama: "Pengantar Manajemen", nilai: "A", am: 4.00, sks: 3, bobot: 12 },
  { no: 4, kode: "FEB201", nama: "Matematika Ekonomi", nilai: "AB", am: 3.50, sks: 3, bobot: 10.5 },
  { no: 5, kode: "UBB101", nama: "Pendidikan Agama", nilai: "A", am: 4.00, sks: 2, bobot: 8 },
  { no: 6, kode: "UBB102", nama: "Pendidikan Pancasila", nilai: "A", am: 4.00, sks: 2, bobot: 8 },
  { no: 7, kode: "UBB104", nama: "Bahasa Inggris", nilai: "A", am: 4.00, sks: 2, bobot: 8 },
  { no: 8, kode: "EAK209", nama: "Akuntansi Manajemen", nilai: "AB", am: 3.50, sks: 3, bobot: 10.5 },
  { no: 9, kode: "EIE111", nama: "Teori Ekonomi Makro", nilai: "A", am: 4.00, sks: 3, bobot: 12 },
  { no: 10, kode: "EIU210", nama: "Business English", nilai: "A", am: 4.00, sks: 2, bobot: 8 },
  { no: 11, kode: "EMA101", nama: "Pengantar Bisnis", nilai: "AB", am: 3.50, sks: 3, bobot: 10.5 },
  { no: 12, kode: "FEB202", nama: "Statistika", nilai: "A", am: 4.00, sks: 3, bobot: 12 },
  { no: 13, kode: "UBB103", nama: "Pendidikan Kewarganegaraan", nilai: "A", am: 4.00, sks: 2, bobot: 8 },
  { no: 14, kode: "UBB105", nama: "Bahasa Indonesia", nilai: "A", am: 4.00, sks: 2, bobot: 8 },
  { no: 15, kode: "UBB108", nama: "UBB dan Keunggulan Peradaban", nilai: "A", am: 4.00, sks: 2, bobot: 8 },
  { no: 16, kode: "EAK204", nama: "Aplikasi Komputer Bisnis", nilai: "A", am: 4.00, sks: 2, bobot: 8 },
  { no: 17, kode: "EIE705", nama: "Ekonomi Syariah", nilai: "AB", am: 3.50, sks: 3, bobot: 10.5 },
  { no: 18, kode: "EMA103", nama: "Manajemen SDM", nilai: "AB", am: 3.50, sks: 3, bobot: 10.5 },
  { no: 19, kode: "EMA104", nama: "Manajemen Keuangan", nilai: "B", am: 3.00, sks: 3, bobot: 9 },
  { no: 20, kode: "EMA106", nama: "Manajemen Pemasaran", nilai: "A", am: 4.00, sks: 3, bobot: 12 },
  { no: 21, kode: "EMA401", nama: "Manajemen Operasional", nilai: "B", am: 3.00, sks: 3, bobot: 9 },
  { no: 22, kode: "FEB203", nama: "Perekonomian Indonesia", nilai: "AB", am: 3.50, sks: 3, bobot: 10.5 },
  { no: 23, kode: "EIE704", nama: "Ekonomi Manajerial", nilai: "B", am: 3.00, sks: 3, bobot: 9 },
  { no: 24, kode: "EMA118", nama: "Komunikasi Bisnis", nilai: "A", am: 4.00, sks: 3, bobot: 12 },
  { no: 25, kode: "EMA119", nama: "Manajemen Strategik", nilai: "AB", am: 3.50, sks: 3, bobot: 10.5 },
  { no: 26, kode: "EMA130", nama: "Kepemimpinan", nilai: "B", am: 3.00, sks: 3, bobot: 9 },
  { no: 27, kode: "EMA213", nama: "Operation Research", nilai: "A", am: 4.00, sks: 3, bobot: 12 },
  { no: 28, kode: "EMA231", nama: "Praktikum Statistik", nilai: "C", am: 2.00, sks: 2, bobot: 4 },
  { no: 29, kode: "EMA402", nama: "Bisnis Digital", nilai: "A", am: 4.00, sks: 3, bobot: 12 },
  { no: 30, kode: "FEB204", nama: "Kebanksentralan", nilai: "A", am: 4.00, sks: 3, bobot: 12 },
  { no: 31, kode: "EMA111", nama: "Metode Penelitian Bisnis", nilai: "A", am: 4.00, sks: 3, bobot: 12 },
  { no: 32, kode: "EMA210", nama: "Ekonomi Moneter", nilai: "AB", am: 3.50, sks: 3, bobot: 10.5 },
  { no: 33, kode: "EMA219", nama: "Studi Kelayakan Bisnis", nilai: "A", am: 4.00, sks: 3, bobot: 12 },
  { no: 34, kode: "EMA336", nama: "Manajemen Kualitas", nilai: "A", am: 4.00, sks: 3, bobot: 12 },
  { no: 35, kode: "EMA337", nama: "Manajemen Teknologi dan Inovasi", nilai: "A", am: 4.00, sks: 3, bobot: 12 },
  { no: 36, kode: "EMA339", nama: "Manajemen Proyek", nilai: "A", am: 4.00, sks: 3, bobot: 12 },
  { no: 37, kode: "EMA403", nama: "Manajemen Pariwisata", nilai: "B", am: 3.00, sks: 3, bobot: 9 },
  { no: 38, kode: "EMA112", nama: "Bisnis Internasional", nilai: "A", am: 4.00, sks: 3, bobot: 12 },
  { no: 39, kode: "EMA116", nama: "Sistem Informasi Manajemen", nilai: "A", am: 4.00, sks: 3, bobot: 12 },
  { no: 40, kode: "EMA334", nama: "Manajemen Rantai Pasok", nilai: "A", am: 4.00, sks: 3, bobot: 12 },
  { no: 41, kode: "EMA335", nama: "Big Data dan Data Mining", nilai: "AB", am: 3.50, sks: 3, bobot: 10.5 },
  { no: 42, kode: "EMA338", nama: "Strategi Operasi", nilai: "A", am: 4.00, sks: 3, bobot: 12 },
  { no: 43, kode: "EMA417", nama: "Manajemen Biaya", nilai: "AB", am: 3.50, sks: 3, bobot: 10.5 },
  { no: 44, kode: "EMA212", nama: "Perilaku Organisasi", nilai: "A", am: 4.00, sks: 3, bobot: 12 },
  { no: 45, kode: "EMA343", nama: "Praktik Komunikasi Bisnis", nilai: "A", am: 4.00, sks: 3, bobot: 12 },
  { no: 46, kode: "UBB301", nama: "Komunikasi Dan Kerjasama Tim", nilai: "A", am: 4.00, sks: 2, bobot: 8 },
  { no: 47, kode: "UBB303", nama: "Empati Dan Kecerdasan Emosional", nilai: "A", am: 4.00, sks: 2, bobot: 8 },
  { no: 48, kode: "UBB305", nama: "Pemecahan Masalah Kompleks", nilai: "A", am: 4.00, sks: 3, bobot: 12 },
  { no: 49, kode: "UBB306", nama: "Berpikir Analitis Dan Kritis", nilai: "A", am: 4.00, sks: 3, bobot: 12 },
  { no: 50, kode: "UBB308", nama: "Literasi Baru", nilai: "A", am: 4.00, sks: 2, bobot: 8 },
  { no: 51, kode: "UBB309", nama: "Etika Dan Pengembangan Profesional", nilai: "A", am: 4.00, sks: 2, bobot: 8 },
  { no: 52, kode: "UBB409", nama: "Tugas Akhir", nilai: "A", am: 4.00, sks: 6, bobot: 24 }
];

export default function TranscriptModal({ isOpen, onClose }: TranscriptModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<string>('ALL');

  const filteredCourses = useMemo(() => {
    return COURSES.filter(course => {
      const matchSearch = 
        course.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.kode.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchGrade = selectedGradeFilter === 'ALL' || course.nilai === selectedGradeFilter;
      
      return matchSearch && matchGrade;
    });
  }, [searchQuery, selectedGradeFilter]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3 }}
          className="relative bg-white w-full max-w-5xl rounded-[1.8rem] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-gray-100"
          id="transcript-modal-body"
        >
          {/* HEADER BAR */}
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-[#1A3730] to-[#254A41] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/10 rounded-xl" id="trans-icon-bg">
                <GraduationCap className="w-6 h-6 text-emerald-300" />
              </div>
              <div>
                <h2 className="text-lg font-bold font-display tracking-tight" id="modal-heading-text">Transkrip Nilai Akademik</h2>
                <p className="text-xs text-emerald-100/80 font-mono" id="modal-subheading-text">Sistem Informasi Akademik Resmi • Annisa Nurus Saidah</p>
              </div>
            </div>
            <button
              onClick={onClose}
              id="close-transcript-modal-btn"
              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white/80 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>          {/* BIO METADATA PANEL */}
          <div className="py-3 px-6 bg-gray-50/50 border-b border-gray-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="bg-white py-1.5 px-3.5 rounded-xl border border-gray-100/80 shadow-xs flex flex-col justify-center">
              <p className="text-gray-400 font-mono font-medium uppercase text-[8px] tracking-wider">Nama / NIM</p>
              <div className="flex justify-between items-center mt-0.5">
                <span className="font-bold text-[#1A3730] text-[12px] truncate">Annisa Nurus Saidah</span>
                <span className="text-[9px] bg-gray-100 text-gray-600 font-mono px-1.5 py-0.5 rounded shrink-0">3022211003</span>
              </div>
            </div>
            
            <div className="bg-white py-1.5 px-3.5 rounded-xl border border-gray-100/80 shadow-xs flex flex-col justify-center">
              <p className="text-gray-400 font-mono font-medium uppercase text-[8px] tracking-wider">Program Studi & Angkatan</p>
              <div className="flex justify-between items-center mt-0.5">
                <span className="font-bold text-[#1A3730] text-[12px]">Manajemen (S1)</span>
                <span className="text-[9px] bg-gray-100 text-gray-600 font-mono px-1.5 py-0.5 rounded shrink-0">2022</span>
              </div>
            </div>

            <div className="bg-white py-1.5 px-3.5 rounded-xl border border-gray-100/80 shadow-xs flex flex-col justify-center">
              <p className="text-gray-400 font-mono font-medium uppercase text-[8px] tracking-wider">Tempat / Tanggal Lahir</p>
              <div className="flex justify-between items-center mt-0.5">
                <span className="font-bold text-[#1A3730] text-[12px] truncate">TANAH BAWAH</span>
                <span className="text-gray-500 font-mono text-[9px] shrink-0">09-06-2004</span>
              </div>
            </div>

            {/* GPA QUICK SUMMARY CARD */}
            <div className="bg-emerald-50/50 border border-emerald-100 py-1.5 px-3.5 rounded-xl shadow-xs flex items-center justify-between">
              <div>
                <p className="text-emerald-700 font-mono font-medium uppercase text-[8px] tracking-wider block">Indeks Prestasi Kumulatif</p>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-base font-black text-[#1A3730]">3.77</span>
                  <span className="text-[9px] text-gray-500">/ 4.00</span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-[9px] text-emerald-800 font-semibold bg-emerald-100/60 px-2 py-1 rounded-md shrink-0">
                <Award className="w-3.5 h-3.5 text-emerald-700 shrink-0" /> Cum Laude
              </span>
            </div>
          </div>

          {/* SEARCH & FILTER CONTROLS */}
          <div className="p-3 px-6 border-b border-gray-100 bg-white flex flex-col sm:flex-row gap-2.5 items-center justify-between text-xs">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-2 w-3.5 h-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari nama atau kode mata kuliah..."
                value={searchQuery}
                id="search-course-input"
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1A3730] text-xs text-gray-700 placeholder-gray-400 transition-colors"
              />
            </div>

            <div className="flex gap-1.5 w-full sm:w-auto items-center overflow-x-auto self-start sm:self-center pb-1 sm:pb-0">
              <span className="text-gray-400 flex items-center gap-1 font-mono text-[9px] font-semibold tracking-wider shrink-0 mr-1 uppercase">
                <ListFilter className="w-3 h-3" /> Filter HM:
              </span>
              {['ALL', 'A', 'AB', 'B', 'C'].map((grade) => (
                <button
                  key={grade}
                  onClick={() => setSelectedGradeFilter(grade)}
                  className={`px-2.5 py-1 rounded-lg border font-medium transition-all shrink-0 text-[11px] ${
                    selectedGradeFilter === grade
                      ? 'bg-[#1A3730] border-[#1A3730] text-white shadow-xs'
                      : 'bg-white border-gray-100 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {grade === 'ALL' ? 'Semua' : grade}
                </button>
              ))}
            </div>
          </div>

          {/* TABLE CONTAINER */}
          <div className="flex-1 overflow-y-auto px-6 py-3 bg-white">
            <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm" id="table-wrap">
              <table className="w-full text-left text-xs border-collapse font-sans">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 font-mono uppercase text-[9px] tracking-wider select-none">
                    <th className="py-2 px-4 text-center w-12">No</th>
                    <th className="py-2 px-3 w-24">Kode</th>
                    <th className="py-2 px-4">Mata Kuliah</th>
                    <th className="py-2 px-4 text-center w-20">Nilai (HM)</th>
                    <th className="py-2 px-4 text-center w-20">Angka (AM)</th>
                    <th className="py-2 px-4 text-center w-16">SKS</th>
                    <th className="py-2 px-4 text-center w-20">Bobot (M)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-gray-700">
                  {filteredCourses.length > 0 ? (
                    filteredCourses.map((course, idx) => {
                      const isEven = idx % 2 === 0;
                      return (
                        <tr 
                          key={course.kode} 
                          className={`${isEven ? 'bg-white' : 'bg-gray-50/20'} hover:bg-emerald-50/10 transition-colors`}
                        >
                          <td className="py-1.5 px-4 text-center text-gray-400 font-mono font-medium">{course.no}</td>
                          <td className="py-1.5 px-3 font-mono font-semibold text-[#1A3730]">{course.kode}</td>
                          <td className="py-1.5 px-4 font-medium text-gray-900">{course.nama}</td>
                          <td className="py-1.5 px-3 text-center">
                            <span className={`inline-block px-2 py-0.5 rounded-md font-bold text-[10px] font-mono ${
                              course.nilai === 'A' ? 'bg-emerald-100 text-emerald-800' :
                              course.nilai === 'AB' ? 'bg-[#D2E7D6] text-emerald-900' :
                              course.nilai === 'B' ? 'bg-blue-100 text-blue-800' :
                              'bg-amber-100 text-amber-800'
                            }`}>
                              {course.nilai}
                            </span>
                          </td>
                          <td className="py-1.5 px-4 text-center font-mono">{course.am.toFixed(2)}</td>
                          <td className="py-1.5 px-4 text-center font-mono font-semibold">{course.sks}</td>
                          <td className="py-1.5 px-4 text-center font-mono text-gray-900 font-semibold">{course.bobot.toFixed(2)}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-12 px-4 text-center text-gray-400">
                        <div className="flex flex-col items-center justify-center gap-1">
                          <AlertCircle className="w-8 h-8 text-gray-300" />
                          <p className="font-medium text-gray-500">Mata kuliah tidak ditemukan</p>
                          <p className="text-[11px]">Coba masukkan kata kunci pencarian atau bersihkan filter nilai</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* SUMMARY CUMULATIVE & TUGAS AKHIR FOOTER */}
          <div className="p-6 bg-gray-50 border-t border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              
              {/* TUGAS AKHIR DESCRIPTION CARD */}
              <div className="md:col-span-8 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-3">
                <FileText className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div className="text-[11px]">
                  <p className="text-gray-400 font-mono font-medium uppercase text-[9px] tracking-wider mb-1">Judul Tugas Akhir</p>
                  <p className="text-gray-800 italic font-semibold leading-relaxed">
                    "Analisis Sistem Evaluasi Vendor Menggunakan Analytical Hierarchy Process (AHP) di PT. Dok dan Perkapalan Air Kantung"
                  </p>
                </div>
              </div>

              {/* OVERALL ACCUMULATED SCORE STATS */}
              <div className="md:col-span-4 grid grid-cols-3 gap-2.5 text-center">
                <div className="bg-white p-2.5 rounded-xl border border-gray-100 shadow-sm">
                  <p className="text-gray-400 font-mono uppercase text-[8px] tracking-wider">Total SKS</p>
                  <p className="text-sm font-bold text-[#1A3730] mt-0.5">146</p>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-gray-100 shadow-sm">
                  <p className="text-gray-400 font-mono uppercase text-[8px] tracking-wider">Lulus</p>
                  <p className="text-sm font-bold text-emerald-600 mt-0.5">146</p>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-gray-100 shadow-sm">
                  <p className="text-gray-400 font-mono uppercase text-[8px] tracking-wider">Jumlah Mutu</p>
                  <p className="text-sm font-bold text-[#1A3730] mt-0.5">550</p>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
