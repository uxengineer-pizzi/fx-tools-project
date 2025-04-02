"use client";

import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type FXDaily = {
	date: Date;
	open: string;
	high: number;
	low: string;
	close: string;
};

export const columns: ColumnDef<FXDaily>[] = [
	{
		accessorKey: "date",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Date
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => {
			const dateValue = row.getValue("date") as string | number | Date;
			return (
				<div className="lowercase" suppressHydrationWarning>
					{new Date(dateValue).toLocaleDateString()}
				</div>
			);
		},
	},
	{
		accessorKey: "open",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Open
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => <div className="lowercase">{row.getValue("open")}</div>,
	},
	{
		accessorKey: "high",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				High
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => <div className="lowercase">{row.getValue("high")}</div>,
	},
	{
		accessorKey: "low",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Low
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => <div className="lowercase">{row.getValue("low")}</div>,
	},
	{
		accessorKey: "close",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Close
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => <div className="lowercase">{row.getValue("close")}</div>,
	},
];
