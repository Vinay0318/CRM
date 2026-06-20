import React, {
    useEffect,
    useState
}
from "react";

import LeadService
from "../../services/LeadService";

function RecentActivities() {

    const [activities,
        setActivities] =
        useState([]);

    useEffect(() => {

        loadActivities();

    }, []);

    const loadActivities =
        async () => {

            try {

                const response =
                    await LeadService.getAllLeads();

                const latestLeads =
                    response.data
                    .sort((a,b)=>

                        new Date(b.createdAt)
                        -
                        new Date(a.createdAt)

                    )
                    .slice(0,6);

                setActivities(
                    latestLeads
                );

            }

            catch(error){

                console.log(error);

            }
        };

    const getTimeAgo =
        (date) => {

            const seconds =
                Math.floor(
                    (
                        new Date()
                        -
                        new Date(date)
                    ) / 1000
                );

            const minutes =
                Math.floor(seconds/60);

            const hours =
                Math.floor(minutes/60);

            const days =
                Math.floor(hours/24);

            if(days > 0)
                return `${days} day ago`;

            if(hours > 0)
                return `${hours} hr ago`;

            if(minutes > 0)
                return `${minutes} min ago`;

            return "Just Now";
        };

    const getStatusColor =
        (status) => {

            switch(status){

                case "NEW":
                    return "#3b82f6";

                case "CONTACTED":
                    return "#10b981";

                case "INTERESTED":
                    return "#f59e0b";

                case "BOOKING":
                    return "#ef4444";

                default:
                    return "#64748b";
            }
        };

    return (

        <div className="recent-activity-card">

            {
                activities.map(
                    (lead)=>(

                        <div className="activity-item">

                        <div className="activity-avatar">
                    
                            {lead.name.charAt(0)}
                    
                        </div>
                    
                        <div className="activity-info">
                    
                            <h6>{lead.name}</h6>
                    
                            <p>{lead.location}</p>
                    
                            <small>
                                {getTimeAgo(lead.createdAt)}
                            </small>
                    
                        </div>
                    
                        <span
                            className={`activity-status ${lead.status}`}
                        >
                            {lead.status}
                        </span>
                    
                    </div>

                    )
                )
            }

        </div>
    );
}

export default RecentActivities;