export type ColumnId = 'backlog' | 'in_progress' | 'review' | 'blocked' | 'done';

export interface KanbanCard {
  id: string;
  title: string;
  details: string;
}

export interface KanbanColumn {
  id: ColumnId;
  name: string;
  cards: KanbanCard[];
}

export interface KanbanBoard {
  id: string;
  name: string;
  columns: KanbanColumn[];
}

