import { Suspense } from "react";
import SearchPageClient from "./SearchPageClient";

const SearchPage = () => {

  return (
    <Suspense>
      <SearchPageClient />
    </Suspense>
  )
}
export default SearchPage