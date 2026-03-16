import { dummyBoard } from '@/data/dummyBoard';
import { moveCard } from './boardState';

describe('moveCard', () => {
  it('moves a card between columns', () => {
    const source = dummyBoard;
    const result = moveCard(source, 'c3', 'in_progress', 'done');

    const inProgress = result.columns.find((c) => c.id === 'in_progress');
    const done = result.columns.find((c) => c.id === 'done');

    expect(inProgress?.cards.some((c) => c.id === 'c3')).toBe(false);
    expect(done?.cards.some((c) => c.id === 'c3')).toBe(true);
  });
});

