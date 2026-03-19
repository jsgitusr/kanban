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

    const cardId = String(active.id);

    if (!fromColumn || !toColumn) return;

    onMoveCard(cardId, fromColumn, toColumn);
  };

  return <DndContext onDragEnd={handleDragEnd}>{children}</DndContext>;
}

