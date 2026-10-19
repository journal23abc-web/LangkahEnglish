> Catatan versi dasar modul. Untuk hasil dan batas pengujian paket terpadu terbaru, lihat docs/PENGUJIAN.md pada akar aplikasi.

# Pemeriksaan paket

Pemeriksaan dilakukan pada kode yang dikemas dalam ZIP.

## Hasil yang diperiksa otomatis

- 20 pelajaran dengan ID unik dan 60 pertanyaan; setiap pertanyaan memiliki tiga pilihan unik, satu indeks jawaban sah, alasan, dan bidang keterampilan yang dikenal.
- 16 tugas: delapan tugas buku dan delapan latihan baru. Delapan contoh baru memenuhi minimum 150 atau 250 kata menurut penghitung aplikasi.
- Gambar yang dirujuk tersedia, dan data persentase latihan baru berjumlah 100%.
- Perkiraan kata dan paragraf, pemeriksaan batas minimum, serta tidak adanya nilai band otomatis.
- Jadwal melewati bulan kabisat, kembali besok setelah kesalahan, dan tidak meloncat karena penyimpanan pada tanggal yang sama.
- Timer berdasarkan selisih waktu nyata, fungsi jeda, dan batas nol.
- Cadangan dibangun ulang hanya dari bidang dan ID yang dikenal; bidang asing diabaikan, data prototipe tidak dipakai, jam dipulihkan sebagai jeda, dan tanggal/riwayat yang diperlukan diperiksa.
- Seluruh aset dalam daftar cache ada; service worker membatasi permintaan ke GET dalam folder situsnya sendiri.
- 46 rute dirender dengan fixture DOM tanpa nilai `undefined` atau `NaN` yang tidak sengaja.
- Pilihan yang diperbaiki tidak mengubah catatan jawaban pertama; penyimpanan berulang tidak menggandakan usaha pelajaran.
- Draf, versi awal, revisi, catatan bantuan, pemulihan versi, pengunduhan tulisan, dan pemuatan ulang data.
- Simulasi menutup rencana/contoh untuk dua tugas terkait, memiliki pasangan rute yang benar, dan jam dapat dijeda atau diakhiri.
- Teks tulisan pengguna ditampilkan sebagai teks yang di-escape, bukan dijalankan sebagai HTML.

Perintah:

```bash
node tests/check.cjs
node tests/flow.cjs
```

## Pemeriksaan isi dan gambar

Identitas buku, delapan halaman soal, contoh jawaban, komentar pemeriksa, dan band contoh diperiksa terhadap lampiran. Empat potongan diagram diperiksa secara visual agar judul, label, dan data yang diperlukan tidak terpotong. Penjelasan, tugas baru, serta contoh dibuat baru dan diperiksa kesesuaiannya dengan informasi yang ditampilkan.

## Batas verifikasi

Tidak tersedia browser grafis lokal untuk menjalankan pengujian visual dan interaksi browser nyata. Pengujian DOM menggunakan fixture, sehingga tidak membuktikan tata letak sempurna, perilaku klik/unduh di setiap browser, aksesibilitas lengkap, atau keberhasilan instalasi PWA pada semua perangkat.

Hal yang perlu diperiksa saat dipakai pada perangkat nyata: ukuran teks dan gambar di ponsel, pembesaran grafik, pilihan file PDF, penyimpanan pada mode privat, unduhan cadangan, timer setelah perangkat tidur, navigasi keyboard, dan penyimpanan offline melalui HTTPS. Tidak ada pengujian empiris terhadap kenaikan nilai IELTS atau efektivitas pedagogis modul.
