"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function CreatableCombobox({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (val: string) => void;
  options: string[];
}) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const filtered = options.filter((o) =>
    o.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-auto justify-between"
        >
          {value || "Select or type..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="md:w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search or create..."
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            {filtered.map((option) => (
              <CommandItem
                key={option}
                onSelect={() => {
                  onChange(option);
                  setInputValue("");
                  setOpen(false);
                }}
              >
                {option}
              </CommandItem>
            ))}
            {/* {inputValue && !options.includes(inputValue) && (
              <CommandItem
                onSelect={() => {
                  onChange(inputValue);
                  setInputValue("");
                  setOpen(false);
                }}
              >
                ➕ Create "{inputValue}"
              </CommandItem>
            )} */}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
