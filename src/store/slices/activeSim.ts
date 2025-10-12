import { create } from "zustand";
import Activate from "../../types/activate";

interface PropsActiveSim {
	data: Activate.paramSaveLog | null;
	setData: (data: Activate.paramSaveLog | null) => void;

}

export const useActiveSimStore = create<PropsActiveSim>((set) => ({
	data: null,
	setData: (data: Activate.paramSaveLog | null) => set({ data })
}));