import SearchForm from "@/components/search-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search User | Github",
};

export default function Home(): React.JSX.Element {
  return <SearchForm />;
}
