import React, { useEffect, useMemo, useState } from "react";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

import LeadService from "../../services/LeadService";

function LeadCharts() {

    const [chartData, setChartData] = useState([]);

    const monthNames = useMemo(() => ([
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
    ]), []);

    useEffect(() => {

        loadLeadData();

    }, []);

    const loadLeadData = async () => {

        try {

            const response = await LeadService.getAllLeads();

            const leads = response.data;

            const monthCounts = {};

            monthNames.forEach(month => {

                monthCounts[month] = 0;

            });

            leads.forEach(lead => {

                if (!lead.createdAt) return;

                const date = new Date(lead.createdAt);

                const month = monthNames[date.getMonth()];

                monthCounts[month]++;

            });

            const data = monthNames.map(month => ({

                month,

                leads: monthCounts[month]

            }));

            setChartData(data);

        }

        catch (error) {

            console.error(

                "Unable to load lead chart",

                error

            );

        }

    };

    return (

        <div className="chart-card">

            <div className="d-flex justify-content-between align-items-center mb-3">

                <h5>

                    Monthly Lead Growth

                </h5>

                <span className="badge bg-success">

                    Live Data

                </span>

            </div>

            <ResponsiveContainer

                width="100%"

                height={350}

            >

                <AreaChart data={chartData}>

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

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis allowDecimals={false} />

                    <Tooltip

                        contentStyle={{

                            borderRadius: "10px",

                            border: "none",

                            boxShadow: "0 4px 12px rgba(0,0,0,.15)"

                        }}

                    />

                    <Area

                        type="monotone"

                        dataKey="leads"

                        stroke="#4f46e5"

                        strokeWidth={3}

                        fillOpacity={1}

                        fill="url(#leadColor)"

                        activeDot={{ r: 6 }}

                    />

                </AreaChart>

            </ResponsiveContainer>

        </div>

    );

}

export default React.memo(LeadCharts);