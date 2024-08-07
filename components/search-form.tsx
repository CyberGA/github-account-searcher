"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export type AccountType = "user" | "org";

export default function SearchForm(): React.JSX.Element {
  const [error, setError] = useState<string>("");
  const [accountType, setAccountType] = useState<AccountType | null>();
  const userNameRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const updateAccountType = (type: AccountType) => {
    setError("")
    setAccountType(type);
  }

  const submitHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setError("");
    if (!accountType) {
      setError("Select github account type");
      return;
    }
    if (!userNameRef.current?.value) {
      setError("Username is required");
      return;
    }

    router.push(`/search/${accountType}/${userNameRef.current?.value}`)
  };

  return (
    <section>
      <div className="w-full max-w-md mx-auto mt-10 px-6 py-12 rounded-lg border shadow-md">
        <form onSubmit={submitHandler} className="">
          <h1 className="text-4xl font-bold text-black/60">Search</h1>
          <p className="italic text-sm">
            Enter the username you wish to search for
          </p>
          {error && (
            <div className="border border-rose-400 px-4 py-2 rounded-md mt-2 text-black/60 text-sm">
              Error: {error}
            </div>
          )}

          <div className="flex items-center gap-2 mt-4">
            <label htmlFor="user" className="flex items-center gap-2">
              <input
                type="radio"
                name="searchType"
                id="user"
                onChange={() => updateAccountType("user")}
              />
              <span>Users</span>
            </label>
            <label htmlFor="org" className="flex items-center gap-2">
              <input
                type="radio"
                name="searchType"
                id="org"
                onChange={() => updateAccountType("org")}
              />
              <span>Organizations</span>
            </label>
          </div>
          <div className="flex items-center gap-2 my-10">
            <input
              type="text"
              ref={userNameRef}
              placeholder="e.g. user1"
              className="border px-4 py-3 text-base w-full rounded-lg"
            />
            <button
              type="submit"
              className="w-fit px-4 py-3 text-white text-base bg-primary-100 rounded-lg cursor-pointer disabled:cursor-not-allowed"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
