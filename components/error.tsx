"use client";

import { AlertCircle, AlertTriangle, Loader2 } from "lucide-react";
import type { ReactNode } from "react";

type ErrorComponentProps = {
	error?: string | ReactNode;
	loading?: boolean;
	variant?: "default" | "warning" | "danger" | "loading";
	className?: string;
};

export function ErrorComponent({
	error,
	loading,
	variant = "default",
	className = "",
}: ErrorComponentProps) {
	if (loading) {
		return (
			<div className={`flex items-center justify-center py-8 ${className}`}>
				<Loader2 className="mr-2 h-5 w-5 animate-spin" />
				<span>Loading data...</span>
			</div>
		);
	}

	if (!error) return null;

	const variants = {
		default: {
			bg: "bg-background",
			border: "border",
			text: "text-foreground",
			icon: <AlertCircle className="h-5 w-5" />,
		},
		warning: {
			bg: "bg-yellow-50",
			border: "border-l-4 border-yellow-400",
			text: "text-yellow-700",
			icon: <AlertTriangle className="h-5 w-5 text-yellow-400" />,
		},
		danger: {
			bg: "bg-red-50",
			border: "border-l-4 border-red-400",
			text: "text-red-700",
			icon: <AlertCircle className="h-5 w-5 text-red-400" />,
		},
		loading: {
			bg: "bg-blue-50",
			border: "",
			text: "text-blue-700",
			icon: <Loader2 className="h-5 w-5 animate-spin" />,
		},
	};

	const currentVariant = variants[variant];

	return (
		<div
			className={`${currentVariant.bg} ${currentVariant.border} p-4 rounded-md my-4 ${className}`}
		>
			<div className="flex items-start gap-2">
				<div className="flex-shrink-0">{currentVariant.icon}</div>
				<div className={`text-sm ${currentVariant.text}`}>
					{typeof error === "string" ? <p>{error}</p> : error}
				</div>
			</div>
		</div>
	);
}
