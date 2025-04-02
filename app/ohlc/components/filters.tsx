"use client";

import { CurrencyPairDropdown } from "@/components/currency-pair-dropdown";
import { DateRangePicker } from "@/components/date-range-picker";
import type { DateRange } from "react-day-picker";
import type { CurrencyPair } from "@/components/currency-pair-dropdown";
import { SUPPORTED_PAIRS } from "../constants";

interface FiltersProps {
	selectedPair: string;
	onPairChange: (pair: CurrencyPair) => void;
	dateRange: DateRange | undefined;
	setDateRange: (date: DateRange | undefined) => void;
}

export function Filters({
	selectedPair,
	onPairChange,
	dateRange,
	setDateRange,
}: FiltersProps) {
	return (
		<>
			<CurrencyPairDropdown
				options={SUPPORTED_PAIRS}
				value={selectedPair}
				onChange={onPairChange}
			/>
			<DateRangePicker date={dateRange} setDate={setDateRange} />
		</>
	);
}
