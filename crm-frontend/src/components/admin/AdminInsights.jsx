import React, { useEffect, useState } from "react";

import LeadService from "../../services/LeadService";
import PropertyService from "../../services/PropertyService";
import UserService from "../../services/UserService";

function AdminInsights() {

    const [data, setData] = useState({

        totalValue: 0,
        available: 0,
        sold: 0,
        conversion: 0,
        agents: 0,
        managers: 0

    });

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        try {

            const [

                leadResponse,
                propertyResponse,
                agentResponse,
                managerResponse

            ] = await Promise.all([

                LeadService.getAllLeads(),
                PropertyService.getAllProperties(),
                UserService.getAgents(),
                UserService.getManagers()

            ]);

            const leads = leadResponse.data;

            const properties = propertyResponse.data;

            const agents = agentResponse.data;

            const managers = managerResponse.data;

            const totalValue = properties.reduce(

                (sum, property) =>

                    sum + Number(property.price || 0),

                0

            );

            const available = properties.filter(

                property =>

                    property.propertyStatus === "AVAILABLE"

            ).length;

            const sold = properties.filter(

                property =>

                    property.propertyStatus === "SOLD"

            ).length;

            const bookedLeads = leads.filter(

                lead =>

                    lead.status === "BOOKING"

            ).length;

            const conversion =

                leads.length > 0

                    ? ((bookedLeads / leads.length) * 100).toFixed(1)

                    : "0.0";

            setData({

                totalValue,

                available,

                sold,

                conversion,

                agents: agents.length,

                managers: managers.length

            });

        }

        catch (error) {

            console.error(

                "Admin Insights Error:",

                error

            );

        }

    };

    return (

        <div className="row">

            {/* Total Property Value */}

            <div className="col-md-3 mb-4">

                <div className="insight-card revenue">

                    <h6>

                        Total Property Value

                    </h6>

                    <h3>

                        ₹ {(data.totalValue || 0).toLocaleString()}

                    </h3>

                </div>

            </div>

            {/* Available Properties */}

            <div className="col-md-3 mb-4">

                <div className="insight-card available">

                    <h6>

                        Available Properties

                    </h6>

                    <h3>

                        {data.available}

                    </h3>

                </div>

            </div>

            {/* Sold Properties */}

            <div className="col-md-3 mb-4">

                <div className="insight-card sold">

                    <h6>

                        Sold Properties

                    </h6>

                    <h3>

                        {data.sold}

                    </h3>

                </div>

            </div>

            {/* Lead Conversion */}

            <div className="col-md-3 mb-4">

                <div className="insight-card conversion">

                    <h6>

                        Lead Conversion

                    </h6>

                    <h3>

                        {data.conversion}%

                    </h3>

                </div>

            </div>

            {/* Agents */}

            <div className="col-md-6 mb-4">

                <div className="insight-card agents">

                    <h6>

                        Active Agents

                    </h6>

                    <h3>

                        {data.agents}

                    </h3>

                </div>

            </div>

            {/* Managers */}

            <div className="col-md-6 mb-4">

                <div className="insight-card managers">

                    <h6>

                        Managers

                    </h6>

                    <h3>

                        {data.managers}

                    </h3>

                </div>

            </div>

        </div>

    );

}

export default AdminInsights;