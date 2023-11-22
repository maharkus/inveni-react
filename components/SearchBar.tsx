import { useCallback, useEffect, useRef, useState } from 'react'
import { TextInput, View } from 'react-native'
import { customColors, styles } from "../styles/styles";
import ICMagnifier from "../assets/icons/ic_magnifier.svg";

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

    //toggle searchbar focus
    useEffect(() => {
        if (shouldFocus) {
            inputRef.current?.focus();
        } else {
            inputRef.current?.blur();
        }
    }, [shouldFocus]);

    useEffect(() => {
        setInput("")
    }, [inputClear]);

    //search debouce for better usability
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

    const debouncedSearch = useCallback(debounce((text) => {
        onSearch(text)
        setLastSearch(text);
    }, 100), [onSearch])

    //searchbar functionality
    const handleSearch = (text: string) => {
        setInput(text)
        if (text !== lastSearch) {
            onSearch(text)
            debouncedSearch(text)
        }
    }

    return (
        <View style={styles.searchBarWrapper}>
            <ICMagnifier width={25} height={25} style={{position: "absolute", top: "50%", marginTop: -13, marginLeft: 40, zIndex: 10}}/>
            <TextInput
                style={[styles.searchBarInput, isFocused ? { backgroundColor: customColors.softPurple } : {}, {paddingLeft: 65}]}
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
