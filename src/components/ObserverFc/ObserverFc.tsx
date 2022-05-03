import { ReactNode, useEffect } from "react";
import { ItemStore } from "../../hook/useReactiveListState";
import { useRerender } from "../../hook/useRerender";

export interface ObserverFcProps<T = any> {
    store: ItemStore<T>;
    children?: ((value: T) => ReactNode);
}

const ObserverFc: React.FC<ObserverFcProps> = (props) => {

    const { store, children } = props;

    const { forceUpdate } = useRerender();

    useEffect(() => {
        store.subject.subscribe(forceUpdate);
    }, [store.subject])

    return (
        <>{children(store.value)}</>
    )
};

export default ObserverFc;