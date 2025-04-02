import { AlertComponent } from "@/components/alert";
import { Hero } from "@/components/hero";
import React from "react";
import { Table } from "./components/table";

const TWELVE_DATA_API_KEY = process.env.NEXT_PUBLIC_TWELVE_DATA_API_KEY;

export default function Page() {
	return (
		<>
			<Hero
				title="OHLC"
				subtitle="View Open-High-Low-Close (OHLC) Table for Major Forex Pairs"
			/>
			<div className="px-4">
				{!TWELVE_DATA_API_KEY && (
					<AlertComponent
						variant="danger"
						message={
							<>
								API key not configured. Please set
								NEXT_PUBLIC_TWELVE_DATA_API_KEY.
								<br />
								<a
									href="https://twelvedata.com/"
									target="_blank"
									rel="noopener noreferrer"
									className="font-medium underline hover:opacity-80"
								>
									Get your free API key
								</a>
							</>
						}
					/>
				)}
				<div className="container relative z-10 mx-auto lg:-mt-28 -mt-16 py-5 px-4 bg-card text-foreground border rounded-md max-w-5xl">
					<Table />
				</div>
			</div>
		</>
	);
}
