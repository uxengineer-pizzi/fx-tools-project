"use client";

import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface HeroProps {
	title?: string;
	subtitle?: ReactNode | string;
	className?: string;
}

export function Hero({ title, subtitle, className }: HeroProps) {
	return (
		<div
			className={twMerge(
				"relative isolate px-6 lg:px-8 bg-green-500",
				className,
			)}
		>
			<div className="mx-auto max-w-2xl pb-24 pt-12 lg:pt-16 lg:pb-40 text-center">
				<h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-green-950">
					{title || "Welcome to FXtools"}
				</h1>

				{subtitle && <p className="text-xl mt-4 text-slate-900">{subtitle}</p>}
			</div>
		</div>
	);
}
