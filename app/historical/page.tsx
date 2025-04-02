"use client";

import { useState, useMemo } from "react";
import { subDays } from "date-fns";
import type { DateRange } from "react-day-picker";
import { Hero } from "@/components/hero";
import { ErrorComponent } from "@/components/error";
import { DataFilters } from "./components/data-filters";
import { Chart } from "./components/chart";
import { useHistoricalData } from "@/hooks/useHistoricalData";
import { Skeleton } from "@/components/ui/skeleton";

export default function HistoricalPage() {
	const [dateRange, setDateRange] = useState<DateRange | undefined>({
		from: subDays(new Date(), 7),
		to: new Date(),
	});
	const [currencyPair, setCurrencyPair] = useState({
		base: "USD",
		quote: "EUR",
		label: "USD/EUR",
	});

	const { data, loading, error } = useHistoricalData(dateRange, currencyPair);

	const chartData = useMemo(() => {
		if (!data) return [];
		return Object.entries(data).map(([date, rates]) => ({
			date,
			rate: rates[currencyPair.quote],
		}));
	}, [data, currencyPair.quote]);

	return (
		<>
			<Hero
				title="Historical Forex Data"
				subtitle="Explore Historical Forex Trends with a Interactive Chart"
			/>
			<div className="px-4">
				<div className="container relative z-10 mx-auto lg:-mt-28 -mt-16 py-5 px-4 bg-card text-foreground border rounded-md max-w-5xl">
					<DataFilters
						currencyPair={currencyPair}
						setCurrencyPair={setCurrencyPair}
						dateRange={dateRange}
						setDateRange={setDateRange}
					/>

					{loading && (
						<div className="space-y-4 py-8">
							<Skeleton className="h-[350px] w-full" />
						</div>
					)}

					{error && (
						<ErrorComponent loading={loading} error={error} variant="danger" />
					)}

					{data && (
						<div className="grid gap-6">
							<Chart chartData={chartData} currencyPair={currencyPair} />
						</div>
					)}
				</div>
			</div>
		</>
	);
}
