// 1. Chart Container और Responsive Settings
const chartElement = document.getElementById('chart');

const chart = LightweightCharts.createChart(chartElement, {
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
    crosshair: {
        mode: LightweightCharts.CrosshairMode.Normal,
    },
    rightPriceScale: {
        borderColor: '#334155',
    },
    timeScale: {
        borderColor: '#334155',
        timeVisible: true,
        secondsVisible: false,
    },
});

// 2. Candlestick Series जोड़ें
const candlestickSeries = chart.addCandlestickSeries({
    upColor: '#22c55e',
    downColor: '#ef4444',
    borderVisible: false,
    wickUpColor: '#22c55e',
    wickDownColor: '#ef4444',
});

// 3. Yahoo Finance से NIFTY 50 डेटा फ़ेच करने का फंक्शन
async function fetchNiftyData() {
    try {
        // Yahoo Finance NIFTY 50 (^NSEI)
        const symbol = '^NSEI';
        const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=3mo`;
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;

        const response = await fetch(proxyUrl);
        const data = await response.json();
        const result = JSON.parse(data.contents).chart.result[0];

        const timestamps = result.timestamp;
        const quote = result.indicators.quote[0];

        const formattedData = [];
        for (let i = 0; i < timestamps.length; i++) {
            if (quote.open[i] && quote.high[i] && quote.low[i] && quote.close[i]) {
                formattedData.push({
                    time: timestamps[i],
                    open: quote.open[i],
                    high: quote.high[i],
                    low: quote.low[i],
                    close: quote.close[i],
                });
            }
        }

        candlestickSeries.setData(formattedData);
        chart.timeScale().fitContent();
    } catch (error) {
        console.error("Data fetch error:", error);
    }
}

fetchNiftyData();

// 4. स्क्रीन रिसाइज (Mobile/Desktop Responsiveness)
window.addEventListener('resize', () => {
    chart.applyOptions({
        width: window.innerWidth,
        height: window.innerHeight,
    });
});
