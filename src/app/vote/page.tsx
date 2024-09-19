import { getOpenedRound } from "@/lib/services";
import SearchArea from "./search";
import VotedWorks from "./voted-works";

const VotePage = async () => {
  const round = await getOpenedRound();

  return (
    <>
      {round ? (
        <div className="flex w-svw flex-col items-center justify-between md:flex-row">
          <div className="order-1 mt-16 h-svh w-full md:order-2 md:h-[80svh] md:w-[60svw]">
            <main>
              <VotedWorks roundId={round.id} roundName={round.roundName} />
            </main>
          </div>
          <div className="order-2 w-full md:order-1 md:ml-12 md:h-[80svh] md:w-[33svw]">
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
