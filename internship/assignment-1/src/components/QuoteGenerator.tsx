"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import quotesData from "@/data/quotes.json";

export default function QuoteGenerator() {
  const [topic, setTopic] = useState("");
  const [quotes, setQuotes] = useState<string[]>([]);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setQuotes([]);

    const normalizedTopic = topic.trim().toLowerCase();
    const topicData = quotesData.find(
      (item) => item.topic.toLowerCase() === normalizedTopic
    );

    if (topicData) {
      setQuotes(topicData.quotes);
    } else {
      setError("No quotes found for this topic. Try 'motivation', 'life', or 'success'.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-base-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Quote Generator</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Enter a topic (e.g., motivation, life, success)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full"
          aria-label="Topic input for quote generator"
        />
        <Button type="submit" className="w-full btn-primary">
          Get Quotes
        </Button>
      </form>
      {error && <p className="text-error mt-4">{error}</p>}
      {quotes.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Quotes:</h2>
          <ul className="list-disc pl-5 space-y-2">
            {quotes.map((quote, index) => (
              <li key={index} className="text-base-content">
                {quote}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}