"use client";

import { CurrencyPairDropdown } from "@/components/currency-pair-dropdown";
import { DateRangePicker } from "@/components/date-range-picker";
import type { DateRange } from "react-day-picker";
import type { CurrencyPair } from "@/components/currency-pair-dropdown";

interface DataFiltersProps {
	currencyPair: { base: string; quote: string; label: string };
	setCurrencyPair: (pair: CurrencyPair) => void;
	dateRange: DateRange | undefined;
	setDateRange: (date: DateRange | undefined) => void;
}

export function DataFilters({
	currencyPair,
	setCurrencyPair,
	dateRange,
	setDateRange,
}: DataFiltersProps) {
	return (
		<div className="flex flex-col md:flex-row gap-4 mb-8">
			<div className="w-full md:w-64">
				<CurrencyPairDropdown
					onChange={setCurrencyPair}
					defaultValue={currencyPair.label}
				/>
			</div>
			<div className="w-full md:w-64">
				<DateRangePicker date={dateRange} setDate={setDateRange} />
			</div>
		</div>
	);
}
