import React, {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

import PropertyService from "../../services/PropertyService";

function PropertyChart() {

    const [data, setData] = useState([]);

    const [stats, setStats] = useState({

        total: 0,

        available: 0,

        booked: 0,

        sold: 0

    });

    useEffect(() => {

        loadProperties();

    }, []);

    const loadProperties = async () => {

        try {

            const response =
                await PropertyService.getAllProperties();

            const properties =
                response.data;

            const statusCount = {};

            let available = 0;

            let booked = 0;

            let sold = 0;

            properties.forEach(property => {

                const status =
                    property.propertyStatus;

                statusCount[status] =
                    (statusCount[status] || 0) + 1;

                switch (status) {

                    case "AVAILABLE":

                        available++;

                        break;

                    case "BOOKED":

                        booked++;

                        break;

                    case "SOLD":

                        sold++;

                        break;

                    default:

                        break;

                }

            });

            setStats({

                total: properties.length,

                available,

                booked,

                sold

            });

            const chartData =

                Object.entries(statusCount)

                    .sort()

                    .map(([name, value]) => ({

                        name,

                        value

                    }));

            setData(chartData);

        }

        catch (error) {

            console.error(

                "Unable to load property statistics",

                error

            );

        }

    };

    const COLORS = useMemo(() => [

        "#4f46e5",

        "#10b981",

        "#f59e0b",

        "#ef4444",

        "#8b5cf6"

    ], []);

    return (

        <div>

            {/* Summary Cards */}

            <div className="property-stats-row">

                <div className="mini-card">

                    <h6>Total</h6>

                    <h3>{stats.total}</h3>

                </div>

                <div className="mini-card green">

                    <h6>Available</h6>

                    <h3>{stats.available}</h3>

                </div>

                <div className="mini-card orange">

                    <h6>Booked</h6>

                    <h3>{stats.booked}</h3>

                </div>

                <div className="mini-card red">

                    <h6>Sold</h6>

                    <h3>{stats.sold}</h3>

                </div>

            </div>

            {/* Pie Chart */}

            <ResponsiveContainer

                width="100%"

                height={300}

            >

                <PieChart

                    margin={{

                        top: 20,

                        right: 20,

                        left: 20,

                        bottom: 20

                    }}

                >

                    <Pie

                        data={data}

                        cx="50%"

                        cy="45%"

                        outerRadius={90}

                        dataKey="value"

                        nameKey="name"

                        label

                    >

                        {

                            data.map((entry, index) => (

                                <Cell

                                    key={entry.name}

                                    fill={

                                        COLORS[

                                            index %

                                            COLORS.length

                                        ]

                                    }

                                />

                            ))

                        }

                    </Pie>

                    <Tooltip />

                    <Legend

                        verticalAlign="bottom"

                        height={36}

                    />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}

export default React.memo(PropertyChart);