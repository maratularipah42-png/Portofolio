import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header as required by guidelines
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// System Instruction detailing Annisa's qualification as SM (Sarjana Manajemen)
const SYSTEM_INSTRUCTION = `You are the AI Career Representative for Annisa Nurus Saidah, S.M. (a highly motivated Management Graduate / Sarjana Manajemen). 
Your objective is to represent Annisa professionally to prospective employers, recruiters, and collaborators visiting her online bento portfolio.
Always speak of Annisa in the third person in an enthusiastic, premium, highly professional and polished tone.
Answer questions accurately, providing strategic recommendations and displaying her readiness for corporate roles.

Annisa's Key Profile:
- Name: Annisa Nurus Saidah, S.M. (Bachelor of Management, GPA: 3.77 / 4.00, graduating with honors).
- Title: Sarjana Manajemen (S.M.), specializing in HR Consulting, Business Strategy, Operations, and Project Management.
- Key Skills:
  * Strategic Leadership, Agile Project Management, Organizational Strategy.
  * Human Capital & Talent Onboarding, Team Training Alignment.
  * Quantitative Business Analysis, Market Competitiveness Analysis, Presentation Design (Canva/PPT), MS Excel.
- Key Experience & Timeline:
  * Organization President of Senior Student Business Forum (2025-2026): Organised national conferences, led 200+ active student members.
  * HR Consultant Intern at Nexus Tech Enterprise (June - Dec 2025): Spearheaded a restructured onboarding system. Managed onboarding documents, tracked employee evaluations, and accelerated onboarding velocity by 25% for interns.
  * Strategic Business Planner (Competitive Case Competitions): Won 1st Place National Business Pitch Champion 2025. Co-developed a waste-to-energy circular business canvas.
- Personal Attributes: Resourceful communicator, details-driven executor, empathetic coordinator, and ready to tackle challenging corporate associate programs / consultant roles.

Guidelines:
1. Speak in the language used by the visitor (English or Indonesian are supported, default is Indonesian since S.M indicates Indonesian University background).
2. Keep responses highly actionable, concise (2-3 paragraphs or simple bullet points maximum), structured, and visually pleasant.
3. If asked about contact or hiring, always guide them to use her "Hire Me Planner" or fill in the direct contact section on the dashboard.
4. Do not make up facts outside this profile. Focus on her management expertise!`;

// api/chat endpoint
app.post("/api/chat", async (req, res) => {
  const { prompt, history } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required." });
  }

  try {
    // Construct formatting for Gemini chat or simple prompt with context
    // Build context with history
    let contents = "";
    if (history && Array.isArray(history)) {
      history.forEach((msg: any) => {
        contents += `${msg.sender === 'user' ? 'Visitor' : 'Assistant'}: ${msg.text}\n`;
      });
    }
    contents += `Visitor: ${prompt}\nAssistant:`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const reply = response.text || "Saya siap membantu menjadwalkan pertemuan atau diskusi mendalam.";
    res.json({ reply });
  } catch (err: any) {
    console.error("Gemini API Error in server.ts:", err);
    res.status(500).json({ 
      error: "Maaf, asisten AI sedang sibuk. Hubungi Annisa secara langsung di panel Kontak di bawah!" 
    });
  }
});

// API health endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date() });
});

