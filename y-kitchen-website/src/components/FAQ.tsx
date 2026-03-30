"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How much do meals cost?",
    answer:
      "A veggie meal with rice is ₱90. Chicken or pork with rice starts at ₱109, or ₱139 if you add a side of vegetables. Beef meals go from ₱129 to ₱150. If you're extra hungry, two-dish combos are ₱170–₱180. Every meal comes with free soup and water.",
  },
  {
    question: "Do you do catering?",
    answer:
      "Yes — it's actually one of the things we do best. We prepare party trays for offices, government agencies, corporate events, LGU functions, birthdays, you name it. Just give us at least 2 days' notice so we can get everything ready.",
  },
  {
    question: "Can we set up a daily meal arrangement for our office?",
    answer:
      "Absolutely. We already do this for several organizations. If your team needs regular lunches — daily, weekly, or for specific events — reach out and we'll work something out that fits your schedule and budget.",
  },
  {
    question: "Is the food really cooked fresh every day?",
    answer:
      "Yes, every single day. We don't cook ahead and reheat. Our team starts early each morning to prep and cook everything from scratch. What you're eating was made that same day.",
  },
  {
    question: "Can I mix and match dishes for catering?",
    answer:
      "Of course. You can pick which dishes go into your trays. Just tell us your preferences — or your budget — and we'll put together a combination that works.",
  },
  {
    question: "Do you deliver?",
    answer:
      "For dine-in, come visit us directly. For party trays and catering, we can arrange delivery depending on the order size and location. You can also find us on popular food delivery apps — just ask us for details.",
  },
  {
    question: "What are your hours?",
    answer:
      "We're open Monday to Saturday from 7 AM to 7 PM, and Sundays from 8 AM to 5 PM. We're here early because a lot of our customers want lunch sorted before noon.",
  },
];

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="text-base font-medium text-charcoal pr-4">
          {question}
        </span>
        <svg
          className={`w-5 h-5 flex-shrink-0 text-charcoal-light transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && (
        <div className="pb-5 text-sm text-charcoal-light leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <section className="py-20 bg-warm-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4">
            Questions? We Got You.
          </h2>
          <p className="text-lg text-charcoal-light">
            Here&apos;s what people usually ask us.
          </p>
        </div>
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
          {faqs.map((faq) => (
            <FAQItem key={faq.question} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
