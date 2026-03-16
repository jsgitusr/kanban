import type { ReactNode } from 'react';
import { useDraggable } from '@dnd-kit/core';
import type { ColumnId } from '@/types/kanban';

interface DraggableCardProps {
  id: string;
  columnId: ColumnId;
  index: number;
  children: ReactNode;
}

export function DraggableCard({ id, columnId, index, children }: DraggableCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    data: {
      columnId,
      index
    }
  });

  const style: React.CSSProperties = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    opacity: isDragging ? 0.9 : 1,
    zIndex: isDragging ? 20 : 'auto'
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
}

