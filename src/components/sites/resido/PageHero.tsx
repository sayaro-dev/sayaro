export function PageHero({
  label,
  title,
  subtitle,
}: {
  label?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-[#FAFAFA] pb-16 pt-28">
      <div className="mx-auto max-w-[1400px] px-6">
        <h1 className="max-w-3xl font-heading text-[40px] font-medium leading-tight tracking-[-0.04em] lg:text-[64px]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-xl text-lg text-neutral-500">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
