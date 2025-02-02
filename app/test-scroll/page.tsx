import Container from "./Container";

const tw = {
  container: "h-[100vh] sticky top-0",
};
export default function page() {
  return (
    <>
      <section>
        <div className="h-[calc(100vh-100px)]">
          <div className={`${tw.container} h-[100%] bg-[red]`}>SECTION 1</div>
        </div>
      </section>
      <section>
        <Container />
        <div className="h-[300vh]">
          <div className={`${tw.container} bg-[orange]`}>SECTION 2.2</div>
        </div>
      </section>
      <section>
        <div className="h-[300vh]">
          <div className={`${tw.container} bg-[green]`}>SECTION 3</div>
        </div>
      </section>
    </>
  );
}
