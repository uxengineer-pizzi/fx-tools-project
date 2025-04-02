"use client";

import { useState } from "react";
import { subDays } from "date-fns";
import type { DateRange } from "react-day-picker";
import type { CurrencyPair } from "@/components/currency-pair-dropdown";
import { ErrorComponent } from "@/components/error";
import { DataTable } from "@/components/data-table";
import { Filters } from "./filters";
import { columns } from "./columns";
import { useOHLCData } from "@/hooks/useOHLCData";

export function Table() {
	const [selectedPair, setSelectedPair] = useState("EUR/USD");
	const [dateRange, setDateRange] = useState<DateRange | undefined>({
		from: subDays(new Date(), 30),
		to: new Date(),
	});

	const { data, loading, error } = useOHLCData(selectedPair, dateRange);

	const handlePairChange = (pair: CurrencyPair) => {
		setSelectedPair(pair.value);
	};

	return (
		<>
			{error && <ErrorComponent error={error} variant="default" />}
			<DataTable
				columns={columns}
				data={data}
				isLoading={loading}
				filters={
					<Filters
						selectedPair={selectedPair}
						onPairChange={handlePairChange}
						dateRange={dateRange}
						setDateRange={setDateRange}
					/>
				}
			/>
		</>
	);
}
