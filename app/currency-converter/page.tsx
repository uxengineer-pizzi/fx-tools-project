"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CurrencySelector from "@/components/currency-selector";
import { ErrorComponent } from "@/components/error";
import { Hero } from "@/components/hero";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";

export default function CurrencyConverterPage() {
	const [fromCurrency, setFromCurrency] = useState("USD");
	const [toCurrency, setToCurrency] = useState("EUR");
	const [displayAmount, setDisplayAmount] = useState("1");
	const [result, setResult] = useState<{
		rate: number;
		converted: number;
	} | null>(null);
	const [loading, setLoading] = useState(true); // Initial load is true
	const [error, setError] = useState("");
	const controllerRef = useRef<AbortController>();

	const convert = useCallback(
		async (amount: number) => {
			if (fromCurrency === toCurrency) {
				setResult({
					rate: 1,
					converted: amount,
				});
				setLoading(false);
				return;
			}

			// Cancel previous request if it exists
			if (controllerRef.current) {
				controllerRef.current.abort();
			}

			const controller = new AbortController();
			controllerRef.current = controller;

			try {
				const response = await fetch(
					`https://api.frankfurter.app/latest?from=${fromCurrency}&to=${toCurrency}`,
					{ signal: controller.signal },
				);

				if (!response.ok) throw new Error("Failed to fetch exchange rates");

				const data = await response.json();
				const rate = data.rates[toCurrency];
				setResult({
					rate,
					converted: amount * rate,
				});
			} catch (err) {
				if (err.name !== "AbortError") {
					setError(
						err instanceof Error
							? err.message
							: "Currency conversion service is currently unavailable",
					);
				}
			} finally {
				setLoading(false);
				controllerRef.current = undefined;
			}
		},
		[fromCurrency, toCurrency],
	);

	// Initial load effect
	useEffect(() => {
		convert(Number(displayAmount));
		return () => {
			if (controllerRef.current) {
				controllerRef.current.abort();
			}
		};
	}, [convert]);

	const handleAmountChange = (value: string) => {
		setDisplayAmount(value);
		const numValue = Number(value);
		if (isNaN(numValue) || numValue < 1) {
			setError("Amount must be at least 1");
			setResult(null);
			return;
		}
		convert(numValue);
	};

	return (
		<>
			<Hero
				title="Currency Converter"
				subtitle="Convert Currencies in Real Time with Accurate Exchange Rates"
			/>
			<div className="px-4">
				<div className="container relative z-10 mx-auto lg:-mt-28 -mt-16 py-5 px-4 bg-card text-foreground border rounded-md max-w-5xl">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
						<div>
							<Label className="font-semibold mb-3">Amount</Label>
							<Input
								type="text"
								inputMode="decimal"
								value={displayAmount}
								onChange={(e) => handleAmountChange(e.target.value)}
							/>
						</div>

						<div>
							<Label className="font-semibold mb-3">From</Label>
							<CurrencySelector
								value={fromCurrency}
								onChange={setFromCurrency}
							/>
						</div>
						<div>
							<Label className="font-semibold mb-3">To</Label>
							<CurrencySelector value={toCurrency} onChange={setToCurrency} />
						</div>
					</div>

					<div className="min-h-[150px]">
						{loading && !result ? (
							<div className="space-y-4 pt-8 animate-pulse">
								<Skeleton className="h-10 w-full max-w-[400px]" />
								<div className="space-y-2">
									<Skeleton className="h-4 w-[250px]" />
									<Skeleton className="h-4 w-[200px]" />
								</div>
								<div className="flex justify-end mt-4">
									<Skeleton className="h-12 w-[200px] rounded-md" />
								</div>
							</div>
						) : error ? (
							<ErrorComponent error={error} variant="warning" />
						) : result ? (
							<div className="flex justify-between items-center pt-8">
								<div className="space-y-2">
									<div className="text-xl">
										{Number(displayAmount)} {fromCurrency} ={" "}
										{result.converted.toFixed(2)} {toCurrency}
									</div>
									{fromCurrency !== toCurrency && (
										<>
											<div className="text-sm text-slate-400">
												1 {fromCurrency} = {result.rate.toFixed(6)} {toCurrency}
											</div>
											<div className="text-sm text-slate-400">
												1 {toCurrency} = {(1 / result.rate).toFixed(6)}{" "}
												{fromCurrency}
											</div>
										</>
									)}
								</div>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button className="px-4 py-5 bg-green-500 hover:bg-green-400 text-slate-900 font-semibold text-[16px] transition-all ease-in-out duration-300">
											Track Exchange Rate
										</Button>
									</TooltipTrigger>
									<TooltipContent>That&apos;s a dummy button :)</TooltipContent>
								</Tooltip>
							</div>
						) : null}
					</div>
				</div>
			</div>
		</>
	);
}
