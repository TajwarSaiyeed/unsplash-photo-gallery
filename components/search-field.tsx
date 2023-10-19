"use client";
import { useDebounce } from "@/hooks/use-debounce";
import { useRouter } from "next/navigation";
import qs from "query-string";
import React, { useEffect, useState } from "react";

type SearchFieldProps = {};

const SearchField = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  const router = useRouter();

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: {
          query: debouncedValue,
        },
      },
      {
        skipNull: true,
        skipEmptyString: true,
      }
    );
    router.push(url);
  }, [debouncedValue, router]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label
          htmlFor={"text"}
          className="block text-sm font-medium text-gray-900"
        >
          Search Photos
        </label>
      </div>
      <input
        value={value}
        type={"text"}
        name={"text"}
        placeholder={"Search Photos"}
        onChange={handleSearchChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] block w-full outline-none p-3"
      />
    </div>
  );
};

export default SearchField;
