"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What are your meal prices?",
    answer:
      "Our budget meals start at ₱99 (one dish + rice with free soup and water). Value meals with two dishes + rice are ₱129, also with free soup and water.",
  },
  {
    question: "Do you accept catering orders?",
    answer:
      "Yes! We offer party trays for office meetings, birthdays, and small events. Please place your order at least 2 days in advance. You can call us or send an inquiry through the website.",
  },
  {
    question: "Do you offer delivery?",
    answer:
      "We currently serve dine-in customers and accept pick-up orders for party trays. For delivery, you can reach us through popular food delivery apps. Contact us for details.",
  },
  {
    question: "Can I customize my order for catering?",
    answer:
      "Absolutely. We can mix and match dishes for your party trays based on your preferences and budget. Just let us know when you inquire.",
  },
  {
    question: "What time do you open?",
    answer:
      "We're open Monday to Saturday from 7:00 AM to 7:00 PM, and Sundays from 8:00 AM to 5:00 PM.",
  },
  {
    question: "Is Y Kitchen halal?",
    answer:
      "Our menu primarily features traditional Filipino dishes. Please contact us directly if you have specific dietary requirements and we'll do our best to accommodate you.",
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
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-charcoal-light">
            Got questions? We&apos;ve got answers.
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
