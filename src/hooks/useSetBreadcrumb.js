import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumb } from "src/redux/slices/settings";

export function useSetBreadcrumb(breadcrumb) {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(setBreadcrumb(breadcrumb))
    }, [breadcrumb]);
}