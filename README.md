# Langkah English

Website belajar bahasa Inggris untuk orang Indonesia yang memulai dari nol. Paket ini berisi seluruh kode dan materi; tidak membutuhkan akun, API key, backend, atau proses build.

## Mulai memakai

Ekstrak ZIP, masuk ke folder `langkah-english`, lalu buka `index.html` di browser. Untuk penggunaan rutin dan dukungan cache offline, gunakan GitHub Pages atau server lokal.

Opsional, dari folder website:

```bash
python3 -m http.server 8080
```

Lalu buka `http://localhost:8080/`. Website tidak memakai layanan Python; perintah ini hanya menyajikan file statis.

## Hosting di GitHub Pages

1. Buat repositori di GitHub.
2. Upload **isi** folder `langkah-english` ke akar repositori. Pastikan `index.html`, `js`, `css`, `assets`, `sw.js`, dan `.nojekyll` berada di akar, bukan di folder tambahan.
3. Buka **Settings → Pages → Build and deployment**.
4. Pilih **Deploy from a branch**, cabang **main**, folder **/(root)**, lalu **Save**.
5. Tunggu proses penerbitan dan buka alamat yang ditampilkan GitHub.

Semua aset memakai alamat relatif; rute memakai hash (`#lesson/g001`), sehingga mendukung repositori dengan subfolder tanpa konfigurasi rute server.

