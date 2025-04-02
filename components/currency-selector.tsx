"use client";

import { CircleFlag } from "react-circle-flags";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const CURRENCIES = [
	{ code: "USD", name: "US Dollar", flag: "us" },
	{ code: "EUR", name: "Euro", flag: "eu" },
	{ code: "GBP", name: "British Pound", flag: "gb" },
	{ code: "JPY", name: "Japanese Yen", flag: "jp" },
	{ code: "CAD", name: "Canadian Dollar", flag: "ca" },
	{ code: "AUD", name: "Australian Dollar", flag: "au" },
	{ code: "CHF", name: "Swiss Franc", flag: "ch" },
];

export default function CurrencySelector({
	value,
	onChange,
}: {
	value: string;
	onChange: (value: string) => void;
}) {
	return (
		<Select value={value} onValueChange={onChange}>
			<SelectTrigger className="w-full">
				<SelectValue placeholder="Select currency">
					<div className="flex items-center gap-2">
						<CircleFlag
							countryCode={
								CURRENCIES.find((c) => c.code === value)?.flag || "us"
							}
							height={20}
							className="w-6 rounded-full"
						/>
						<span>{value}</span>
					</div>
				</SelectValue>
			</SelectTrigger>
			<SelectContent>
				{CURRENCIES.map((currency) => (
					<SelectItem key={currency.code} value={currency.code}>
						<div className="flex items-center gap-2">
							<CircleFlag
								countryCode={currency.flag}
								height={20}
								className="w-6 rounded-full"
							/>
							<span>
								{currency.code} - {currency.name}
							</span>
						</div>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
