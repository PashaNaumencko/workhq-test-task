import { debounce } from "@/helpers/debounce";
import { useState } from "react"

type Props = {
  initialOptions: string[]
  onChange: (value: string) => void
}

export default function Autocomplete({ onChange, initialOptions }: Props) {
  const [options, setOptions] = useState<string[]>(initialOptions);

  const debouncedCallback = debounce((value: string) => {
    onChange(value)
  }, 150)

  const handleChange = (value: string) => {
    debouncedCallback(value)
  }

  const handleSelectItem = (selectedItem: string) => {
    if (options.includes(selectedItem)) {
      setOptions((prevState) => prevState.filter((item) => item !== selectedItem));

      return;
    }

    setOptions((prevState) => [...prevState, selectedItem]);
  }
  
  return (
    <>
      <input type="text" onChange={(event) => handleChange(event.target.value)} />
      <div className="flex flex-col items-center">
        {options.map((option, index) => (
          <div key={index} className="flex p-5 w-full" onClick={() => handleSelectItem(option)}>{option}</div>
        ))}
      </div>
    </>
  )
}