import SearchResult, { ISearchParams } from "@/components/search-result";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User View | Github",
};

export default function Page({ params }: ISearchParams): React.JSX.Element {
  return <SearchResult slug={params.slug} />;
}
