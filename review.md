# Code Review - Kanban MVP

## Summary

Reviewed the Kanban Board MVP (Next.js 15 + TypeScript + dnd-kit). Found 6 issues, all fixed.

## Bugs Found & Fixed

### 1. Missing `ts-jest` dependency (Critical)
- **File**: `package.json`
- **Issue**: `jest.config.mts` referenced `ts-jest` but it was not installed
- **Fix**: Installed `ts-jest` as devDependency

### 2. Jest config issues (Critical)
- **File**: `jest.config.mts` -> `jest.config.cjs`
- **Issues**:
  - Wrong option key: `setupFilesAfterSetup` instead of `setupFilesAfterEnv`
  - testMatch pattern failed to match files
  - `jsx: "preserve"` in tsconfig broke JSX transform
- **Fix**: Rewrote config with correct settings and inline tsconfig override `{ jsx: 'react-jsx' }`

### 3. Duplicated `moveCard` logic (Code Quality)
- **File**: `src/components/Board.tsx`
- **Issue**: `handleMoveCard` reimplemented the same logic that exists in `src/lib/boardState.ts`
- **Fix**: Replaced inline logic with call to imported `moveCard` utility

### 4. DnD index bug (Bug)
- **File**: `src/components/dnd/DndBoardProvider.tsx`
- **Issue**: Passing source index as target index caused cards to land in wrong positions
- **Fix**: Removed index parameter, cards now append to end of target column

### 5. Unused props (Code Quality)
- **Files**: `src/components/KanbanColumn.tsx`, `src/components/KanbanCard.tsx`
- **Issue**: `onMoveCard` prop passed but never used
- **Fix**: Removed from interface and JSX

### 6. Inconsistent indentation (Minor)
- **File**: `src/components/KanbanColumn.tsx`
- **Issue**: Extra leading space on `onUpdateCard` parameter
- **Fix**: Normalized indentation

## Verification Results

```
npm run lint     -- Pass
npm test        -- Pass (3 tests)
npm run build   -- Pass
```

## Remaining Considerations

- **Test coverage**: Only 3 tests (1 unit + 2 component). No tests for add/delete/edit/rename operations
- **DnD positioning**: Cards always append to end of column (acceptable for MVP, could be enhanced with SortableContext for precise positioning)
