import React from 'react'
import Downshift from 'downshift'

export default class MultiDownshift extends React.Component {
    stateReducer = (state, changes) => {
        console.log(`reducing ${changes.type}`);

        switch (changes.type) {
            case '__autocomplete_tab_selection__': {
                return {
                    ...changes,
                    highlightedIndex: 0
                };
            }
            case Downshift.stateChangeTypes.clickItem:
            case Downshift.stateChangeTypes.keyDownEnter: {
                return {
                    ...changes,
                    highlightedIndex: state.highlightedIndex,
                    isOpen: true,
                    inputValue: ''
                };
            }
            default:
                return changes;
        }
    }

    handleSelection = (selectedItem, downshift) => {
        console.log(`MultiDownshift:handleSelection ${selectedItem.name}`);

        const callOnChange = () => {
            console.log(`MultiDownshift:handleSelection::callOnChange ${selectedItem.name}`);

            const { onSelect, onChange } = this.props;
            const { selectedItems } = this.props;
            if (onSelect) {
                onSelect(selectedItems, this.getStateAndHelpers(downshift));
            }
            if (onChange) {
                onChange(selectedItems, this.getStateAndHelpers(downshift));
            }
        }

        if (Array.isArray(selectedItem)) {
            this.props.update({
                type: this.props.type,
                meta: this.props.field,
                payload: selectedItem
            });

            return;
        }

        if (this.props.selectedItems.includes(selectedItem)) {
            this.removeItem(selectedItem, callOnChange);
        } else {
            this.addSelectedItem(selectedItem, callOnChange);
        }
    }

    removeItem(item) {
        console.log(`MultiDownshift:removeItem`);

        const newItems = this.props.selectedItems.filter(i => i !== item);

        this.props.update({
            type: this.props.type,
            meta: this.props.field,
            payload: newItems
        });
    }

    addSelectedItem(item) {
        console.log(`MultiDownshift:addSelectedItem ${item.name}`);

        const newItems = [...this.props.selectedItems, item];

        this.props.update({
            type: this.props.type,
            meta: this.props.field,
            payload: newItems
        });
    }

    getRemoveButtonProps = ({ onClick, item, ...props } = {}) => {
        return {
            onClick: e => {
                onClick && onClick(e);
                e.stopPropagation();
                this.removeItem(item);
            },
            ...props,
        }
    }

    getStateAndHelpers(downshift) {
        console.log(`MultiDownshift:getStateAndHelpers`);

        const { getRemoveButtonProps } = this;

        return {
            getRemoveButtonProps,
            ...downshift,
        }
    }

    render() {
        console.log(`MultiDownshift:render`);

        const { render, children = render, ...props } = this.props
        // TODO: compose together props (rather than overwriting them) like downshift does
        return (
            <Downshift
                {...props}
                stateReducer={this.stateReducer}
                onChange={this.handleSelection}
                selectedItem={null}>
                {downshift => children(this.getStateAndHelpers(downshift))}
            </Downshift>
        )
    }
}
