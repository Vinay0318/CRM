import LeadCard from "../leads/LeadCard";

function AssignedLeads({ leads, onSelect }) {

  const assigned = leads.filter(
    (lead) => lead.status !== "NEW"
  );

  return (

    <>

      <h5 className="section-heading mt-4">

        Assigned Leads

      </h5>

      {
        assigned.length === 0 ?

        (
          <p>No Assigned Leads</p>
        )

        :

        (
          assigned.map((lead) => (

            <LeadCard
              key={lead.leadid}
              lead={lead}
              onSelect={onSelect}
            />

          ))
        )
      }

    </>
  );
}

export default AssignedLeads;