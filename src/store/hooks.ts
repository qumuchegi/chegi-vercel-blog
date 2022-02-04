import { useCallback, useMemo } from "react"
import { useStore } from "."

export const useBottomSheet = () => {
  const [setBottomSheetChildren, closeBottomSheet] = useStore(state => [
    state.uiState.actions.setBottomSheetChildren, 
    state.uiState.actions.closeBottomSheet
  ])
  const open = useCallback((child?: JSX.Element, header?: JSX.Element) => {
    setBottomSheetChildren(child, header)
  }, [setBottomSheetChildren])
  const close = useCallback(() => {
    closeBottomSheet()
  }, [closeBottomSheet])
  return useMemo(() => ({
    open,
    close
  }), [open, close])
}