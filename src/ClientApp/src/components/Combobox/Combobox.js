import { useCombobox } from 'downshift';
import { startCase } from 'lodash/string';
import * as React from 'react';
import { Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';

export default function Dropdown({ items, isEmpty, alreadySelected, itemPropName, onSelectItem }) {
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
    defaultHighlightedIndex: 0,
    itemToString: (item) => (item ? startCase(item.value.toLowerCase()) : ''),
    onInputValueChange: ({ inputValue }) => {
      const filteredItems = items.filter((item) => item.value.toLowerCase().startsWith(inputValue.toLowerCase()));

      if (isEmpty) {
        return setInputItems(filteredItems);
      }

      const difference = filteredItems.filter((x) => !alreadySelected.includes(x[itemPropName]));

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
                  key: item.id,
                  className:
                    'downshift__match-item' + (highlightedIndex === index ? ' downshift__match-item--selected' : ''),
                })}
              >
                {startCase(item.value.toLowerCase())}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
