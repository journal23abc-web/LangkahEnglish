# Langkah English

Satu aplikasi dengan satu `index.html` dan dua modul:

- **Grammar:** 123 pelajaran, 615 latihan inti, kosakata, dan percakapan awal. Memakai pembaruan bahasa sederhana.
- **IELTS Writing:** Academic Task 1 dan Task 2, 20 pelajaran, 16 tugas menulis, draf, revisi, catatan salah, dan simulasi. Menggunakan IELTS 19 Academic sebagai buku utama.

## Buka aplikasi

Ekstrak ZIP seluruhnya, lalu buka `index.html` pada folder paling luar. Modul dibuka di dalam aplikasi yang sama. Pilihan di kanan atas memindahkan modul; **Semua modul** membuka beranda bersama.

Paket tidak memerlukan npm, API key, akun, atau proses build. Materi disimpan terpisah sebagai JavaScript, CSS, dan gambar agar mudah dikembangkan. Satu HTML di sini berarti satu pintu masuk aplikasi, bukan menumpuk seluruh materi dan gambar ke dalam satu berkas raksasa.

Untuk penggunaan rutin, pakai alamat tetap seperti GitHub Pages. Dari folder ini, server lokal juga dapat dipakai:

```bash
python3 -m http.server 8080
```

Lalu buka `http://localhost:8080/`. Aplikasi tidak memerlukan layanan Python untuk menjalankan latihan; server ini hanya menyajikan file.

## Perpindahan dan penyimpanan

Alamat aplikasi menyertakan nama modul, misalnya:

- `index.html#grammar/lesson/f01`
- `index.html#writing/writer/b11`

Satu router mengelola riwayat halaman. Tampilan dan kode kedua modul diisolasi dalam frame internal yang kerangkanya berasal dari `entry.js`, sehingga nama elemen, gaya, dan fungsi modul tidak saling menimpa. Tidak ada HTML tambahan yang harus dibuka pengguna.

Kunci data Grammar memakai `langkah-english-v1:` ditambah folder aplikasi utama, sama dengan versi Grammar lama jika alamat situsnya dipertahankan. Writing memakai `langkah-writing-v1:` ditambah folder utama yang sama. Keduanya berbeda, sehingga draf Writing tidak menimpa progres Grammar.

Data Writing dari folder `langkah-writing/` di dalam atau di samping folder aplikasi akan disalin jika satu sumber lama ditemukan pada browser dan asal situs yang sama. Sumber lama tidak dihapus. Jika ada beberapa sumber, atau browser memisahkan penyimpanan file lokal, gunakan cadangan secara manual. Pemindahan antarperangkat atau antarasal situs juga memerlukan file cadangan.

Timer Writing menggunakan waktu berakhir yang tersimpan. Berpindah ke Grammar tidak otomatis menjeda waktu. Saat kembali ke Writing, sisa waktu dihitung dari jam perangkat.

## Satu cadangan untuk seluruh aplikasi

Di **Cadangan & hasil**, kamu dapat:

- Mengunduh satu cadangan semua modul.
- Mengunduh cadangan modul tertentu yang kompatibel dengan format modulnya.
- Memulihkan cadangan gabungan atau cadangan Grammar/Writing dari paket lama.

Data yang dipulihkan diperiksa dengan validator masing-masing modul sebelum penyimpanan dimulai. Nama modul yang akan diganti ditampilkan dalam konfirmasi. Modul lain tetap tersimpan. Jika penulisan gagal, aplikasi mencoba mengembalikan data sebelumnya dan melaporkan apabila pemulihan itu gagal.

Pemulihan Writing mengembalikan timer dalam keadaan jeda. Setelah memulihkan, muat ulang modul pada tab lain jika ada. File cadangan memuat tulisan dan catatan pribadi; simpan atau bagikan sesuai kebutuhanmu.

## Menambah modul

Daftar modul berada di `modules/registry.js`. Sediakan folder modul baru, `entry.js`, materi/fungsi modul, validator cadangan, dan satu objek pendaftaran. Modul mengikuti kontrak navigasi dan penyimpanan yang sama. Kode router tidak perlu ditambah dengan kasus khusus untuk setiap modul baru.

Petunjuk rinci: `docs/MENAMBAH-MODUL.md`.

Setelah menambah atau mengubah aset, jalankan:

```bash
python3 tools/build_cache.py
```

Skrip membuat ulang daftar cache dan versi berdasarkan isi aset. Hanya satu service worker di akar aplikasi yang menyimpan aset seluruh modul. Paket yang dikirim sudah memiliki daftar cache terbaru, sehingga pengguna tidak perlu menjalankan perintah ini untuk mulai belajar.

## GitHub Pages

Upload **isi** folder paket ini ke akar repositori atau ke satu subfolder pilihan. Pertahankan susunan `index.html`, `modules`, `js`, `css`, `assets`, `manifest.webmanifest`, dan `sw.js`. Aktifkan GitHub Pages dari cabang dan folder yang dipilih.

Untuk mempertahankan progres Grammar di alamat lama, ganti isi paket pada folder situs yang sama. Unduh cadangan sebelum mengganti versi. Tutup tab versi lama lalu buka lagi agar service worker dan cache yang baru aktif. Progres berada dalam penyimpanan browser dan tidak ikut dihapus ketika cache aset versi lama dibersihkan.

Saat dibuka melalui HTTPS atau localhost, aset disimpan untuk pemakaian tanpa internet setelah pemasangan cache berhasil. Pembukaan `file://` memakai file yang sudah diekstrak dan tidak memasang service worker. Perilaku penyimpanan file lokal serta frame perlu diperiksa pada browser yang dipakai.

## Pengujian

Jalankan dari folder proyek:

```bash
node tests/hub.cjs
node tests/modules.cjs
node tests/host-flow.cjs
node modules/grammar/tests/check.cjs
node modules/writing/tests/check.cjs
node modules/writing/tests/flow.cjs
```

Tes tidak membutuhkan npm. Hasil dan batas verifikasi ada di `docs/PENGUJIAN.md`. Lingkungan pengerjaan tidak memiliki browser grafis; pengujian interaksi menggunakan fixture. Tampilan dan perilaku pada browser/perangkat nyata perlu diperiksa saat digunakan.

## Isi dan sumber pembelajaran

Sumber dan batas tiap modul ada pada folder `docs` di dalam modul, serta menu Panduan dalam modulnya. Aplikasi tidak memberikan band IELTS otomatis atau jaminan tingkat kemampuan. Dokumen pengujian versi dasar tetap disertakan sebagai catatan; status integrasi terbaru berada di `docs/PENGUJIAN.md` pada akar paket.
