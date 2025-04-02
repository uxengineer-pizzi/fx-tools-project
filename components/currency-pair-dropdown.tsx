"use client";

import type React from "react";
import { useCallback, useState, forwardRef, useMemo } from "react";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChevronDown, CheckIcon } from "lucide-react";
import { CircleFlag } from "react-circle-flags";

export interface CurrencyPair {
	base: string;
	quote: string;
	label: string;
	value: string;
}

interface CurrencyPairDropdownProps {
	options?: CurrencyPair[];
	onChange: (pair: CurrencyPair) => void;
	defaultValue?: string;
	disabled?: boolean;
	placeholder?: string;
	slim?: boolean;
	value?: string;
}

const CurrencyPairDropdownComponent = (
	{
		options = [],
		onChange,
		defaultValue,
		disabled = false,
		placeholder = "Select a currency pair",
		slim = false,
		value,
		...props
	}: CurrencyPairDropdownProps,
	ref: React.ForwardedRef<HTMLButtonElement>,
) => {
	const defaultOptions: CurrencyPair[] = [
		{ base: "EUR", quote: "USD", label: "EUR/USD", value: "EUR/USD" },
		{ base: "USD", quote: "JPY", label: "USD/JPY", value: "USD/JPY" },
		{ base: "GBP", quote: "USD", label: "GBP/USD", value: "GBP/USD" },
		{ base: "AUD", quote: "USD", label: "AUD/USD", value: "AUD/USD" },
		{ base: "USD", quote: "CAD", label: "USD/CAD", value: "USD/CAD" },
		{ base: "USD", quote: "CHF", label: "USD/CHF", value: "USD/CHF" },
		{ base: "NZD", quote: "USD", label: "NZD/USD", value: "NZD/USD" },
		{ base: "EUR", quote: "GBP", label: "EUR/GBP", value: "EUR/GBP" },
		{ base: "EUR", quote: "JPY", label: "EUR/JPY", value: "EUR/JPY" },
		{ base: "GBP", quote: "JPY", label: "GBP/JPY", value: "GBP/JPY" },
	];

	const currencyOptions = useMemo(
		() => (options.length > 0 ? options : defaultOptions),
		[options],
	);

	const currencyFlagMapping: Record<string, string> = {
		EUR: "eu",
		USD: "us",
		GBP: "gb",
		JPY: "jp",
		CHF: "ch",
		CAD: "ca",
		AUD: "au",
		NZD: "nz",
	};

	const [open, setOpen] = useState(false);
	const [internalValue, setInternalValue] = useState<string | undefined>(
		defaultValue,
	);

	const selectedPair = useMemo(() => {
		const currentValue = value !== undefined ? value : internalValue;
		return (
			currencyOptions.find((pair) => pair.value === currentValue) ||
			currencyOptions[0]
		);
	}, [value, internalValue, currencyOptions]);

	const handleSelect = useCallback(
		(pair: CurrencyPair) => {
			setInternalValue(pair.value);
			onChange(pair);
			setOpen(false);
		},
		[onChange],
	);

	const triggerClasses = cn(
		"flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 max-w-[250px] bg-card",
		slim === true && "w-20",
	);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger
				ref={ref}
				className={triggerClasses}
				disabled={disabled}
				{...props}
			>
				<div className="flex items-center">
					<CircleFlag
						countryCode={
							currencyFlagMapping[selectedPair.base]?.toLowerCase() || "us"
						}
						className="w-4 border border-white rounded-full -ml-1"
						height={14}
					/>
					<CircleFlag
						countryCode={
							currencyFlagMapping[selectedPair.quote]?.toLowerCase() || "us"
						}
						className="w-4 border border-white rounded-full -ml-1"
						height={14}
					/>
					<span className="overflow-hidden text-ellipsis whitespace-nowrap ml-1">
						{selectedPair.label}
					</span>
				</div>
				<ChevronDown size={16} />
			</PopoverTrigger>
			<PopoverContent
				collisionPadding={10}
				side="bottom"
				className="min-w-[--radix-popper-anchor-width] p-0"
			>
				<Command className="w-full max-h-[200px] sm:max-h-[270px]">
					<CommandList>
						<div className="sticky top-0 z-10 bg-popover">
							<CommandInput placeholder="Search currency pair..." />
						</div>
						<CommandEmpty>No pair found.</CommandEmpty>
						<CommandGroup>
							{currencyOptions.map((pair) => (
								<CommandItem
									className="flex items-center w-full gap-2"
									key={pair.value}
									onSelect={() => handleSelect(pair)}
								>
									<div className="flex items-center">
										<CircleFlag
											countryCode={
												currencyFlagMapping[pair.base]?.toLowerCase() || "us"
											}
											height={14}
											className="w-4 border border-white rounded-full"
										/>
										<CircleFlag
											countryCode={
												currencyFlagMapping[pair.quote]?.toLowerCase() || "us"
											}
											className="w-4 border border-white rounded-full -ml-1"
											height={14}
										/>
									</div>
									<span className="overflow-hidden text-ellipsis whitespace-nowrap">
										{pair.label}
									</span>
									<CheckIcon
										className={cn(
											"ml-auto h-4 w-4 shrink-0",
											pair.value === selectedPair.value
												? "opacity-100"
												: "opacity-0",
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

CurrencyPairDropdownComponent.displayName = "CurrencyPairDropdownComponent";

export const CurrencyPairDropdown = forwardRef(CurrencyPairDropdownComponent);
