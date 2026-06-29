import React from "react";

function DashboardCards({

    totalLeads,

    newLeads,

    interested,

    bookings

}) {

    const cards = [

        {

            title: "Total Leads",

            value: totalLeads,

            icon: "bi bi-people-fill",

            cardClass: "total",

            iconClass: "purple"

        },

        {

            title: "New Leads",

            value: newLeads,

            icon: "bi bi-person-plus-fill",

            cardClass: "new",

            iconClass: "red"

        },

        {

            title: "Interested",

            value: interested,

            icon: "bi bi-hand-thumbs-up-fill",

            cardClass: "interested",

            iconClass: "green"

        },

        {

            title: "Bookings",

            value: bookings,

            icon: "bi bi-calendar-check-fill",

            cardClass: "booking",

            iconClass: "orange"

        }

    ];

    return (

        <div className="dashboard-cards">

            {

                cards.map((card) => (

                    <div

                        key={card.title}

                        className={`modern-card ${card.cardClass}`}

                    >

                        <div className={`card-icon ${card.iconClass}`}>

                            <i className={card.icon}></i>

                        </div>

                        <div>

                            <h3>

                                {card.value}

                            </h3>

                            <p>

                                {card.title}

                            </p>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}

export default React.memo(DashboardCards);