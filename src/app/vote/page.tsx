import { getOpenedRound } from "@/lib/services";
import SearchArea from "./search";
import VotedWorks from "./voted-works";

const VotePage = async () => {
  const round = await getOpenedRound();

  return (
    <>
      {round ? (
        <div className="relative top-16 grid grid-cols-1 gap-4 p-0 md:top-0 md:grid-cols-5 md:p-0 lg:grid-cols-4 lg:p-4">
          <div className="order-1 col-span-3 bg-white bg-opacity-0 p-2 md:order-2 md:col-span-4 lg:col-span-3">
            <main>
              <VotedWorks roundId={round.id} roundName={round.roundName} />
            </main>
          </div>
          <div className="top-4 order-2 hidden bg-white bg-opacity-0 p-2 max-md:hidden md:order-1 md:col-span-1 md:inline">
            <SearchArea />
          </div>
        </div>
      ) : (
        <div className="flex h-full items-center justify-center">
          <h1 className="text-center text-3xl">投票尚未开始</h1>
        </div>
      )}
    </>
  );
};

export default VotePage;
