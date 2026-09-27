import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, BookOpen, Clock3, Search } from "lucide-react";
import heroImage from "@/assets/hero.png";

const categories = ["All stories", "Patient guidance", "On the road", "For partners"];

const stories = [
  {
    title: "A calmer first call: what to have ready when requesting an ambulance",
    category: "Patient guidance",
    date: "September 18, 2026",
    readTime: "4 min read",
    excerpt:
      "A few practical details can help dispatch understand the situation and coordinate the right response for your family.",
  },
  {
    title: "From request to arrival: how dispatch coordination works",
    category: "On the road",
    date: "September 10, 2026",
    readTime: "5 min read",
    excerpt:
      "A look at the people and steps behind a clear handoff between a caller, dispatcher, and ambulance crew.",
  },
  {
    title: "Building trust into every handoff",
    category: "For partners",
    date: "August 28, 2026",
    readTime: "3 min read",
    excerpt:
      "Why accurate updates and dependable communication matter to patients, families, and ambulance partners.",
  },
  {
    title: "Helping someone else request emergency transport",
    category: "Patient guidance",
    date: "August 14, 2026",
    readTime: "4 min read",
    excerpt:
      "Simple ways to keep information organized when you are arranging a ride on behalf of someone you care for.",
  },
];

const Blog = () => {
  const [category, setCategory] = useState("All stories");
  const [search, setSearch] = useState("");
  const normalizedSearch = search.trim().toLowerCase();
  const filteredStories = stories.filter((story) => {
    const matchesCategory = category === "All stories" || story.category === category;
    const matchesSearch = `${story.title} ${story.excerpt} ${story.category}`
      .toLowerCase()
      .includes(normalizedSearch);
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="bg-[#f6f9fb] text-[#102a43]">
      <section className="border-b border-[#d9e5ec] bg-[#edf5f8]">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
          <p className="text-xs font-semibold tracking-[0.16em] text-[#176b78] uppercase">CallNow journal</p>
          <div className="mt-3 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <h1 className="max-w-2xl text-4xl leading-tight font-semibold text-[#102a43] sm:text-5xl">Stories for the moments that matter.</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#567086]">Practical guidance and perspectives on getting care moving, from the first call to the final handoff.</p>
            </div>
            <div className="flex items-center gap-3 border-t border-[#cbdde4] pt-4 text-sm text-[#456478] lg:justify-self-end lg:border-t-0 lg:border-l lg:pl-6 lg:pt-0">
              <BookOpen className="size-5 text-[#176b78]" />
              <span>Care, coordination, and community</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        <article className="grid overflow-hidden rounded-xl border border-[#d9e5ec] bg-white md:grid-cols-[1fr_0.92fr]">
          <div className="flex flex-col items-start justify-center p-6 sm:p-9 lg:p-12">
            <span className="rounded-full bg-[#e5f3f2] px-3 py-1 text-xs font-semibold text-[#176b78]">Featured · Patient guidance</span>
            <h2 className="mt-5 max-w-xl text-2xl leading-tight font-semibold text-[#102a43] sm:text-3xl">When every minute counts, clear information helps care move.</h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-[#567086]">A practical guide to sharing your location, describing the situation, and keeping the people around you informed.</p>
            <Link to="/blog#stories" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#176b78] hover:text-[#102a43]">Explore the journal <ArrowRight className="size-4" /></Link>
          </div>
          <div className="relative min-h-64 bg-[#dcebef] md:min-h-80">
            <img src={heroImage} alt="An ambulance responding on the road" className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-[#102a43]/30 to-transparent" />
          </div>
        </article>
      </section>

      <section id="stories" className="mx-auto max-w-7xl scroll-mt-6 px-5 pb-16 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-5 border-b border-[#d9e5ec] pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.14em] text-[#176b78] uppercase">From the journal</p>
            <h2 className="mt-2 text-2xl font-semibold text-[#102a43]">Browse all stories</h2>
          </div>
          <label className="relative block w-full lg:max-w-sm">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#6b8090]" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search stories" className="h-10 w-full rounded-md border border-[#cbd9df] bg-white pl-10 pr-3 text-sm outline-none transition focus:border-[#176b78] focus:ring-3 focus:ring-[#176b78]/15" />
          </label>
        </div>

        <div className="flex flex-wrap gap-2 py-5" role="tablist" aria-label="Filter stories by topic">
          {categories.map((item) => (
            <button key={item} type="button" role="tab" aria-selected={category === item} onClick={() => setCategory(item)} className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${category === item ? "border-[#176b78] bg-[#176b78] text-white" : "border-[#cbd9df] bg-white text-[#456478] hover:bg-[#eaf1f3]"}`}>
              {item}
            </button>
          ))}
        </div>

        {filteredStories.length ? (
          <div className="grid gap-x-7 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredStories.map((story) => (
              <article key={story.title} className="flex flex-col border-t-2 border-[#9dc9cc] pt-4">
                <div className="flex items-center justify-between gap-3 text-xs text-[#6b8090]"><span className="font-semibold text-[#176b78]">{story.category}</span><span>{story.date}</span></div>
                <h3 className="mt-4 text-lg leading-snug font-semibold text-[#102a43]">{story.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-[#567086]">{story.excerpt}</p>
                <p className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-[#6b8090]"><Clock3 className="size-3.5" />{story.readTime}</p>
              </article>
            ))}
          </div>
        ) : (
          <p className="py-12 text-center text-sm text-[#567086]">No stories match that search. Try another topic or phrase.</p>
        )}
      </section>
    </main>
  );
};

export default Blog;