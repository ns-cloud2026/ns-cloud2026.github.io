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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initCustomSelect();
    calculate();

    // เพิ่มคำสั่งให้ปุ่มเช่าเครื่องและปุ่มทั้งหมดในระบบเด้งไปที่ Line
    const actionButtons = document.querySelectorAll('#models button, #pricing button');
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