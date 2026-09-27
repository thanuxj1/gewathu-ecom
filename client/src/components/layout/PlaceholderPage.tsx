type PlaceholderPageProps = {
  title: string;
  message: string;
};

export function PlaceholderPage({ title, message }: PlaceholderPageProps) {
  return (
    <section className="shell section-space">
      <p className="kicker">Later milestone</p>
      <h1 className="section-title">{title}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-muted">{message}</p>
    </section>
  );
}
