import { useEffect, useRef, useState } from 'react'
import { Keyboard, TextInput, View } from 'react-native'
import { styles } from "../styles/styles";

interface PropsSearch {
    onSearch: (text: string) => void,
    shouldFocus: boolean
}

export const SearchBar = ({ onSearch, shouldFocus }: PropsSearch) => {
    const [input, setInput] = useState('')
    const inputRef = useRef(null);

    useEffect(() => {
        if (shouldFocus) {
            inputRef.current.focus();
        }
        if (!shouldFocus) {
            Keyboard.dismiss();
        }
    }, [shouldFocus]);

    const handleSearch = (text) => {
        setInput(text)
        onSearch(text)
    }

    return (
        <View style={styles.searchBarWrapper}>
            <TextInput
                ref={inputRef}
                style={styles.searchBarInput}
                placeholder="Find Room"
                onChangeText={(text) => handleSearch(text)}
                value={input}
                onSubmitEditing={handleSearch}
            />
        </View>
    );
};
