import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

// Data from EcommerceMetrics
const data = [
    { name: 'Job Posted', value: 1245 },
    { name: 'Event Posted', value: 789 },
    { name: 'Appointments', value: 2134 },
    { name: 'Services', value: 4567 },
];

export default function MetricsChart() {
    return (
        <div className="w-full h-[400px] p-4 bg-white rounded-2xl border border-gray-200 dark:border-gray-800 dark:bg-white/[0.03]">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
                Platform Metrics Overview
            </h3>
            <ResponsiveContainer width="100%" height="90%">
                <BarChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                        dataKey="name"
                        tick={{ fill: '#039855', fontSize: 12 }}
                        stroke="#039855"
                    />
                    <YAxis
                        tick={{ fill: '#039855', fontSize: 12 }}
                        stroke="#039855"
                        tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            color: '#039855',
                        }}
                        formatter={(value) => [value, 'Count']}
                    />
                    <Bar
                        dataKey="value"
                        fill="#039855" // Blue color to match a professional theme
                        barSize={60}
                        radius={[4, 4, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}