[Panduan resmi GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Isi aplikasi

- 8 pelajaran Titik nol + 115 pelajaran tata bahasa dalam 9 tahap.
- 615 soal inti: makna, pilihan pola, isian, susun kata, dan tulisan dengan bank kata.
- Umpan balik Indonesia, penjelasan kesalahan, petunjuk, dan kesempatan memperbaiki jawaban.
- 161 kosakata dengan audio perangkat dan kartu ingatan.
- 8 misi percakapan, 9 latihan Campur pola, diagnostik 12 soal, dan sesi mendengar 5 frasa.
- Ringkasan asli untuk 7 kelompok lampiran, termasuk 40 kata kerja tidak beraturan.
- Pengulangan berjarak, target harian, streak, XP, dan cadangan JSON.
- Semua pelajaran terbuka; pengguna tidak perlu membeli atau menunggu untuk membuka materi.

## Audio dan offline

Audio menggunakan Speech Synthesis di browser. Suara Inggris lokal diutamakan. Suara daring hanya dipakai jika pengguna mengizinkannya di Progres; penyedia suara browser dapat menerima teks. Kualitas, suara, dan dukungan berbeda antargawai. Tidak ada rekaman audio manusia dalam paket.

Jika suara Inggris tidak ada, contoh tetap dapat dibaca dan sesi mendengar bisa memakai teks bantuan. Aplikasi tidak menggunakan mikrofon dan tidak menilai pengucapan otomatis.

Service worker menyimpan 10 aset aplikasi setelah instalasi berhasil melalui HTTPS/localhost. Materi tidak membutuhkan internet setelah cache tersedia. Suara daring dan tautan sumber dapat memerlukan internet. Mode `file://` tidak memasang service worker.

## Progres dan penilaian

Progres tersimpan dalam `localStorage`, terpisah berdasarkan folder situs. Browser/perangkat lain tidak otomatis memiliki progres yang sama. Gunakan **Progres → Unduh cadangan / Impor JSON** untuk memindahkannya. Membersihkan data browser atau mode privat bisa menghilangkan progres.

Nilai pelajaran memakai jawaban pertama dari lima soal. Bantuan atau jawaban salah mendapat nilai awal nol untuk soal itu; pengguna tetap memperbaikinya untuk lanjut. Nilai terbaik disimpan tanpa mengganti nilai sesi pertama. Mengulang pelajaran tidak memberikan XP pelajaran baru atau menunda jadwal pengulangan.

Pelajaran awal di bawah 80% masuk antrean hari ini; nilai 80–100% mulai besok. Pada pengulangan, jawaban pertama yang tepat memberi jeda 1, 3, 7, 14, dan 30 hari. Bantuan/kesalahan kembali besok. Ini heuristik sederhana, bukan klaim interval optimal bagi setiap orang.

“Mantap di pengulangan” berarti minimal tiga jawaban ulang pertama tepat berturut-turut. XP adalah apresiasi aktivitas, bukan ukuran kefasihan: 30 per pelajaran baru, 8 per topik ulang per hari, 10 per misi baru, dan 2 per kartu kosakata yang mulai dipelajari. Riwayat menyimpan 5.000 aktivitas terakhir; poin pengulangan tetap disimpan ketika riwayat lama dipangkas.

Aktivitas pelajaran dan Campur pola dicatat setelah sesi selesai; soal pengulangan dan kartu dicatat saat dilanjutkan, misi saat respons tepat, serta mendengar setelah sesi selesai. Cek mandiri berbicara tidak menghasilkan nilai otomatis. Diagnostik tidak menetapkan tingkat CEFR.

## Berkas utama

| Berkas | Fungsi |
| --- | --- |
| `index.html` | Kerangka website dan navigasi |
| `css/style.css` | Tampilan responsif, fokus keyboard, reduced motion, dan print |
| `js/content.js` | Materi asli, 123 pelajaran, kosakata, misi, dan rujukan |
| `js/core.js` | Penilaian, jadwal, validasi cadangan, tanggal lokal, dan poin |
| `js/app.js` | Tampilan dan interaksi aplikasi |
| `sw.js` | Cache offline yang dibatasi folder situs |
| `manifest.webmanifest` | Metadata pemasangan aplikasi |
| `docs/SUMBER-DAN-CAKUPAN.md` | Catatan membaca, sumber, dan peta 115 unit |
| `docs/PENGUJIAN.md` | Hasil uji dan batas verifikasi |
| `tests/` | Pemeriksaan mesin, aset/cache simulasi, dan alur DOM |

## Mengubah materi

Ubah `js/content.js`. Setiap pelajaran memiliki tiga contoh, satu soal pola, satu isian, penjelasan, dan petunjuk. Mesin menghasilkan lima soal dari data itu. Isian bisa mempunyai beberapa jawaban yang sah. Untuk mengubah jumlah soal, sesuaikan mesin dan validator yang saat ini mengharapkan lima soal.

Pertahankan ID pelajaran agar cadangan lama tetap cocok. Perubahan struktur progres memerlukan versi baru dan migrasi yang diuji. Materi buku sumber tidak disertakan; gunakan contoh dan latihan baru saat menambah isi.

Setelah mengubah aset, naikkan `VERSION` di `sw.js`. Versi baru akan aktif ketika tab lama tidak lagi memakai service worker sebelumnya; tutup tab lama, lalu buka lagi. Jangan menambahkan PDF sumber atau cadangan progres pribadi ke repositori publik.

## Pemeriksaan pengembang (opsional)

Website produksi tidak membutuhkan npm. Tes mesin dan aset hanya memakai Node.js:

```bash
node tests/check.cjs
node tests/static.cjs
```

Tes DOM membutuhkan dependensi pengujian `jsdom`, tidak disertakan dan tidak dipakai oleh website:

```bash
npm install --no-save jsdom
node tests/dom-flow.cjs
```

Gunakan Node.js yang memenuhi persyaratan versi jsdom yang dipasang. Tes DOM memakai simulasi audio/dialog/WebMCP; tes ini bukan pemeriksaan visual browser. Lihat `docs/PENGUJIAN.md` untuk hal yang masih perlu diperiksa pada perangkat nyata.

## Sumber dan batas

Topik dipetakan ke *Essential Grammar in Use with Answers*, Raymond Murphy, edisi keempat, Cambridge University Press, 2015. Penjelasan, contoh, dan soal aplikasi ditulis baru. Website independen dan tidak berafiliasi dengan penulis/penerbit. Buku sumber tidak disalin ke paket.

Seluruh 318 halaman PDF yang tersedia ditelaah. Halaman PDF 241 kosong; halaman cetak 278 pada Study Guide tidak tersedia. Detailnya ada di catatan cakupan.

Website membantu dasar tata bahasa, kosakata, dan praktik awal. Website tidak menggantikan semua latihan mendengarkan, interaksi manusia, tulisan bebas, atau kursus lengkap empat keterampilan; tidak memberikan sertifikat atau janji “langsung lancar”.
