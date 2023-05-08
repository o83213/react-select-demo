import dynamic from "next/dynamic";
import { OptionsOrGroups } from "react-select";
const AsyncSelect = dynamic(() => import("react-select/async"), { ssr: false });
interface Option {
  value: string;
  label: string;
  color: string;
}
const SelectItem = () => {
  const options: Array<Option> = [
    { value: "chocolate", label: "Chocolate", color: "#FF8B00" },
    { value: "strawberry", label: "Strawberry", color: "#36B37E" },
    { value: "vanilla", label: "Vanilla", color: "#0052CC" },
  ];
  const colorStyles = {
    control: (styles: any) => ({ ...styles, backgroundColor: "white" }),
    option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
      return { ...styles, color: data.color };
    },
    multiValue: (styles: any, { data }: any) => {
      return { ...styles, backgroundColor: data.color, color: "#fff" };
    },
    multiValueLabel: (styles: any, { data }: any) => ({
      ...styles,
      color: "#fff",
    }),
    multiValueRemove: (styles: any, { data }: any) => ({
      ...styles,
      color: "#fff",
      cursor: "pointer",
      ":hover": {
        // backgroundColor: "#fff",
      },
    }),
  };
  const handleChange = (selectedOption: any) => {
    console.log("selectedOption", selectedOption);
  };
  const loadOptions = (inputValue: string, callback: any) => {
    console.log("inputValue", inputValue);
    setTimeout(() => {
      const filteredOptions = options.filter((option) => {
        return option.label.toLowerCase().includes(inputValue.toLowerCase());
      });
      console.log("filteredOptions", filteredOptions);
      callback(filteredOptions);
    }, 1000);
  };
  return (
    <>
      <AsyncSelect
        loadOptions={loadOptions}
        defaultOptions
        isMulti
        onChange={handleChange}
        styles={colorStyles}
      ></AsyncSelect>
    </>
  );
};

export default SelectItem;
