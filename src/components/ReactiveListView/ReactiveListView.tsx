import React from 'react';
import styled from 'styled-components';
import { useReactiveListState } from '../../hook/useReactiveListState';
import { useUpdateEffect } from '../../hook/useUpdateEffect';
import { BuyItem } from '../../model/buyItem.model';
import { getDefaultBuyList } from '../../util/getDefaultBuyList';
import ListItem from '../ListItem';

interface ReactiveListViewProps {
    extraItemNum: number;
}

const ReactiveListView: React.FC<ReactiveListViewProps> = (props) => {

    const reactiveList = useReactiveListState<BuyItem>(getDefaultBuyList());

    useUpdateEffect(() => {
        reactiveList.setValues(getDefaultBuyList(props.extraItemNum));
    }, [props.extraItemNum])

    return (
        <Root>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h3 style={{ color: 'deeppink' }}>My Buy List</h3>
                <h3>(Reactive)</h3>
                <AddButton
                    onClick={() => reactiveList.addItem({ title: 'newItem', price: '' })}
                >
                    +
                </AddButton>
            </div>
            <div
                style={{ display: 'flex', alignItems: 'center', padding: '3px 10px' }}
            >
                <div style={{ width: '80px' }}>Item</div>
                <div style={{ flex: 1 }} />
                <div style={{ width: '85px' }}>Price</div>
            </div>
            <hr />
            {reactiveList.render((item, index) => (
                <ListItem
                    {...item}
                    onTitleChange={(title) =>
                        reactiveList.updateItem({ ...item, title }, index)
                    }
                    onPriceChange={(price) =>
                        reactiveList.updateItem({ ...item, price }, index)
                    }
                    onRemove={() => reactiveList.removeItem(index)}
                />
            ))}
        </Root>
    );
};

export default ReactiveListView;

const Root = styled.div`
    padding: 20px;
    margin: 20px;
    padding-top: 5px;
    box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
    border-radius: 10px;
    background: white;
`;

const AddButton = styled.h3`
    padding: 5px;
    cursor: pointer;
    margin-left: auto;
    transition-duration: 0.1s;
    &:hover {
        background: rgba(0,0,0,0.1);
    }
`;
