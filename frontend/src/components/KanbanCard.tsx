import type { KanbanCard as KanbanCardType, ColumnId } from '@/types/kanban';
import { useState } from 'react';
import { DraggableCard } from './dnd/DraggableCard';

interface KanbanCardProps {
  card: KanbanCardType;
  columnId: ColumnId;
  index: number;
  onDeleteCard: (columnId: ColumnId, cardId: string) => void;
  onUpdateCard: (columnId: ColumnId, cardId: string, updates: Partial<KanbanCardType>) => void;
}

export function KanbanCard({
  card,
  columnId,
  index,
  onDeleteCard,
  onUpdateCard
}: KanbanCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [titleDraft, setTitleDraft] = useState(card.title);
  const [detailsDraft, setDetailsDraft] = useState(card.details);

  const startEditing = () => {
    setTitleDraft(card.title);
    setDetailsDraft(card.details);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setTitleDraft(card.title);
    setDetailsDraft(card.details);
  };

  const saveEditing = () => {
    const nextTitle = titleDraft.trim();
    const nextDetails = detailsDraft.trim();
    if (!nextTitle || !nextDetails) {
      return;
    }
    onUpdateCard(columnId, card.id, { title: nextTitle, details: nextDetails });
    setIsEditing(false);
  };

  return (
    <DraggableCard id={card.id} columnId={columnId} index={index}>
      <article className="group rounded-xl border border-[#ecad0a] bg-slate-900/90 px-3 py-2.5 shadow-[0_10px_25px_rgba(15,23,42,0.75)] hover:border-[#facc15] hover:shadow-[0_16px_40px_rgba(236,173,10,0.45)] transition-colors transition-shadow cursor-grab active:cursor-grabbing">
        <header className="flex items-start gap-2">
          {isEditing ? (
            <input
              className="flex-1 rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-[#209dd7]"
              value={titleDraft}
              onChange={(e) => setTitleDraft(e.target.value)}
              placeholder="Title"
            />
          ) : (
            <h3 className="flex-1 text-xs font-semibold tracking-tight text-slate-50">
              {card.title}
            </h3>
          )}
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="text-[10px] text-slate-400 hover:text-slate-100"
              onClick={(e) => {
                e.stopPropagation();
                if (isEditing) {
                  saveEditing();
                } else {
                  startEditing();
                }
              }}
            >
              {isEditing ? 'Save' : 'Edit'}
            </button>
            {isEditing && (
              <button
                type="button"
                className="text-[10px] text-slate-500 hover:text-slate-200"
                onClick={(e) => {
                  e.stopPropagation();
                  cancelEditing();
                }}
              >
                Cancel
              </button>
            )}
            <button
              type="button"
              aria-label="Delete card"
              className="text-slate-500 hover:text-[#ecad0a] text-xs"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteCard(columnId, card.id);
              }}
            >
              ×
            </button>
          </div>
        </header>
        {isEditing ? (
          <textarea
            className="mt-2 w-full resize-none rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-[11px] text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-[#209dd7]"
            rows={3}
            value={detailsDraft}
            onChange={(e) => setDetailsDraft(e.target.value)}
            placeholder="Details"
          />
        ) : (
          <p className="mt-1 text-[11px] leading-snug text-[#888888]">{card.details}</p>
        )}
      </article>
    </DraggableCard>
  );
}

