import { useState, useCallback } from 'react';

export const useRerender = () => {
    const [, setTick] = useState<number>(0);

    const forceUpdate = useCallback(() => {
        setTick((pred) => pred + 1);
    }, []);

    return { forceUpdate };
};
