export default function Home() {
  return (
    <section className="h-screen flex justify-center items-center">
      <div className="flex gap-8">
        <div className="text-9xl leading-[0.75] font-black flex flex-col">
          <span>COLAIA</span>
          <span className="pl-10">COLAIA</span>
          <span className="pl-20">COLAIA</span>
        </div>
        <div className="grid grid-rows-[1fr_min-content_1fr] gap-5 items-baseline">
          <span aria-hidden></span>
          <span className="text-5xl" aria-label="your future developer">
            your_future_developer
          </span>
          <nav className="text-xl font-semibold tracking-wider mx-auto flex gap-8 px-8 py-2 bg-gradient-to-r from-[#B3FFAB] to-[#12FFF7] skew-x-[22deg] [&>span]:skew-x-[-22deg] outline outline-2 outline-offset-2">
            <span>experience</span>
            <span aria-label="about me">about_me</span>
            <span>contact</span>
          </nav>
        </div>
      </div>
    </section>
  );
}
