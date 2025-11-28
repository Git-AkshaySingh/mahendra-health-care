import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto prose prose-slate">
          <h1 className="text-4xl font-bold mb-6">Return & Refund Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Return Eligibility</h2>
            <p className="mb-4">
              Due to the nature of pharmaceutical and healthcare products, we have specific return policies to ensure 
              safety and quality:
            </p>
            <h3 className="text-xl font-semibold mb-2">Non-Returnable Items:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Prescription medications (opened or sealed)</li>
              <li>Over-the-counter medicines once opened</li>
              <li>Personal care items that have been opened</li>
              <li>Products past their expiration date</li>
              <li>Products without original packaging</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Returnable Items</h2>
            <p className="mb-4">Returns are accepted within 7 days of delivery for:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Damaged or defective products</li>
              <li>Wrong products delivered</li>
              <li>Products with quality issues</li>
              <li>Sealed, unopened non-prescription items (in original packaging)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Return Process</h2>
            <p className="mb-4">To initiate a return:</p>
            <ol className="list-decimal pl-6 mb-4">
              <li>Contact our customer service within 7 days of delivery</li>
              <li>Provide order number and reason for return</li>
              <li>Send clear photos of the product and packaging</li>
              <li>Wait for approval before shipping back</li>
              <li>Package items securely in original packaging</li>
              <li>Include the invoice/packing slip</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Refund Policy</h2>
            <p className="mb-4">Once we receive and inspect your return:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Approved refunds are processed within 7-10 business days</li>
              <li>Refunds are issued to the original payment method</li>
              <li>Shipping charges are non-refundable (unless error on our part)</li>
              <li>You may receive store credit instead of refund, subject to approval</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Damaged or Defective Products</h2>
            <p className="mb-4">
              If you receive a damaged or defective product:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Report within 24 hours of delivery</li>
              <li>Provide photos of the damage/defect</li>
              <li>We will arrange free pickup and replacement</li>
              <li>Full refund including shipping will be provided if replacement unavailable</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Wrong Product Delivered</h2>
            <p className="mb-4">
              If you receive the wrong product:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Contact us immediately</li>
              <li>We will arrange pickup at no cost</li>
              <li>Correct product will be shipped priority</li>
              <li>No charges for the error</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Cancellation Policy</h2>
            <p className="mb-4">
              Orders can be cancelled:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Before shipment - Full refund</li>
              <li>After shipment - Subject to return policy</li>
              <li>Prescription orders may not be cancellable once processed</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Exchange Policy</h2>
            <p className="mb-4">
              Exchanges are available for:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Wrong product delivered</li>
              <li>Damaged or defective items</li>
              <li>Subject to product availability</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Return Shipping</h2>
            <p className="mb-4">
              Return shipping costs are:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Free for defective/damaged/wrong products</li>
              <li>Customer's responsibility for other returns</li>
              <li>We recommend insured, trackable shipping methods</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Contact for Returns</h2>
            <p className="mb-4">
              For return requests or questions:
            </p>
            <p className="mb-2">Email: returns@mahendrahealthcare.com</p>
            <p className="mb-2">Phone: +91 1234567890</p>
            <p>Hours: Monday-Saturday, 9:00 AM - 6:00 PM</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReturnPolicy;
