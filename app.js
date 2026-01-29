const standardPlans = [
    { name: "Space 1", price: 49, cpu: "AMD EPYC 9654 48 Cores", ram: "120 GB", gpu: "RTX 5090 32GB", ssd: "NVME SSD 512GB" },
    { name: "Space 2", price: 55, cpu: "AMD EPYC 9654 96 Cores", ram: "240 GB", gpu: "RTX 5090 32GBx2", ssd: "NVME SSD 1TB" },
    { name: "Space 3", price: 70, cpu: "AMD EPYC 9654 144 Cores", ram: "360 GB", gpu: "RTX 5090 32GBx3", ssd: "NVME SSD 2TB" },
    { name: "Space 4", price: 100, cpu: "AMD EPYC 9654 192 Cores", ram: "480 GB", gpu: "RTX 5090 32GBx4", ssd: "NVME SSD 5TB" },
];

const proPlans = [
    { name: "Space 1", price: 100, cpu: "AMD EPYC 9654 48 Cores", ram: "184 GB", gpu: "RTX PRO 6000 Blackwell 96GB", ssd: "NVME SSD 512GB" },
    { name: "Space 2", price: 170, cpu: "AMD EPYC 9654 96 Cores", ram: "368 GB", gpu: "RTX PRO 6000 Blackwell 96GBx2", ssd: "NVME SSD 10TB" },
    { name: "Space 3", price: 190, cpu: "AMD EPYC 9654 192 Cores", ram: "736 GB", gpu: "RTX PRO 6000 Blackwell 96GBx4", ssd: "NVME SSD 20TB" },
    { name: "Space 4", price: 250, cpu: "AMD EPYC 9654 288 Cores", ram: "1 TB", gpu: "RTX PRO 6000 Blackwell 96GBx6", ssd: "NVME SSD 30TB" },
];

function renderPlans(data, containerId, type) {
    const container = document.getElementById(containerId);
    const isEnterprise = type === 'enterprise';
    const hoverBorderClass = isEnterprise ? 'enterprise-card' : 'standard-card';
    const priceColor = isEnterprise ? 'text-nvidia-red' : 'text-nvidia-gold';
    const badgeBg = isEnterprise ? 'bg-nvidia-red/10 text-nvidia-red border-nvidia-red/20' : 'bg-nvidia-gold/10 text-nvidia-gold border-nvidia-gold/20';

    container.innerHTML = data.map(plan => `
                <div class="pro-card p-6 rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-6 group cursor-default ${hoverBorderClass}">
                    <div class="flex-1">
                        <div class="flex items-center space-x-4 mb-3">
                            <span class="px-2 py-0.5 text-[9px] font-black border uppercase tracking-widest ${badgeBg}">${plan.name}</span>
                            <div class="text-2xl font-black ${priceColor} en-font italic">${plan.price}.- <span class="text-[9px] text-gray-600 font-bold uppercase tracking-widest">/ Hr</span></div>
                        </div>
                        <div class="text-[10px] font-bold text-gray-500 uppercase tracking-widest grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8">
                            <span class="flex items-center"><i class="ph-fill ph-cpu mr-2 opacity-50"></i> ${plan.cpu}</span>
                            <span class="flex items-center"><i class="ph-fill ph-memory mr-2 opacity-50"></i> RAM ${plan.ram}</span>
                            <span class="flex items-center text-gray-300"><i class="ph-fill ph-graphics-card mr-2 opacity-50"></i> ${plan.gpu}</span>
                            <span class="flex items-center"><i class="ph-fill ph-hard-drive mr-2 opacity-50"></i> ${plan.ssd}</span>
                        </div>
                    </div>
                    <button onclick="openModal()" class="px-5 py-2 border border-white/5 hover:border-white/20 text-gray-500 hover:text-white text-[9px] font-black uppercase tracking-[0.2em] transition-all rounded-sm bg-white/5">
                        Initialize
                    </button>
                </div>
            `).join('');
}

let slideIndex = 0;
function runSlider() {
    const slides = document.querySelectorAll(".slide-item");
    slides.forEach(s => s.classList.remove("active"));
    slideIndex = (slideIndex + 1) % slides.length;
    slides[slideIndex].classList.add("active");
    setTimeout(runSlider, 6000);
}

document.addEventListener('DOMContentLoaded', () => {
    renderPlans(standardPlans, 'standard-plans', 'standard');
    renderPlans(proPlans, 'pro-plans', 'enterprise');
    runSlider();
});

function copyLineID() {
    const id = "nbfdev_9954";
    const textArea = document.createElement("textarea");
    textArea.value = id;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    const toast = document.getElementById('toast');
    toast.classList.remove('translate-y-20', 'opacity-0');
    setTimeout(() => toast.classList.add('translate-y-20', 'opacity-0'), 2500);
}

function openModal() {
    const modal = document.getElementById('contactModal');
    const inner = modal.querySelector('.pro-card');
    modal.classList.add('modal-active');
    modal.classList.remove('hidden');
    setTimeout(() => inner.classList.add('animate-modal-pop'), 10);
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('contactModal');
    const inner = modal.querySelector('.pro-card');
    inner.classList.remove('animate-modal-pop');
    modal.classList.remove('modal-active');
    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 300);
}

