import { TypedUseSelectorHook, useSelector } from "react-redux"
import { RootState } from "../../../app/stores"

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector