import LeadCard from "../leads/LeadCard";

function NewLeads({ leads, onSelect }) {

  const newLeads = leads.filter(
    (lead) => lead.status === "NEW"
  );

  return (

    <>

      <h5 className="section-heading">

        New Leads

      </h5>

      {
        newLeads.length === 0 ?

        (
          <p>No New Leads</p>
        )

        :

        (
          newLeads.map((lead) => (

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

export default NewLeads;