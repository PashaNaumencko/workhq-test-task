import { debounce } from "@/helpers/debounce";
import { SyntheticEvent, useEffect, useRef, useState } from "react"
import StarsIcon from "@/images/stars.svg"
import Image from "next/image";

type Props<TData> = {
  selectedItems: TData[];
  items: TData[];
  onChange: (value: string) => void;
  onSelectionChanged: (selectedItem: TData) => void;
  placeholder: string;
  label: string;
  renderItem: (item: TData) => React.ReactNode;
}

export const Autocomplete = <TData, >({ onChange, onSelectionChanged, items, selectedItems, placeholder, label, renderItem }: Props<TData>) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFocused, setIsFocused] = useState(false);

  const debouncedCallback = debounce((value: string) => {
    onChange(value)
  }, 150)

  const handleChange = (value: string) => {
    debouncedCallback(value)
    setSearchQuery(value)
  }

  const handleSelectItem = (selectedItem: TData) => (event: SyntheticEvent) => {
    onSelectionChanged(selectedItem)
  }

  const handleFocus = () => {
    setIsFocused(true);
  };

  useEffect(() => {
    setIsFocused(false)
  }, [selectedItems]);

  const filteredItems = items.filter((item) => {
      const foundedIndex = selectedItems.findIndex((selectedItem) => selectedItem === item)

      return foundedIndex === -1;
    })

  return (
    <div className="relative flex flex-col gap-2 ">
      <label htmlFor="autocomplete" className="font-semibold text-[#10151B] leading-4">
        {label}
      </label>
      
      <div className="p-[6px] border border-solid border-[#DFE5E9] rounded-md flex gap-2 -z-1">
        <Image src={StarsIcon} alt='stars icon' width={28} height={28} />
        <input 
          autoComplete="off"
          id="autocomplete" 
          type="text" 
          placeholder={placeholder} 
          value={searchQuery} 
          onChange={(event) => handleChange(event.target.value)} 
          onFocus={handleFocus}
          className="placeholder:text-[#7E899C] placeholder:font-normal flex-1 outline-none" 
        />
      </div>


      {isFocused ? (
        <ul className="flex flex-col items-center absolute top-full mt-2 left-0 min-h-[116px] min-w-full  bg-white">
          {filteredItems.map((item, index) => (
            <li 
              key={index} 
              className="flex py-[4px] px-[10px] w-full font-medium text-[12px] leading-2 border-r border-l border-b border-solid border-[#DFE5E9] first:rounded-t-md first:border-t last:rounded-b-md last:border-b last:border-t-0 cursor-pointer"
              onClick={handleSelectItem(item)}
            >
              {renderItem(item)}
            </li>
          ))}
        </ul> )
       : null} 
    </div>
  )
}