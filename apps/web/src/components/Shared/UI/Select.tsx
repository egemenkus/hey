import cn from "@/helpers/cn";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition
} from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { Fragment, type ReactNode, forwardRef, useState } from "react";
import { Input } from "./Input";

interface SelectProps {
  className?: string;
  defaultValue?: string;
  iconClassName?: string;
  onChange: (value: any) => any;
  options?: {
    disabled?: boolean;
    helper?: string;
    icon?: string;
    label: string;
    htmlLabel?: ReactNode;
    selected?: boolean;
    value: number | string;
  }[];
  showSearch?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select({
    className,
    defaultValue,
    iconClassName,
    onChange,
    options,
    showSearch = false
  }) {
    const [searchValue, setSearchValue] = useState("");
    const selected = options?.find((option) => option.selected) || options?.[0];

    return (
      <Listbox onChange={onChange} value={defaultValue || selected?.value}>
        <div className="relative">
          <ListboxButton
            className={cn(
              "flex w-full items-center justify-between space-x-3 rounded-xl border border-neutral-300 bg-white px-3 py-2 text-left outline-hidden focus:border-neutral-500 focus:ring-neutral-400 dark:border-neutral-700 dark:bg-neutral-800",
              className
            )}
          >
            <span className="flex items-center space-x-2">
              {selected?.icon && (
                <img
                  className={iconClassName}
                  src={selected?.icon}
                  alt={selected?.label}
                />
              )}
              <span>{selected?.htmlLabel || selected?.label}</span>
            </span>
            <ChevronDownIcon className="mr-1 size-5 text-neutral-400" />
          </ListboxButton>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <ListboxOptions className="no-scrollbar absolute z-[5] mt-2 max-h-60 w-full overflow-auto rounded-xl border border-neutral-200 bg-white shadow-xs focus:outline-hidden dark:border-neutral-700 dark:bg-neutral-900">
              {showSearch ? (
                <div className="mx-4 mt-4">
                  <Input
                    className="w-full"
                    iconLeft={<MagnifyingGlassIcon />}
                    onChange={(event) => {
                      setSearchValue(event.target.value);
                    }}
                    placeholder="Search"
                    type="text"
                    value={searchValue}
                  />
                </div>
              ) : null}
              {options
                ?.filter((option) =>
                  option.label.toLowerCase().includes(searchValue.toLowerCase())
                )
                .map((option, id) => (
                  <ListboxOption
                    className={({ focus }: { focus: boolean }) =>
                      cn(
                        { "dropdown-active": focus },
                        "m-2 cursor-pointer rounded-lg"
                      )
                    }
                    disabled={option.disabled}
                    key={id}
                    value={option.value}
                  >
                    {({ selected }) => (
                      <div className="mx-2 flex flex-col space-y-0 py-1.5">
                        <span className="flex w-full items-center justify-between space-x-3 text-neutral-700 dark:text-neutral-200">
                          <span className="flex items-center space-x-2">
                            {option.icon && (
                              <img
                                className={iconClassName}
                                src={option.icon}
                                alt={option.label}
                              />
                            )}
                            <span className="block truncate">
                              {option.htmlLabel || option.label}
                            </span>
                          </span>
                          {selected ? (
                            <CheckCircleIcon className="size-5" />
                          ) : null}
                        </span>
                        {option.helper ? (
                          <span className="text-neutral-500 text-xs dark:text-neutral-200">
                            {option.helper}
                          </span>
                        ) : null}
                      </div>
                    )}
                  </ListboxOption>
                ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    );
  }
);
