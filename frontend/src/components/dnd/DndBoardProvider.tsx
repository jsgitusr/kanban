'use client';

import type { ReactNode } from 'react';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import type { ColumnId } from '@/types/kanban';

export interface DndBoardProviderProps {
  children: ReactNode;
  onMoveCard: (cardId: string, from: ColumnId, to: ColumnId, index?: number) => void;
}

export function DndBoardProvider({ children, onMoveCard }: DndBoardProviderProps) {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const fromColumn = active.data.current?.columnId as ColumnId | undefined;
    const toColumn = over.data.current?.columnId as ColumnId | undefined;
    const index = active.data.current?.index as number | undefined;

    const cardId = String(active.id);

    if (!fromColumn || !toColumn) return;

    // We always know the source index from the dragged card.
    // Target index is left to the board logic; passing the source index
    // allows callers to position the card deterministically if desired.
    onMoveCard(cardId, fromColumn, toColumn, index);
  };

  return <DndContext onDragEnd={handleDragEnd}>{children}</DndContext>;
}

