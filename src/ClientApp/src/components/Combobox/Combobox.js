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
  currentSelectedItems,
  titleCaseItem = true,
  itemToString = returnItem,
  itemToKey = returnItem,
  onSelectItem,
}) {
  const [inputValue, setInputValue] = React.useState('');
  const getFilteredItems = (filterItems) => {
    return filterItems.filter((item) => {
      const matchesWithInput = itemToString(item).toLowerCase().startsWith(inputValue.toLowerCase());

      if (!currentSelectedItems || !Array.isArray(currentSelectedItems)) {
        return matchesWithInput;
      }

      return matchesWithInput && !currentSelectedItems.some((someItem) => itemToKey(someItem) === itemToKey(item));
    });
  };

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
    inputValue,
    items: getFilteredItems(items),
    itemToString: itemToString,
    defaultHighlightedIndex: 0,
    onStateChange: ({ inputValue, type, selectedItem }) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(inputValue);
          break;
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          if (selectedItem) {
            setInputValue(defaultItemToString(selectedItem, titleCaseItem, itemToString));
          }

          break;
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
          if (selectedItem) {
            setInputValue('');
            onSelectItem(selectedItem);
            selectItem(null);
          }

          break;
        default:
          break;
      }
    },
  });

  const addItem = () => {
    if (selectedItem) {
      setInputValue('');
      onSelectItem(selectedItem);
      selectItem(null);
    }
  };

  return (
    <div {...getComboboxProps()}>
      <InputGroup>
        <Input
          {...getInputProps({
            onKeyUp: (event) => {
              if (event.key === 'Enter') {
                addItem();
              }
            },
          })}
        />
        <InputGroupAddon addonType="append">
          <Button onClick={addItem}>Add</Button>
        </InputGroupAddon>
      </InputGroup>

      <div className="downshift__match-dropdown" {...getMenuProps()}>
        <ul className="downshift__matches">
          {isOpen &&
            getFilteredItems(items).map((item, index) => (
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
