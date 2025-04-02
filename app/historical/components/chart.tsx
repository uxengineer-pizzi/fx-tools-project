"use client";

import { SimpleAreaChart } from "@/components/ui/charts";

interface ChartProps {
	chartData: { date: string; rate: number }[];
	currencyPair: { base: string; quote: string; label: string };
}

export function Chart({ chartData, currencyPair }: ChartProps) {
	return (
		<>
			<div className="h-[400px] mt-1.5">
				<p className="text-center font-medium">
					{currencyPair.label} Exchange Rate History
				</p>
				<SimpleAreaChart
					data={chartData}
					xAxisKey="date"
					yAxisKey="rate"
					xAxisLabel="Date"
					yAxisLabel={`${currencyPair.base}/${currencyPair.quote}`}
					stroke="#00c951"
					fill="#00c951"
				/>
			</div>
		</>
	);
}
