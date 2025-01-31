import { useRecoilCallback } from 'recoil';

import { useResetTableRowSelection } from '@/ui/data/data-table/hooks/useResetTableRowSelection';
import { isFetchingDataTableDataState } from '@/ui/data/data-table/states/isFetchingDataTableDataState';
import { numberOfTableRowsState } from '@/ui/data/data-table/states/numberOfTableRowsState';
import { TableRecoilScopeContext } from '@/ui/data/data-table/states/recoil-scope-contexts/TableRecoilScopeContext';
import { tableRowIdsState } from '@/ui/data/data-table/states/tableRowIdsState';
import { entityFieldsFamilyState } from '@/ui/data/field/states/entityFieldsFamilyState';
import { availableFiltersScopedState } from '@/ui/data/view-bar/states/availableFiltersScopedState';
import { availableSortsScopedState } from '@/ui/data/view-bar/states/availableSortsScopedState';
import { entityCountInCurrentViewState } from '@/ui/data/view-bar/states/entityCountInCurrentViewState';
import { useRecoilScopeId } from '@/ui/utilities/recoil-scope/hooks/useRecoilScopeId';

export const useSetObjectDataTableData = () => {
  const resetTableRowSelection = useResetTableRowSelection();

  const tableContextScopeId = useRecoilScopeId(TableRecoilScopeContext);

  return useRecoilCallback(
    ({ set, snapshot }) =>
      <T extends { id: string }>(newEntityArray: T[]) => {
        for (const entity of newEntityArray) {
          const currentEntity = snapshot
            .getLoadable(entityFieldsFamilyState(entity.id))
            .valueOrThrow();

          if (JSON.stringify(currentEntity) !== JSON.stringify(entity)) {
            set(entityFieldsFamilyState(entity.id), entity);
          }
        }

        const entityIds = newEntityArray.map((entity) => entity.id);

        set(tableRowIdsState, (currentRowIds) => {
          if (JSON.stringify(currentRowIds) !== JSON.stringify(entityIds)) {
            return entityIds;
          }

          return currentRowIds;
        });

        resetTableRowSelection();

        set(numberOfTableRowsState, entityIds.length);

        set(entityCountInCurrentViewState, entityIds.length);

        set(availableFiltersScopedState(tableContextScopeId), []);

        set(availableSortsScopedState(tableContextScopeId), []);

        set(isFetchingDataTableDataState, false);
      },
    [resetTableRowSelection, tableContextScopeId],
  );
};
