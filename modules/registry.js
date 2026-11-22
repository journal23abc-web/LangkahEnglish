/* Daftar modul. Tambah satu objek di array ini untuk menambah modul baru. */
window.LANGKAH_MODULES = [
  {
    "id": "grammar",
    "title": "Grammar",
    "eyebrow": "UNTUK PEMULA · MULAI DARI SINI",
    "description": "Belajar bahasa Inggris dari nol: kata dasar, kalimat sederhana, dan latihan singkat tiap hari.",
    "path": "modules/grammar/",
    "entry": "entry.js",
    "storagePrefix": "langkah-english-v1:",
    "totalLessons": 123,
    "facts": ["123 pelajaran", "615 latihan inti", "161 kosakata"],
    "accent": "green",
    "validation": {
      "scripts": ["js/content.js", "js/core.js"],
      "global": "LangkahCore",
      "method": "validated",
      "contentGlobal": "LANGKAH_CONTENT"
    }
  },
  {
    "id": "writing",
    "title": "IELTS Writing",
    "eyebrow": "TINGKAT LANJUT · PERSIAPAN TES IELTS",
    "description": "Buat yang lagi siap-siap tes IELTS: latihan menulis laporan dan esai, lalu revisi sampai makin bagus.",
    "path": "modules/writing/",
    "entry": "entry.js",
    "storagePrefix": "langkah-writing-v1:",
    "legacyPaths": ["langkah-writing/", "../langkah-writing/"],
    "totalLessons": 20,
    "facts": ["20 pelajaran", "16 tugas menulis", "Simulasi 60 menit"],
    "accent": "peach",
    "validation": {
      "scripts": ["js/content.js", "js/tasks.js", "js/core.js"],
      "global": "WritingCore",
      "method": "validate",
      "contentGlobal": "WRITING_CONTENT"
    }
  }
];
