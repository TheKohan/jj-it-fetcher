import * as React from "react";
import { cn } from "@fetcher-web/lib";

import { Check, X, ChevronsUpDown } from "lucide-react";
import { Button } from "@fetcher-web/components";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@fetcher-web/components";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@fetcher-web/components";
import { Badge } from "@fetcher-web/components";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { FC } from "react";
export type OptionType = {
  label: string;
  value: string;
};

interface MultiSelectProps {
  options: OptionType[];
  selected: string[];
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
  className?: string;
}

function MultiSelect({
  options,
  selected,
  onChange,
  className,
  ...props
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [filteredOptions, setFilteredOptions] = React.useState(options);

  const handleUnselect = (item: string) => {
    onChange(selected.filter(i => i !== item));
  };

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true} {...props}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-full justify-between ${
            selected.length > 1 ? "h-full" : "h-10"
          }`}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <div className="flex gap-1 flex-wrap">
            {selected.map(item => (
              <Badge
                variant="secondary"
                key={item}
                className="mr-1 mb-1"
                onClick={() => handleUnselect(item)}
              >
                {item}
                <button
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  type="button"
                  onKeyDown={e => {
                    if (e.key === "Enter") {
                      handleUnselect(item);
                    }
                  }}
                  onMouseDown={e => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(item)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            ))}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 scroll-auto">
        <Command shouldFilter={false} className={className}>
          <CommandInput
            onValueChange={v =>
              setFilteredOptions(options.filter(i => i.value.includes(v)))
            }
          />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandGroup className="h-64 overflow-auto">
            <VirtualItems
              options={filteredOptions}
              selected={selected}
              onChange={onChange}
              onSelect={setOpen}
            />
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

const VirtualItems: FC<{
  options: OptionType[];
  selected: string[];
  onChange: (items: string[]) => void;
  onSelect: (open: boolean) => void;
}> = ({ options, selected, onChange, onSelect }) => {
  const parentRef = React.useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: options.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
    overscan: 10,
  });

  return (
    <div ref={parentRef} className="h-64 scroll-auto overflow-auto">
      <div
        className="w-full relative"
        style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
      >
        {rowVirtualizer.getVirtualItems().map(virtualItem => (
          <CommandItem
            key={options[virtualItem.index].value}
            ref={rowVirtualizer.measureElement}
            data-index={virtualItem.index}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
            onSelect={() => {
              onChange(
                selected.includes(options[virtualItem.index].value)
                  ? selected.filter(
                      item => item !== options[virtualItem.index].value
                    )
                  : ([
                      ...selected,
                      options[virtualItem.index].value,
                    ] as string[])
              );
              onSelect(true);
            }}
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4",
                selected.includes(options[virtualItem.index].value)
                  ? "opacity-100"
                  : "opacity-0"
              )}
            />
            {options[virtualItem.index].label}
          </CommandItem>
        ))}
      </div>
    </div>
  );
};
export { MultiSelect };
