import type { Meta, StoryObj } from "@storybook/react-vite";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    RadialLinearScale,
    Title,
    Tooltip,
    Legend,
    type ChartData,
    type ChartOptions,
} from "chart.js";
import { Bar, Line, Pie, Doughnut, PolarArea, Radar, Scatter, Bubble, Chart } from "react-chartjs-2";
import { useRef, useState } from "react";
import { colors, hexToRgba } from "../../styles";
import { width } from "../../styles/utilities/layout";

// Chart.js is tree-shakeable: register only the controllers/elements/scales/plugins each chart needs.
ChartJS.register(
    CategoryScale,
    LinearScale,
    RadialLinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
);

const meta: Meta = {
    title: "Organisms/Charts",
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    'Craftsman does not wrap react-chartjs-2 with a custom component. We use react-chartjs-2 (and its chart.js peer dependency) directly, exactly as documented upstream at https://react-chartjs-2.js.org/examples — import the chart components and register only the chart.js pieces each chart type needs.<br /><br />If your project needs more advanced charts, we recommend checking out <a href="https://www.ag-grid.com/">AG Grid</a>. They offer high-performance data visualization that is best suited for massive datasets. They offer both free-to-use options as well as enterprise-only licensed options.'
            },
        },
    },
};

export default meta;
type Story = StoryObj;

const labels = ["January", "February", "March", "April", "May", "June"];

const pageStyle: React.CSSProperties = {
    display: "grid",
    gap: width("gutter", 2),
    maxWidth: width("column", 10),
};

const sectionStyle: React.CSSProperties = {
    display: "grid",
    gap: width("gutter", 0.5),
};

const chartWrapperStyle: React.CSSProperties = {
    maxWidth: width("column", 8),
};

type DemoProps = {
    readonly title: string;
    readonly code: string;
    readonly children: React.ReactNode;
};

function ChartDemo({ title, code, children }: DemoProps) {
    return (
        <section style={sectionStyle}>
            <h3>{title}</h3>
            <div style={chartWrapperStyle}>{children}</div>
            <code><pre>{code}</pre></code>
        </section>
    );
}

// ---- Vertical Bar Chart ----

const verticalBarData: ChartData<"bar"> = {
    labels,
    datasets: [
        {
            label: "Revenue",
            data: [12, 19, 8, 15, 22, 18],
            backgroundColor: hexToRgba(colors.blue500, 0.7),
        },
    ],
};

const verticalBarCode = `import { Bar } from "react-chartjs-2";

<Bar
    data={{
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [{ label: "Revenue", data: [12, 19, 8, 15, 22, 18], backgroundColor: "rgba(58, 112, 194, 0.7)" }],
    }}
    options={{ responsive: true }}
/>`;

// ---- Horizontal Bar Chart ----

const horizontalBarOptions: ChartOptions<"bar"> = {
    indexAxis: "y",
    responsive: true,
};

const horizontalBarCode = `<Bar
    data={{
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [{ label: "Revenue", data: [12, 19, 8, 15, 22, 18], backgroundColor: "rgba(58, 112, 194, 0.7)" }],
    }}
    options={{ indexAxis: "y", responsive: true }}
/>`;

// ---- Stacked Bar Chart ----

const stackedBarData: ChartData<"bar"> = {
    labels,
    datasets: [
        { label: "Revenue", data: [12, 19, 8, 15, 22, 18], backgroundColor: hexToRgba(colors.blue500, 0.8) },
        { label: "Costs", data: [8, 11, 6, 9, 14, 10], backgroundColor: hexToRgba(colors.teal500, 0.8) },
    ],
};

const stackedBarOptions: ChartOptions<"bar"> = {
    responsive: true,
    scales: {
        x: { stacked: true },
        y: { stacked: true },
    },
};

const stackedBarCode = `<Bar
    data={{
        labels,
        datasets: [
            { label: "Revenue", data: [12, 19, 8, 15, 22, 18], backgroundColor: "rgba(58, 112, 194, 0.8)" },
            { label: "Costs", data: [8, 11, 6, 9, 14, 10], backgroundColor: "rgba(10, 219, 234, 0.8)" },
        ],
    }}
    options={{ responsive: true, scales: { x: { stacked: true }, y: { stacked: true } } }}
/>`;

// ---- Grouped Bar Chart ----

