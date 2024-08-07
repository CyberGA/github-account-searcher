"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { AccountType } from "./search-form";
import octokit from "@/lib/request";
import Image from "next/image";
import Link from "next/link";
import { CustomDate } from "@/lib/date";

interface IResultData {
  title: string;
  value: string;
  isLink?: boolean;
}

export interface ISearchParams {
  params: {
    slug: [AccountType, string];
  };
}

const ResultData: React.FC<IResultData> = ({
  title,
  value,
  isLink = false,
}) => {
  if (!value) {
    return <></>;
  }
  return (
    <p className="flex flex-wrap justify-between border-b border-black/5 pb-2">
      {title}:{" "}
      {isLink ? (
        <Link href={value}>
          <span className="text-primary-100 underline underline-offset-2">
            {value}
          </span>
        </Link>
      ) : (
        <span className="text-black/70">{value}</span>
      )}
    </p>
  );
};

export default function SearchResult({
  slug,
}: {
  slug: [AccountType, string];
}): React.JSX.Element | null {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [stars, setStars] = useState<number | null>(null)
  const [forks, setForks] = useState<number | null>(null)
  const [watchers, setWatchers] = useState<number | null>(null)
  const [data, setData] = useState<{ [key: string]: any } | null>(null);

  useEffect(() => {
    if (!slug || !["org", "user"].includes(slug[0])) {
      router.replace("/404");
    }
    const getSearchResult = async () => {
      try {
        let result;
        if (slug[0] === "user") {
          result = await octokit.rest.users.getByUsername({
            username: slug[1],
          });
          const repos = await octokit.rest.repos.listForUser({
          username: slug[1],});
          setWatchers(repos.data.reduce((acc, repo) => acc + (repo?.watchers_count ?? 0), 0));
          setForks(repos.data.reduce((acc, repo) => acc + (repo?.forks_count ?? 0), 0));
          setStars(repos.data.reduce((acc, repo) => acc + (repo?.stargazers_count ?? 0), 0));
        } else {
          result = await octokit.rest.orgs.get({ org: slug[1] });
          const repos = await octokit.rest.repos.listForOrg({
          org: slug[1], });
          setWatchers(repos.data.reduce((acc, repo) => acc + (repo?.watchers_count ?? 0), 0));
          setForks(repos.data.reduce((acc, repo) => acc + (repo?.forks_count ?? 0), 0));
          setStars(repos.data.reduce((acc, repo) => acc + (repo?.stargazers_count ?? 0), 0));
        }
        setData(result.data);
      } catch (error) {
        console.error(error);
        setData(null);
      } finally {
        setLoading((loading) => false);
      }
    };

    getSearchResult();
  }, [slug, router]);

  return (
    <section className="px-5">
      <div className="w-full max-w-md mx-auto my-10 px-6 py-12 rounded-lg border shadow-md">
        <h1 className="text-2xl font-bold text-black/60">
          Search Result for {slug[1]}:
        </h1>
        {loading ? (
          <p className="mt-10 text-center">Searching, please wait...</p>
        ) : data === null ? (
          <p className="mt-10 text-center">No github account found</p>
        ) : (
          <div className="mt-4">
            <div className="flex justify-center my-2">
              <Image
                src={data?.avatar_url}
                alt={`${slug[1]} profile picture`}
                width={80}
                height={80}
                className="rounded-full border-2"
              />
            </div>
            <div className="space-y-4 mt-6">
              <ResultData title="Username" value={data?.login} />
              <ResultData title="Email Address" value={data?.email ?? "-"} />
              <ResultData title="Profile" value={data?.html_url} isLink={true} />
              <ResultData
                title="Date Created"
                value={
                  data?.created_at
                    ? CustomDate.formatDateToDayMonthYear(data?.created_at)
                    : "-"
                }
              />
              <ResultData title="Location" value={data?.location} />
              <ResultData title="Account Type" value={data?.type} />
              <ResultData title="Public Repos" value={data?.public_repos} />
              <ResultData title="Followers" value={data?.followers} />
              <ResultData title="Following" value={data?.following} />
              {watchers !== null && <ResultData title="No. of Watchers" value={watchers.toString()} />}
              {forks !== null && <ResultData title="No. of Forks" value={forks.toString()} />}
              {stars !== null && <ResultData title="No. of Stars" value={stars.toString()} />}
            </div>
          </div>
        )}
          <div className="flex justify-end mt-16">
            <Link href="/" className="text-primary-100 underline underline-offset-2">Search</Link>
          </div>
      </div>
    </section>
  );
}
