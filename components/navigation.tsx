"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ChartCandlestick, Menu } from "lucide-react";
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetClose,
	SheetTitle,
} from "@/components/ui/sheet";
import { ModeToggle } from "./mode-toggle";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { cn } from "@/lib/utils";

const navLinks = [
	{ name: "OHLC Data Table", href: "/" },
	{ name: "Historical Chart", href: "/historical" },
	{ name: "Currency Converter", href: "/currency-converter" },
];

export function Navigation() {
	const pathname = usePathname();

	return (
		<header className="sticky inset-x-0 top-0 z-50 bg-background/80 backdrop-blur-sm">
			<nav className="flex items-center justify-between p-6 lg:px-8">
				<div className="flex lg:flex-1">
					<Link href="/" className="-m-1.5 p-1.5">
						<span className="flex items-center gap-1.5 text-2xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
							<ChartCandlestick className="w-6.5 h-6.5 text-green-600" />
							FXtools
						</span>
					</Link>
				</div>

				<NavigationMenu className="hidden md:block">
					<NavigationMenuList>
						{navLinks.map((link) => (
							<NavigationMenuItem key={link.href}>
								<Link href={link.href} legacyBehavior passHref>
									<NavigationMenuLink
										className={cn(
											navigationMenuTriggerStyle(),
											pathname === link.href &&
												"bg-accent text-accent-foreground",
										)}
									>
										{link.name}
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>
						))}
					</NavigationMenuList>
				</NavigationMenu>

				<div className="flex flex-1 justify-end items-center gap-4">
					<ModeToggle />

					<Sheet>
						<SheetTrigger asChild className="md:hidden">
							<Button variant="outline" size="icon">
								<Menu className="h-5 w-5" />
								<VisuallyHidden>Open menu</VisuallyHidden>
							</Button>
						</SheetTrigger>
						<SheetContent side="right" className="w-[300px] sm:w-[400px]">
							<VisuallyHidden>
								<SheetTitle>Mobile Navigation Menu</SheetTitle>
							</VisuallyHidden>
							<div className="flex flex-col h-full pt-6">
								<div className="flex flex-col space-y-2">
									{navLinks.map((link) => (
										<SheetClose asChild key={link.href}>
											<Link href={link.href}>
												<Button
													variant={
														pathname === link.href ? "secondary" : "ghost"
													}
													className="w-full justify-start text-lg"
												>
													{link.name}
												</Button>
											</Link>
										</SheetClose>
									))}
								</div>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</nav>
		</header>
	);
}