const groupedBarData: ChartData<"bar"> = {
    labels,
    datasets: [
        { label: "Revenue", data: [12, 19, 8, 15, 22, 18], backgroundColor: hexToRgba(colors.blue500, 0.8) },
        { label: "Costs", data: [8, 11, 6, 9, 14, 10], backgroundColor: hexToRgba(colors.teal500, 0.8) },
    ],
};

const groupedBarCode = `<Bar
    data={{
        labels,
        datasets: [
            { label: "Revenue", data: [12, 19, 8, 15, 22, 18], backgroundColor: "rgba(58, 112, 194, 0.8)" },
            { label: "Costs", data: [8, 11, 6, 9, 14, 10], backgroundColor: "rgba(10, 219, 234, 0.8)" },
        ],
    }}
    options={{ responsive: true }}
/>`;

// ---- Area Chart (Line with fill) ----

const areaData: ChartData<"line"> = {
    labels,
    datasets: [
        {
            label: "Active Users",
            data: [30, 45, 38, 52, 61, 58],
            borderColor: colors.blue500,
            backgroundColor: hexToRgba(colors.blue500, 0.3),
            fill: true,
            tension: 0.3,
        },
    ],
};

const areaCode = `<Line
    data={{
        labels,
        datasets: [{
            label: "Active Users",
            data: [30, 45, 38, 52, 61, 58],
            borderColor: "#3A70C2",
            backgroundColor: "rgba(58, 112, 194, 0.3)",
            fill: true,
            tension: 0.3,
        }],
    }}
    options={{ responsive: true }}
/>`;

// ---- Line Chart ----

const lineData: ChartData<"line"> = {
    labels,
    datasets: [
        {
            label: "Active Users",
            data: [30, 45, 38, 52, 61, 58],
            borderColor: colors.blue500,
            backgroundColor: hexToRgba(colors.blue500, 0.5),
            tension: 0.3,
        },
    ],
};

const lineCode = `<Line
    data={{
        labels,
        datasets: [{ label: "Active Users", data: [30, 45, 38, 52, 61, 58], borderColor: "#3A70C2", tension: 0.3 }],
    }}
    options={{ responsive: true }}
/>`;

// ---- Multiaxis Line Chart ----

const multiaxisData: ChartData<"line"> = {
    labels,
    datasets: [
        {
            label: "Revenue ($k)",
            data: [12, 19, 8, 15, 22, 18],
            borderColor: colors.blue500,
            yAxisID: "y",
        },
        {
            label: "Conversion Rate (%)",
            data: [2.1, 2.4, 1.9, 2.6, 3.1, 2.8],
            borderColor: colors.purple500,
            yAxisID: "y1",
        },
    ],
};

const multiaxisOptions: ChartOptions<"line"> = {
    responsive: true,
    scales: {
        y: { type: "linear", display: true, position: "left" },
        y1: { type: "linear", display: true, position: "right", grid: { drawOnChartArea: false } },
    },
};

const multiaxisCode = `<Line
    data={{
        labels,
        datasets: [
            { label: "Revenue ($k)", data: [12, 19, 8, 15, 22, 18], borderColor: "#3A70C2", yAxisID: "y" },
            { label: "Conversion Rate (%)", data: [2.1, 2.4, 1.9, 2.6, 3.1, 2.8], borderColor: "#BF20DF", yAxisID: "y1" },
        ],
    }}
    options={{
        responsive: true,
        scales: {
            y: { type: "linear", display: true, position: "left" },
            y1: { type: "linear", display: true, position: "right", grid: { drawOnChartArea: false } },
        },
    }}
/>`;

// ---- Pie Chart ----

const pieData: ChartData<"pie"> = {
    labels: ["Primary", "Secondary", "Text"],
    datasets: [
        {
            data: [45, 30, 25],
            backgroundColor: [colors.blue500, colors.teal500, colors.purple500],
        },
    ],
};

const pieCode = `<Pie
    data={{
        labels: ["Primary", "Secondary", "Text"],
        datasets: [{ data: [45, 30, 25], backgroundColor: ["#3A70C2", "#0ADBEA", "#BF20DF"] }],
    }}
    options={{ responsive: true }}
/>`;

// ---- Doughnut Chart ----

const doughnutData: ChartData<"doughnut"> = {
    labels: ["Primary", "Secondary", "Text"],
    datasets: [
        {
            data: [45, 30, 25],
            backgroundColor: [colors.blue500, colors.teal500, colors.purple500],
        },
    ],
};

const doughnutCode = `<Doughnut
    data={{
        labels: ["Primary", "Secondary", "Text"],
        datasets: [{ data: [45, 30, 25], backgroundColor: ["#3A70C2", "#0ADBEA", "#BF20DF"] }],
    }}
    options={{ responsive: true }}
/>`;

// ---- Polar Area Chart ----

const polarAreaData: ChartData<"polarArea"> = {
    labels: ["Primary", "Secondary", "Text", "Disabled"],
    datasets: [
        {
            data: [11, 16, 7, 3],
            backgroundColor: [
                hexToRgba(colors.blue500, 0.7),
                hexToRgba(colors.teal500, 0.7),
                hexToRgba(colors.purple500, 0.7),
                hexToRgba(colors.gray500, 0.7),
            ],
        },
    ],
};

const polarAreaCode = `<PolarArea
    data={{
        labels: ["Primary", "Secondary", "Text", "Disabled"],
        datasets: [{ data: [11, 16, 7, 3], backgroundColor: ["rgba(58,112,194,.7)", "rgba(10,219,234,.7)", "rgba(191,32,223,.7)", "rgba(182,176,175,.7)"] }],
    }}
    options={{ responsive: true }}
/>`;

// ---- Radar Chart ----

const radarData: ChartData<"radar"> = {
    labels: ["Speed", "Reliability", "Comfort", "Safety", "Efficiency"],
    datasets: [
        {
            label: "Model A",
            data: [80, 90, 70, 85, 75],
            borderColor: colors.blue500,
            backgroundColor: hexToRgba(colors.blue500, 0.3),
        },
        {
            label: "Model B",
            data: [65, 75, 88, 70, 90],
            borderColor: colors.teal500,
            backgroundColor: hexToRgba(colors.teal500, 0.3),
        },
    ],
};

const radarCode = `<Radar
    data={{
        labels: ["Speed", "Reliability", "Comfort", "Safety", "Efficiency"],
        datasets: [
            { label: "Model A", data: [80, 90, 70, 85, 75], borderColor: "#3A70C2", backgroundColor: "rgba(58,112,194,.3)" },
            { label: "Model B", data: [65, 75, 88, 70, 90], borderColor: "#0ADBEA", backgroundColor: "rgba(10,219,234,.3)" },
        ],
    }}
    options={{ responsive: true }}
/>`;

// ---- Scatter Chart ----

const scatterData: ChartData<"scatter"> = {
    datasets: [
        {
            label: "Sample Points",
            data: [
                { x: -10, y: 5 },
                { x: 0, y: 12 },
                { x: 10, y: 6 },
                { x: 20, y: 18 },
                { x: 30, y: 9 },
            ],
            backgroundColor: colors.blue500,
        },
    ],
};

const scatterCode = `<Scatter
    data={{
        datasets: [{
            label: "Sample Points",
            data: [{ x: -10, y: 5 }, { x: 0, y: 12 }, { x: 10, y: 6 }, { x: 20, y: 18 }, { x: 30, y: 9 }],
            backgroundColor: "#3A70C2",
        }],
    }}
    options={{ responsive: true }}
/>`;

// ---- Bubble Chart ----

const bubbleData: ChartData<"bubble"> = {
    datasets: [
        {
            label: "Product Segments",
            data: [
                { x: 10, y: 20, r: 8 },
                { x: 25, y: 15, r: 15 },
                { x: 15, y: 30, r: 5 },
                { x: 35, y: 22, r: 12 },
            ],
            backgroundColor: hexToRgba(colors.purple500, 0.6),
        },
    ],
};

const bubbleCode = `<Bubble
    data={{
        datasets: [{
            label: "Product Segments",
            data: [{ x: 10, y: 20, r: 8 }, { x: 25, y: 15, r: 15 }, { x: 15, y: 30, r: 5 }, { x: 35, y: 22, r: 12 }],
            backgroundColor: "rgba(191, 32, 223, 0.6)",
        }],
    }}
    options={{ responsive: true }}
/>`;

// ---- Multitype Chart (mixed Bar + Line) ----

const multitypeData: ChartData<"bar" | "line"> = {
    labels,
    datasets: [
        {
            type: "bar" as const,
            label: "Revenue",
            data: [12, 19, 8, 15, 22, 18],
            backgroundColor: hexToRgba(colors.blue500, 0.7),
        },
        {
            type: "line" as const,
            label: "Target",
            data: [15, 15, 15, 15, 20, 20],
            borderColor: colors.purple500,
            tension: 0.3,
        },
    ],
};

