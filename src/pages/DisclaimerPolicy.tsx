import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const DisclaimerPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto prose prose-slate">
          <h1 className="text-4xl font-bold mb-6">Fake Jobs & Fraud Disclaimer</h1>
          <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="bg-destructive/10 border-l-4 border-destructive p-4 mb-8">
            <p className="font-semibold text-destructive">⚠️ IMPORTANT WARNING</p>
            <p className="mt-2">
              Mahendra Health Care does not charge any fees for job applications, interviews, or employment. 
              Beware of fraudulent job offers and recruitment scams.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Official Recruitment Policy</h2>
            <p className="mb-4">
              Mahendra Health Care follows a strict recruitment process:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>We NEVER charge fees for job applications or interviews</li>
              <li>We NEVER ask for money deposits or payments from candidates</li>
              <li>We NEVER request financial information during recruitment</li>
              <li>All job postings are on our official website and verified job portals only</li>
              <li>Official communication comes only from @mahendrahealthcare.com email addresses</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Common Fraud Schemes</h2>
            <p className="mb-4">Be aware of these fraudulent tactics:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Fake job offers via WhatsApp, Telegram, or social media</li>
              <li>Requests for registration fees or security deposits</li>
              <li>Promises of work-from-home jobs with high earnings</li>
              <li>Requests for bank details, passwords, or OTPs</li>
              <li>Offers requiring purchase of products or starter kits</li>
              <li>Unofficial email addresses claiming to represent us</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. How to Verify Legitimate Opportunities</h2>
            <p className="mb-4">To verify if a job offer is legitimate:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Check our official careers page on our website</li>
              <li>Verify the sender's email domain is @mahendrahealthcare.com</li>
              <li>Contact us directly through official channels</li>
              <li>Never respond to suspicious messages or calls</li>
              <li>Report suspicious activity to us immediately</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Red Flags to Watch For</h2>
            <p className="mb-4">Warning signs of fraudulent job offers:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Unsolicited job offers via messaging apps</li>
              <li>Too-good-to-be-true salary promises</li>
              <li>Urgency to pay money or share sensitive information</li>
              <li>Poor grammar or spelling in communications</li>
              <li>Requests to perform tasks before formal hiring</li>
              <li>No proper interview process</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. If You've Been Targeted</h2>
            <p className="mb-4">If you suspect fraud:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Do NOT send any money or share personal information</li>
              <li>Report to local police/cybercrime authorities</li>
              <li>Contact us at fraud@mahendrahealthcare.com</li>
              <li>Block and report the suspicious contact</li>
              <li>Warn others in your network</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Our Commitment</h2>
            <p className="mb-4">
              Mahendra Health Care is committed to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Maintaining transparent recruitment processes</li>
              <li>Protecting candidates from fraudulent schemes</li>
              <li>Taking legal action against fraudsters using our name</li>
              <li>Educating the public about employment scams</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Disclaimer of Liability</h2>
            <p className="mb-4">
              Mahendra Health Care shall not be held liable for any losses, damages, or consequences arising from 
              fraudulent job offers or scams perpetrated by unauthorized third parties misusing our name. We actively 
              work to prevent such fraud but cannot guarantee prevention of all fraudulent activities.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Report Fraud</h2>
            <p className="mb-4">
              To report suspected fraud:
            </p>
            <p className="mb-2">Email: fraud@mahendrahealthcare.com</p>
            <p className="mb-2">Phone: +91 1234567890</p>
            <p className="mb-4">Include all details, screenshots, and contact information of the fraudulent party.</p>
            <p className="mt-4">
              <strong>Remember:</strong> Legitimate companies never ask for money during recruitment. 
              Stay vigilant and protect yourself from scams.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DisclaimerPolicy;
