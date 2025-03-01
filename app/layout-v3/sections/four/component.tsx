import css from "./style.module.scss";

export default function component() {
  return (
    <section className={css.tracker}>
      <div className={css.articles__wrapper} />
    </section>
  );
}
