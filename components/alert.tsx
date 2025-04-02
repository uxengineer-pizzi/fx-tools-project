"use client";

import { X, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "./ui/button";

type AlertVariant = "danger" | "warning" | "success" | "info";

type AlertProps = {
	variant?: AlertVariant;
	title?: string;
	message: ReactNode;
	className?: string;
	dismissible?: boolean;
	onDismiss?: () => void;
};

export function AlertComponent({
	variant = "danger",
	title,
	message,
	className = "",
	dismissible = false,
	onDismiss,
}: AlertProps) {
	const variants = {
		danger: {
			bg: "bg-red-50",
			border: "border-l-4 border-red-400",
			text: "text-red-700",
			icon: <X className="h-5 w-5 text-red-400" />,
		},
		warning: {
			bg: "bg-yellow-50",
			border: "border-l-4 border-yellow-400",
			text: "text-yellow-700",
			icon: <AlertTriangle className="h-5 w-5 text-yellow-400" />,
		},
		success: {
			bg: "bg-green-50",
			border: "border-l-4 border-green-400",
			text: "text-green-700",
			icon: <CheckCircle2 className="h-5 w-5 text-green-400" />,
		},
		info: {
			bg: "bg-blue-50",
			border: "border-l-4 border-blue-400",
			text: "text-blue-700",
			icon: <Info className="h-5 w-5 text-blue-400" />,
		},
	};

	const currentVariant = variants[variant];

	return (
		<div
			className={`${currentVariant.bg} ${currentVariant.border} p-4 mb-4 rounded-r ${className}`}
		>
			<div className="flex items-start">
				<div className="flex-shrink-0 pt-0.5">{currentVariant.icon}</div>
				<div className="ml-3 flex-1">
					{title && (
						<h3 className={`text-sm font-medium ${currentVariant.text}`}>
							{title}
						</h3>
					)}
					<div className={`text-sm ${currentVariant.text}`}>{message}</div>
				</div>
				{dismissible && (
					<Button
						onClick={onDismiss}
						className="ml-auto -mx-1.5 -my-1.5 p-1.5 inline-flex rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
						aria-label="Dismiss"
					>
						<X className="h-5 w-5" />
					</Button>
				)}
			</div>
		</div>
	);
}
