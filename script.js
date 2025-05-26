document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Wave text animation
    function applyWaveEffect(element) {
        if (!element) return;
        const textToProcess = element.textContent;
        element.innerHTML = '';
        textToProcess.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.setProperty('--i', index);
            element.appendChild(span);
        });
    }

    applyWaveEffect(document.querySelector('.wave-text .main-greeting'));
    applyWaveEffect(document.querySelector('.wave-text .birthday-person-name'));

    // Music player
    const playMusicBtn = document.getElementById('playMusicBtn');
    const birthdaySong = document.getElementById('birthdaySong');
    if (playMusicBtn && birthdaySong) {
        let isPlaying = false;
        playMusicBtn.addEventListener('click', () => {
            if (isPlaying) {
                birthdaySong.pause();
                playMusicBtn.textContent = 'Putar Lagu';
            } else {
                birthdaySong.play().then(() => {
                    playMusicBtn.textContent = 'Jeda Lagu';
                }).catch(error => {
                    console.error('Gagal memutar lagu:', error);
                    alert('Gagal memutar lagu.');
                    playMusicBtn.textContent = 'Putar Lagu';
                });
            }
            isPlaying = !isPlaying;
        });
        birthdaySong.addEventListener('ended', () => {
            isPlaying = false;
            playMusicBtn.textContent = 'Putar Lagu';
        });
    }

    // Toast
    function showToast(message) {
        const toast = document.getElementById('toast');
        if (toast) {
            toast.textContent = message;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 3000);
        }
    }

    // Pesan ucapan
    const messageForm = document.getElementById('messageForm');
    const messagesList = document.getElementById('messagesList');

    function saveMessagesToLocalStorage(messages) {
        localStorage.setItem('birthdayMessages', JSON.stringify(messages));
    }

    function getMessagesFromLocalStorage() {
        const messages = localStorage.getItem('birthdayMessages');
        return messages ? JSON.parse(messages) : [];
    }

    function renderMessages(messages) {
        messagesList.innerHTML = '';
        messages.forEach((message, index) => {
            const messageCard = document.createElement('div');
            messageCard.classList.add('message-card', 'fade-in');
            messageCard.innerHTML = `
                <p class="message-text">"${message.text}"</p>
                <p class="message-sender">- Dari ${message.sender}</p>
                <button class="delete-btn" data-index="${index}">❌</button>
            `;
            messagesList.appendChild(messageCard);
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function () {
                const index = parseInt(this.getAttribute('data-index'));
                const currentMessages = getMessagesFromLocalStorage();
                currentMessages.splice(index, 1);
                saveMessagesToLocalStorage(currentMessages);
                renderMessages(currentMessages);
            });
        });
    }

    if (messageForm && messagesList) {
        renderMessages(getMessagesFromLocalStorage());

        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const senderName = document.getElementById('senderName').value.trim();
            const messageText = document.getElementById('messageText').value.trim();
            if (senderName && messageText) {
                const newMessage = { sender: senderName, text: messageText };
                const allMessages = getMessagesFromLocalStorage();
                allMessages.unshift(newMessage);
                saveMessagesToLocalStorage(allMessages);
                renderMessages(allMessages);
                messageForm.reset();
                showToast('Ucapan Anda berhasil dikirim!');
            } else {
                alert('Nama dan ucapan tidak boleh kosong!');
            }
        });
    }

    // Cloudinary Video Link Input
    const videoInputForm = document.getElementById('cloudinaryVideoForm');
    const cloudinaryVideoURL = document.getElementById('cloudinaryVideoURL');
    const videoGallery = document.getElementById('videoGallery');

    let currentVideoIndex = 0;

    function saveCloudinaryVideos(videos) {
        localStorage.setItem('cloudinaryVideos', JSON.stringify(videos));
    }

    function getCloudinaryVideos() {
        const stored = localStorage.getItem('cloudinaryVideos');
        return stored ? JSON.parse(stored) : [];
    }

    function renderSingleVideo(index) {
        const videos = getCloudinaryVideos();
        if (!videos.length) return;
        currentVideoIndex = index;

        videoGallery.innerHTML = `
            <div class="video-wrapper">
                <button id="prevVideoBtn" class="side-btn">⏮</button>
                <video id="mainVideo" controls autoplay src="${videos[index]}"></video>
                <button id="nextVideoBtn" class="side-btn">⏭</button>
            </div>
        `;

        document.getElementById('prevVideoBtn').addEventListener('click', () => {
            if (currentVideoIndex > 0) {
                renderSingleVideo(currentVideoIndex - 1);
            }
        });

        document.getElementById('nextVideoBtn').addEventListener('click', () => {
            if (currentVideoIndex < videos.length - 1) {
                renderSingleVideo(currentVideoIndex + 1);
            }
        });
    }

    if (videoInputForm && cloudinaryVideoURL) {
        videoInputForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const url = cloudinaryVideoURL.value.trim();
            if (url) {
                const videos = getCloudinaryVideos();
                videos.push(url);
                saveCloudinaryVideos(videos);
                renderSingleVideo(videos.length - 1);
                videoInputForm.reset();
            } else {
                alert("Masukkan URL video dari Cloudinary.");
            }
        });
    }

    renderSingleVideo(0);

    // Galeri foto kenangan
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryModal = document.getElementById('galleryModal');
    const closeButton = document.querySelector('.modal .close-button');
    const modalTitle = document.getElementById('modalTitle');
    const modalPhotos = document.getElementById('modalPhotos');

    const kenanganPhotos = {
        kenangan1: {
            title: "Cantikkk nyaaa Akuuuuu 🩷",
            images: [ 'images/cantikk.jpg',
                'images/cantikkkkkkkkk.jpg',
                'images/cantikkkpolll.jpg', 
                'images/dibali.jpg', 
                'images/didalambisbanguntidur.jpg',
                'images/dipantaibali.jpg',
                'images/foto1.jpg',
                'images/foto2.jpg',
                'images/foto3.jpg',
                'images/foto4.jpg',
                'images/foto5.jpg',
                'images/foto6.jpg',
                'images/foto7.jpg',
                'images/foto8.jpg',
                'images/foto9.jpg', 
                'images/foto10.jpg', 
                'images/foto11.jpg', 
                'images/foto12.jpg',
                'images/foto13.jpg',
                'images/foto14.jpg',
                'images/foto15.jpg',
                'images/foto16.jpg',
                'images/foto17.jpg',
                'images/foto18.jpg',
                'images/foto19.jpg',
                'images/foto20.jpg',
                'images/foto21.jpg',
                'images/foto22.jpg',
                'images/foto23.jpg',
                'images/foto24.jpg',
                'images/foto25.jpg',
                'images/foto26.jpg',
                'images/foto27.jpg',
                'images/foto28.jpg',
                'images/foto30.jpg',
                'images/foto31.jpg',
                'images/foto32.jpg',
                'images/foto33.jpg',
                'images/foto34.jpg',
                'images/foto35.jpg',
                'images/foto36.jpg',
                'images/foto37.jpg',
                'images/foto38.jpg',
                'images/foto39.jpg',
                'images/foto40.jpg',
                'images/foto41.jpg',
                'images/foto42.jpg',
                'images/foto43.jpg',
                'images/foto44.jpg',
                'images/foto45.jpg',
                'images/foto46.jpg',
                'images/foto47.jpg',
                'images/foto48.jpg',
                'images/foto57.jpg',
                'images/foto58.jpg',
                'images/foto59.jpg',
                'images/foto60.jpg',
                'images/foto61.jpg',
                'images/foto62.jpg',
                'images/foto63.jpg',
                'images/foto64.jpg',
                'images/foto65.jpg',
                'images/foto66.jpg',
                'images/foto67.jpg',
                'images/foto81.jpg',
                'images/foto82.jpg',
                'images/foto83.jpg',
                'images/foto84.jpg',
                'images/foto91.jpg',
                'images/foto92.jpg',
                'images/foto93.jpg',
                'images/foto94.jpg',
                'images/foto95.jpg',
                'images/foto104.jpg',
                'images/foto105.jpg',
                'images/foto106.jpg',
                'images/fotobuatidcard.jpg',
                'images/fotopakaialmet.jpg',
                'images/Januari.jpg',
                'images/keluarsmibubeliseblak.jpg',
                'images/kuliah.jpg',
                'images/loveeuuuu.jpg',
                'images/muah.jpg',
                'images/pulangke-2.jpg',
                'images/Rakerharike-2.jpg',
                'images/senamharigizi2025.jpg',
             ]
        },
        kenangan2: {
            title: "Main Ke Kebun Binatang",
            images: [ 'images/kebunbinatang.jpg', 
                'images/kebunbinatang1.jpg', 
                'images/kebunbinatang2.jpg',
                'images/kebunbinatang4.jpg',
                'images/kebunbinatang5.jpg',
                'images/kebunbinatang6.jpg',
                'images/kebunbinatang8.jpg',
                'images/kebunbinatang9.jpg',
                'images/kebunbinatang10.jpg',
                'images/kebunbinatang12.jpg',
                'images/kebunbinatang14.jpg',
                'images/kebunbinatang15.jpg',
                'images/kebunbinatang16.jpg',
                'images/kebunbinatang17.jpg',
                'images/kebunbinatang18.jpg',
                'images/kebunbinatang19.jpg',
            ]
        },
        kenangan3: {
            title: "Aku dan Kamuuu",
            images: [ 'images/foto29.jpg', 
                'images/foto52.jpg', 
                'images/foto53.jpg',
                'images/foto54.jpg',
                'images/foto55.jpg',
                'images/foto56.jpg',
                'images/foto68.jpg',
                'images/foto69.jpg',
                'images/foto70.jpg',
                'images/foto71.jpg',
                'images/foto72.jpg',
                'images/foto73.jpg',
                'images/foto74.jpg',
                'images/foto75.jpg',
                'images/foto76.jpg',
                'images/foto85.jpg',
                'images/foto86.jpg',
                'images/foto87.jpg',
                'images/foto90.jpg',
                'images/foto97.jpg',
                'images/foto98.jpg',
                'images/foto99.jpg',
                'images/foto100.jpg',
                'images/foto101.jpg',
                'images/foto102.jpg',
                'images/foto103.jpg',
                'images/pakaijashujanbareng.jpg',
                'images/photostrip.png',
                'images/photostrip (1).png',
                'images/photostrip (2).png',
                'images/photostrip (3).png',
                'images/photostrip (4).png',
                'images/photostrip (5).png',
                'images/photostrip (6).png',
                'images/queencity.jpg',
            ]
        }
    };

    galleryItems.forEach(item => {
        item.addEventListener('click', function () {
            const kenanganId = this.id;
            const data = kenanganPhotos[kenanganId];
            if (data) {
                modalTitle.textContent = data.title;
                modalPhotos.innerHTML = '';
                data.images.forEach(imageSrc => {
                    const img = document.createElement('img');
                    img.src = imageSrc;
                    img.alt = data.title + ' Foto';
                    img.onerror = function () {
                        this.src = 'https://placehold.co/180x180/cccccc/333333?text=Error';
                        this.alt = 'Gambar tidak ditemukan';
                    };
                    modalPhotos.appendChild(img);
                });
                galleryModal.style.display = 'flex';
            }
        });
    });

    if (closeButton) {
        closeButton.addEventListener('click', () => {
            galleryModal.style.display = 'none';
        });
    }

    window.addEventListener('click', function(event) {
        if (event.target === galleryModal) {
            galleryModal.style.display = 'none';
        }
    });
});
