import WorkCard from "@/components/card/work-card";
import SearchBar from "@/components/search-bar";
import Footer from "./footer";

export default function HomePage() {
  return (
    <div>
      <main className="flex w-full items-center justify-center">
        <div className="h-20" />
        <h1>Home</h1>
      </main>
      <Footer />
    </div>
  );
}
