'use client';

import { useState } from 'react';

export function PlaceholderForm() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <h3 className="text-xl font-medium text-content-200">Thank you</h3>
        <p className="mt-2 text-sm text-content-400">
          We'll review your submission and be in touch within 2 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-content-200">Full Name</label>
        <input type="text" required className="mt-1 w-full rounded-md border border-border-200 bg-surface-100 px-3 py-2 text-sm text-content-200 placeholder:text-content-500 focus:outline-none focus:ring-1 focus:ring-accent-500" placeholder="Jane Smith" />
      </div>
      <div>
        <label className="block text-sm font-medium text-content-200">Email</label>
        <input type="email" required className="mt-1 w-full rounded-md border border-border-200 bg-surface-100 px-3 py-2 text-sm text-content-200 placeholder:text-content-500 focus:outline-none focus:ring-1 focus:ring-accent-500" placeholder="jane@company.com" />
      </div>
      <div>
        <label className="block text-sm font-medium text-content-200">Company</label>
        <input type="text" className="mt-1 w-full rounded-md border border-border-200 bg-surface-100 px-3 py-2 text-sm text-content-200 placeholder:text-content-500 focus:outline-none focus:ring-1 focus:ring-accent-500" placeholder="Company name" />
      </div>
      <div>
        <label className="block text-sm font-medium text-content-200">Annual Revenue Range</label>
        <select className="mt-1 w-full rounded-md border border-border-200 bg-surface-100 px-3 py-2 text-sm text-content-200 focus:outline-none focus:ring-1 focus:ring-accent-500">
          <option value="">Select range</option>
          <option value="pre-revenue">Pre-revenue</option>
          <option value="0-1m">$0 – $1M</option>
          <option value="1-5m">$1M – $5M</option>
          <option value="5-20m">$5M – $20M</option>
          <option value="20m+">$20M+</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-content-200">What are you looking for help with?</label>
        <textarea rows={4} className="mt-1 w-full rounded-md border border-border-200 bg-surface-100 px-3 py-2 text-sm text-content-200 placeholder:text-content-500 focus:outline-none focus:ring-1 focus:ring-accent-500" placeholder="Describe your current situation and what kind of support you're looking for." />
      </div>
      <button type="submit" className="w-full rounded-md bg-accent-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-accent-600 transition-colors">
        Submit Request
      </button>
    </form>
  );
}