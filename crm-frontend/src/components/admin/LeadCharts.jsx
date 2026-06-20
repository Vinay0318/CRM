import React, {
    useEffect,
    useState
} from "react";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

import LeadService
from "../../services/LeadService";

function LeadCharts() {

    const [chartData,
        setChartData] =
        useState([]);

    useEffect(() => {

        loadLeadData();

    }, []);

    const loadLeadData =
        async () => {

            try {

                const response =
                    await LeadService.getAllLeads();

                const leads =
                    response.data;

                const monthNames = [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec"
                ];

                const monthCounts = {};

                monthNames.forEach(month => {

                    monthCounts[month] = 0;

                });

                leads.forEach(lead => {

                    if(lead.createdAt){

                        const date =
                            new Date(
                                lead.createdAt
                            );

                        const month =
                            monthNames[
                                date.getMonth()
                            ];

                        monthCounts[month]++;
                    }
                });

                const data =
                    monthNames.map(
                        month => ({

                            month,

                            leads:
                                monthCounts[
                                    month
                                ]

                        })
                    );

                setChartData(data);

            }

            catch(error){

                console.log(error);

            }
        };

    return (

        <div className="chart-card">

            <div
                className="d-flex justify-content-between mb-3"
            >

                <h5>
                    Monthly Lead Growth
                </h5>

                <span
                    className="badge bg-success"
                >
                    Live Data
                </span>

            </div>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <AreaChart
                    data={chartData}
                >

                    <defs>

                        <linearGradient
                            id="leadColor"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >

                            <stop
                                offset="5%"
                                stopColor="#4f46e5"
                                stopOpacity={0.8}
                            />

                            <stop
                                offset="95%"
                                stopColor="#4f46e5"
                                stopOpacity={0}
                            />

                        </linearGradient>

                    </defs>

                    <CartesianGrid
                        strokeDasharray="3 3"
                    />

                    <XAxis
                        dataKey="month"
                    />

                    <YAxis />

                    <Tooltip />

                    <Area
                        type="monotone"
                        dataKey="leads"
                        stroke="#4f46e5"
                        fillOpacity={1}
                        fill="url(#leadColor)"
                    />

                </AreaChart>

            </ResponsiveContainer>

        </div>
    );
}

export default LeadCharts;