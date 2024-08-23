import SkeletonCard from "@/components/SkeletonCard";

export default function Loading() {
  return (
    <main>
      <div className="grid grid-cols-3 gap-8">
        {"asdfghijk".split("").map((letter) => (
          <SkeletonCard key={letter} />
        ))}
        <SkeletonCard />
      </div>
    </main>
  );
}
