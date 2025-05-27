"use client";

import * as React from "react";

import { Monitor, Palette } from "lucide-react";
import { useTheme } from "next-themes";

import Moon from "@/components/shared/icons/moon";
import Sun from "@/components/shared/icons/sun";
import {
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    // <DropdownMenuSub>
    //   <DropdownMenuSubTrigger className="flex w-full items-center rounded-none !py-2 px-3 pr-2 text-sm duration-200 hover:!bg-gray-200 dark:hover:!bg-muted">
    //     <Palette className="mr-2 h-4 w-4" /> Themes
    //   </DropdownMenuSubTrigger>
    //   <DropdownMenuPortal>
    //     <DropdownMenuSubContent className="w-[180px]">
    //       <DropdownMenuRadioGroup
    //         value={theme}
    //         onValueChange={setTheme}
    //         className="space-y-1 *:flex *:items-center"
    //       >
    //         <DropdownMenuRadioItem value="light">
    //           <Sun className="mr-2 h-4 w-4" />
    //           Light
    //         </DropdownMenuRadioItem>
    //         <DropdownMenuRadioItem value="dark">
    //           <Moon className="mr-2 h-4 w-4" />
    //           Dark
    //         </DropdownMenuRadioItem>
    //         {/* <DropdownMenuRadioItem value="system">
    //           <Monitor className="mr-2 h-4 w-4" />
    //           System
    //         </DropdownMenuRadioItem> */}
    //       </DropdownMenuRadioGroup>
    //     </DropdownMenuSubContent>
    //   </DropdownMenuPortal>
    // </DropdownMenuSub>
    <DropdownMenuSub>
  <DropdownMenuSubTrigger className="flex w-full items-center rounded-md py-2 px-3 text-sm font-medium text-gray-700 duration-200 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
    <Palette className="mr-2 h-5 w-5 text-primary" />
    Themes
  </DropdownMenuSubTrigger>
  <DropdownMenuPortal>
    <DropdownMenuSubContent className="w-[200px] rounded-md bg-white p-2 shadow-lg ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-700">
      <DropdownMenuRadioGroup
        value={theme}
        onValueChange={setTheme}
        className="space-y-2"
      >
        <DropdownMenuRadioItem
          value="light"
          className="flex items-center space-x-2 px-2 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <Sun className="h-5 w-5 text-yellow-500" />
          <span>Light</span>
        </DropdownMenuRadioItem>
        <DropdownMenuRadioItem
          value="dark"
          className="flex items-center space-x-2 px-2 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <Moon className="h-5 w-5 text-blue-500" />
          <span>Dark</span>
        </DropdownMenuRadioItem>
        {/* Uncomment if needed */}
        {/* <DropdownMenuRadioItem
          value="system"
          className="flex items-center space-x-2 px-2 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <Monitor className="h-5 w-5 text-green-500" />
          <span>System</span>
        </DropdownMenuRadioItem> */}
      </DropdownMenuRadioGroup>
    </DropdownMenuSubContent>
  </DropdownMenuPortal>
</DropdownMenuSub>

  );
}
