import { useCallback, useEffect, useRef, useState } from 'react'
import { Keyboard, TextInput, View } from 'react-native'
import { customColors, styles } from "../styles/styles";

interface PropsSearch {
    onSearch: (text: string) => void,
    shouldFocus: boolean,
    inputClear: boolean
}

export const SearchBar = ({ onSearch, shouldFocus, inputClear }: PropsSearch) => {
    const [input, setInput] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const [lastSearch, setLastSearch] = useState('');
    const inputRef = useRef<TextInput>(null);

    useEffect(() => {
        if (shouldFocus && inputRef.current) {
            inputRef.current.focus();
        }
        if (!shouldFocus) {
            Keyboard.dismiss();
        }
    }, [shouldFocus]);

    useEffect(() => {
            console.log("here")
            setInput("")
    }, [inputClear]);

    //search debouce
    const debounce = (func, wait) => {
        let timer
        return function executedFunction(...args) {
            const pause = () => {
                clearTimeout(timer)
                func(...args)
            }
            clearTimeout(timer)
            timer = setTimeout(pause, wait)
        }
    }

    const handleSearch = (text: string) => {
        setInput(text)
        if (text !== lastSearch) {
            onSearch(text)
            debouncedSearch(text)
        }
    }

    const debouncedSearch = useCallback(debounce((text) => {
        onSearch(text)
        setLastSearch(text);
    }, 100), [onSearch])


    return (
        <View style={styles.searchBarWrapper}>
            <TextInput
                style={[
                    styles.searchBarInput, isFocused ? { backgroundColor: customColors.grey } : {}
                ]}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                ref={inputRef}
                placeholder="Find Room"
                onChangeText={handleSearch}
                value={input}
                onSubmitEditing={() => {
                    if (input.trim() !== lastSearch.trim()) {
                        debouncedSearch(input);
                    }
                }}
                returnKeyType="search"
            />
        </View>
    );
};
