const chart = LightweightCharts.createChart(
    document.getElementById("chart"),
    {
        width: window.innerWidth,
        height: window.innerHeight,
        layout: {
            background: { color: "#0f172a" },
            textColor: "#d1d5db"
        },
        grid: {
            vertLines: { color: "#1e293b" },
            horzLines: { color: "#1e293b" }
        }
    }
);

const series = chart.addCandlestickSeries();

series.setData([
    { time: 1735689600, open: 24000, high: 24100, low: 23980, close: 24080 },
    { time: 1735776000, open: 24080, high: 24120, low: 24020, close: 24040 },
    { time: 1735862400, open: 24040, high: 24150, low: 24000, close: 24120 }
]);
