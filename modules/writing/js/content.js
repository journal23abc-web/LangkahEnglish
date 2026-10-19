/* Penjelasan dan latihan baru. Peta ke IELTS 19 Academic ada di docs/SUMBER.md. */
(function(){
const q=(prompt,options,answer,why,tag)=>({prompt,options,answer,why,tag});
const lesson=(id,task,title,goal,points,example,meaning,qs,write,model,ref)=>({id,task,title,goal,points,example,meaning,qs,write,model,ref});
const lessons=[
lesson('w01','dasar','Kenali tugasmu','Bedakan tugas menulis laporan dan menyampaikan pendapat.',[
'Task 1: jelaskan informasi dalam gambar. Tulis sedikitnya 150 kata dan sisihkan sekitar 20 menit.',
'Task 2: jawab pertanyaan dengan pendapat dan alasan. Tulis sedikitnya 250 kata dan sisihkan sekitar 40 menit.',
'Task 2 berbobot dua kali Task 1. Batas minimum kata bukan target mutu. Jangan mengejar jumlah kata sampai lupa menjawab soal.'
],'Task 1 reports information. Task 2 develops an argument.','Task 1 melaporkan informasi. Task 2 mengembangkan pendapat.',[
q('Grafik menunjukkan jumlah pengunjung. Apa yang harus kamu tulis?',['Alasan pribadi mengapa orang datang','Informasi utama dan perbandingan pada grafik','Cerita pengalaman ke tempat itu'],1,'Semua informasi Task 1 berasal dari gambar. Jangan menambah dugaan penyebab.','data'),
q('Pembagian latihan yang sesuai bobot ujian adalah…',['Menangani Task 1 saja','Memberi porsi besar untuk Task 2 sambil tetap melatih Task 1','Mengabaikan grammar selama kata cukup'],1,'Task 2 punya bobot dua kali Task 1. Keduanya tetap harus dikerjakan.','task'),
q('Tulisan Task 1 berjumlah 186 kata. Kesimpulan yang tepat?',['Pasti melanggar batas 180 kata','Pasti mendapat nilai tinggi','Periksa isi dan waktu; 180 bukan batas resmi'],2,'Aturan menyebut minimum 150 kata. Tulisan panjang tetap harus relevan dan tidak menghabiskan waktu Task 2.','task')
],'Tulis dalam bahasa Indonesia: apa bedanya Task 1 dan Task 2, dan bagaimana kamu membagi 60 menit?','Task 1 menjelaskan gambar dengan sedikitnya 150 kata dalam sekitar 20 menit. Task 2 menjawab pertanyaan dengan alasan, sedikitnya 250 kata dalam sekitar 40 menit.','Buku hlm. 6; format resmi IELTS'),
lesson('w02','dasar','Nilai isi sebelum kosakata','Kenali empat hal yang dinilai pemeriksa.',[
'Menjawab tugas: informasi atau pertanyaan yang diminta benar-benar ditangani.',
'Susunan tulisan: pembaca bisa mengikuti hubungan ide dan paragraf.',
'Pilihan kata serta grammar: gunakan kata dan bentuk kalimat yang tepat. Kata sulit tidak menutupi alasan yang lemah.'
],'Clear reasons matter more than impressive-looking words.','Alasan yang jelas lebih berguna daripada kata yang terlihat hebat tetapi salah pakai.',[
q('Esai memakai kata sulit, tetapi hanya membahas satu sisi saat diminta dua sisi. Masalah utamanya?',['Belum menjawab seluruh tugas','Kurang banyak kata penghubung','Huruf terlalu sederhana'],0,'Task Response menilai apakah seluruh permintaan soal dijawab.','task'),
q('Paragraf tersusun acak dan berulang. Bidang yang paling perlu diperbaiki?',['Ejaan saja','Susunan dan hubungan ide','Panjang judul'],1,'Coherence and Cohesion menilai urutan ide dan hubungan antarbagian.','organise'),
q('Aplikasi menghitung kata dan menemukan tiga paragraf. Apakah itu cukup untuk menentukan band?',['Ya, pasti','Ya, jika lebih dari 250 kata','Tidak; mutu isi dan bahasa tetap perlu dibaca'],2,'Pemeriksaan bentuk tulisan tidak sama dengan penilaian IELTS oleh pemeriksa.','accuracy')
],'Tulis dua kelemahan yang ingin kamu cari pada tulisanmu. Sebutkan cara memeriksanya.','Saya akan mengecek apakah semua bagian pertanyaan terjawab. Setelah itu saya akan membaca kalimat pertama setiap paragraf untuk melihat apakah urutan idenya masuk akal.','Buku hlm. 8, 128–138; kriteria resmi IELTS'),
lesson('w03','dasar','Baca pertanyaan sampai tuntas','Ubah soal menjadi daftar hal yang harus dijawab.',[
'Lingkari topiknya, orang atau kelompok yang dibicarakan, dan perintah pertanyaannya.',
'Discuss both views and give your opinion berarti jelaskan dua pandangan dan berikan pendapatmu.',
'To what extent do you agree or disagree meminta seberapa jauh kamu setuju. Jangan otomatis memakai kerangka dua pandangan untuk semua soal.'
],'Some prefer fixed schedules; others value flexibility. Discuss both views and give your opinion.','Perlu membahas jadwal tetap, keluwesan, dan pendapatmu sendiri.',[
q('Soal meminta discuss both views and give your opinion. Rencana yang lengkap?',['Dua pandangan dan pendapat sendiri','Pendapat sendiri saja','Manfaat satu pandangan saja'],0,'Ketiga bagian ini harus terlihat dalam jawaban.','task'),
q('Soal tentang everyone, including young people. Bagian yang tidak boleh hilang?',['Hanya orang tua','Hanya pekerja bergaji besar','Kelompok muda juga harus diperhatikan'],2,'Batas kelompok dalam pertanyaan mengarahkan isi argumenmu.','task'),
q('Apa fungsi kata to what extent?',['Meminta daftar angka','Meminta tingkat persetujuanmu','Meminta cerita masa lalu'],1,'Kamu bisa setuju penuh, sebagian, atau tidak setuju, selama posisi dan alasan jelas.','position')
],'Buat daftar tiga kewajiban jawaban untuk soal jadwal tetap dan fleksibel di atas.','Saya harus menjelaskan alasan mendukung jadwal tetap, alasan mendukung jadwal fleksibel, dan posisi saya tentang pilihan yang lebih baik.','Buku soal hlm. 31, 53, 76, 97'),
lesson('w04','dasar','Rencanakan sebelum menulis','Pilih dua ide yang bisa dijelaskan, lalu urutkan.',[
'Untuk esai, tulis posisi, alasan pertama, alasan kedua, dan arah kesimpulan sebelum membuat kalimat panjang.',
'Satu alasan yang dijelaskan sampai akibatnya lebih berguna daripada lima alasan yang hanya disebutkan.',
'Coba 5 menit rencana, 30 menit menulis, 5 menit memeriksa untuk Task 2. Ini pembagian latihan, bukan aturan wajib IELTS.'
],'Position → reason → explanation → example → conclusion','Tentukan pendapat, jelaskan mengapa, lalu tunjukkan cara alasan itu bekerja.',[
q('Mana rencana paragraf yang lebih kuat?',['Sehat, murah, bagus, modern','Belajar daring memotong perjalanan sehingga pekerja punya waktu belajar; beri contoh','Belajar daring itu bagus sekali'],1,'Alasan kedua bisa dijelaskan melalui hubungan sebab dan akibat yang nyata.','develop'),
q('Saat merencanakan, dua alasan menyampaikan hal yang sama. Apa yang kamu lakukan?',['Ulangi dengan kosakata lebih sulit','Tambahkan furthermore','Gabungkan atau cari alasan yang berbeda'],2,'Mengganti kata tidak membuat ide baru.','develop'),
q('Kerangka empat paragraf adalah…',['Salah satu pilihan susunan','Satu-satunya susunan yang dinilai benar','Jaminan Band 7'],0,'Jumlah paragraf mengikuti hubungan ide. Pemeriksa menilai mutu susunannya.','organise')
],'Buat rencana esai singkat: apakah perpustakaan perlu membuka layanan sampai malam? Tulis posisi dan dua alasan berbeda.','Saya setuju dengan jam malam pada beberapa hari. Alasan pertama: pekerja dapat datang setelah jam kerja. Alasan kedua: ruang belajar yang tenang membantu pelajar yang rumahnya ramai. Kesimpulan: jam tambahan berguna jika biaya dan petugas tersedia.','Buku komentar hlm. 129, 131–132; rancangan latihan aplikasi'),
lesson('w05','task2','Nyatakan pendapat yang jelas','Buat jawaban langsung terhadap pertanyaannya.',[
'Nyatakan apa yang kamu setujui, bukan hanya mengatakan topiknya menarik atau rumit.',
'Posisi boleh memiliki syarat. Jelaskan syarat itu sejak awal dan pertahankan sampai akhir.',
'Saat memeriksa, bandingkan pembukaan dan kesimpulan. Keduanya harus menjawab pertanyaan yang sama.'
],'I support later library hours on weekdays, provided that staffing costs remain manageable.','Saya mendukung jam lebih malam pada hari kerja, dengan syarat biaya petugas masih terjangkau.',[
q('Mana posisi yang paling jelas?',['Libraries are a topic in modern society.','There are advantages and disadvantages.','I support longer opening hours because they improve access for working adults.'],2,'Kalimat ini menjawab apakah kamu mendukung dan mengapa.','position'),
q('Pembukaan mendukung tabungan teratur. Kesimpulan mengatakan menabung tidak perlu sama sekali. Masalahnya?',['Pendapat tidak konsisten','Kurang idiom','Kurang tanda seru'],0,'Kesimpulan harus merangkum alasan yang sudah kamu bangun.','finish'),
q('Setuju dengan syarat tertentu berarti…',['Kamu tidak boleh punya kesimpulan','Syarat perlu dijelaskan dan dipertahankan','Kamu wajib membahas semua kemungkinan'],1,'Pendapat bersyarat tetap jelas jika syaratnya tidak bergeser.','position')
],'Tulis satu kalimat pendapat tentang perpustakaan buka malam, lalu satu kalimat kesimpulan yang sejalan.','I support longer evening hours because they make libraries accessible to full-time workers. For this reason, libraries should offer evening services where local demand justifies the cost.','Buku komentar hlm. 129, 134–135'),
lesson('w06','task2','Kembangkan alasan','Hubungkan klaim, penjelasan, dan contoh.',[
'Kalimat utama menyebut alasan. Kalimat berikutnya menjelaskan bagaimana atau mengapa alasan itu masuk akal.',
'Contoh harus memperjelas penjelasan, bukan memperkenalkan topik lain.',
'Contoh sederhana atau situasi masuk akal cukup. Jangan menciptakan hasil penelitian atau persentase seolah-olah fakta nyata.'
],'Evening access helps workers. They can visit after their shifts, so borrowing books does not require taking leave.','Alasannya tidak berhenti pada membantu pekerja; ada penjelasan tentang waktu dan cuti.',[
q('Klaim: transportasi murah memperluas akses kerja. Penjelasan yang cocok?',['Banyak kota punya warna bus berbeda','Ongkos rendah memungkinkan pelamar menerima pekerjaan yang lebih jauh','Transportasi ada sejak dahulu'],1,'Penjelasan menghubungkan biaya perjalanan dengan jangkauan pekerjaan.','develop'),
q('Contoh yang paling aman saat tidak punya data penelitian?',['Sebut studi palsu dari universitas terkenal','Buat angka 89%','Gunakan situasi yang masuk akal tanpa mengakuinya sebagai statistik'],2,'Contoh boleh berasal dari pengetahuan atau pengalaman. Tidak perlu mengarang bukti ilmiah.','accuracy'),
q('Paragraf berisi tiga klaim tanpa penjelasan. Langkah revisi pertama?',['Pilih satu klaim dan jelaskan cara kerjanya','Tambahkan tiga klaim lagi','Ganti semua kata dengan sinonim'],0,'Pengembangan ide membutuhkan detail yang relevan.','develop')
],'Kembangkan ide transportasi murah dalam tiga kalimat bahasa Inggris: alasan, penjelasan, contoh.','Affordable buses can widen access to employment. When travel costs fall, workers can consider vacancies beyond their immediate neighbourhood. For example, a shop assistant may be able to accept a job across town without spending most of the extra pay on transport.','Buku komentar hlm. 129, 132, 137–138'),
lesson('w07','task2','Bahas dua pandangan dengan adil','Jelaskan alasan kedua sisi sebelum menilai.',[
'Tampilkan alasan terbaik yang masuk akal bagi setiap pandangan. Jangan membuat salah satunya terdengar bodoh agar mudah disanggah.',
'Pendapatmu boleh muncul sejak pembukaan dan diperjelas saat membandingkan.',
'Membahas bagaimana bekerja sama saja belum tentu menjawab mengapa kerja sama lebih baik daripada persaingan.'
],'Fixed schedules improve coordination, whereas flexible hours can accommodate different personal needs.','Kedua sisi punya alasan yang relevan, lalu kamu bisa menjelaskan penilaianmu.',[
q('Dua pandangan diminta, tetapi esai hanya menjelaskan cara memakai jadwal fleksibel. Apa yang hilang?',['Alasan mendukung jadwal tetap dan penilaian kedua sisi','Alamat pembaca','Judul panjang'],0,'Jelaskan mengapa tiap pandangan didukung, bukan sekadar cara melakukannya.','task'),
q('Cara adil membahas sisi yang tidak kamu dukung?',['Abaikan','Jelaskan manfaat masuk akal lalu nilai keterbatasannya','Sebut semua pendukungnya malas'],1,'Penilaian yang kuat berangkat dari penjelasan yang akurat.','develop'),
q('Kata whereas pada contoh menunjukkan…',['Tambahan yang sama','Urutan waktu','Perbedaan dua kondisi'],2,'Pilih penghubung sesuai hubungan makna.','organise')
],'Tulis dua kalimat: alasan memilih jadwal tetap dan alasan memilih jadwal fleksibel. Tutup dengan pilihanmu.','Fixed hours make it easier for colleagues to meet and share information. Flexible schedules, however, help employees manage caring responsibilities. I favour flexible hours with a shared period for team meetings.','Buku Test 1 Task 2; komentar hlm. 129'),
lesson('w08','task2','Setuju tanpa memaksakan dua sisi','Jawab seberapa jauh kamu setuju.',[
'Pada soal agree/disagree, kamu tidak wajib menulis satu paragraf mendukung dan satu menolak.',
'Jika setuju penuh, dua alasan yang berbeda bisa menjadi dua paragraf isi.',
'Jika setuju sebagian, jelaskan batas persetujuan. Jangan mengubahnya menjadi posisi baru di akhir.'
],'I agree that teenagers should learn to budget, although those without an income cannot be expected to save regularly.','Setuju sebagian: penting belajar mengatur uang, tetapi kemampuan menyisihkan uang bergantung pada penghasilan.',[
q('Pada soal agree/disagree, argumen tandingan…',['Wajib dalam semua esai','Tidak wajib, tetapi bisa dipakai jika membantu jawaban','Dilarang'],1,'Komentar pemeriksa Test 2 menyatakan argumen tandingan tidak diperlukan untuk jenis soal itu.','task'),
q('Setuju penuh bisa dikembangkan lewat…',['Dua alasan berbeda yang mendukung posisi','Pembukaan setuju lalu akhir menolak','Daftar ide tanpa paragraf'],0,'Susunan harus mendukung jawaban terhadap pertanyaan.','position'),
q('Syarat dalam pendapat sebaiknya…',['Disembunyikan sampai akhir','Tidak dijelaskan','Diterangkan bersama alasan yang relevan'],2,'Pembaca perlu memahami batas posisimu.','develop')
],'Tulis posisi untuk soal: semua sekolah sebaiknya menyediakan sarapan gratis. Pilih tingkat persetujuan dan satu alasan.','I partly agree that schools should provide free breakfasts. This support is especially valuable in low-income areas, although funding it for every student may be less urgent where most families can already provide a healthy meal.','Buku Test 2 Task 2; komentar hlm. 131–132'),
lesson('w09','task2','Satu paragraf, satu fokus','Buat pembaca tahu pekerjaan tiap paragraf.',[
'Kelompokkan kalimat yang mengembangkan satu alasan. Pindah paragraf ketika fokusnya benar-benar berganti.',
'Satu kalimat kesimpulan jangan dipecah menjadi beberapa paragraf hanya agar tampak rapi.',
'Baca hanya kalimat pertama setiap paragraf. Apakah urutan argumennya masih bisa diikuti?'
],'Lower fares improve access to work. Another benefit is reduced pressure on household budgets.','Dua manfaat ini dapat menjadi dua fokus paragraf, masing-masing dengan penjelasan.',[
q('Ada enam paragraf yang masing-masing hanya satu kalimat penutup. Revisi yang tepat?',['Biarkan karena makin banyak paragraf makin baik','Gabungkan sesuai ide dan kembangkan yang perlu','Tambahkan nomor pada setiap paragraf'],1,'Paragraf membagi ide, bukan menghitung banyak bagian.','organise'),
q('Kapan mulai paragraf baru?',['Setelah setiap kata however','Setelah tepat 50 kata','Saat berpindah ke fokus yang berbeda'],2,'Pemisahan mengikuti hubungan ide.','organise'),
q('Esai satu blok panjang tanpa pemisahan alasan terutama menyulitkan…',['Pembaca mengikuti susunan argumen','Penghitungan judul','Penulisan angka'],0,'Komentar Test 1 Task 2 menyoroti ketiadaan paragraf.','organise')
],'Tulis tiga kalimat pembuka paragraf untuk esai tentang transportasi umum murah: pendapat, alasan pertama, alasan kedua.','I support lower public transport fares because they can improve access to work and ease household spending. Lower fares allow people to apply for jobs further from home. They also leave families with more money for essential needs.','Buku komentar hlm. 129, 135, 137'),
lesson('w10','task2','Tutup dengan jawaban yang sama','Rangkum penilaianmu tanpa menambah alasan baru.',[
'Kesimpulan merangkum posisi dan alasan yang benar-benar sudah dijelaskan.',
'Jangan mengubah esai menjadi nasihat kepada pembaca jika pertanyaannya meminta penilaianmu.',
'Ide baru di akhir belum memiliki penjelasan. Pindahkan ke isi atau hapus.'
],'In conclusion, lower fares are worthwhile because they widen access to jobs and reduce essential travel costs.','Kesimpulan kembali ke alasan yang sudah ada, bukan membuka topik lain.',[
q('Esai membahas pilihan makanan dan ketersediaan sepanjang tahun. Kesimpulan tiba-tiba membahas diplomasi budaya. Masalahnya?',['Terlalu sedikit kata sulit','Alasan penutup belum dibangun dalam isi','Kurang tanda koma'],1,'Ini sejalan dengan masalah kesimpulan dalam komentar Test 4 Task 2.','finish'),
q('Penutup terbaik untuk pendapat bersyarat adalah…',['Merangkum posisi beserta syaratnya','Memilih sisi sebaliknya tanpa alasan','Memberi nasihat hidup umum'],0,'Kesimpulan harus sejalan dengan jawaban yang dibangun.','position'),
q('Ada ide bagus baru di kesimpulan. Kamu sebaiknya…',['Mempertahankannya tanpa penjelasan','Menjadikannya judul','Mengembangkannya dalam isi atau menghapusnya'],2,'Pembaca membutuhkan penjelasan sebelum penilaian akhir.','finish')
],'Buat kesimpulan dua kalimat untuk esai transportasi murah dengan alasan akses kerja dan anggaran keluarga.','In conclusion, affordable public transport can improve access to jobs while reducing pressure on household budgets. Cities should therefore consider lower fares alongside the funding needed to maintain reliable services.','Buku komentar hlm. 129, 134–135, 137–138'),
lesson('w11','task2','Pilih kata yang tepat','Perjelas arti sebelum mencari variasi.',[
'Ganti kata samar seperti things dengan kata yang menjelaskan benda atau gagasannya: products, costs, atau skills.',
'Jangan mengganti kata kunci dengan sinonim yang mengubah makna. Food, goods, dan products tidak selalu saling menggantikan.',
'Variasi kalimat berguna jika tetap benar. Kalimat rumit yang salah bisa mengaburkan alasan.'
],'Imported food can widen consumer choice.','Kalimat pendek ini punya arti yang jelas. Tidak perlu dibuat lebih rumit tanpa tujuan.',[
q('Topiknya makanan impor. Penggantian yang menjaga cakupan?',['All foreign technology','Food imported from other countries','Every international product'],1,'Cakupan makanan harus tetap sama.','range'),
q('We can buy many things. Perbaikan yang lebih tepat untuk topik makanan?',['We can purchase diverse imported food products.','We can enjoy numerous matters.','We can obtain many existences.'],0,'Pilih kata yang sesuai konteks. Panjang dan kesulitan bukan tujuan utama.','range'),
q('Apa bukti grammar yang lebih meyakinkan?',['Satu kalimat panjang dengan banyak kesalahan','Banyak titik koma acak','Beragam kalimat yang tetap akurat dan mudah diikuti'],2,'Rentang bentuk kalimat dan ketepatannya dinilai bersama.','accuracy')
],'Perbaiki kalimat ini tanpa mengubah maksud: Imported things are good because people have more stuff to choose.','Imported food can benefit consumers by giving them a wider choice of products.','Buku komentar hlm. 129, 132, 135, 138'),
lesson('w12','task1','Baca gambar sebelum kalimat','Pastikan subjek, satuan, dan waktunya benar.',[
'Lihat judul, nama kategori, tahun, dan satuan. Jumlah orang berbeda dari persentase orang.',
'Pilih titik tertinggi, terendah, arah perubahan, atau perbedaan yang paling penting.',
'Task 1 tidak meminta alasan di luar gambar. Angka naik belum membuktikan mengapa orang makin suka kegiatan itu.'
],'The chart compares the number of visitors, not the percentage of residents.','Sebut satuannya dengan benar sebelum menggambarkan perubahannya.',[
q('Sumbu menunjukkan number of students. Mana satuan yang benar?',['Persen penduduk','Jumlah siswa','Jumlah sekolah'],1,'Nama satuan harus sama dengan gambar.','data'),
q('Grafik naik dari 10 ke 30 pengunjung. Kesimpulan yang didukung?',['Kenaikan karena iklan baru','Penduduk menjadi lebih kaya','Jumlah pengunjung bertambah 20'],2,'Selisih angkanya terlihat. Penyebabnya tidak diberikan.','accuracy'),
q('Tidak ada tahun pada diagram proses umum. Pilihan awal yang wajar?',['Present simple untuk menjelaskan prosesnya','Selalu past simple','Selalu will'],0,'Ikuti waktu yang ditunjukkan, bukan tanggal kamu mengerjakan latihan.','accuracy')
],'Buat daftar hal yang harus diperiksa sebelum menulis tentang grafik peserta kegiatan selama 20 tahun.','Saya akan memeriksa nama kegiatan, jumlah peserta sebagai satuan, tahun awal dan akhir, kegiatan paling banyak pesertanya, perubahan terbesar, dan kategori yang relatif tetap.','Buku Test 1 Task 1; komentar hlm. 128'),
lesson('w13','task1','Tulis gambaran besarnya','Pilih dua pesan utama untuk overview.',[
'Overview adalah ringkasan pola paling penting. Beri pembaca gambaran sebelum rincian angka.',
'Untuk grafik, pilih arah utama, kategori dominan, atau perbedaan besar. Untuk peta, jelaskan perubahan fungsi kawasan.',
'Untuk proses, rangkum tahap besar dan apakah proses berputar kembali. Jumlah anak panah saja tidak menjelaskan keseluruhannya.'
],'Overall, cycling became more common, while bus use changed little.','Ini merangkum dua pola. Rincian angkanya dapat dijelaskan sesudahnya.',[
q('Mana overview yang berisi pola utama?',['The chart has three colours.','In 2010, A was 12 and B was 17.','Overall, A increased sharply, whereas B remained broadly stable.'],2,'Overview merangkum pola, bukan ciri tampilan atau daftar angka.','overview'),
q('Overview peta yang berguna?',['There are two maps.','The area became more visitor-oriented, with additional leisure facilities.','The maps look interesting.'],1,'Kalimat kedua menjelaskan perubahan keseluruhan.','overview'),
q('Proses produksi yang kembali ke bahan awal sebaiknya diringkas sebagai…',['Siklus dengan tahap-tahap utama','Daftar warna diagram','Pendapat tentang pabrik'],0,'Komentar Test 3 meminta ringkasan tahap besar dan siklusnya.','process')
],'Tulis satu atau dua kalimat overview: pengguna sepeda naik, mobil turun, dan bus hampir tetap.','Overall, cycling became more popular while car use declined. Bus travel remained broadly stable throughout the period.','Buku komentar hlm. 128, 130, 133'),
lesson('w14','task1','Bandingkan, jangan daftar semua','Kelompokkan informasi yang membantu pembaca melihat pola.',[
'Gabungkan kategori yang punya arah mirip atau perbedaan penting. Jangan membuat satu kalimat untuk setiap angka tanpa hubungan.',
'Pakai angka sebagai bukti pola utama. Tetap liput bagian penting dari semua gambar.',
'Jika ada diagram lingkaran dan diagram batang, jangan mencampur persentase lokasi dengan jumlah peserta.'
],'Cycling rose from 20 to 45 users, while bus use stayed close to 40.','Dua angka ini menjelaskan perubahan dan perbandingan dalam satu kalimat.',[
q('Satu gambar menunjukkan lokasi (%), yang lain peserta (orang). Kamu perlu…',['Menjumlahkan persen dengan orang','Memakai satuan yang sesuai untuk tiap gambar','Mengabaikan gambar kedua'],1,'Setiap gambar punya pertanyaan dan satuan sendiri.','data'),
q('Cara lebih jelas membahas 12 angka?',['Tulis semuanya menurut urutan tanpa perbandingan','Ganti setiap angka dengan kata tinggi','Pilih pola utama dan angka pendukung, lalu bandingkan'],2,'Pelaporan mekanis menjadi salah satu kelemahan jawaban Test 4.','organise'),
q('Private studios 48%, college studios 10%. Pernyataan yang tepat?',['Private studios accounted for a much larger share.','College studios had most classes.','The two shares were equal.'],0,'Perbandingan sesuai nilai yang ditampilkan.','data')
],'Tulis satu perbandingan: sepeda 20 menjadi 45 pengguna; bus 39 menjadi 41 pengguna.','The number of cyclists more than doubled, rising from 20 to 45, whereas bus use changed only slightly, from 39 to 41.','Buku Test 4 Task 1; komentar hlm. 136'),
lesson('w15','task1','To, by, dan angka yang tepat','Bedakan nilai akhir dan besar perubahan.',[
'Rose to 50 berarti berakhir di 50. Rose by 20 berarti bertambah 20.',
'Naik dari 20% ke 30% berarti bertambah 10 poin persentase. Kenaikan relatifnya 50%, bukan 10%.',
'Gunakan about atau approximately saat grafik hanya memungkinkan pembacaan perkiraan. Jangan menyatakan angka pasti yang tidak terlihat.'
],'Membership rose from 30 to 50, an increase of 20.','Nilai akhirnya 50, sedangkan pertambahannya 20.',[
q('Nilai naik dari 30 menjadi 50. Pilih yang benar.',['It rose by 50.','It rose to 20.','It rose by 20.'],2,'By menyebut besar perubahan: 50 dikurangi 30 adalah 20.','accuracy'),
q('Persentase naik dari 20% ke 30%. Selisihnya…',['10 poin persentase','10% kenaikan relatif','30 poin persentase'],0,'Selisih persentase berbeda dari perubahan relatif terhadap nilai awal.','data'),
q('Garis berhenti sedikit di bawah 70 dan tidak ada label tepat. Tulis…',['Exactly 70.000','Just under 70','Exactly 68.274'],1,'Perkiraan jujur lebih tepat daripada ketepatan palsu.','accuracy')
],'Tulis dua versi kalimat bahasa Inggris untuk perubahan 40 menjadi 65: satu memakai to, satu memakai by.','The number rose to 65 from an initial figure of 40. It therefore increased by 25 over the period.','Buku komentar hlm. 128, tentang to dan by'),
lesson('w16','task1','Jelaskan perubahan pada peta','Catat yang berubah dan yang tetap.',[
'Gunakan arah mata angin, jalan, atau bangunan tetap sebagai acuan posisi.',
'Bedakan bangunan baru, bangunan pengganti, fasilitas yang pindah, dan fasilitas yang tetap.',
'Jangan menambah hotel kedua hanya karena ada tulisan private beach for the hotel. Pastikan setiap bangunan yang kamu sebut benar-benar ada.'
],'A café replaced the storage building, while the library remained in the same location.','Perubahan dan bagian yang tetap dijelaskan dengan acuan yang jelas.',[
q('Bangunan lama hilang dan kafe muncul di tempat yang sama. Tulis…',['The café was replaced by the old building.','A café replaced the old building.','Both buildings remained unchanged.'],1,'Urutan benda yang menggantikan dan yang digantikan harus benar.','data'),
q('Label pantai menyebut for the hotel. Apakah itu bukti ada hotel tambahan?',['Ya, pasti ada hotel kedua','Tidak ada hotel di peta','Tidak; periksa bangunan yang benar-benar ditampilkan'],2,'Kesalahan hotel tambahan dicatat pemeriksa pada Test 2 Task 1.','accuracy'),
q('Peta lama dibanding keadaan saat ini. Pilihan bahasa yang wajar?',['Was untuk keadaan lama dan has been added untuk perubahan sampai kini','Will untuk semua perubahan','Tidak perlu membedakan waktu'],0,'Waktu mengikuti label peta. Jangan menganggap today sebagai rencana masa depan.','accuracy')
],'Tulis dua kalimat: gudang di timur menjadi kafe; perpustakaan di utara tetap di tempatnya.','The storage building in the east has been converted into a café. The library in the north has remained in its original location.','Buku Test 2 Task 1; komentar hlm. 130'),
lesson('w17','task1','Ikuti alur proses','Jelaskan tahap dan hubungan, bukan menebak sainsnya.',[
'Ikuti anak panah, cabang, dan jalur yang kembali ke awal. Kelompokkan beberapa langkah menjadi tahap besar.',
'Kalimat pasif berguna saat tindakan lebih penting daripada pelakunya: The material is heated.',
'Gunakan label dan hubungan yang terlihat. Tidak perlu menambah penjelasan ilmiah dari luar diagram.'
],'The material is collected and processed before it is used as fuel.','Tindakan berurutan dijelaskan dengan bentuk pasif dan before.',[
q('After harvesting, the material ___ processed.',['is','are','be'],0,'Material pada kalimat ini tidak dihitung sebagai beberapa benda. Gunakan is processed.','accuracy'),
q('Diagram menunjukkan gas kembali dipakai tanaman. Gambaran besar yang tepat?',['Proses hanya bergerak satu arah tanpa hubungan','Produksi dan penggunaan bahan bakar menjadi bagian dari siklus','Gas hilang dari diagram'],1,'Jalur kembali harus terlihat dalam ringkasan.','process'),
q('Detail ilmiah yang tidak ada di diagram sebaiknya…',['Ditambahkan agar terlihat pintar','Dianggap wajib','Tidak dikarang sebagai bagian laporan'],2,'Task 1 melaporkan isi gambar, bukan pengetahuan tambahan.','accuracy')
],'Tulis satu kalimat overview untuk proses: bahan dikumpulkan, diolah menjadi bahan bakar, digunakan, lalu gas kembali diserap tanaman.','Overall, the cycle involves preparing plant material, converting it into fuel and using that fuel, with the released gas returning to growing plants.','Buku Test 3 Task 1; komentar hlm. 133'),
lesson('w18','task1','Periksa fakta sebelum kata','Audit laporan terhadap gambar aslinya.',[
'Untuk setiap angka, tanyakan: kategori apa, tahun mana, dan satuan apa?',
'Periksa arah naik atau turun serta kata seperti highest, doubled, dan unchanged.',
'Perbaiki klaim yang salah sebelum mempercantik gaya kalimat. Laporan yang lancar tetapi tidak akurat tetap bermasalah.'
],'A rose from 20 to 25; it increased slightly, not threefold.','Perubahan kecil tidak boleh disebut naik tiga kali lipat.',[
q('A naik 20 ke 25. Kata tripled adalah…',['Tepat','Tidak didukung angka','Wajib untuk variasi'],1,'Tiga kali nilai awal adalah 60, bukan 25.','accuracy'),
q('Dua kalimat salah: satu angka keliru, satu kurang bervariasi. Prioritas awal?',['Variasi kata dulu','Menambah panjang tulisan','Membetulkan fakta'],2,'Informasi yang tepat adalah dasar Task Achievement.','data'),
q('Grafik hanya menunjukkan persentase. Bolehkah menyimpulkan jumlah total orang naik?',['Tidak tanpa mengetahui total orangnya','Boleh selalu','Boleh jika memakai overall'],0,'Persentase bisa naik walaupun jumlah total turun.','data')
],'Buat daftar pemeriksaan untuk kalimat: The number tripled from 20% in 2010 to 25% in 2020.','Saya akan mengganti number dengan percentage atau share. Tripled salah karena naik dari 20% ke 25% hanya 5 poin persentase. Saya juga akan mengecek kategori dan kedua tahun pada gambar.','Buku komentar hlm. 128, 130, 136; kriteria Task Achievement'),
lesson('w19','dasar','Revisi satu masalah penting','Ubah tulisan, bukan hanya membaca koreksi.',[
'Simpan versi pertama sebelum melihat contoh. Tandai satu masalah isi dan satu masalah bahasa.',
'Tulis ulang bagian yang salah, lalu jelaskan apa yang berubah dan mengapa.',
'Catat pola kesalahan. Uji kembali pada soal baru agar perbaikannya tidak sekadar menghafal satu jawaban.'
],'Before: Public transport is good. After: Affordable buses allow workers to consider jobs beyond their neighbourhood.','Revisi menambah hubungan alasan dengan akibatnya.',[
q('Setelah membaca komentar, langkah yang menunjukkan latihan?',['Menulis ulang bagian yang bermasalah dan mengujinya lagi','Mengoleksi komentar tanpa mengubah tulisan','Membaca contoh berkali-kali saja'],0,'Revisi perlu menghasilkan perubahan nyata pada tulisanmu.','develop'),
q('Mengapa perlu soal baru?',['Supaya catatan lama hilang','Agar tidak pernah mengulang','Untuk melihat apakah keterampilan berpindah ke konteks lain'],2,'Tulisan yang dihafal tidak membuktikan kamu bisa menangani pertanyaan lain.','task'),
q('Catatan kesalahan yang paling bisa ditindaklanjuti?',['Grammar buruk','Saya sering memakai by untuk nilai akhir; lain kali cocokkan dengan angka awal dan akhir','Harus lebih pintar'],1,'Catatan yang spesifik memberi tindakan pemeriksaan yang jelas.','accuracy')
],'Tulis satu catatan kesalahan dengan tiga bagian: pola salah, perbaikan, dan hal yang akan kamu cek di tulisan berikutnya.','Pola salah: saya menambah alasan baru di kesimpulan. Perbaikan: saya merangkum dua alasan yang sudah dijelaskan. Pemeriksaan berikutnya: bandingkan isi kesimpulan dengan kalimat utama paragraf isi.','Buku komentar hlm. 128–138; alur revisi rancangan aplikasi'),
lesson('w20','dasar','Tulis dalam batas waktu','Latih keputusan saat bantuan disingkirkan.',[
'Latihan terarah memakai bantuan; simulasi memakai waktu dan contoh yang ditutup. Hasilnya tidak perlu disamakan.',
'Coba satu pasangan Task 1 dan Task 2 dalam 60 menit. Sisakan waktu mengecek keduanya.',
'Selesai menulis bukan berarti sudah siap ujian. Periksa mutu pada beberapa soal baru dan minta pembaca yang memahami kriteria IELTS menilai tulisanmu.'
],'Plan briefly, write with purpose, then check what matters.','Rencanakan singkat, tulis dengan tujuan, lalu periksa bagian yang penting.',[
q('Saat waktu Task 1 mendekati 20 menit, kamu baru ingin menambah detail kecil. Prioritas?',['Terus tambah sampai 300 kata','Pastikan informasi utama ada lalu sediakan waktu Task 2','Lewati Task 2'],1,'Task 2 berbobot dua kali Task 1 dan perlu waktu cukup.','task'),
q('Tulisan yang dibuat setelah melihat contoh sebaiknya dicatat sebagai…',['Simulasi murni tanpa bantuan','Nilai resmi','Latihan dengan bantuan'],2,'Catatan proses yang jujur membuat perbandingan latihan lebih berguna.','accuracy'),
q('Ukuran kesiapan yang lebih masuk akal?',['Mutu tulisan pada beberapa soal baru, ketepatan waktu, dan umpan balik pembaca','Jumlah klik selesai','Jumlah kata sulit yang dihafal'],0,'Ketiganya memberi bukti keterampilan yang lebih nyata.','finish')
],'Tulis rencana simulasi 60 menit dan dua hal yang akan kamu cek sesudahnya.','Saya membagi sekitar 20 menit untuk Task 1 dan 40 menit untuk Task 2, termasuk waktu memeriksa. Setelah selesai saya akan mengecek apakah kedua tugas dijawab lengkap dan apakah kesimpulan Task 2 konsisten dengan pendapat awal.','Buku hlm. 6, 8; format resmi IELTS')
];
window.WRITING_CONTENT={version:1,lessons};
})();
