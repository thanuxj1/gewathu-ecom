import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return & Refund Policy | Gewathu.lk",
};

export default function ReturnPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl" style={{ color: "var(--color-primary)" }}>
        Return &amp; Refund Policy
      </h1>
      <p className="mt-2 text-sm text-zinc-500">Last updated: September 2026</p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-zinc-700">
        <section>
          <h2 className="text-lg font-bold text-foreground">1. Overview</h2>
          <p className="mt-2">
            We want every order from Gewathu.lk to arrive in good condition. This policy explains when an item
            can be returned or refunded, and how to request one.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">2. Eligible returns</h2>
          <p className="mt-2">You may request a return or refund if:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>The item arrived damaged, defective, or significantly different from what was ordered.</li>
            <li>The wrong product or quantity was delivered.</li>
            <li>A live plant arrived dead or in visibly poor health due to transit.</li>
          </ul>
          <p className="mt-2">
            Requests must be made within <strong>3 days</strong> of delivery. Please contact us with your order
            number and photos of the item as soon as possible so we can resolve it quickly.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">3. Non-returnable items</h2>
          <p className="mt-2">
            Because of their nature, the following cannot be returned once delivered, unless faulty or damaged
            in transit:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Seeds, seedlings and other perishable plants once opened or planted</li>
            <li>Soil, compost and fertiliser once the packaging has been opened</li>
            <li>Items marked as final sale at checkout</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">4. How to request a return</h2>
          <p className="mt-2">
            Contact us by WhatsApp or email (see the Contact section in the site footer) with your order number,
            a short description of the issue and photos of the item. We will confirm next steps within 1–2
            business days.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">5. Refunds</h2>
          <p className="mt-2">
            Approved refunds are issued to the original payment method (for online/card payments via PayHere) or
            by bank transfer (for cash-on-delivery and bank-transfer orders), usually within 5–7 business days of
            approval. Delivery charges are non-refundable unless the return is due to our error.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">6. Exchanges</h2>
          <p className="mt-2">
            If you received the wrong item or a damaged product, we will replace it at no extra cost, subject to
            stock availability. If a replacement isn&apos;t available, we&apos;ll issue a refund instead.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">7. Return shipping</h2>
          <p className="mt-2">
            If the return is due to our error (wrong item, damaged or defective product), we cover the cost of
            collecting or returning the item. If you are returning an item for another reason where a return is
            accepted, the cost of returning it is your responsibility.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">8. Processing time</h2>
          <p className="mt-2">
            We aim to confirm approved returns within 1–2 business days of receiving your request, and to
            complete refunds or replacements within 5–7 business days after that. It may take a few additional
            days for a refund to appear in your account, depending on your bank or payment provider.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">9. Contact us</h2>
          <p className="mt-2">
            For any return or refund request, reach us at{" "}
            <a href="mailto:hello@gewathu.lk" className="font-medium text-primary underline">
              hello@gewathu.lk
            </a>{" "}
            or via WhatsApp using the link in the footer.
          </p>
        </section>
      </div>
    </div>
  );
}
