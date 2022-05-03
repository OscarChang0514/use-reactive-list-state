import React, { useState } from 'react';
import styled from 'styled-components';
import { BuyItem } from '../../model/buyItem.model';

interface ListItemProps extends BuyItem {
    onTitleChange?: (title: string) => void;
    onPriceChange?: (price: string) => void;
    onRemove?: () => void;
}

const ListItem: React.FC<ListItemProps> = (props) => {

    const [isEdit, setIsEdit] = useState<boolean>(false);

    return (
        <Root>
            {isEdit ?
                <input
                    style={{ maxWidth: '80px' }}
                    value={props.title}
                    autoFocus
                    onBlur={() => setIsEdit(false)}
                    onChange={(e) => props.onTitleChange(e?.target?.value)}
                />
                :
                <span
                    style={{ width: '80px', cursor: 'pointer' }}
                    onClick={() => setIsEdit(true)}
                >
                    {props.title}
                </span>
            }
            <div style={{ flex: 1 }}></div>
            <input
                style={{ maxWidth: '80px' }}
                value={props.price}
                placeholder={'ChangeMe!!'}
                type={'number'}
                onChange={(e) => props.onPriceChange(e?.target?.value)}
            />
            <RemoveButton onClick={props.onRemove}>x</RemoveButton>
        </Root>
    );
};

export default ListItem;

const Root = styled.div`
  display: flex;
  align-items: center;
  width: 250px; 
  padding: 3px 10px;
  transition-duration: 0.1s;
  &:hover {
    background: rgba(0,0,0,0.1);
  }
`;

const RemoveButton = styled.div`
  width: 20px;
  height: 20px;
  text-align: center;
  margin-left: 5px;
  cursor: pointer;
`;