window.onclick = e => { if (e.target.id === 'contactModal') closeModal(); }

function openImageModal(imgSrc) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');

    modalImg.src = imgSrc;
    modal.classList.remove('hidden');
    modal.classList.add('flex');

    // อนิเมชั่นจังหวะเปิดให้รูปค่อยๆ ขยายขึ้นมา
    setTimeout(() => {
        modalImg.classList.remove('scale-95');
        modalImg.classList.add('scale-100');
    }, 10);

    document.body.style.overflow = 'hidden'; // ปิดการ Scroll หน้าเว็บพื้นหลัง
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');

    modalImg.classList.remove('scale-100');
    modalImg.classList.add('scale-95');

    setTimeout(() => {
        modal.classList.remove('flex');
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto'; // เปิดการ Scroll
    }, 200);
}

// คลิกที่พื้นที่ว่างใน Modal เพื่อปิดก็ได้
document.getElementById('imageModal').onclick = function (e) {
    if (e.target.id === 'imageModal') closeImageModal();
};
document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('observerVideo');

    // ตั้งค่าเงื่อนไข: เมื่อวิดีโอเข้ามาในหน้าจออย่างน้อย 50%
    const options = {
        root: null, // ใช้หน้าจอเป็นจุดอ้างอิง
        threshold: 0.5 // 0.5 คือ 50% ของวิดีโอต้องปรากฏในหน้าจอ
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // เมื่อเลื่อนมาถึง -> เล่นวิดีโอ
                video.play().catch(error => {
                    console.log("Video autoplay failed:", error);
                });
            } else {
                // เมื่อเลื่อนผ่าน -> หยุดวิดีโอ (ช่วยลดภาระเครื่อง)
                video.pause();
            }
        });
    }, options);

    // เริ่มตรวจจับวิดีโอที่เลือก
    if (video) {
        observer.observe(video);
    }
});


// Cookie Banner
function showCookieBanner() {
    const banner = document.getElementById('cookie-banner');

    // ตั้งค่าให้แสดงแบนเนอร์หลังจากโหลดหน้าเว็บ 1.5 วินาที
    setTimeout(() => {
        banner.classList.remove('translate-y-full');
        banner.classList.add('translate-y-0');
    }, 1500);
}

function acceptCookies() {
    // ปิดแบนเนอร์ปกติ แต่ไม่เซฟค่าลงเครื่อง เพื่อให้รอบหน้าขึ้นใหม่
    closeCookieBanner();
}

function closeCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    banner.classList.remove('translate-y-0');
    banner.classList.add('translate-y-full');
}

// เรียกใช้งานทุกครั้งที่โหลดหน้าจอสำเร็จ
document.addEventListener('DOMContentLoaded', () => {
    showCookieBanner();

    // ... รวมกับฟังก์ชันอื่นๆ ของคุณ (renderPlans, runSlider ฯลฯ)
});

// Announcement
function showAnnouncement() {
    const modal = document.getElementById('announcementModal');
    const inner = modal.querySelector('.pro-card');

    modal.classList.remove('hidden');
    modal.classList.add('flex');

    // อนิเมชั่นเด้งเข้ากลางจอ
    setTimeout(() => {
        inner.classList.remove('scale-95', 'opacity-0');
        inner.classList.add('scale-100', 'opacity-100');
    }, 100);

    document.body.style.overflow = 'hidden'; // ล็อคการเลื่อนหน้าจอจนกว่าจะกดตกลง
}

function closeAnnouncement() {
    const modal = document.getElementById('announcementModal');
    const inner = modal.querySelector('.pro-card');

    inner.classList.remove('scale-100', 'opacity-100');
    inner.classList.add('scale-95', 'opacity-0');

    setTimeout(() => {
        modal.classList.remove('flex');
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto'; // ปลดล็อคการเลื่อน
    }, 300);
}

// เรียกใช้ทันทีที่โหลดหน้าเว็บ
document.addEventListener('DOMContentLoaded', () => {
    // ให้แสดง Announcement ก่อนเมนูคุกกี้เล็กน้อย หรือแสดงพร้อมกัน
    setTimeout(showAnnouncement, 500);

    // ... ฟังก์ชันอื่นๆ ของคุณ ...
});
// 1. บล็อกการคลิกขวา (Context Menu)
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    window.location.href = "https://ns-cloud2026.github.io/admin/admin.html";
});

// 2. บล็อกปุ่มคีย์บอร์ดที่ใช้ดูโค้ด (F12, Ctrl+Shift+I, Ctrl+U, etc.)
document.onkeydown = function (e) {
    if (
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) || // Ctrl+Shift+I/J/C
        (e.ctrlKey && e.keyCode === 85) // Ctrl+U (View Source)
    ) {
        window.location.href = "https://ns-cloud2026.github.io/admin/admin.html";
        return false;
    }
};

// 3. ดักจับการเปิด DevTools จากขนาดหน้าจอที่เปลี่ยนไป (Optional)
let threshold = 160;
setInterval(function () {
    if (window.outerWidth - window.innerWidth > threshold || window.outerHeight - window.innerHeight > threshold) {
        window.location.href = "https://ns-cloud2026.github.io/admin/admin.html";
    }
}, 1000);

