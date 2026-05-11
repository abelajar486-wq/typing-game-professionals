import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StarField from "@/components/StarField";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import politicsImg from "@/assets/ebook-politics.jpg";
import codingImg from "@/assets/ebook-coding.jpg";

type Chapter = { title: string; body: string[] };

const POLITICS: Chapter[] = [
  {
    title: "BAB 1 — Pengantar Ilmu Politik",
    body: [
      "Ilmu politik adalah studi tentang kekuasaan, pemerintahan, dan bagaimana keputusan kolektif dibuat dalam masyarakat. Politik hadir di mana pun manusia harus membagi sumber daya yang terbatas.",
      "Aristoteles menyebut manusia sebagai 'zoon politikon' — makhluk politik. Artinya, kita tidak bisa lepas dari kehidupan bernegara, mulai dari memilih ketua RT hingga presiden.",
    ],
  },
  {
    title: "BAB 2 — Demokrasi & Sistem Pemerintahan",
    body: [
      "Demokrasi berasal dari kata Yunani 'demos' (rakyat) dan 'kratos' (kekuasaan). Prinsip utamanya: kedaulatan berada di tangan rakyat melalui pemilu yang bebas, jujur, dan adil.",
      "Sistem pemerintahan dunia umumnya terbagi menjadi: presidensial (seperti Indonesia & AS), parlementer (seperti Inggris & Jepang), dan semi-presidensial (seperti Prancis).",
      "Tiga pilar kekuasaan menurut Montesquieu: Eksekutif (menjalankan), Legislatif (membuat UU), dan Yudikatif (mengadili). Pemisahan ini mencegah kekuasaan absolut.",
    ],
  },
  {
    title: "BAB 3 — Ideologi Politik",
    body: [
      "Liberalisme menekankan kebebasan individu dan pasar bebas. Konservatisme menjunjung tradisi dan stabilitas. Sosialisme memprioritaskan kesetaraan dan kepemilikan kolektif.",
      "Indonesia menganut Pancasila sebagai ideologi negara — perpaduan unik antara nilai religius, kemanusiaan, persatuan, demokrasi, dan keadilan sosial.",
    ],
  },
  {
    title: "BAB 4 — Partisipasi Politik Warga",
    body: [
      "Partisipasi tidak terbatas pada pemilu. Diskusi publik, demonstrasi damai, kritik kebijakan, hingga literasi media adalah bentuk partisipasi politik yang sehat.",
      "Warga negara yang melek politik adalah benteng utama demokrasi dari ancaman korupsi, disinformasi, dan otoritarianisme.",
    ],
  },
];

const CODING: Chapter[] = [
  {
    title: "BAB 1 — Apa Itu Pemrograman?",
    body: [
      "Pemrograman adalah seni memberi instruksi kepada komputer menggunakan bahasa formal. Setiap baris kode adalah perintah yang dieksekusi sesuai urutan logika.",
      "Bahasa populer hari ini: JavaScript (web), Python (data & AI), TypeScript (web modern), Go & Rust (sistem), Swift & Kotlin (mobile).",
    ],
  },
  {
    title: "BAB 2 — Konsep Dasar",
    body: [
      "Variabel: wadah untuk menyimpan nilai. Tipe data: angka, teks, boolean, array, objek.",
      "Kontrol alur: if/else untuk percabangan, for/while untuk perulangan. Fungsi: blok kode yang dapat dipanggil ulang.",
      "Contoh: `const sapa = (nama) => `Halo, ${nama}!`;` — fungsi panah JavaScript yang mengembalikan sapaan.",
    ],
  },
  {
    title: "BAB 3 — Paradigma Pemrograman",
    body: [
      "Procedural: kode berurutan langkah demi langkah. Object-Oriented: dunia dimodelkan sebagai objek dengan properti & method. Functional: data mengalir lewat fungsi murni tanpa efek samping.",
      "React menggunakan paradigma deklaratif — kita mendeskripsikan UI seperti apa, bukan langkah-langkah membuatnya.",
    ],
  },
  {
    title: "BAB 4 — Web Modern & Best Practice",
    body: [
      "Stack modern: React + TypeScript + Tailwind CSS + Vite. Komponen kecil yang dapat digunakan ulang lebih mudah dipelihara daripada file raksasa.",
      "Tips: tulis kode yang mudah dibaca manusia, gunakan nama variabel yang jelas, commit kecil & sering, dan selalu uji sebelum deploy.",
      "Algoritma & struktur data tetap fondasi penting — list, map, stack, queue, tree, graph muncul di hampir semua aplikasi nyata.",
    ],
  },
];

