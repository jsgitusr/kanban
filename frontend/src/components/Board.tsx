'use client';

import { useEffect, useState } from 'react';
import { dummyBoard } from '@/data/dummyBoard';
import type { KanbanBoard, KanbanCard, ColumnId } from '@/types/kanban';
import { moveCard } from '@/lib/boardState';
import { KanbanColumn } from './KanbanColumn';
import { DndBoardProvider } from './dnd/DndBoardProvider';

export function Board() {
  const [isMounted, setIsMounted] = useState(false);
  const [board, setBoard] = useState<KanbanBoard>(dummyBoard);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleMoveCard = (cardId: string, from: ColumnId, to: ColumnId, index?: number) => {
    setBoard((current) => moveCard(current, cardId, from, to, index));
  };

  const handleAddCard = (columnId: ColumnId, title: string, details: string) => {
    setBoard((current) => {
      const next: KanbanBoard = {
        ...current,
        columns: current.columns.map((col) => ({ ...col, cards: [...col.cards] }))
      };

      const column = next.columns.find((c) => c.id === columnId);
      if (!column) {
        return current;
      }

      const newCard: KanbanCard = {
        id: `card-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        title,
        details
      };

      column.cards.unshift(newCard);

      return next;
    });
  };

  const handleDeleteCard = (columnId: ColumnId, cardId: string) => {
    setBoard((current) => {
      const next: KanbanBoard = {
        ...current,
        columns: current.columns.map((col) => ({ ...col, cards: [...col.cards] }))
      };

      const column = next.columns.find((c) => c.id === columnId);
      if (!column) {
        return current;
      }

      column.cards = column.cards.filter((c) => c.id !== cardId);

      return next;
    });
  };

  const handleUpdateCard = (columnId: ColumnId, cardId: string, updates: Partial<KanbanCard>) => {
    setBoard((current) => {
      const next: KanbanBoard = {
        ...current,
        columns: current.columns.map((col) => ({ ...col, cards: [...col.cards] }))
      };

      const column = next.columns.find((c) => c.id === columnId);
      if (!column) {
        return current;
      }

      const index = column.cards.findIndex((c) => c.id === cardId);
      if (index === -1) {
        return current;
      }

      column.cards[index] = { ...column.cards[index], ...updates };

      return next;
    });
  };

  const handleRenameColumn = (columnId: ColumnId, name: string) => {
    setBoard((current) => ({
      ...current,
      columns: current.columns.map((col) => (col.id === columnId ? { ...col, name } : col))
    }));
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header className="px-8 pt-8 pb-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-baseline justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-[#032147] drop-shadow-[0_0_24px_rgba(32,157,215,0.6)]">
              {board.name}
            </h1>
            <p className="mt-2 text-base text-[#888888]">
              A focused single-board Kanban for your current work.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#209dd7]/40 bg-slate-900/60 px-3 py-1 text-xs font-medium text-[#209dd7]">
            <span className="inline-block h-2 w-2 rounded-full bg-[#ecad0a]" />
            Live board &bull; Local only
          </span>
        </div>
      </header>
      <section className="flex-1 px-4 sm:px-6 md:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <DndBoardProvider onMoveCard={handleMoveCard}>
            <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-950/90 shadow-[0_18px_45px_rgba(0,0,0,0.75)] overflow-hidden">
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-800/70 bg-slate-950/60 backdrop-blur">
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                  Flow
                </span>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="h-px w-6 bg-[#ecad0a]" />
                  Drag cards to move work forward
                </div>
              </div>
              <div className="p-3 sm:p-4 md:p-6 overflow-x-auto">
                <div className="board-columns">
                  {board.columns.map((column) => (
                    <KanbanColumn
                      key={column.id}
                      column={column}
                      onAddCard={handleAddCard}
                      onDeleteCard={handleDeleteCard}
                      onUpdateCard={handleUpdateCard}
                      onRenameColumn={handleRenameColumn}
                    />
                  ))}
                </div>
              </div>
            </div>
          </DndBoardProvider>
        </div>
      </section>
    </main>
  );
}

