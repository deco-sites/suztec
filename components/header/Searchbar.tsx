import { lazy, Suspense } from "preact/compat";
import Loading from "$store/components/ui/Loading.tsx";
import { headerHeight } from "$store/components/header/constants.ts";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import SearchNavBar from "$store/components/search/Searchbar.tsx";

// const LazySearchbar = lazy(() =>
//   import("$store/components/search/Searchbar.tsx")
// );

interface Props {
  searchbar: SearchbarProps;
}

function Searchbar({ searchbar }: Props) {
  return (
    <Suspense fallback={<Loading />}>
      <SearchNavBar {...searchbar} variant="desktop" />
    </Suspense>
  );
}

export default Searchbar;
