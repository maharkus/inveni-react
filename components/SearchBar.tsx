import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { TextInput, View } from 'react-native'
import { styles } from "../styles/styles";

interface PropsSearch {
    onSearch: (text: string) => void
}

export const SearchBar = forwardRef(({ onSearch }: PropsSearch, ref) => {
    const inputRef = useRef<TextInput>(null)

    useImperativeHandle(ref, () => ({
        focus: () => {
          inputRef.current?.focus();
        },
    }));
    
    const [input, setInput] = useState('')

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
});