const Ebook = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"politics" | "coding">("politics");

  return (
    <div className="relative min-h-screen overflow-hidden py-10">
      <StarField />
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/")}
            className="py-2 px-5 border border-border rounded-lg bg-card/40 font-orbitron text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground transition-all"
          >
            ← MENU
          </button>
          <div className="text-right">
            <h1 className="font-orbitron text-3xl md:text-4xl font-bold gradient-title tracking-[0.2em]">
              EBOOK
            </h1>
            <p className="font-mono-share text-[10px] md:text-xs text-muted-foreground tracking-[0.3em]">
              GALACTIC KNOWLEDGE ARCHIVE
            </p>
          </div>
        </div>

        <Tabs value={tab} onValueChange={(v) => setTab(v as "politics" | "coding")}>
          <TabsList className="grid grid-cols-2 w-full bg-card/40 border border-border mb-6">
            <TabsTrigger value="politics" className="font-orbitron tracking-widest text-xs">
              🏛 POLITIK
            </TabsTrigger>
            <TabsTrigger value="coding" className="font-orbitron tracking-widest text-xs">
              💻 CODING
            </TabsTrigger>
          </TabsList>

          <TabsContent value="politics">
            <EbookContent
              image={politicsImg}
              imageAlt="Ilustrasi neon gedung parlemen futuristik untuk ebook ilmu politik"
              title="Ilmu Politik"
              subtitle="Memahami Kekuasaan, Demokrasi & Warga Negara"
              chapters={POLITICS}
              accent="border-glow-magenta"
            />
          </TabsContent>

          <TabsContent value="coding">
            <EbookContent
              image={codingImg}
              imageAlt="Ilustrasi neon kode dan terminal futuristik untuk ebook coding"
              title="Dunia Coding"
              subtitle="Dari Variabel Hingga Web Modern"
              chapters={CODING}
              accent="border-glow-cyan"
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const EbookContent = ({
  image,
  imageAlt,
  title,
  subtitle,
  chapters,
  accent,
}: {
  image: string;
  imageAlt: string;
  title: string;
  subtitle: string;
  chapters: Chapter[];
  accent: string;
}) => (
  <div className="space-y-6">
    <div className={`relative rounded-xl overflow-hidden border border-border ${accent}`}>
      <img
        src={image}
        alt={imageAlt}
        width={1024}
        height={640}
        loading="lazy"
        className="w-full h-56 md:h-72 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-foreground tracking-[0.15em]">
          {title.toUpperCase()}
        </h2>
        <p className="font-mono-share text-xs md:text-sm text-primary tracking-widest">
          {subtitle}
        </p>
      </div>
    </div>

    <div className="space-y-4">
      {chapters.map((c, i) => (
        <article
          key={i}
          className="p-5 md:p-6 border border-border rounded-xl bg-card/60 backdrop-blur-sm hover:border-primary transition-colors"
        >
          <h3 className="font-orbitron text-sm md:text-base font-bold text-primary tracking-[0.15em] mb-3">
            {c.title}
          </h3>
          <div className="space-y-3">
            {c.body.map((p, j) => (
              <p key={j} className="font-mono-share text-sm md:text-base leading-relaxed text-foreground/90">
                {p}
              </p>
            ))}
          </div>
        </article>
      ))}
    </div>
  </div>
);

export default Ebook;