const multitypeCode = `import { Chart } from "react-chartjs-2";

<Chart
    type="bar"
    data={{
        labels,
        datasets: [
            { type: "bar", label: "Revenue", data: [12, 19, 8, 15, 22, 18], backgroundColor: "rgba(58,112,194,.7)" },
            { type: "line", label: "Target", data: [15, 15, 15, 15, 20, 20], borderColor: "#BF20DF", tension: 0.3 },
        ],
    }}
    options={{ responsive: true }}
/>`;

// ---- Chart Events ----

const eventsData: ChartData<"bar"> = {
    labels,
    datasets: [
        {
            label: "Revenue",
            data: [12, 19, 8, 15, 22, 18],
            backgroundColor: hexToRgba(colors.blue500, 0.7),
        },
    ],
};

const eventsCode = `const [selected, setSelected] = useState<string | null>(null);

<Bar
    data={data}
    options={{
        responsive: true,
        onClick: (_event, elements) => {
            if (elements.length > 0) {
                setSelected(labels[elements[0].index]);
            }
        },
    }}
/>`;

function ChartEventsDemo() {
    const [selected, setSelected] = useState<string | null>(null);
    const eventsOptions: ChartOptions<"bar"> = {
        responsive: true,
        onClick: (_event, elements) => {
            if (elements.length > 0) {
                setSelected(labels[elements[0].index]);
            }
        },
    };

    return (
        <>
            <p>Clicked bar: {selected ?? "none yet — click a bar"}</p>
            <Bar data={eventsData} options={eventsOptions} />
        </>
    );
}

// ---- Chart Ref ----

const refData: ChartData<"bar"> = {
    labels,
    datasets: [
        {
            label: "Revenue",
            data: [12, 19, 8, 15, 22, 18],
            backgroundColor: hexToRgba(colors.blue500, 0.7),
        },
    ],
};

const refCode = `const chartRef = useRef<ChartJSInstance<"bar">>(null);

<Bar ref={chartRef} data={data} options={{ responsive: true }} />
<Button onClick={() => chartRef.current?.resetZoom?.() ?? chartRef.current?.update()}>Update Chart</Button>`;

function ChartRefDemo() {
    const chartRef = useRef<ChartJS<"bar"> | null>(null);

    const handleRandomize = () => {
        const chart = chartRef.current;
        if (!chart) {
            return;
        }
        chart.data.datasets[0].data = refData.datasets[0].data.map(() => Math.round(Math.random() * 25));
        chart.update();
    };

    return (
        <>
            <Bar ref={chartRef} data={refData} options={{ responsive: true }} />
            <button type="button" className="button primary" onClick={handleRandomize}>
                Randomize Data
            </button>
        </>
    );
}

// ---- Gradient Chart ----

const gradientCode = `<Line
    data={(canvas) => {
        const ctx = canvas.getContext("2d")!;
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, "rgba(58, 112, 194, 0.8)");
        gradient.addColorStop(1, "rgba(58, 112, 194, 0)");
        return {
            labels,
            datasets: [{ label: "Active Users", data: [30, 45, 38, 52, 61, 58], borderColor: "#3A70C2", backgroundColor: gradient, fill: true }],
        };
    }}
    options={{ responsive: true }}
/>`;

function GradientChartDemo() {
    const [chartData, setChartData] = useState<ChartData<"line"> | null>(null);

    return (
        <Line
            ref={(chartInstance) => {
                if (!chartInstance || chartData) {
                    return;
                }
                const ctx = chartInstance.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, chartInstance.height);
                gradient.addColorStop(0, hexToRgba(colors.blue500, 0.8));
                gradient.addColorStop(1, hexToRgba(colors.blue500, 0));
                setChartData({
                    labels,
                    datasets: [
                        {
                            label: "Active Users",
                            data: [30, 45, 38, 52, 61, 58],
                            borderColor: colors.blue500,
                            backgroundColor: gradient,
                            fill: true,
                        },
                    ],
                });
            }}
            data={chartData ?? { labels, datasets: [] }}
            options={{ responsive: true }}
        />
    );
}

export const VerticalBarChart: Story = {
    render: () => (
        <div style={pageStyle}>
            <ChartDemo title="Vertical Bar Chart" code={verticalBarCode}>
                <Bar data={verticalBarData} options={{ responsive: true }} />
            </ChartDemo>
        </div>
    ),
};

