import React, { ReactNode, useRef } from 'react';
import { Subject } from 'rxjs';
import ObserverFc from '../components/ObserverFc';
import { useRerender } from './useRerender';

export class ItemStore<T = any> {
    value: T;
    subject: Subject<null> = new Subject<null>();
    constructor(defaultValue: T) {
        this.value = defaultValue;
        this.subject = new Subject<null>();
    }
    update = (value: T) => {
        this.value = value;
        this.subject.next(null);
    };
}

interface ReactiveListState<T = any> {
    getValues: () => T[];
    setValues: (dispatch: T[] | ((pred: T[]) => T[])) => void;
    addItem: (item: T) => void;
    updateItem: (item: T, index: number) => void;
    removeItem: (index: number) => void;
    render: (
        itemRender: (value: T, index: number) => React.ReactNode
    ) => JSX.Element[];
}

/**
 * 用rxjs搭配useRef做state management，目的是在update ListItem時不要reRender其他item，節省效能
 * 以此增加使用者在更動list資料時的使用體驗
 */
export const useReactiveListState = <T,>(defaultList: T[]) => {

    const listStore = useRef<ItemStore<T>[]>(initListStore(defaultList));

    const { forceUpdate } = useRerender();

    return {
        getValues: () => listStore.current.map((item) => item.value),
        setValues: (dispatch: T[] | ((pred: T[]) => T[])) => {
            if (Array.isArray(dispatch)) {
                listStore.current = initListStore(dispatch);
            } else {
                let newList = dispatch(listStore.current.map((item) => item.value));
                listStore.current = initListStore(newList);
            }
            forceUpdate();
        },
        addItem: (item: T) => {
            listStore.current.push(new ItemStore(item));
            forceUpdate();
        },
        updateItem: (item: T, index: number) => {
            listStore.current[index].update(item);
        },
        removeItem: (index: number) => {
            listStore.current = listStore.current.filter((item, tempIndex) => tempIndex !== index);
            forceUpdate();
        },
        render: (itemRender: (value: T, index: number) => ReactNode) => {
            return listStore.current.map((store, index) => (
                <ObserverFc key={'Observer' + index} store={store}>
                    {value => itemRender(value, index)}
                </ObserverFc>
            ));
        },
    } as ReactiveListState<T>;
};

/**
 * 當整個list有被初始化或重新設置時，重新產生對應的ListStore
 */
const initListStore = <T,>(list: T[]) => {
    return list.map((item) => new ItemStore(item))
}
