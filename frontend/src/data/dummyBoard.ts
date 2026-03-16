import type { KanbanBoard } from '@/types/kanban';

export const dummyBoard: KanbanBoard = {
  id: 'default-board',
  name: 'Product Delivery',
  columns: [
    {
      id: 'backlog',
      name: 'Backlog',
      cards: [
        {
          id: 'c1',
          title: 'Define MVP scope',
          details: 'Align on the exact features we ship in the first release.'
        },
        {
          id: 'c2',
          title: 'Customer interview notes',
          details: 'Summarize learnings from last 5 customer calls.'
        }
      ]
    },
    {
      id: 'in_progress',
      name: 'In Progress',
      cards: [
        {
          id: 'c3',
          title: 'Design Kanban UI',
          details: 'Iterate on column layout, spacing, and card styling.'
        }
      ]
    },
    {
      id: 'review',
      name: 'Review',
      cards: [
        {
          id: 'c4',
          title: 'Copy review',
          details: 'Tighten up microcopy in empty states and actions.'
        }
      ]
    },
    {
      id: 'blocked',
      name: 'Blocked',
      cards: [
        {
          id: 'c5',
          title: 'Finalize color contrast',
          details: 'Confirm accessibility contrast ratios with design.'
        }
      ]
    },
    {
      id: 'done',
      name: 'Done',
      cards: [
        {
          id: 'c6',
          title: 'Initial project setup',
          details: 'Scaffold Next.js app and testing tools.'
        }
      ]
    }
  ]
};

