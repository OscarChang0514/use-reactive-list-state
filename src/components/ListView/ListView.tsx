import React, { useState } from 'react';
import styled from 'styled-components';
import { useUpdateEffect } from '../../hook/useUpdateEffect';
import { BuyItem } from '../../model/buyItem.model';
import { getDefaultBuyList } from '../../util/getDefaultBuyList';
import ListItem from '../ListItem';

interface ListViewProps {
    extraItemNum: number;
}

const ListView: React.FC<ListViewProps> = (props) => {

    const [list, setList] = useState<BuyItem[]>(getDefaultBuyList());

    useUpdateEffect(() => {
        setList(getDefaultBuyList(props.extraItemNum));
    }, [props.extraItemNum])

    return (
        <Root>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h3 style={{ color: 'deeppink' }}>My Buy List</h3>
                <AddButton
                    onClick={() =>
                        setList((pred) => [...pred, { title: 'newItem', price: '' }])
                    }
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
            {list.map((item, index) => (
                <ListItem
                    key={'normalList' + index}
                    {...item}
                    onTitleChange={(title) => {
                        setList((pred) =>
                            pred.map((item, tempIndex) =>
                                tempIndex === index ? { ...item, title } : item
                            )
                        );
                    }}
                    onPriceChange={(price) => {
                        setList((pred) =>
                            pred.map((item, tempIndex) =>
                                tempIndex === index ? { ...item, price } : item
                            )
                        );
                    }}
                    onRemove={() =>
                        setList((pred) =>
                            pred.filter((item, tempIndex) => tempIndex !== index)
                        )
                    }
                />
            ))}
        </Root>
    );
};

export default ListView;

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
