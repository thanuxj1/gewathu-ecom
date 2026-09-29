import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Gewathu.lk",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl" style={{ color: "var(--color-primary)" }}>
        Business Terms &amp; Conditions
      </h1>
      <p className="mt-2 text-sm text-zinc-500">Last updated: September 2026</p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-zinc-700">
        <section>
          <h2 className="text-lg font-bold text-foreground">1. About Gewathu.lk</h2>
          <p className="mt-2">
            Gewathu.lk is an online store based in Sri Lanka selling plants, seeds, seedlings, garden tools,
            soil, fertiliser and related gardening supplies. By using this website or placing an order, you agree
            to the terms below.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">2. Using our website</h2>
          <p className="mt-2">
            You must be at least 18 years old, or have a parent or guardian&apos;s permission, to place an order
            on this website. If you create an account, you are responsible for keeping your login details
            confidential and for all activity under your account. You agree to provide accurate, current
            information when registering or checking out, and not to use this website for any unlawful purpose.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">3. Orders</h2>
          <p className="mt-2">
            Placing an order is an offer to purchase, which we accept once we confirm the order. We may cancel or
            decline any order, for example if an item is out of stock or its price was listed incorrectly, and
            will notify you and refund any payment already made in that case.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">4. Pricing</h2>
          <p className="mt-2">
            All prices are listed in Sri Lankan Rupees (LKR) and include any applicable taxes unless stated
            otherwise. Delivery charges, where they apply, are shown at checkout before you place your order.
            Prices and promotions are subject to change without notice.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">5. Payment</h2>
          <p className="mt-2">We accept cash on delivery, direct bank transfer, and online payments processed
            securely by PayHere. Online payment details are handled entirely by PayHere; we do not store your
            card information.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">6. Delivery</h2>
          <p className="mt-2">
            We aim to deliver within the timeframe shown at checkout. Delivery times are estimates and may vary
            due to location, weather or courier delays. Please make sure your delivery address and contact number
            are correct — we are not responsible for delays caused by incorrect details provided at checkout.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">7. Returns &amp; refunds</h2>
          <p className="mt-2">
            Returns and refunds are handled according to our{" "}
            <a href="/return-policy" className="font-medium text-primary underline">
              Return &amp; Refund Policy
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">8. Product information</h2>
          <p className="mt-2">
            We try to describe and photograph products accurately. Because plants and seeds are natural products,
            slight variation in appearance, size or colour from photos is normal and not considered a fault.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">9. Intellectual property</h2>
          <p className="mt-2">
            All content on this website — including text, images, logos and graphics — belongs to Gewathu.lk or
            its licensors and is protected by intellectual property law. You may not copy, reproduce, distribute
            or reuse this content without our prior written permission.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">10. Limitation of liability</h2>
          <p className="mt-2">
            To the extent permitted by law, Gewathu.lk is not liable for indirect or consequential losses arising
            from the use of this website or products purchased through it, beyond the value of the order itself.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">11. Amendments</h2>
          <p className="mt-2">
            We may update these Terms &amp; Conditions from time to time. Changes take effect once posted on this
            page with a revised &ldquo;last updated&rdquo; date. Continued use of the website after changes are
            posted means you accept the updated terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">12. Governing law</h2>
          <p className="mt-2">These terms are governed by the laws of Sri Lanka.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">13. Contact us</h2>
          <p className="mt-2">
            Questions about these terms can be sent to{" "}
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
