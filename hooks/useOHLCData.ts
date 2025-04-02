import { useState, useEffect } from "react";
import { subDays, format, addDays, isAfter, isBefore } from "date-fns";
import type { DateRange } from "react-day-picker";
import type { FXDaily } from "@/app/ohlc/components/columns";

const TWELVE_DATA_API_KEY = process.env.NEXT_PUBLIC_TWELVE_DATA_API_KEY;

export async function fetchOHLCData(
  pair: string,
  dateRange: DateRange | undefined,
): Promise<FXDaily[]> {
  const startDate = dateRange?.from || subDays(new Date(), 30);
  const endDate = dateRange?.to || new Date();

  if (!TWELVE_DATA_API_KEY) {
    throw new Error("Twelve Data API key not configured");
  }

  const response = await fetch(
    `https://api.twelvedata.com/time_series?symbol=${pair}&interval=1day&start_date=${format(
      startDate,
      "yyyy-MM-dd",
    )}&end_date=${format(endDate, "yyyy-MM-dd")}&apikey=${TWELVE_DATA_API_KEY}`,
  );

  const data = await response.json();

  if (data.status === "error") {
    throw new Error(data.message || "API error");
  }

  if (!data.values || !Array.isArray(data.values)) {
    throw new Error("No data available for this currency pair");
  }

  return data.values
    .map((item: any) => ({
      date: new Date(item.datetime),
      open: Number.parseFloat(item.open),
      high: Number.parseFloat(item.high),
      low: Number.parseFloat(item.low),
      close: Number.parseFloat(item.close),
    }))
    .filter((item: { date: Date }) =>
      isAfter(item.date, subDays(startDate, 1)) && isBefore(item.date, addDays(endDate, 1)),
    )
    .sort((a, b) => a.date.getTime() - b.date.getTime());
}

export function useOHLCData(selectedPair: string, dateRange: DateRange | undefined) {
  const [data, setData] = useState<FXDaily[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const result = await fetchOHLCData(selectedPair, dateRange);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedPair, dateRange]);

  return { data, loading, error };
}