// Secure API endpoint for fetching/generating full-length lyrics using Gemini
app.get("/api/spotify/lyrics", async (req, res) => {
  const track = (req.query.track as string) || "";
  const artist = (req.query.artist as string) || "";

  if (!track) {
    return res.status(450).json({ error: "Nama lagu diperlukan" });
  }

  try {
    const prompt = `Berikan lirik lengkap, komprehensif, dan akurat untuk lagu "${track}" yang dinyanyikan oleh "${artist}". 
Format lirik dengan rapi (tulis semua bait, verse, chorus, bridge, outro secara lengkap). Jangan disingkat atau dipotong.
Berikan juga "funFact" (fakta menarik tentang latar belakang lagu, makna, lirik, atau perilisannya) dalam bahasa Indonesia.

Struktur output yang WAJIB Anda kembalikan harus presisi dengan penanda berikut:
[JUDUL]: ${track}
[ARTIS]: ${artist}
[LIRIK]:
(semua teks lirik lengkap ditaruh di sini baris demi baris)
[FUN_FACT]:
(satu-dua paragraf fakta menarik atau makna lagu ditaruh di sini)

Tolong jaga akurasi lirik dan jangan mencampurkan instruksi.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        temperature: 0.2, // low temperature for precise factual retrieval
      },
    });

    const text = response.text || "";
    
    let titleResult = track;
    let artistResult = artist;
    let lyricsResult = "";
    let funFactResult = "";

    const lines = text.split("\n");
    let section: "none" | "lyrics" | "fun_fact" = "none";

    for (const line of lines) {
      const cleanLine = line.trim();
      if (cleanLine.startsWith("[JUDUL]:")) {
        titleResult = cleanLine.replace("[JUDUL]:", "").trim();
        section = "none";
      } else if (cleanLine.startsWith("[ARTIS]:")) {
        artistResult = cleanLine.replace("[ARTIS]:", "").trim();
        section = "none";
      } else if (cleanLine.startsWith("[LIRIK]:")) {
        section = "lyrics";
      } else if (cleanLine.startsWith("[FUN_FACT]:")) {
        section = "fun_fact";
      } else {
        if (section === "lyrics") {
          lyricsResult += line + "\n";
        } else if (section === "fun_fact") {
          funFactResult += line + "\n";
        }
      }
    }

    if (!lyricsResult.trim()) {
      lyricsResult = text; // Fallback if format parser fails
    }

    res.json({
      title: titleResult,
      artist: artistResult,
      lyrics: lyricsResult.trim(),
      funFact: funFactResult.trim() || "Lagu ini merupakan salah satu lagu populer yang sering diperdengarkan secara internasional."
    });
  } catch (error: any) {
    console.error("Lyrics Endpoint Error:", error);
    res.status(500).json({ error: "Gagal mengambil lirik lagu lengkap menggunakan AI." });
  }
});

// Secure API endpoint for music search (Spotify-themed, powered by robust full-length raw stream catalog)
app.get("/api/spotify/search", async (req, res) => {
  const query = (req.query.q as string) || "lofi relaxing";
  let tracks: any[] = [];

  // 1. Fetch full-length tracks from Jamendo Free Music API (Client ID: 56d30c95 is Jamendo public tester app)
  try {
    const jamendoRes = await fetch(
      `https://api.jamendo.com/v3.0/tracks/?client_id=56d30c95&format=json&search=${encodeURIComponent(query)}&limit=30&imagesize=200`
    );
    if (jamendoRes.ok) {
      const jamendoData = (await jamendoRes.json()) as any;
      const jamendoTracks = (jamendoData.results || []).map((item: any) => ({
        id: `jamendo-${item.id}`,
        name: item.name || "Lagu Tanpa Judul",
        artist: item.artist_name || "Artis Tidak Dikenal",
        album: item.album_name || "Album Penuh",
        imageUrl: item.image || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=200&auto=format&fit=crop",
        previewUrl: item.audio || "", // Jamendo serves the full-length track as raw MP3 stream for direct browser audio!
        isFullVersion: true,
        duration: item.duration ? Math.round(item.duration) : null,
      }));
      tracks = [...tracks, ...jamendoTracks];
    }
  } catch (jamendoError) {
    console.error("Jamendo music search error:", jamendoError);
  }

  // Ensure unique tracks by URL
  const seenUrls = new Set();
  const uniqueTracks = tracks.filter((track) => {
    if (!track.previewUrl || seenUrls.has(track.previewUrl)) {
      return false;
    }
    seenUrls.add(track.previewUrl);
    return true;
  });

  res.json({ tracks: uniqueTracks });
});

// Configure Vite middleware or static files
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Development mode enabled with Vite middleware.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Production mode enabled with Static Client serving.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

if (!process.env.VERCEL) {
  start();
}

export default app;
