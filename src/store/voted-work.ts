import { create } from "zustand";
import { CategoryType, WorkType } from "@/lib/types";

const MAX_CATEGORY_VOTE = 3;

interface VotedWorkState {
  categories: CategoryType[];
  categoryVotes: Map<string, WorkType[]>;
  fetchCategories: () => Promise<void>;
  vote: (work: WorkType, categoryId: string) => boolean;
}

export const useVotedWork = create<VotedWorkState>()((set, get) => ({
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
}));
