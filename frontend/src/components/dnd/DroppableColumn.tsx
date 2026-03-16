import type { ReactNode } from 'react';
import { useDroppable } from '@dnd-kit/core';
import type { ColumnId } from '@/types/kanban';

interface DroppableColumnProps {
  columnId: ColumnId;
  children: ReactNode;
}

export function DroppableColumn({ columnId, children }: DroppableColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: `column-${columnId}`,
    data: { columnId }
  });

  return (
    <div
      ref={setNodeRef}
      data-testid="kanban-column"
      className={`board-column flex flex-col rounded-2xl border bg-slate-900/70 backdrop-blur-sm shadow-[0_10px_35px_rgba(15,23,42,0.85)] min-h-[260px] transition-colors ${
        isOver ? 'border-[#209dd7] bg-slate-900' : 'border-slate-800/80'
      }`}
    >
      {children}
    </div>
  );
}

