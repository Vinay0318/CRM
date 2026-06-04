import LeadCard from "../leads/LeadCard";

function NewLeads({
    leads,
    onSelect
}) {

    const newLeads =
        leads.filter(
            lead =>
            lead.status === "NEW"
        );

    return (

        <>

            <h5 className="section-heading">
                New Leads
            </h5>

            {

                newLeads.map(
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

export default NewLeads;