import React, {
    useEffect,
    useState
} from "react";

import LeadService from "../../services/LeadService";
import PropertyService from "../../services/PropertyService";
import UserService from "../../services/UserService";

function AdminInsights() {

    const [data, setData] = useState({

        totalValue: 0,
        available: 0,
        sold: 0,
        booking: 0,
        conversion: 0,
        agents: 0,
        managers: 0
    });

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        try {

            const leads =
                (await LeadService.getAllLeads()).data;

            const properties =
                (await PropertyService.getAllProperties()).data;

            const agents =
                (await UserService.getAgents()).data;

            const managers =
                (await UserService.getManagers()).data;

            const totalValue =
                properties.reduce(
                    (sum, p) =>
                        sum + Number(p.price || 0),
                    0
                );

            const available =
                properties.filter(
                    p =>
                        p.propertyStatus ===
                        "AVAILABLE"
                ).length;

            const sold =
                properties.filter(
                    p =>
                        p.propertyStatus ===
                        "SOLD"
                ).length;

            const booking =
                leads.filter(
                    l =>
                        l.status ===
                        "BOOKING"
                ).length;

            const conversion =
                leads.length > 0
                ?
                (
                    booking /
                    leads.length
                ) * 100
                :
                0;

            setData({

                totalValue,
                available,
                sold,
                booking,
                conversion:
                    conversion.toFixed(1),

                agents:
                    agents.length,

                managers:
                    managers.length
            });

        }

        catch(error){

            console.log(error);
        }
    };

    return (

        <div className="row">

            <div className="col-md-3 mb-4">

                <div className="insight-card revenue">

                    <h6>
                        Total Property Value
                    </h6>

                    <h3>
                        ₹ {data.totalValue.toLocaleString()}
                    </h3>

                </div>

            </div>

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