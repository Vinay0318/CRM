import React from "react";

import {

    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer

}
from "recharts";

function ManagerChart() {

    const data = [

        {
            month: "Jan",
            leads: 20
        },

        {
            month: "Feb",
            leads: 35
        },

        {
            month: "Mar",
            leads: 50
        },

        {
            month: "Apr",
            leads: 65
        },

        {
            month: "May",
            leads: 80
        }
    ];

    return (

        <div className="chart-card">

            <h5>
                Monthly Lead Growth
            </h5>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <LineChart
                    data={data}
                >

                    <XAxis
                        dataKey="month"
                    />

                    <YAxis />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="leads"
                        stroke="#10b981"
                        strokeWidth={3}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>
    );
}

export default ManagerChart;