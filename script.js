// Kiểm tra trạng thái máy chủ (giả lập)
async function checkServerStatus() {
    try {
        const response = await fetch("https://api.github.com"); 
        if (response.ok) {
            document.getElementById("serverStatus").innerHTML = "<i class='fas fa-check-circle'></i> 🟢 Máy chủ đang Online";
            document.getElementById("serverStatus").classList.add("online");
        } else {
            document.getElementById("serverStatus").innerHTML = "<i class='fas fa-times-circle'></i> 🔴 Máy chủ Offline";
            document.getElementById("serverStatus").classList.add("offline");
        }
    } catch (error) {
        document.getElementById("serverStatus").innerHTML = "<i class='fas fa-times-circle'></i> 🔴 Máy chủ Offline";
        document.getElementById("serverStatus").classList.add("offline");
    }
}

// Kiểm tra ping bằng API Cloudflare
async function checkPing() {
    const startTime = Date.now();
    try {
        await fetch("https://cloudflare.com/cdn-cgi/trace");
        const ping = Date.now() - startTime;
        document.getElementById("pingResult").innerHTML = `<i class='fas fa-stopwatch'></i> ⏱ Ping: ${ping} ms`;
    } catch (error) {
        document.getElementById("pingResult").innerHTML = "<i class='fas fa-exclamation-triangle'></i> ❌ Không thể đo ping";
    }
}

// Biểu đồ lưu lượng mạng (giả lập)
function renderChart() {
    const ctx = document.getElementById('trafficChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['1s', '2s', '3s', '4s', '5s', '6s'],
            datasets: [{
                label: 'Lưu lượng mạng (MB/s)',
                data: [5, 8, 6, 10, 7, 9],
                borderColor: '#ff9800',
                backgroundColor: 'rgba(255, 152, 0, 0.2)',
                borderWidth: 2
            }]
        }
    });
}

// Làm mới dữ liệu
function refreshData() {
    checkServerStatus();
    checkPing();
    renderChart();
}

// Gọi hàm khi trang tải
window.onload = function () {
    refreshData();
};
