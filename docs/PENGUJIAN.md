# Pemeriksaan integrasi dua modul

## Hasil yang diperiksa

- Paket memiliki tepat satu berkas `.html`, yaitu `index.html` di akar.
- Registry berisi Grammar dan Writing dengan folder serta kunci penyimpanan yang berbeda.
- Konfigurasi modul ketiga dapat dibaca router dan memperoleh ruang penyimpanan berbeda tanpa menambah percabangan di router.
- Rute Grammar, Writing, halaman utama, cadangan, dan panduan dikenali. Rute asing atau alamat yang memuat kode/penelusuran folder ditolak.
- Kerangka setiap modul mempunyai base URL ke foldernya sendiri. Semua CSS, skrip, dan aset yang dirujuk tersedia.
- Tautan pelajaran dihubungkan ke alamat aplikasi utama. Perintah navigasi dari host diterima, sedangkan pesan dari sumber atau modul yang berbeda ditolak.
- Frame tidak mengganti hash lokasinya sendiri. Riwayat halaman dikelola oleh jendela utama.
- Progres Grammar lama pada kunci asal tetap dibaca di lokasi situs yang sama.
- 144 halaman Grammar dan 46 halaman Writing dirender dengan konteks `about:srcdoc`, tanpa nilai `undefined` yang tidak sengaja.
- Perpindahan dari Grammar ke Writing dan kembali mempertahankan progres, draf, dan timer pada kunci yang berbeda.
- Cadangan gabungan serta cadangan lama Grammar/Writing dikenali. Cadangan modul yang belum tersedia ditolak dengan penjelasan.
- Jika penulisan modul kedua gagal, penulisan modul pertama dikembalikan ke keadaan sebelumnya dalam simulasi penyimpanan.
- Hanya ada satu service worker dan daftar cache mencakup beranda serta aset kedua modul.
- Pemeriksaan mesin Grammar, materi Writing, jadwal, timer, validasi cadangan, draf, riwayat versi, simulasi, dan penghapusan versi tetap lulus.

## Menjalankan pemeriksaan

```bash
node tests/hub.cjs
node tests/modules.cjs
node tests/host-flow.cjs
node modules/grammar/tests/check.cjs
node modules/writing/tests/check.cjs
node modules/writing/tests/flow.cjs
```

Tes tidak memerlukan pemasangan dependensi.

## Batas verifikasi

Lingkungan pengerjaan tidak mempunyai browser grafis yang dapat dipakai untuk uji nyata. Pengujian rute dan interaksi menggunakan fixture DOM. Hasil ini tidak membuktikan tata letak sempurna, aksesibilitas lengkap, perilaku penyimpanan `file://` di semua browser, atau instalasi offline pada setiap perangkat.

Periksa pada browser yang dipakai: masuk kedua modul; klik pelajaran; tombol kembali/maju; buka tautan pada tab baru; pindah modul dengan draf aktif; timer sesudah pindah modul; unduhan dan pembukaan cadangan; tampilan ponsel; navigasi keyboard; serta pemakaian tanpa internet setelah pemasangan melalui HTTPS. Bila penyimpanan lokal file dipisahkan atau diblokir browser, gunakan alamat HTTP/HTTPS tetap dan file cadangan.

Data belajar tidak dikirim ke server oleh host. Tautan sumber, suara daring yang diizinkan dalam Grammar, serta perilaku layanan browser dapat memerlukan internet sesuai pengaturan modul.
