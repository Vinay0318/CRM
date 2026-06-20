import React,
{
    useEffect,
    useState
}
from "react";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
}
from "recharts";

import PropertyService
from "../../services/PropertyService";

function PropertyChart() {

    const [data,
        setData] =
        useState([]);

    const [stats,
        setStats] =
        useState({

            total:0,
            available:0,
            sold:0,
            booked:0

        });

    useEffect(() => {

        loadProperties();

    }, []);

    const loadProperties =
        async () => {

            try {

                const response =
                    await PropertyService.getAllProperties();

                const properties =
                    response.data;

                const counts = {};

                let available = 0;
                let sold = 0;
                let booked = 0;

                properties.forEach(property => {

                    counts[
                        property.propertyStatus
                    ] =

                    (
                        counts[
                            property.propertyStatus
                        ] || 0
                    ) + 1;

                    if(
                        property.propertyStatus ===
                        "AVAILABLE"
                    ){
                        available++;
                    }

                    if(
                        property.propertyStatus ===
                        "SOLD"
                    ){
                        sold++;
                    }

                    if(
                        property.propertyStatus ===
                        "BOOKED"
                    ){
                        booked++;
                    }

                });

                setStats({

                    total:
                        properties.length,

                    available,

                    sold,

                    booked

                });

                const chartData =
                    Object.keys(counts)
                    .map(status => ({

                        name: status,

                        value:
                            counts[status]

                    }));

                setData(chartData);

            }

            catch(error){

                console.log(error);

            }
        };

    const COLORS = [

        "#4f46e5",
        "#10b981",
        "#f59e0b",
        "#ef4444",
        "#8b5cf6"

    ];

    return (

        <div>

<div className="property-stats-row">

                <div className="mini-card">

                    <h6>Total</h6>

                    <h3>
                        {stats.total}
                    </h3>

                </div>

                <div className="mini-card green">

                    <h6>Available</h6>

                    <h3>
                        {stats.available}
                    </h3>

                </div>

                <div className="mini-card orange">

                    <h6>Booked</h6>

                    <h3>
                        {stats.booked}
                    </h3>

                </div>

                <div className="mini-card red">

                    <h6>Sold</h6>

                    <h3>
                        {stats.sold}
                    </h3>

                </div>

            </div>

            <ResponsiveContainer
    width="100%"
    height={260}
>

<PieChart
    margin={{
        top:20,
        right:20,
        left:20,
        bottom:20
    }}
>

<Pie
    data={data}
    cx="50%"
    cy="45%"
    outerRadius={90}
                        dataKey="value"
                        label
                    >

                        {
                            data.map(
                                (
                                    entry,
                                    index
                                ) => (

                                    <Cell
                                        key={index}
                                        fill={
                                            COLORS[
                                                index %
                                                COLORS.length
                                            ]
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

export default PropertyChart;