/* Daftar modul. Tambah satu objek di array ini untuk menambah modul baru. */
window.LANGKAH_MODULES = [
  {
    "id": "grammar",
    "title": "Grammar",
    "eyebrow": "DASAR BAHASA INGGRIS",
    "description": "Bangun kalimat dari nol. Pahami pola, coba latihan, dan ingat kembali setelah jeda.",
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
    "eyebrow": "IELTS ACADEMIC · TASK 1 + TASK 2",
    "description": "Ubah ide menjadi tulisan utuh. Simpan draf, periksa isinya, lalu buat versi yang lebih baik.",
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
