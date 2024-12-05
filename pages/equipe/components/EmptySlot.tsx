// components/EmptySlot.tsx
import type { EmptySlotProps } from "../types/types";

export const EmptySlot = ({ index }: EmptySlotProps) => (
  <div className="w-48 h-48 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center">
    <div className="text-gray-400 text-lg font-medium">
      Emplacement {index + 1}
    </div>
    <div className="text-gray-400 text-sm">Vide</div>
  </div>
);
