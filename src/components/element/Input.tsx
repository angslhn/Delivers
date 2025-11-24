import { ChangeEvent, JSX } from "react";

type InputProps = {
  label: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  invalid: string | undefined;
};

export default function Input({ label, name, onChange, value, invalid }: InputProps): JSX.Element {
  return (
    <div className="relative flex flex-col h-20 w-full gap-1">
      <label className="h-5 mx-1 text-sm font-medium text-steel-night select-none" htmlFor="fullname">
        {label}
      </label>
      <input
        name={name}
        type="text"
        onChange={onChange}
        value={value}
        className="h-8 w-full px-2 text-sm rounded-sm shadow outline-none border border-steel-night/40"
      />
      {invalid !== "" && <span className="absolute bottom-0.5 left-1 text-xs text-red-600">{invalid}</span>}
    </div>
  );
}
