// import React, {
//     useEffect,
//     useMemo,
//     useState
// } from "react";

// import {
//     BarChart,
//     Bar,
//     XAxis,
//     YAxis,
//     Tooltip,
//     ResponsiveContainer,
//     CartesianGrid
// } from "recharts";

// import UserService from "../../services/UserService";

// function ManagerChart() {

//     const [data, setData] = useState([]);

//     useEffect(() => {

//         loadManagers();

//     }, []);

//     const loadManagers = async () => {

//         try {

//             const response =
//                 await UserService.getManagers();

//             const managers =
//                 response.data;

//             const cityCount = {};

//             managers.forEach(manager => {

//                 if (!manager.assignedCity) return;

//                 cityCount[manager.assignedCity] =
//                     (cityCount[manager.assignedCity] || 0) + 1;

//             });

//             const chartData = Object.keys(cityCount)
//                 .sort()
//                 .map(city => ({

//                     city,

//                     managers: cityCount[city]

//                 }));

//             setData(chartData);

//         }

//         catch (error) {

//             console.error(

//                 "Unable to load manager chart",

//                 error

//             );

//         }

//     };

//     const tooltipStyle = useMemo(() => ({

//         borderRadius: "10px",

//         border: "none",

//         boxShadow: "0 4px 12px rgba(0,0,0,.15)"

//     }), []);

//     return (

//         <div className="chart-card">

//             <div className="d-flex justify-content-between align-items-center mb-3">

//                 <h5>

//                     Managers By City

//                 </h5>

//                 <span className="badge bg-success">

//                     Live Data

//                 </span>

//             </div>

//             <ResponsiveContainer
//                 width="100%"
//                 height={350}
//             >

//                 <BarChart
//                     data={data}
//                 >

//                     <CartesianGrid
//                         strokeDasharray="3 3"
//                     />

//                     <XAxis
//                         dataKey="city"
//                     />

//                     <YAxis
//                         allowDecimals={false}
//                     />

//                     <Tooltip
//                         contentStyle={tooltipStyle}
//                     />

//                     <Bar
//                         dataKey="managers"
//                         fill="#10b981"
//                         radius={[10, 10, 0, 0]}
//                     />

//                 </BarChart>

//             </ResponsiveContainer>

//         </div>

//     );

// }

// export default React.memo(ManagerChart);