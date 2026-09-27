// 1. Chart Container
const chartContainer = document.getElementById('chart');

const chart = LightweightCharts.createChart(chartContainer, {
    width: window.innerWidth,
    height: window.innerHeight,
    layout: {
        background: { color: '#0f172a' },
        textColor: '#94a3b8',
    },
    grid: {
        vertLines: { color: '#1e293b' },
        horzLines: { color: '#1e293b' },
    },
    timeScale: {
        borderColor: '#334155',
        timeVisible: true,
    },
});

const candlestickSeries = chart.addCandlestickSeries({
    upColor: '#22c55e',
    downColor: '#ef4444',
    borderVisible: false,
    wickUpColor: '#22c55e',
    wickDownColor: '#ef4444',
});

// 2. Direct Reliable Public API
async function loadChartData() {
    try {
        const response = await fetch('https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d&limit=100');
        const data = await response.json();
        
        const formattedData = data.map(d => ({
            time: Math.floor(d[0] / 1000),
            open: parseFloat(d[1]),
            high: parseFloat(d[2]),
            low: parseFloat(d[3]),
            close: parseFloat(d[4]),
        }));

        candlestickSeries.setData(formattedData);
        chart.timeScale().fitContent();
    } catch (err) {
        console.error("Fetch Error:", err);
    }
}

loadChartData();

// Responsive Resize
window.addEventListener('resize', () => {
    chart.applyOptions({
        width: window.innerWidth,
        height: window.innerHeight,
    });
});
