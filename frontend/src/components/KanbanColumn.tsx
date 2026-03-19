import type { KanbanCard as KanbanCardType, KanbanColumn as KanbanColumnType, ColumnId } from '@/types/kanban';
import { useEffect, useState } from 'react';
import { KanbanCard } from './KanbanCard';
import { DroppableColumn } from './dnd/DroppableColumn';

interface KanbanColumnProps {
  column: KanbanColumnType;
  onAddCard: (columnId: ColumnId, title: string, details: string) => void;
  onDeleteCard: (columnId: ColumnId, cardId: string) => void;
  onUpdateCard: (columnId: ColumnId, cardId: string, updates: Partial<KanbanCardType>) => void;
  onRenameColumn: (columnId: ColumnId, name: string) => void;
}

export function KanbanColumn({
  column,
  onAddCard,
  onDeleteCard,
  onUpdateCard,
  onRenameColumn
}: KanbanColumnProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState(column.name);
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');

  // Keep the draft name in sync with the actual column name whenever it changes,
  // so re-entering edit mode always starts from the current value.
  useEffect(() => {
    if (!isEditingName) {
      setNameDraft(column.name);
    }
  }, [column.name, isEditingName]);

  const commitName = () => {
    const trimmed = nameDraft.trim();
    if (trimmed && trimmed !== column.name) {
      onRenameColumn(column.id, trimmed);
    }
    setIsEditingName(false);
  };

  const handleAdd = () => {
    const trimmedTitle = title.trim();
    const trimmedDetails = details.trim();
    if (!trimmedTitle || !trimmedDetails) return;
    onAddCard(column.id, trimmedTitle, trimmedDetails);
    setTitle('');
    setDetails('');
    setIsAdding(false);
  };

  return (
    <DroppableColumn columnId={column.id}>
      <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800/70">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 border border-slate-700 text-[10px] font-semibold text-slate-300">
          {column.cards.length}
        </span>
        {isEditingName ? (
          <input
            autoFocus
            value={nameDraft}
            onChange={(e) => setNameDraft(e.target.value)}
            onBlur={commitName}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commitName();
              if (e.key === 'Escape') {
                setNameDraft(column.name);
                setIsEditingName(false);
              }
            }}
            className="flex-1 bg-transparent border-none outline-none text-base font-bold text-slate-50"
          />
        ) : (
          <button
            type="button"
            className="flex-1 text-left text-base font-bold text-slate-50 hover:text-[#ecad0a] transition-colors"
            onClick={() => {
              setNameDraft(column.name);
              setIsEditingName(true);
            }}
          >
            {column.name}
          </button>
        )}
      </div>
      <div className="flex-1 flex flex-col gap-2 px-3 pt-3 pb-3">
        <div className="flex-1 flex flex-col gap-2 overflow-y-auto pr-1">
          {column.cards.map((card, index) => (
            <KanbanCard
              key={card.id}
              card={card}
              columnId={column.id}
              index={index}
              onDeleteCard={onDeleteCard}
              onUpdateCard={onUpdateCard}
            />
          ))}
          {column.cards.length === 0 && (
            <div className="text-xs text-slate-500 border border-dashed border-slate-700 rounded-xl px-3 py-4 text-center">
              Drop work here to get this stage moving.
            </div>
          )}
        </div>
        {isAdding ? (
          <div className="mt-1 rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-3 flex flex-col gap-2">
            <input
              placeholder="Card title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-[#209dd7]"
            />
            <textarea
              placeholder="Details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={3}
              className="w-full resize-none rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-[#209dd7]"
            />
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                className="text-[11px] text-slate-400 hover:text-slate-200"
                onClick={() => {
                  setIsAdding(false);
                  setTitle('');
                  setDetails('');
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="inline-flex items-center rounded-full bg-[#753991] px-3 py-1 text-[11px] font-medium text-white shadow-[0_6px_18px_rgba(117,57,145,0.6)] hover:bg-[#8a46ab] transition-colors"
                onClick={handleAdd}
              >
                Add card
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="mt-1 inline-flex items-center justify-center gap-1 rounded-full border border-dashed border-slate-700 px-3 py-1.5 text-[11px] font-medium text-slate-300 hover:border-[#ecad0a] hover:text-[#ecad0a] hover:bg-slate-900/70 transition-colors"
            onClick={() => setIsAdding(true)}
          >
            <span className="text-xs leading-none">+</span>
            New card
          </button>
        )}
      </div>
    </DroppableColumn>
  );
}

