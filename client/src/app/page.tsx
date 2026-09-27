type Category = {
  id: string;
  name: string;
  slug: string;
};

async function getCategories(): Promise<Category[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

  try {
    const res = await fetch(`${apiUrl}/api/categories`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function Home() {
  const categories = await getCategories();

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 px-6 py-16 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col gap-8">
        <div>
          <p className="text-sm font-medium text-green-700 dark:text-green-500">Gewathu.lk</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Everything for your garden
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Plants, seeds, garden tools and trusted supplies for Sri Lankan homes.
          </p>
        </div>

        <section>
          <h2 className="text-sm font-medium uppercase tracking-wide text-zinc-500">
            Shop by category
          </h2>
          {categories.length === 0 ? (
            <p className="mt-3 text-sm text-zinc-500">
              No categories loaded — make sure the API server is running (
              <code className="rounded bg-black/[.06] px-1 py-0.5 font-mono text-xs dark:bg-white/[.08]">
                npm run dev:server
              </code>
              ) and seeded (
              <code className="rounded bg-black/[.06] px-1 py-0.5 font-mono text-xs dark:bg-white/[.08]">
                npm run prisma:seed
              </code>
              ).
            </p>
          ) : (
            <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {categories.map((category) => (
                <li
                  key={category.id}
                  className="rounded-lg border border-black/[.08] px-4 py-3 text-sm font-medium text-zinc-800 dark:border-white/[.145] dark:text-zinc-100"
                >
                  {category.name}
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
