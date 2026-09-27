/ 1. Chart Container Setup
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

// 2. NIFTY 50 Real Data Fetch
async function loadNiftyData() {
    try {
        const targetUrl = 'https://query1.finance.yahoo.com/v8/finance/chart/%5ENSEI?interval=1d&range=6mo';
        const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;

        const response = await fetch(proxyUrl);
        const json = await response.json();
        const result = json.chart.result[0];

        const timestamps = result.timestamp;
        const quotes = result.indicators.quote[0];

        const formattedData = [];
        for (let i = 0; i < timestamps.length; i++) {
            if (quotes.open[i] && quotes.high[i] && quotes.low[i] && quotes.close[i]) {
                formattedData.push({
                    time: timestamps[i],
                    open: parseFloat(quotes.open[i].toFixed(2)),
                    high: parseFloat(quotes.high[i].toFixed(2)),
                    low: parseFloat(quotes.low[i].toFixed(2)),
                    close: parseFloat(quotes.close[i].toFixed(2)),
                });
            }
        }

        candlestickSeries.setData(formattedData);
        chart.timeScale().fitContent();
    } catch (err) {
        console.error("NIFTY Fetch Error:", err);
    }
}

loadNiftyData();

// Responsive Resize
window.addEventListener('resize', () => {
    chart.applyOptions({
        width: window.innerWidth,
        height: window.innerHeight,
    });
});
            
