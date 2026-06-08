import React from "react";

import {

    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer

}
from "recharts";

function PropertyChart() {

    const data = [

        {
            status: "AVAILABLE",
            count: 30
        },

        {
            status: "BOOKED",
            count: 15
        },

        {
            status: "SOLD",
            count: 10
        }
    ];

    return (

        <div className="chart-card">

            <h5>
                Property Status
            </h5>

            <ResponsiveContainer
                width="100%"
                height={300}
            >

                <BarChart
                    data={data}
                >

                    <XAxis
                        dataKey="status"
                    />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="count"
                        fill="#4f46e5"
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>
    );
}

export default PropertyChart;