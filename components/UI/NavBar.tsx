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
          item="Connect"
        >
          <div className="flex min-w-[220px] flex-col gap-2">
            <HoveredLink href="/collaborate">
              Collaborate
            </HoveredLink>

            <HoveredLink href="/partnerships">
              Brand Partnerships
            </HoveredLink>

            <HoveredLink href="/community">
              Community & Run Clubs
            </HoveredLink>

            <HoveredLink href="/contact">
              Get in Touch
            </HoveredLink>
          </div>
        </MenuItem>

        <MenuItem
          setActive={setActive}
          active={active}
          item="Guides"
        >
          <div className="grid grid-cols-2 gap-3 p-1">
            <ProductItem
              title="Nuitrition"
              href="/nutrition"
              src="/images/nav/nav2.jpg"
              description="Simple, balanced and high-protein recipes for everyday life."
            />
        
            <ProductItem
              title="Workout"
              href="/workouts"
              src="/images/nav/nav4.jpg"
              description="Strength, mobility and training routines you can actually stick to."
            />
        
            <ProductItem
              title="Running"
              href="/running"
              src="/images/nav/nav3.jpg"
              description="Running logs, progress, routes, clubs and everything around the run."
            />
        
            <ProductItem
              title="Lifestyle"
              href="/lifestyle"
              src="/images/nav/nav1.jpg"
              description="Everyday advice around wellness, habits, recovery and balance."
            />
          </div>
        </MenuItem>

        <MenuItem
          setActive={setActive}
          active={active}
          item="About"
        >
          <div className="flex min-w-[180px] flex-col gap-2">
            <HoveredLink href="/about">
              About Kuska
            </HoveredLink>

            <HoveredLink href="/myjourney">
              My Journey
            </HoveredLink>

            <HoveredLink href="/philosophy">
              My Philosophy
            </HoveredLink>

            <HoveredLink href="/contact">
              Work With Me
            </HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}