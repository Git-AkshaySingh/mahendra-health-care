import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto prose prose-slate">
          <h1 className="text-4xl font-bold mb-6">Terms and Conditions</h1>
          <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using Mahendra Health Care's website and services, you accept and agree to be bound by 
              these Terms and Conditions. If you do not agree, please do not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Prescription Requirements</h2>
            <p className="mb-4">
              Certain products require a valid prescription from a licensed healthcare provider. You agree to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Upload authentic and valid prescriptions</li>
              <li>Provide accurate medical information</li>
              <li>Not misuse or share prescription medications</li>
              <li>Understand that we reserve the right to refuse orders without valid prescriptions</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Product Information</h2>
            <p className="mb-4">
              While we strive to provide accurate product information, we do not warrant that product descriptions, 
              pricing, or other content is accurate, complete, or error-free. We reserve the right to correct errors 
              and update information at any time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Orders and Payment</h2>
            <p className="mb-4">By placing an order, you agree that:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>All information provided is accurate and complete</li>
              <li>You authorize payment for the products ordered</li>
              <li>We may cancel orders for any reason, including product unavailability</li>
              <li>Prices are subject to change without notice</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Delivery</h2>
            <p className="mb-4">
              We aim to deliver products within the estimated timeframe. However, delivery times are not guaranteed 
              and may vary due to factors beyond our control.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Returns and Refunds</h2>
            <p className="mb-4">
              Due to the nature of pharmaceutical products, returns are subject to our Return Policy. Opened or used 
              products cannot be returned unless defective or incorrectly supplied.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
            <p className="mb-4">
              Mahendra Health Care shall not be liable for any indirect, incidental, or consequential damages arising 
              from the use of our products or services. Our liability is limited to the purchase price of the product.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. User Conduct</h2>
            <p className="mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Use the website for any unlawful purpose</li>
              <li>Impersonate any person or entity</li>
              <li>Interfere with the website's operation</li>
              <li>Attempt unauthorized access to our systems</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these terms at any time. Continued use of our services constitutes 
              acceptance of the updated terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Contact Information</h2>
            <p className="mb-4">
              For questions about these Terms and Conditions, contact us at:
            </p>
            <p className="mb-2">Email: legal@mahendrahealthcare.com</p>
            <p>Phone: +91 1234567890</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsAndConditions;
