import LeadCard from "../leads/LeadCard";

function AssignedLeads({
    leads,
    onSelect
}) {

    const assignedLeads =
        leads.filter(
            lead =>
            lead.status !== "NEW"
        );

    return (

        <>

            <h5 className="section-heading mt-4">
                Assigned Leads
            </h5>

            {

                assignedLeads.map(
                    (lead,index) => (

                        <LeadCard

                            key={
                                lead.Leadid ||
                                lead.leadid ||
                                index
                            }

                            lead={lead}

                            onSelect={onSelect}

                        />

                    )
                )

            }

        </>

    );
}

export default AssignedLeads;