import React, { useState } from "react";
import { useForm, useController } from "react-hook-form";
import Select from "react-select";

const languageList = [
  { value: 1, label: "English" },
  { value: 2, label: "Hindi" },
];

function Page() {
  const [data, setData] = useState();
  const { register, handleSubmit, formState, control } = useForm();

  const {
    field: { value: langValue, onChange: langOnChange, ...restLangField },
  } = useController({
    name: "language",
    control,
    rules: { required: "must select a language!" },
  });

  const { errors } = formState;

  const onSubmit = (formData) => {
    setData({ ...formData });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h4>
        Add a react-select dropdown with react-hook-form -{" "}
        <a
          href="https://www.cluemediator.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Clue Mediator
        </a>
      </h4>
      <div>
        <label>Name</label>
        <input placeholder="Name" {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label>Email</label>
        <input placeholder="Email" {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label>Website</label>
        <input placeholder="Website" {...register("website")} />
        {errors.website && <p>{errors.website.message}</p>}
      </div>
      <div>
        <label>Language</label>
        <Select
          className="select-input"
          placeholder="Select Language"
          isClearable
          options={languageList}
          value={
            langValue
              ? languageList.find((x) => x.value === langValue)
              : langValue
          }
          onChange={(option) => langOnChange(option ? option.value : option)}
          {...restLangField}
        />
        {errors.language && <p>{errors.language.message}</p>}
      </div>
      <div>
        <button>Submit</button>
      </div>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </form>
  );
}

export default Page;
