import React, {
    useEffect,
    useState
} from "react";

import LeadService from "../../services/LeadService";

function RecentActivities() {

    const [activities, setActivities] = useState([]);

    useEffect(() => {

        loadActivities();

    }, []);

    // =============================
    // Load Recent Activities
    // =============================

    const loadActivities = async () => {

        try {

            const response =
                await LeadService.getAllLeads();

            const latestLeads =

                [...response.data]

                    .sort(

                        (a, b) =>

                            new Date(b.createdAt) -

                            new Date(a.createdAt)

                    )

                    .slice(0, 6);

            setActivities(latestLeads);

        }

        catch (error) {

            console.error(

                "Unable to load activities",

                error

            );

        }

    };

    // =============================
    // Time Ago
    // =============================

    const getTimeAgo = (date) => {

        if (!date) {

            return "-";

        }

        const seconds = Math.floor(

            (new Date() - new Date(date)) / 1000

        );

        const minutes = Math.floor(seconds / 60);

        const hours = Math.floor(minutes / 60);

        const days = Math.floor(hours / 24);

        if (days > 0) {

            return `${days} day${days > 1 ? "s" : ""} ago`;

        }

        if (hours > 0) {

            return `${hours} hr${hours > 1 ? "s" : ""} ago`;

        }

        if (minutes > 0) {

            return `${minutes} min${minutes > 1 ? "s" : ""} ago`;

        }

        return "Just Now";

    };

    return (

        <div className="recent-activity-card">

            {

                activities.length === 0 ? (

                    <div className="text-center py-4">

                        <h6 className="text-muted">

                            No Recent Activities

                        </h6>

                    </div>

                ) : (

                    activities.map((lead) => (

                        <div

                            key={lead.leadid}

                            className="activity-item"

                        >

                            <div className="activity-avatar">

                                {

                                    (lead.name || "?")

                                        .charAt(0)

                                        .toUpperCase()

                                }

                            </div>

                            <div className="activity-info">

                                <h6>

                                    {lead.name || "-"}

                                </h6>

                                <p>

                                    {lead.location || "-"}

                                </p>

                                <small>

                                    {

                                        getTimeAgo(

                                            lead.createdAt

                                        )

                                    }

                                </small>

                            </div>

                            <span

                                className={`activity-status ${

                                    lead.status?.toLowerCase() || ""

                                }`}

                            >

                                {lead.status || "-"}

                            </span>

                        </div>

                    ))

                )

            }

        </div>

    );

}

export default React.memo(RecentActivities);