"use client";

import { useState } from "react";
import { faqs } from "@/data/faqs";

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-warm-border last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span className="text-base font-medium text-charcoal">
          {question}
        </span>
        <span
          className={`w-8 h-8 rounded-full bg-warm-white flex items-center justify-center flex-shrink-0 transition-colors ${
            open ? "bg-red-brand/10" : ""
          }`}
        >
          <svg
            className={`w-4 h-4 text-charcoal-muted transition-transform ${
              open ? "rotate-180 text-red-brand" : ""
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
        </span>
      </button>
      {open && (
        <div className="pb-5 text-sm text-charcoal-muted leading-relaxed pr-12">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <section className="py-16 sm:py-24 bg-warm-white">
      <div className="max-w-2xl mx-auto px-5 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-warm-border">
          {faqs.map((faq) => (
            <FAQItem key={faq.question} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
