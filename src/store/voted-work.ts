import { create } from "zustand";
import { CategoryType, WorkType } from "@/lib/types";

const MAX_CATEGORY_VOTE = 3;

interface VotedWorkState {
  /**
   * 从服务器获取的所有分类
   */
  categories: CategoryType[];
  /**
   * 每个分类被投票的作品
   */
  categoryVotes: Map<string, WorkType[]>;
  /**
   * 从服务器获取所有分类, 只需调用一次
   */
  fetchCategories: () => Promise<void>;
  vote: (work: WorkType, categoryId: string) => boolean;
  cancelVote: (workId: number, categoryId: string) => void;
  submitVotes: () => Promise<string | null>;
}

export const useVotedWork = create<VotedWorkState>()((set, get) => ({
  currentYear: 0x0721,
  categories: [],
  categoryVotes: new Map(),
  fetchCategories: async () => {
    const res = await fetch("api/gal/categories");
    const obj = await res.json();
    if (!res.ok || !obj.message) {
      console.error("Failed to fetch categories");
      return;
    }

    obj.data.forEach((c: CategoryType) => {
      c.id = c.id.toString();
    });

    set({ categories: obj.data });
  },
  vote: (work, categoryId) => {
    if (!categoryId) return false;
    if (!get().categories.find(c => c.id === categoryId)) return false;
    if (!get().categoryVotes.has(categoryId)) {
      get().categoryVotes.set(categoryId, []);
    }

    const workId = work.id;

    const categoryVotes = get().categoryVotes.get(categoryId)!;
    if (categoryVotes.length >= MAX_CATEGORY_VOTE) return false;
    if (categoryVotes.find(w => w.id === workId)) return false;

    set({
      categoryVotes: new Map(
        get().categoryVotes.set(categoryId, [...categoryVotes, work]),
      ),
    });

    return true;
  },
  cancelVote: (workId, categoryId) => {
    if (!categoryId) return;
    if (!get().categoryVotes.has(categoryId)) return;

    const categoryVotes = get().categoryVotes.get(categoryId)!;
    const newCategoryVotes = categoryVotes.filter(w => w.id !== workId);

    set({
      categoryVotes: new Map(
        get().categoryVotes.set(categoryId, newCategoryVotes),
      ),
    });
  },
  submitVotes: async () => {
    const votes = Array.from(get().categoryVotes).map(
      ([categoryId, works]) => ({
        categoryId: parseInt(categoryId),
        works: works.map(w => w.id),
      }),
    );

    if (votes.length === 0) {
      return "你还没投票呢";
    }

    const res = await fetch("api/votes/submit", {
      method: "POST",
      body: JSON.stringify({
        votes,
      }),
    });

    const obj = await res.json();

    if (!res.ok && obj.message !== "ok") {
      console.error("Failed to submit votes");
      return obj.message;
    }

    return null;

    // set({ categoryVotes: new Map() });
  },
}));
