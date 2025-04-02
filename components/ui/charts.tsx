"use client";

import React from "react";
import {
	AreaChart as RechartsAreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

interface ChartProps {
	data: any[];
	xAxisKey: string;
	yAxisKey: string;
	xAxisLabel?: string;
	yAxisLabel?: string;
	stroke?: string;
	fill?: string;
}

export function SimpleAreaChart({
	data,
	xAxisKey,
	yAxisKey,
	xAxisLabel,
	yAxisLabel,
	stroke,
	fill,
}: ChartProps) {
	return (
		<ResponsiveContainer width="100%" height="100%">
			<RechartsAreaChart
				data={data}
				margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis
					dataKey={xAxisKey}
					label={{
						value: xAxisLabel,
						position: "insideBottomRight",
						offset: -10,
					}}
					tick={{ fontSize: 12 }}
					angle={-45}
					textAnchor="end"
					height={60}
					interval={Math.ceil(data.length / 10)}
				/>
				<YAxis
					label={{ value: yAxisLabel, angle: -90, position: "insideLeft" }}
					tick={{ fontSize: 12 }}
				/>
				<Tooltip />
				<Legend />
				<Area
					type="monotone"
					dataKey={yAxisKey}
					stroke={stroke}
					fill={fill}
					fillOpacity={0.3}
				/>
			</RechartsAreaChart>
		</ResponsiveContainer>
	);
}