export const HorizontalBarChart: Story = {
    render: () => (
        <div style={pageStyle}>
            <ChartDemo title="Horizontal Bar Chart" code={horizontalBarCode}>
                <Bar data={verticalBarData} options={horizontalBarOptions} />
            </ChartDemo>
        </div>
    ),
};

export const StackedBarChart: Story = {
    render: () => (
        <div style={pageStyle}>
            <ChartDemo title="Stacked Bar Chart" code={stackedBarCode}>
                <Bar data={stackedBarData} options={stackedBarOptions} />
            </ChartDemo>
        </div>
    ),
};

export const GroupedBarChart: Story = {
    render: () => (
        <div style={pageStyle}>
            <ChartDemo title="Grouped Bar Chart" code={groupedBarCode}>
                <Bar data={groupedBarData} options={{ responsive: true }} />
            </ChartDemo>
        </div>
    ),
};

export const AreaChart: Story = {
    render: () => (
        <div style={pageStyle}>
            <ChartDemo title="Area Chart" code={areaCode}>
                <Line data={areaData} options={{ responsive: true }} />
            </ChartDemo>
        </div>
    ),
};

export const LineChart: Story = {
    render: () => (
        <div style={pageStyle}>
            <ChartDemo title="Line Chart" code={lineCode}>
                <Line data={lineData} options={{ responsive: true }} />
            </ChartDemo>
        </div>
    ),
};

export const MultiaxisLineChart: Story = {
    render: () => (
        <div style={pageStyle}>
            <ChartDemo title="Multiaxis Line Chart" code={multiaxisCode}>
                <Line data={multiaxisData} options={multiaxisOptions} />
            </ChartDemo>
        </div>
    ),
};

export const PieChart: Story = {
    render: () => (
        <div style={pageStyle}>
            <ChartDemo title="Pie Chart" code={pieCode}>
                <Pie data={pieData} options={{ responsive: true }} />
            </ChartDemo>
        </div>
    ),
};

export const DoughnutChart: Story = {
    render: () => (
        <div style={pageStyle}>
            <ChartDemo title="Doughnut Chart" code={doughnutCode}>
                <Doughnut data={doughnutData} options={{ responsive: true }} />
            </ChartDemo>
        </div>
    ),
};

export const PolarAreaChart: Story = {
    render: () => (
        <div style={pageStyle}>
            <ChartDemo title="Polar Area Chart" code={polarAreaCode}>
                <PolarArea data={polarAreaData} options={{ responsive: true }} />
            </ChartDemo>
        </div>
    ),
};

export const RadarChart: Story = {
    render: () => (
        <div style={pageStyle}>
            <ChartDemo title="Radar Chart" code={radarCode}>
                <Radar data={radarData} options={{ responsive: true }} />
            </ChartDemo>
        </div>
    ),
};

export const ScatterChart: Story = {
    render: () => (
        <div style={pageStyle}>
            <ChartDemo title="Scatter Chart" code={scatterCode}>
                <Scatter data={scatterData} options={{ responsive: true }} />
            </ChartDemo>
        </div>
    ),
};

export const BubbleChart: Story = {
    render: () => (
        <div style={pageStyle}>
            <ChartDemo title="Bubble Chart" code={bubbleCode}>
                <Bubble data={bubbleData} options={{ responsive: true }} />
            </ChartDemo>
        </div>
    ),
};

export const MultitypeChart: Story = {
    render: () => (
        <div style={pageStyle}>
            <ChartDemo title="Multitype Chart" code={multitypeCode}>
                <Chart type="bar" data={multitypeData} options={{ responsive: true }} />
            </ChartDemo>
        </div>
    ),
};

export const ChartEvents: Story = {
    render: () => (
        <div style={pageStyle}>
            <ChartDemo title="Chart Events" code={eventsCode}>
                <ChartEventsDemo />
            </ChartDemo>
        </div>
    ),
};

export const ChartRef: Story = {
    render: () => (
        <div style={pageStyle}>
            <ChartDemo title="Get Chart Ref" code={refCode}>
                <ChartRefDemo />
            </ChartDemo>
        </div>
    ),
};

export const GradientChart: Story = {
    render: () => (
        <div style={pageStyle}>
            <ChartDemo title="Gradient Chart" code={gradientCode}>
                <GradientChartDemo />
            </ChartDemo>
        </div>
    ),
};
