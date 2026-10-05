# Catatan pengujian — Langkah English 1.0.0

## Hasil yang benar-benar diperiksa

25 kelompok pemeriksaan otomatis lulus: 9 kelompok mesin/data, 2 kelompok aset/cache simulasi, dan 14 kelompok alur DOM. Syntax `content.js`, `core.js`, `app.js`, serta `sw.js` diperiksa dengan Node.js. Lingkungan pengujian memakai Node v24.19.0.

| Bagian | Pemeriksaan | Hasil |
| --- | --- | --- |
| Cakupan | 115 unit + 8 dasar; tiap ID masuk peta tepat sekali | Lulus |
| Soal | 615 soal memiliki jawaban; opsi unik; bank kata lengkap | Lulus |
| Tulisan | Kontraksi, kapital, spasi, tanda akhir; kesalahan verb dan apostrof kepemilikan | Lulus |
| Nilai | Jawaban pertama tersimpan; nilai terbaik terpisah; pelajaran ulang tidak menambah XP baru | Lulus |
| Jadwal | 1/3/7/14/30 hari; kesalahan/bantuan kembali besok; pergantian tahun | Lulus |
| Riwayat | Streak tanggal lokal, target, hadiah sekali per topik/hari, retensi 5.000 tanpa kehilangan XP lama | Lulus |
| Cadangan | ID, tanggal, angka, versi, sesi, dan pengaturan divalidasi | Lulus |
| Isi lain | 161 kosakata unik, 8 misi, 40 kata kerja tidak beraturan | Lulus |
| Aset | Semua href/src lokal tersedia, alamat relatif, manifest dan ikon | Lulus |
| Cache simulasi | 10 aset tersedia; cache hit; fallback; folder lain tidak dihapus/dicegat | Lulus |
| Tampilan DOM | 123 halaman pelajaran dan semua menu menghasilkan elemen yang diharapkan | Lulus |
| Alur pelajaran | Salah → penjelasan → benar; petunjuk; susun; tulis; hasil | Lulus |
| Pemulihan | Sesi dilanjutkan pada soal yang benar setelah data dimuat ulang | Lulus |
| Pengulangan | Bantuan dicatat pada jawaban pertama; jadwal kembali besok | Lulus |
| Misi | “Yes, I’m” ditolak pada jawaban singkat positif; misi ulang tidak menggandakan XP | Lulus |
| Kosakata | Buka arti, penilaian mandiri, jadwal dan aktivitas | Lulus |
| Audio simulasi | Lokal diutamakan; daring butuh izin; ketiadaan suara punya pesan fallback | Lulus |
| Impor/ekspor | Ekspor bernama JSON; impor rusak ditolak; batal mempertahankan data; konfirmasi memulihkan | Lulus |
| Reset | Batal tidak menghapus; konfirmasi menghapus state aplikasi | Lulus |
| WebMCP simulasi | Dua tool terdaftar; input invalid ditolak; buka materi tidak menambah nilai | Lulus |
| Campur pola/diagnostik | Sesi selesai tanpa menandai pelajaran sebagai selesai | Lulus |
| Mendengar | Lima frasa; audio fixture; pilihan arti; aktivitas tersimpan | Lulus |
| Pencarian | Ada hasil, tidak ada hasil, dan menu tidak dikenal ditangani | Lulus |
| Error runtime DOM | Tidak ada error JavaScript dalam alur yang diperiksa | Lulus |

Skrip dapat diulang dari folder website:

```bash
node tests/check.cjs
node tests/static.cjs
npm install --no-save jsdom
node tests/dom-flow.cjs
```

`jsdom` hanya untuk tes, bukan dependensi produksi. Dialog, Web Speech, dan registry WebMCP dibuat sebagai fixture pengujian. Skrip aset/cache memakai simulasi event dan cache, bukan service worker native.

## Batas verifikasi yang perlu diketahui

Pemeriksaan visual browser tidak selesai: lingkungan ini tidak menyediakan executable Chromium lokal yang dapat digunakan, dan akses browser ke preview lokal diblokir kebijakan lingkungan. Tidak ada screenshot browser yang diklaim sebagai bukti.

Akibatnya, CSS desktop/ponsel, pembesaran 200%, screen reader nyata, dialog native, pemasangan PWA, audio yang benar-benar terdengar, dan offline pada browser nyata **belum diverifikasi**. Tampilan telah ditulis responsif dengan breakpoint 1.150/850/660 px, fokus keyboard, reduced motion, dan target tombol minimal sekitar 42–46 px, tetapi audit kode tidak menggantikan pemeriksaan visual.

GitHub Pages belum diterbitkan atau diuji pada repositori pengguna. Alamat relatif, hash routing, `.nojekyll`, dan isolasi subfolder telah diperiksa. Dukungan WebMCP native belum diuji; fitur dideteksi secara opsional dan tidak dibutuhkan untuk belajar.

## Pemeriksaan singkat setelah diterbitkan

1. Di desktop dan ponsel, buka halaman awal, Peta, satu pelajaran, lima soal, dan Progres. Pastikan tidak ada elemen terpotong atau tombol tertutup navigasi bawah.
2. Pada lebar 320, 390, 768, dan 1.440 px serta zoom 200%, periksa keterbacaan dan scrolling. Tabel rujukan boleh menggulir horizontal.
3. Coba keyboard Tab/Shift+Tab/Enter; fokus harus terlihat. Pada susun kata, tombol kata harus tetap bisa digunakan dengan keyboard.
4. Coba audio. Tanpa suara Inggris, teks/petunjuk harus tetap bisa dibuka. Dengan suara daring saja, audio harus menunggu izin pengaturan.
5. Selesaikan satu pelajaran, muat ulang, ekspor JSON, dan impor kembali. Konfirmasi harus tersedia sebelum penggantian/reset.
6. Tunggu tulisan “Materi siap untuk offline”, buka lagi setelah service worker mengontrol halaman, lalu matikan jaringan. Materi harus tetap bisa dibuka; audio daring dapat gagal dengan pesan bantuan.
7. Uji pemasangan di browser yang mendukung PWA. Jika browser tidak menawarkan pemasangan, website tetap bisa digunakan sebagai tab biasa.

Pemeriksaan ini adalah langkah verifikasi yang masih terbuka, bukan klaim bahwa seluruh browser/perangkat telah lulus.
