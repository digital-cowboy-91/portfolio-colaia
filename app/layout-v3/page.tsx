import LenisWrapper from "./LenisWrapper";
import DataProvider from "./sections/data-provider";
import First from "./sections/first";
import Four from "./sections/four";
import Second from "./sections/second";
import Three from "./sections/three";

export default function page() {
  return (
    <DataProvider>
      <LenisWrapper>
        <First />
        <Second />
        <Three />
        <Four />
      </LenisWrapper>
    </DataProvider>
  );
}
