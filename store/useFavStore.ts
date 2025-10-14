import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FavState } from "@/interfaces";
export const useFavStore = create<FavState>()(
    persist(
        (set, get) => ({
            favourites: [],

            addToFav:(item) => {
                 set({ favourites: [...get().favourites, item] });
            },

            removeFromFav: (id) => {
                set({favourites: get().favourites.filter((i) => i.product.id !== id)})
            },

            clearFav: () => set({favourites: []}),

            total: () => get().favourites.reduce((sum,item) => sum + 1, 0),
        }),
        {
            name: "favourites storage"
        }
    )
)