import type { KanbanBoard, ColumnId } from '@/types/kanban';

export function moveCard(
  board: KanbanBoard,
  cardId: string,
  from: ColumnId,
  to: ColumnId,
  index?: number
): KanbanBoard {
  const next: KanbanBoard = {
    ...board,
    columns: board.columns.map((col) => ({ ...col, cards: [...col.cards] }))
  };

  const fromColumn = next.columns.find((c) => c.id === from);
  const toColumn = next.columns.find((c) => c.id === to);

  if (!fromColumn || !toColumn) return board;

  const fromIndex = fromColumn.cards.findIndex((c) => c.id === cardId);
  if (fromIndex === -1) return board;

  const [card] = fromColumn.cards.splice(fromIndex, 1);

  if (index === undefined || index < 0 || index > toColumn.cards.length) {
    toColumn.cards.push(card);
  } else {
    toColumn.cards.splice(index, 0, card);
  }

  return next;
}

