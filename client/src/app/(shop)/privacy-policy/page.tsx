import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Gewathu.lk",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl" style={{ color: "var(--color-primary)" }}>
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-zinc-500">Last updated: September 2026</p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-zinc-700">
        <section>
          <h2 className="text-lg font-bold text-foreground">1. Overview</h2>
          <p className="mt-2">
            This policy explains what information Gewathu.lk (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects when
            you use our website, why we collect it, and how we protect it.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">2. Information we collect</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Account details you provide: name, email address and password (stored securely, never in plain text).</li>
            <li>Order details: delivery address, city, phone number, items ordered and order notes.</li>
            <li>Payment information: when you pay online, card and payment details are handled directly by our
              payment processor, PayHere — we never see or store your full card number.</li>
            <li>Basic technical data such as browser type, needed to keep the site working correctly.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">3. How we use your information</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>To process, deliver and provide support for your orders.</li>
            <li>To send order confirmations and delivery updates by email.</li>
            <li>To respond to enquiries sent by email or WhatsApp.</li>
            <li>To improve our products, catalogue and website.</li>
          </ul>
          <p className="mt-2">We do not sell your personal information to third parties.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">4. Sharing your information</h2>
          <p className="mt-2">We share information only where necessary to fulfil your order:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>With our payment processor, PayHere, to securely process online payments.</li>
            <li>With delivery partners, to deliver your order to the address you provide.</li>
          </ul>
          <p className="mt-2">
            These parties only receive the information needed to complete their part of the order and are not
            permitted to use it for any other purpose.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">5. Data retention</h2>
          <p className="mt-2">
            We keep order and account information for as long as your account is active or as needed to meet
            legal, accounting or tax obligations. You can request deletion of your account data at any time (see
            below).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">6. Your rights</h2>
          <p className="mt-2">
            You can ask us to access, correct or delete the personal information we hold about you at any time by
            contacting us using the details below.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">7. Cookies</h2>
          <p className="mt-2">
            We use essential cookies required for core site functionality, such as keeping you signed in and
            remembering items in your cart. We do not use cookies for third-party advertising.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">8. Changes to this policy</h2>
          <p className="mt-2">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with a
            revised &ldquo;last updated&rdquo; date. We encourage you to review it periodically.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">9. Contact us</h2>
          <p className="mt-2">
            Questions about this policy or your data can be sent to{" "}
            <a href="mailto:hello@gewathu.lk" className="font-medium text-primary underline">
              hello@gewathu.lk
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
