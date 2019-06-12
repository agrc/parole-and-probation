import { useState } from 'react';

export default () => {
    const [value, setValue] = useState('');

    return {
        value,
        onChange: changes => {
            console.dir(changes);

            if (!changes) {
                return;
            }

            if (changes.hasOwnProperty('selectedItem')) {
                setValue(changes.selectedItem)
            } else if (changes.hasOwnProperty('inputValue')) {
                setValue(changes.inputValue)
            }

            setValue(changes);
        },
        reset: () => setValue('')
    };
};
