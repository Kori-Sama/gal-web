import WorkCard from "@/components/card/work-card";
import SearchBar from "@/components/search-bar";

export default function HomePage() {
  return (
    <main className="flex w-full mt-20 items-center justify-center">
      <WorkCard
        title="美好的每一天 ～不连续的存在～"
        linkUrl="https://bangumi.tv/subject/4639"
        coverImage="https://lain.bgm.tv/pic/cover/c/33/b8/4639_kDq7d.jpg"
      />
    </main>
  );
}
