"use client";

import {
	ThemeProvider as NextThemesProvider,
	type ThemeProviderProps as NextThemeProviderProps,
} from "next-themes";
import { useEffect, useState } from "react";

type Attribute = "class" | `data-${string}`;

interface CustomThemeProviderProps
	extends Omit<NextThemeProviderProps, "attribute"> {
	attribute?: Attribute | Attribute[];
}

export function ThemeProvider({
	children,
	attribute = "class",
	...props
}: CustomThemeProviderProps) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	if (!mounted) {
		return <div style={{ visibility: "hidden" }}>{children}</div>;
	}

	return (
		<NextThemesProvider attribute={attribute} {...props}>
			{children}
		</NextThemesProvider>
	);
}
