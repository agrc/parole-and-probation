import { Button, Tag, TagGroup, TextField } from '@ugrc/utah-design-system';
import { useCombobox } from 'downshift';
import capitalize from 'lodash.capitalize';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';

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
  label,
  titleCaseItem = true,
}) {
  return (
    <TagGroup
      label={label}
      selectionMode="none"
      onRemove={clickHandler}
      className="flex flex-wrap justify-between my-3 p-3 border rounded-lg bg-white dark:bg-gray-900 dark:border-gray-700"
    >
      {items.map((item) => (
        <Tag className="mb-1" color="primary" id={itemToKey(item)} key={itemToKey(item)} onClick={clickHandler}>
          {defaultItemToString(item, titleCaseItem, itemToString)}
        </Tag>
      ))}
    </TagGroup>
  );
}
SelectedItems.propTypes = {
  items: PropTypes.array.isRequired,
  itemToString: PropTypes.func,
  itemToKey: PropTypes.func,
  clickHandler: PropTypes.func,
  label: PropTypes.string,
  titleCaseItem: PropTypes.bool,
};

export function MultiSelect({
  items,
  currentSelectedItems,
  titleCaseItem = true,
  itemToString = returnItem,
  itemToKey = returnItem,
  onSelectItem,
  label,
}) {
  const [inputValue, setInputValue] = useState('');
  const getFilteredItems = (filterItems) => {
    const items = [];

    if (inputValue?.trim().length === 0 || !filterItems) {
      return items;
    }

    for (let i = 0; i < filterItems.length; i++) {
      const item = filterItems[i];
      const value = itemToString(item);

      const matchesWithInput = value.toLowerCase().includes(inputValue.toLowerCase());

      if (matchesWithInput && !currentSelectedItems?.some((someItem) => itemToKey(someItem) === itemToKey(item))) {
        items.push(item);
      }

      if (items.length === 15) {
        return items;
      }
    }

    return items;
  };

  const { isOpen, getMenuProps, getInputProps, highlightedIndex, getItemProps, selectItem, selectedItem } = useCombobox(
    {
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
    },
  );

  const addItem = () => {
    if (selectedItem) {
      setInputValue('');
      onSelectItem(selectedItem);
      selectItem(null);
    }
  };

  return (
    <div>
      <div className="flex gap-1">
        <TextField
          className="basis-3/4"
          label={label}
          inputProps={{
            ...getInputProps({
              onKeyUp: (event) => {
                if (event.key === 'Enter') {
                  addItem();
                }
              },
            }),
          }}
        />
        <Button variant="secondary" className="basis-1/4 px-3 self-end" onClick={addItem}>
          Add
        </Button>
      </div>
      <div className="downshift__match-dropdown" {...getMenuProps()}>
        <ul className="downshift__matches">
          {isOpen &&
            getFilteredItems(items).map((item, index) => (
              <li
                key={itemToKey(item)}
                {...getItemProps({
                  item,
                  index,
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
MultiSelect.propTypes = {
  items: PropTypes.array.isRequired,
  currentSelectedItems: PropTypes.array,
  titleCaseItem: PropTypes.bool,
  itemToString: PropTypes.func,
  itemToKey: PropTypes.func,
  onSelectItem: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export function InputTypeAhead({
  featureSet,
  currentValue,
  titleCaseItem = true,
  itemToString = returnItem,
  itemToSortValue = returnItem,
  itemToKey = returnItem,
  reducerDescriptor,
  dispatch,
  label,
}) {
  const [inputValue, setInputValue] = useState(currentValue);
  const [sortedItems, setSortedItems] = useState(featureSet?.features);

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

    if (inputValue?.trim().length === 0 || !inputItems) {
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

  const sortFunction = useCallback(
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
    [itemToSortValue],
  );

  useEffect(() => {
    setSortedItems(featureSet?.features?.sort(sortFunction));
  }, [featureSet, sortFunction]);

  useEffect(() => {
    if (currentValue) {
      return;
    }

    setInputValue(currentValue);
  }, [currentValue]);

  const { isOpen, getMenuProps, getInputProps, highlightedIndex, getItemProps, selectItem } = useCombobox({
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
    <div>
      <TextField label={label} autoComplete="none" inputProps={{ ...getInputProps() }} />

      <div className="downshift__match-dropdown" {...getMenuProps()}>
        <ul className="downshift__matches">
          {isOpen &&
            getFilteredItems(sortedItems).map((item, index) => (
              <li
                key={itemToKey(item)}
                {...getItemProps({
                  item,
                  index,
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
InputTypeAhead.propTypes = {
  featureSet: PropTypes.shape({
    features: PropTypes.array,
  }),
  currentValue: PropTypes.string,
  titleCaseItem: PropTypes.bool,
  itemToString: PropTypes.func,
  itemToSortValue: PropTypes.func,
  itemToKey: PropTypes.func,
  reducerDescriptor: PropTypes.shape({
    type: PropTypes.string.isRequired,
    field: PropTypes.string.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};
