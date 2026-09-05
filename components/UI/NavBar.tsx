"use client";

import React, { useState } from "react";
import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
} from "./navbar-menu";
import { cn } from "@/lib/utils";

export function NavBar({
  className,
}: {
  className?: string;
}) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-6 z-50 mx-auto w-[calc(100%-32px)] max-w-[820px]",
        className
      )}
    >
      <Menu setActive={setActive}>
        <MenuItem
          setActive={setActive}
          active={active}
          item="Services"
        >
          <div className="flex min-w-[220px] flex-col gap-2">
            <HoveredLink href="/web-dev">
              Web Development
            </HoveredLink>

            <HoveredLink href="/interface-design">
              Interface Design
            </HoveredLink>

            <HoveredLink href="/seo">
              Search Engine Optimization
            </HoveredLink>

            <HoveredLink href="/branding">
              Branding
            </HoveredLink>
          </div>
        </MenuItem>

        <MenuItem
          setActive={setActive}
          active={active}
          item="Products"
        >
          <div className="grid grid-cols-2 gap-3 p-1">
            <ProductItem
              title="Algochurn"
              href="https://algochurn.com"
              src="https://assets.aceternity.com/demos/algochurn.webp"
              description="Prepare for tech interviews like never before."
            />

            <ProductItem
              title="Tailwind Master Kit"
              href="https://tailwindmasterkit.com"
              src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
              description="Production ready Tailwind CSS components for your next project."
            />

            <ProductItem
              title="Moonbeam"
              href="https://gomoonbeam.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
              description="Never write from scratch again. Go from idea to blog in minutes."
            />

            <ProductItem
              title="Rogue"
              href="https://userogue.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI."
            />
          </div>
        </MenuItem>

        <MenuItem
          setActive={setActive}
          active={active}
          item="Pricing"
        >
          <div className="flex min-w-[180px] flex-col gap-2">
            <HoveredLink href="/hobby">
              Hobby
            </HoveredLink>

            <HoveredLink href="/individual">
              Individual
            </HoveredLink>

            <HoveredLink href="/team">
              Team
            </HoveredLink>

            <HoveredLink href="/enterprise">
              Enterprise
            </HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}