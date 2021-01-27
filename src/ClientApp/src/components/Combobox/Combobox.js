import { useCombobox } from 'downshift';
import { startCase } from 'lodash/string';
import * as React from 'react';
import { Button, Card, CardBody, Input, InputGroup, InputGroupAddon } from 'reactstrap';

const defaultItemToString = (item, titleCaseItem, itemToString) => {
  if (!item) {
    return '';
  }

  if (titleCaseItem) {
    return startCase(itemToString(item).toLowerCase());
  }

  return itemToString(item);
};

const returnItem = (item) => (item ? item : '');

export function SelectedItems({
  items,
  itemToString = returnItem,
  itemToKey = returnItem,
  clickHandler,
  titleCaseItem = true,
}) {
  return (
    <Card className="mb-3 p-3">
      <CardBody className="filter-other__items-container p-0">
        {items.map((item) => (
          <Button
            className="mb-1"
            color="secondary"
            size="sm"
            outline
            id={itemToKey(item)}
            key={itemToKey(item)}
            onClick={clickHandler}
          >
            {defaultItemToString(item, titleCaseItem, itemToString)}
          </Button>
        ))}
      </CardBody>
    </Card>
  );
}

export function Dropdown({
  items,
  isEmpty,
  currentSelectedItems,
  titleCaseItem = true,
  itemToString = returnItem,
  itemToKey = returnItem,
  onSelectItem,
}) {
  const [inputItems, setInputItems] = React.useState(items);

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    selectItem,
    selectedItem,
  } = useCombobox({
    items: inputItems,
    itemToString: itemToString,
    defaultHighlightedIndex: 0,
    onInputValueChange: ({ inputValue }) => {
      if (inputValue === null) {
        return items;
      }

      const filteredItems = items.filter((item) =>
        itemToString(item).toLowerCase().startsWith(inputValue.toLowerCase())
      );

      if (isEmpty) {
        return setInputItems(filteredItems);
      }

      const difference = filteredItems.filter((filterItem) => {
        return !currentSelectedItems.some((someItem) => itemToKey(someItem) === itemToKey(filterItem));
      });

      setInputItems(difference);
    },
  });

  return (
    <div {...getComboboxProps()}>
      <InputGroup>
        <Input
          {...getInputProps({
            onKeyDown: (event) => {
              switch (event.key) {
                case 'Enter': {
                  if (selectedItem) {
                    onSelectItem(selectedItem);
                    selectItem(null);
                  }
                  break;
                }
                default:
                  break;
              }
            },
          })}
        />
        <InputGroupAddon addonType="append">
          <Button
            onClick={() => {
              if (selectedItem) {
                onSelectItem(selectedItem);
                selectItem(null);
              }
            }}
          >
            Add
          </Button>
        </InputGroupAddon>
      </InputGroup>

      <div
        className="downshift__match-dropdown"
        {...getMenuProps({
          onClick: () => {
            const selectedItem = inputItems[highlightedIndex];
            onSelectItem(selectedItem);
            selectItem(null);
          },
        })}
      >
        <ul className="downshift__matches">
          {isOpen &&
            inputItems.map((item, index) => (
              <li
                {...getItemProps({
                  item,
                  index,
                  key: itemToKey(item),
                  className:
                    'downshift__match-item' + (highlightedIndex === index ? ' downshift__match-item--selected' : ''),
                })}
              >
                {defaultItemToString(item, titleCaseItem, itemToString)}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
