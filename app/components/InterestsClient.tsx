import InterestItem from "./InterestItem";

export default function ({ data }) {
  return (
    <section className="mb-32">
      <div className="max-w-[800px] mx-auto">
        <h1 className="text-5xl text-center mb-20">TECH JOURNEY</h1>
        <ul className="grid grid-cols-[max-content_1fr] gap-x-8 gap-y-16">
          {data.map((item, index) => (
            <InterestItem key={index} data={item} />
          ))}
        </ul>
      </div>
    </section>
  );
}
