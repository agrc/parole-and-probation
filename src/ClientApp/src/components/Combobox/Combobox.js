import { useCombobox } from 'downshift';
import { capitalize } from 'lodash/string';
import * as React from 'react';
import { Button, Card, CardBody, Input, InputGroup, InputGroupAddon } from 'reactstrap';

const defaultItemToString = (item, titleCaseItem, itemToString) => {
  if (!item) {
    return '';
  }

  if (titleCaseItem) {
    // startCase removed symbols like commas...
    return itemToString(item).toLowerCase().replace(/\w+/g, capitalize);
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

export function MultiSelect({
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
      const matchesWithInput = itemToString(item).toLowerCase().includes(inputValue.toLowerCase());

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

export function InputTypeAhead({
  featureSet,
  currentValue,
  titleCaseItem = true,
  itemToString = returnItem,
  itemToSortValue = returnItem,
  itemToKey = returnItem,
  reducerDescriptor,
  dispatch,
}) {
  const [inputValue, setInputValue] = React.useState(currentValue);
  const [sortedItems, setSortedItems] = React.useState(featureSet?.features);

  const onSelectItem = (item) => {
    dispatch({
      type: reducerDescriptor.type,
      meta: reducerDescriptor.field,
      payload: itemToString(item),
    });
  };

  const getFilteredItems = (inputItems) => {
    const items = [];
    const uniques = new Set();

    if (inputValue.trim().length === 0 || !inputItems) {
      return items;
    }

    for (let i = 0; i < inputItems.length; i++) {
      const item = inputItems[i];
      const value = itemToString(item);

      if (value.toLowerCase().includes(inputValue.toLowerCase())) {
        if (!uniques.has(value)) {
          items.push(item);
        }
        uniques.add(value);
      }

      if (items.length === 15) {
        return items;
      }
    }

    return items;
  };

  const sortFunction = React.useCallback(
    (itemA, itemB) => {
      const a = itemToSortValue(itemA);
      const b = itemToSortValue(itemB);

      if (a > b) {
        return 1;
      } else if (a < b) {
        return -1;
      }

      return 0;
    },
    [itemToSortValue]
  );

  React.useEffect(() => {
    setSortedItems(featureSet?.features?.sort(sortFunction));
  }, [featureSet, sortFunction]);

  React.useEffect(() => {
    if (currentValue) {
      return;
    }

    setInputValue(currentValue);
  }, [currentValue]);

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    selectItem,
  } = useCombobox({
    inputValue,
    items: getFilteredItems(sortedItems),
    itemToString: itemToString,
    defaultHighlightedIndex: 0,
    onStateChange: ({ inputValue: newInputValue, type, selectedItem }) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(newInputValue);
          if (newInputValue.trim().length === 0) {
            onSelectItem(null);
            selectItem(null);
          }

          break;
        case useCombobox.stateChangeTypes.InputBlur:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
          if (selectedItem) {
            setInputValue(defaultItemToString(selectedItem, titleCaseItem, itemToString));
            onSelectItem(selectedItem);
            selectItem(null);
          }

          break;
        default:
          break;
      }
    },
  });

  return (
    <div {...getComboboxProps()}>
      <Input autoComplete="none" {...getInputProps()} />

      <div className="downshift__match-dropdown" {...getMenuProps()}>
        <ul className="downshift__matches">
          {isOpen &&
            getFilteredItems(sortedItems).map((item, index) => (
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
