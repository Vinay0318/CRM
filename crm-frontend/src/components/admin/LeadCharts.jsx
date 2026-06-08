import React from "react";

import {
    PieChart,
    Pie,
    Tooltip,
    ResponsiveContainer,
    Cell,
    Legend
}
from "recharts";

function LeadCharts() {

    const data = [

        {
            name: "New Leads",
            value: 45
        },

        {
            name: "Follow Up",
            value: 25
        },

        {
            name: "Closed",
            value: 15
        },

        {
            name: "Lost",
            value: 10
        }
    ];

    const COLORS = [
        "#4f46e5",
        "#10b981",
        "#f59e0b",
        "#ef4444"
    ];

    return (

        <div className="chart-card">

            <h5>
                Lead Status Overview
            </h5>

            <ResponsiveContainer
                width="100%"
                height={300}
            >

                <PieChart>

                    <Pie
                        data={data}
                        dataKey="value"
                        outerRadius={100}
                    >

                        {
                            data.map(
                                (entry, index) => (

                                    <Cell
                                        key={index}
                                        fill={
                                            COLORS[index]
                                        }
                                    />

                                )
                            )
                        }

                    </Pie>

                    <Tooltip />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </div>
    );
}

export default LeadCharts;