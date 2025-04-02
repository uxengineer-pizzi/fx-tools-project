"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";

export interface ForexData {
  [date: string]: {
    [currency: string]: number;
  };
}

interface CurrencyPair {
  base: string;
  quote: string;
  label?: string;
}

export function useHistoricalData(
  dateRange: DateRange | undefined,
  currencyPair: CurrencyPair
) {
  const [data, setData] = useState<ForexData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      if (!dateRange?.from || !dateRange.to) return;
      setLoading(true);
      setError(null);
      try {
        const startDate = format(dateRange.from, "yyyy-MM-dd");
        const endDate = format(dateRange.to, "yyyy-MM-dd");
        const { base, quote } = currencyPair;

        const response = await fetch(
          `https://api.forexrateapi.com/v1/timeframe?api_key=${process.env.NEXT_PUBLIC_FOREX_RATE_API_KEY}&start_date=${startDate}&end_date=${endDate}&base=${base}&currencies=${quote}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        setData(result.rates);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchHistoricalData();
  }, [dateRange, currencyPair]);

  return { data, loading, error };
}
