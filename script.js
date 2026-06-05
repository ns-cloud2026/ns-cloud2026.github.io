function calculate() {
    // Get selected rate from dropdown
    const selectElement = document.getElementById('serverModelSelect');
    const ratePerHour = parseInt(selectElement.value);

    // Get hours from slider
    const hours = document.getElementById('hoursSlider').value;
    document.getElementById('hoursDisplay').innerText = hours;

    // Calculate total
    const total = ratePerHour * hours;

    // Format number with commas
    document.getElementById('totalCost').innerText = total.toLocaleString('en-US');
}

function initCustomSelect() {
    const wrapper = document.getElementById('customSelectWrapper');
    if (!wrapper) return;

    const trigger = wrapper.querySelector('.custom-select-trigger');
    const options = wrapper.querySelectorAll('.custom-option');
    const select = document.getElementById('serverModelSelect');

    // Toggle dropdown
    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        wrapper.classList.toggle('open');
    });

    // Select option
    options.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const value = option.getAttribute('data-value');
            const text = option.textContent || option.innerText;

            // Update display trigger text
            wrapper.querySelector('#customSelectValue').textContent = text;

            // Set native select value and trigger change event
            select.value = value;
            
            // Update selected visual state
            options.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');

            // Recalculate cost
            calculate();

            // Close dropdown
            wrapper.classList.remove('open');
        });
    });

    // Close when clicking anywhere outside
    document.addEventListener('click', (e) => {
        if (!wrapper.contains(e.target)) {
            wrapper.classList.remove('open');
        }
    });
}

function initCustomVideoPlayer() {
    const player = document.getElementById('h100VideoPlayer');
    if (!player) return;

    const video = player.querySelector('video');
    const playPauseBtn = player.querySelector('.play-pause-btn');
    const centerPlayBtn = player.querySelector('.center-play-btn');
    const playIcon = playPauseBtn.querySelector('.play-icon');
    const pauseIcon = playPauseBtn.querySelector('.pause-icon');
    const progressContainer = player.querySelector('.video-progress-container');
    const progressBar = player.querySelector('.video-progress-filled');
    const progressKnob = player.querySelector('.video-progress-knob');
    const timeDisplay = player.querySelector('.video-time-display');
    const muteBtn = player.querySelector('.volume-btn');
    const muteIcon = muteBtn.querySelector('.volume-mute-icon');
    const volumeUpIcon = muteBtn.querySelector('.volume-up-icon');
    const fullscreenBtn = player.querySelector('.fullscreen-btn');

    let isPlaying = false;
    let userIdleTimeout = null;

    // Helper: format time in MM:SS
    function formatTime(seconds) {
        if (isNaN(seconds) || seconds === Infinity) return "00:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    // Update play/pause visual state (UI only)
    function updatePlayState(play) {
        isPlaying = play;
        if (play) {
            player.classList.add('playing');
            playIcon.classList.add('hidden');
            pauseIcon.classList.remove('hidden');
        } else {
            player.classList.remove('playing');
            playIcon.classList.remove('hidden');
            pauseIcon.classList.add('hidden');
        }
    }

    // Toggle play/pause (modifies media state)
    function togglePlay() {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }

    video.addEventListener('click', togglePlay);
    playPauseBtn.addEventListener('click', togglePlay);
    centerPlayBtn.addEventListener('click', togglePlay);

    // Sync elements directly with media events
    video.addEventListener('play', () => updatePlayState(true));
    video.addEventListener('pause', () => updatePlayState(false));

    // Initial check in case it autoplays before event listeners are bound
    if (!video.paused) {
        updatePlayState(true);
    }

    // Update progress bar & time display
    video.addEventListener('timeupdate', () => {
        if (video.duration) {
            const percent = (video.currentTime / video.duration) * 100;
            progressBar.style.width = `${percent}%`;
            if (progressKnob) {
                progressKnob.style.left = `${percent}%`;
            }
        }
        timeDisplay.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration || 0)}`;
    });

    // Seek in video
    function scrub(e) {
        if (!video.duration) return;
        const rect = progressContainer.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const seekTime = (clickX / width) * video.duration;
        video.currentTime = seekTime;
    }

    let mousedown = false;
    progressContainer.addEventListener('click', scrub);
    progressContainer.addEventListener('mousemove', (e) => mousedown && scrub(e));
    progressContainer.addEventListener('mousedown', () => mousedown = true);
    document.addEventListener('mouseup', () => mousedown = false);

    // Mute/Unmute
    muteBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        if (video.muted) {
            muteIcon.classList.remove('hidden');
            volumeUpIcon.classList.add('hidden');
        } else {
            muteIcon.classList.add('hidden');
            volumeUpIcon.classList.remove('hidden');
        }
    });

    // Fullscreen toggle
    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            if (player.requestFullscreen) {
                player.requestFullscreen();
            } else if (player.webkitRequestFullscreen) {
                player.webkitRequestFullscreen();
            } else if (player.msRequestFullscreen) {
                player.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    });

    // Listen to metadata loaded to initialize total time
    video.addEventListener('loadedmetadata', () => {
        timeDisplay.textContent = `00:00 / ${formatTime(video.duration)}`;
    });

    // Handle user activity/inactivity (auto-hide controls)
    function resetIdleTimer() {
        player.classList.remove('user-idle');
        clearTimeout(userIdleTimeout);
        userIdleTimeout = setTimeout(() => {
            if (isPlaying) {
                player.classList.add('user-idle');
            }
        }, 3000); // hide controls after 3 seconds of inactivity
    }

    player.addEventListener('mousemove', resetIdleTimer);
    player.addEventListener('click', resetIdleTimer);
    video.addEventListener('play', resetIdleTimer);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initCustomSelect();
    initCustomVideoPlayer();
    calculate();

    // เพิ่มคำสั่งให้ปุ่มเช่าเครื่องและปุ่มทั้งหมดในระบบเด้งไปที่ Line
    const actionButtons = document.querySelectorAll('#models button, #pricing button, .pick-btn');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.open('https://line.me/ti/p/~nbfdev_9954', '_blank');
        });
    });

    // ระบบแสดง Modal แจ้งเตือนเมื่อเข้าเว็บ
    const modal = document.getElementById('noticeModal');
    const closeBtn = document.getElementById('closeModalBtn');

    if (modal && closeBtn) {
        setTimeout(() => {
            modal.classList.add('active');
        }, 100);

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }
});