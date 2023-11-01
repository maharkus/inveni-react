import { useState } from 'react'
import { TextInput, View, StyleSheet } from 'react-native'
import { styles } from "../styles/styles";

interface PropsSearch {
    onSearch: (text: string) => void
}

export const SearchBar = ({onSearch} : PropsSearch) => {
    const [input, setInput] = useState('')

    const handleSearch = (text) => {
        setInput(text)
        onSearch(text)
    }

    return (
        <View style={styles.searchBarWrapper}>
            <TextInput
                style={styles.searchBarInput}
                placeholder="Raum XYZ"
                onChangeText={(text) => handleSearch(text)}
                value={input}
                onSubmitEditing={handleSearch}
            />
        </View>
    );
};
