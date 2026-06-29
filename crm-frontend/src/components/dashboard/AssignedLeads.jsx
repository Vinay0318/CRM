import React, { useMemo } from "react";

import LeadCard from "../leads/LeadCard";

function AssignedLeads({

    leads = [],

    onSelect

}) {

    // ==========================
    // Assigned Leads
    // ==========================

    const assignedLeads = useMemo(() => {

        return leads.filter(

            (lead) =>

                lead.assignedAgentId ||

                lead.assignedAgentName

        );

    }, [leads]);

    return (

        <div className="lead-list-container">

            {/* Header */}

            <div className="lead-list-header">

                <h4>

                    Assigned Leads

                </h4>

                <div className="lead-count-badge">

                    {assignedLeads.length}

                </div>

            </div>

            {/* Empty State */}

            {

                assignedLeads.length === 0 ? (

                    <div className="text-center py-4">

                        <h6 className="text-muted">

                            No Assigned Leads Found

                        </h6>

                    </div>

                ) : (

                    assignedLeads.map((lead) => (

                        <LeadCard

                            key={lead.leadid}

                            lead={lead}

                            onSelect={onSelect}

                        />

                    ))

                )

            }

        </div>

    );

}

export default React.memo(AssignedLeads);