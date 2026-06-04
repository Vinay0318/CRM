import EnquiryForm from "../components/leads/EnquiryForm";
import "../styles/Enquiry.css";

function EnquiryPage() {

  return (

    <div className="enquiry-page">

      <div className="container">

        <div className="text-center mb-5">

          <h1 className="display-5 fw-bold">

            Find Your Dream Property

          </h1>

          <p className="lead">

            Submit your enquiry and
            our team will contact you.

          </p>

        </div>

        <EnquiryForm />

      </div>

    </div>
  );
}

export default EnquiryPage;