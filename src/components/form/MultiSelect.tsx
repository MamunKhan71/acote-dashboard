import type React from "react";
import { useState, useCallback, useMemo } from "react";

interface Option {
  value: string;
  text: string;
}

interface MultiSelectProps {
  label: string;
  options: Option[];
  defaultSelected?: string[];
  onChange?: (selected: string[]) => void;
  disabled?: boolean;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  options,
  defaultSelected = [],
  onChange,
  disabled = false,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(defaultSelected);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = useCallback(() => {
    if (!disabled) setIsOpen((prev) => !prev);
  }, [disabled]);

  const handleSelect = useCallback(
    (optionValue: string) => {
      const newSelectedOptions = selectedOptions.includes(optionValue)
        ? selectedOptions.filter((value) => value !== optionValue)
        : [...selectedOptions, optionValue];

      setSelectedOptions(newSelectedOptions);
      onChange?.(newSelectedOptions);
    },
    [selectedOptions, onChange]
  );

  const removeOption = useCallback(
    (value: string) => {
      const newSelectedOptions = selectedOptions.filter((opt) => opt !== value);
      setSelectedOptions(newSelectedOptions);
      onChange?.(newSelectedOptions);
    },
    [selectedOptions, onChange]
  );

  const selectedValuesText = useMemo(
    () => selectedOptions.map((value) => options.find((option) => option.value === value)?.text || ""),
    [selectedOptions, options]
  );

  return (
    <div className="w-full">
      <label
        className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
        htmlFor="multi-select"
      >
        {label}
      </label>

      <div className="relative inline-block w-full">
        <div
          className="relative flex flex-col items-center"
          role="combobox"
          aria-expanded={isOpen}
          aria-controls="multi-select-options"
          aria-disabled={disabled}
        >
          <div
            onClick={toggleDropdown}
            className="w-full cursor-pointer"
            tabIndex={disabled ? -1 : 0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleDropdown();
              }
            }}
          >
            <div className="mb-2 flex h-11 rounded-lg border border-gray-300 py-1.5 pl-3 pr-3 shadow-sm outline-none transition focus:border-brand-300 focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-brand-300">
              <div className="flex flex-wrap flex-auto gap-2">
                {selectedValuesText.length > 0 ? (
                  selectedValuesText.map((text, index) => (
                    <div
                      key={index}
                      className="group flex items-center rounded-full bg-gray-100 py-1 pl-2.5 pr-2 text-sm text-gray-800 hover:border-gray-200 dark:bg-gray-800 dark:text-white/90 dark:hover:border-gray-800"
                    >
                      <span className="max-w-full truncate">{text}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeOption(selectedOptions[index]);
                        }}
                        className="pl-2 text-gray-500 hover:text-gray-400 dark:text-gray-400"
                        aria-label={`Remove ${text}`}
                      >
                        <svg
                          className="fill-current"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3.40717 4.46881C3.11428 4.17591 3.11428 3.70104 3.40717 3.40815C3.70006 3.11525 4.17494 3.11525 4.46783 3.40815L6.99943 5.93975L9.53095 3.40822C9.82385 3.11533 10.2987 3.11533 10.5916 3.40822C10.8845 3.70112 10.8845 4.17599 10.5916 4.46888L8.06009 7.00041L10.5916 9.53193C10.8845 9.82482 10.8845 10.2997 10.5916 10.5926C10.2987 10.8855 9.82385 10.8855 9.53095 10.5926L6.99943 8.06107L4.46783 10.5927C4.17494 10.8856 3.70006 10.8856 3.40717 10.5927C3.11428 10.2998 3.11428 9.8249 3.40717 9.53201L5.93877 7.00041L3.40717 4.46881Z"
                          />
                        </svg>
                      </button>
                    </div>
                  ))
                ) : (
                  <input
                    id="multi-select"
                    placeholder="Select option"
                    className="w-full h-full p-1 pr-2 text-sm bg-transparent border-0 outline-none placeholder:text-gray-800 focus:ring-0 dark:placeholder:text-white/90"
                    readOnly
                    value="Select option"
                    aria-readonly="true"
                  />
                )}
              </div>
              <div className="flex items-center py-1 pl-1 pr-1 w-7">
                <button
                  type="button"
                  onClick={toggleDropdown}
                  className="w-5 h-5 text-gray-700 outline-none dark:text-gray-400"
                  aria-label={isOpen ? "Close dropdown" : "Open dropdown"}
                >
                  <svg
                    className={`stroke-current ${isOpen ? "rotate-180" : ""}`}
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.79175 7.39551L10.0001 12.6038L15.2084 7.39551"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {isOpen && (
            <div
              id="multi-select-options"
              className="absolute left-0 top-full z-50 w-full max-h-60 overflow-y-auto bg-white rounded-lg shadow-lg dark:bg-gray-900 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800"
              onClick={(e) => e.stopPropagation()}
              role="listbox"
              aria-multiselectable="true"
            >
              <div className="flex flex-col">
                {options.map((option, index) => (
                  <div
                    key={index}
                    className={`w-full cursor-pointer border-b border-gray-200 hover:bg-primary/5 dark:border-gray-800 dark:hover:bg-primary/10`}
                    onClick={() => handleSelect(option.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleSelect(option.value);
                      }
                    }}
                    tabIndex={0}
                    role="option"
                    aria-selected={selectedOptions.includes(option.value)}
                  >
                    <div
                      className={`relative flex w-full items-center p-2 pl-2 ${selectedOptions.includes(option.value) ? "bg-primary/10" : ""
                        }`}
                    >
                      <div className="mx-2 leading-6 text-gray-800 dark:text-white/90">
                        {option.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiSelect;