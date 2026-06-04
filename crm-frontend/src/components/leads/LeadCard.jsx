function LeadCard({
  lead,
  onSelect
}) {

  return (

    <div
      className="lead-card"
      onClick={() =>
        onSelect(lead)
      }
    >

      <div>

        <h6>
          {lead.name}
        </h6>

        <small>

          📍 {lead.location}

        </small>

        <br />

        <small>

          ₹ {lead.budget}

        </small>

      </div>

      <div>

        {
          lead.status === "NEW" ?

          (
            <span className="badge bg-danger">
              NEW
            </span>
          )

          :

          (
            <span className="badge bg-primary">
              {lead.status}
            </span>
          )
        }

      </div>

    </div>

  );
}

export default LeadCard;