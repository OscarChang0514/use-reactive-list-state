import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

/**
 * 用途與useEffect相同，只差在元件初始化時不會執行
 */
export function useUpdateEffect(effect: EffectCallback, deps?: DependencyList): void {

    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            effect();
        }
    }, deps);
}