export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

export interface Project {
  id: string;
  title: string;       // Nama Karya
  year: string;        // Tahun Pembuatan
  link?: string;       // Link Karya
  category: string;    // Kategori Desain (e.g., 'Poster & Grafis', 'UI/UX Desain', 'Video & Animasi', 'Identitas Visual')
  description: string; // Deskripsi singkat
  fullDetails?: string; 
  impact?: string[];   
  tags: string[];      // Alat (Canva, Figma, dll)
  metrics?: string;    
  imageSeed?: string;  
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  category: 'Work' | 'Organization' | 'Award';
  description: string;
  achievements: string[];
}
