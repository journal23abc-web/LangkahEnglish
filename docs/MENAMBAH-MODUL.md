# Menambah modul tanpa mengganti pintu masuk

Arsitektur ini memakai satu `index.html`. Daftar pada `modules/registry.js` menentukan pilihan beranda, menu pemindah modul, alamat, tempat penyimpanan, dan pemeriksaan cadangan. Kedua modul yang sudah tersedia merupakan contoh implementasi lengkap.

## 1. Sediakan folder modul

Contoh untuk Reading:

```text
modules/reading/
  entry.js
  js/content.js
  js/core.js
  js/app.js
  css/style.css
  assets/
```

Tidak perlu menambah berkas HTML. Kerangka HTML dimasukkan sebagai string dalam `entry.js`:

```js
window.LANGKAH_TEMPLATES = window.LANGKAH_TEMPLATES || {};
window.LANGKAH_TEMPLATES.reading = `<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Reading</title>
  <link rel="stylesheet" href="css/style.css">
  <script defer src="../../js/module-bridge.js"></script>
  <script defer src="js/content.js"></script>
  <script defer src="js/core.js"></script>
  <script defer src="js/app.js"></script>
</head>
<body><main id="main" tabindex="-1"></main></body>
</html>`;
```

Contoh ini adalah kerangka bagi pengembang, bukan modul Reading yang sudah memiliki materi. Isi dan fungsi belajarnya perlu dibuat sebelum didaftarkan. `id="main"` harus ada, dan aplikasi modul harus mengisinya saat dimulai. Gunakan skrip klasik, bukan `type="module"`, jika ingin mendukung pembukaan langsung dari folder tanpa server.

Host menyisipkan base URL menuju folder modul. Karena itu `assets/chart.png` dan `js/content.js` mengarah ke folder Reading, bukan ke folder Grammar atau akar aplikasi.

## 2. Ikuti konteks host

Host menyediakan:

```js
const context = window.LANGKAH_MODULE_CONTEXT;
context.id;          // "reading"
context.route;       // misalnya "lesson/r01"
context.storageKey;  // kunci khusus Reading pada alamat aplikasi ini
context.hostURL;     // alamat index.html utama
```

Penghubung menambahkan `context.navigate(route)`. Untuk berpindah halaman dari kode:

```js
function go(route) {
  window.LANGKAH_MODULE_CONTEXT.navigate(route);
}
```

Untuk menampilkan halaman:

```js
function render() {
  const route = window.LANGKAH_MODULE_CONTEXT.route || 'home';
  // Baca route dan isi elemen main dengan halaman yang sesuai.
}
window.addEventListener('hashchange', render);
render();
```

Tautan biasa seperti `<a href="#lesson/r01">` dihubungkan otomatis ke alamat utama. Penghubung juga membuat tautan tersebut cocok untuk dibuka pada tab baru. Tombol kembali/maju browser mengikuti alamat aplikasi utama, bukan riwayat yang bersaing di frame.

Jangan membaca alamat modul dari `window.location.href`: halaman internal memakai `srcdoc`. Gunakan konteks yang disediakan. Simpan data melalui kunci khususnya:

```js
localStorage.setItem(context.storageKey, JSON.stringify(state));
```

Tangani kegagalan penyimpanan dengan pesan yang meminta pengguna mengunduh cadangan. Simpan perubahan penting sebelum berpindah modul; modul dapat dimuat ulang ketika pengguna kembali.

## 3. Sediakan pemeriksaan cadangan

Dalam contoh konfigurasi berikut, `js/content.js` mengisi `window.READING_CONTENT`, dan `js/core.js` mengisi `window.ReadingCore.validate(raw, content)`. Fungsi pemeriksaan harus:

- Menolak versi cadangan yang tidak dikenal.
- Membangun ulang objek yang bersih dari ID dan bidang yang dikenal.
- Memeriksa bentuk dan batas angka, teks, tanggal, serta riwayat.
- Melempar Error yang bisa dipahami jika berkas tidak sesuai.
- Mengembalikan data bersih tanpa menulis ke localStorage atau mengubah tampilan.

Skrip pemeriksaan boleh dimuat oleh halaman utama sebelum ada frame modul. Karena itu, file `core.js` dan `content.js` tidak boleh bergantung pada elemen tampilan modul, dan penamaan globalnya harus unik.

Konvensi opsional agar beranda dapat menghitung ringkasan:

- `completed`: objek dengan ID pelajaran yang sudah dicoba.
- `drafts`: objek tugas yang memiliki `text` dan opsional `versions`.

Modul tanpa tulisan tidak perlu memiliki `drafts`. Angka ringkasan tetap mencatat aktivitas, bukan memberi nilai kemampuan.

## 4. Tambahkan satu entri pada registry

Tambahkan objek berikut di array `window.LANGKAH_MODULES` setelah implementasi Reading tersedia:

```js
{
  "id": "reading",
  "title": "IELTS Reading",
  "eyebrow": "MEMBACA DAN MEMAHAMI",
  "description": "Deskripsi singkat modul Reading yang sudah dibuat.",
  "path": "modules/reading/",
  "entry": "entry.js",
  "storagePrefix": "langkah-reading-v1:",
  "totalLessons": 12,
  "facts": ["12 pelajaran", "Latihan pemahaman"],
  "accent": "neutral",
  "validation": {
    "scripts": ["js/content.js", "js/core.js"],
    "global": "ReadingCore",
    "method": "validate",
    "contentGlobal": "READING_CONTENT"
  }
}
```

Angka 12 pada contoh adalah pengisi untuk pengembang. Ganti sesuai jumlah pelajaran nyata. `id`, `path`, dan `storagePrefix` harus berbeda dari modul yang sudah ada. Nama `id` memakai huruf kecil, angka, dan tanda hubung, dimulai dengan huruf. Jangan memakai `home`, `settings`, atau `help` sebagai ID.

Router, beranda, menu pilihan, dan cadangan gabungan membaca registry. Tidak perlu menambah kasus Reading dalam `hub.js`. File-file yang didaftarkan pada `validation.scripts` dimuat berurutan sesuai ketergantungannya.

Jangan memasang service worker baru di dalam modul. Satu service worker akar mengelola seluruh aset. Jangan memakai nama global modul lain dalam skrip pemeriksaan yang dimuat host.

## 5. Perbarui dan periksa

```bash
python3 tools/build_cache.py
node tests/hub.cjs
node tests/modules.cjs
```

Sesuaikan pengujian jumlah modul yang semula dua setelah modul baru benar-benar ditambahkan. Buat uji bermakna untuk materi dan fungsi modul baru. Periksa juga di browser: masuk modul, pindah halaman, buka tab baru, kembali ke beranda, pindah ke modul lain, lalu kembali lagi. Pastikan progres tersimpan dan pemulihan cadangan sesuai.

Sesudah seluruh file diunggah sebagai versi baru, tutup tab lama dan buka lagi agar cache baru aktif. Gunakan file cadangan sebelum mengganti versi aplikasi.
