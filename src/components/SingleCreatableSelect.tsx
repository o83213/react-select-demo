import dynamic from "next/dynamic";
import { useState } from "react";
const CreatableSelect = dynamic(() => import("react-select/creatable"), {
  ssr: false,
});
import useSwr from "swr";
import useSWRMutation from "swr/mutation";
import { useForm, Validate, Controller } from "react-hook-form";
const defaultValues = {
  busColor: [],
};

//
interface Option {
  value: string;
  label: string;
}
const fetcher = async (url: string) => fetch(url).then((res) => res.json());

async function createOptionFetcher(url: string, { arg }: { arg: Option }) {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
}

interface Option {
  label: string;
  value: string;
}

const SingleCreatableSelect = () => {
  const { data, error } = useSwr<Array<Option>>(`/api/options`, fetcher);
  console.log("data", data);
  const { trigger: createOption, isMutating } = useSWRMutation(
    "/api/options",
    createOptionFetcher
  );
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState<Option | null>();
  const handleCreate = (inputValue: string) => {
    setIsLoading(true);
    createOption({ label: inputValue, value: inputValue }).then((res) => {
      console.log("res", res);
      setIsLoading(false);
      setValue(res);
    });
  };

  return (
    <CreatableSelect
      isClearable
      isDisabled={isLoading}
      isLoading={isLoading}
      onChange={(newValue: any) => setValue(newValue)}
      onCreateOption={handleCreate}
      options={data}
      value={value}
    ></CreatableSelect>
  );
};

export default SingleCreatableSelect;
