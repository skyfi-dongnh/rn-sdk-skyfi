
import { FC, MutableRefObject, useRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

type InputNumberProps = {
    number: number;
    onChange: (value: string) => void;
    width?: number;
    format?: string;
    onComplete?: (value: string) => void;
}

const InputNumber: FC<InputNumberProps> = ({ number = 7, onChange, width, format = '*', onComplete }) => {
    const [indexFocused, setIndexFocused] = useState<number>(-1);
    const [valueInput, setValueInput] = useState<string[]>(Array(number).fill(format));
    let listINumber: MutableRefObject<TextInput>[] = [];
    Array.from({ length: number }).forEach((_, index) => {
        listINumber[index] = useRef<TextInput>(null);
    });


    const handleChange = (text: string, index: number) => {
        let indexCurrent = 0;
        if (text == "" && index > 0) {
            indexCurrent = index - 1;
            listINumber[indexCurrent].current?.focus();
            setIndexFocused(indexCurrent);
        }
        if (text && index < number - 1) {
            indexCurrent = index + 1;
            listINumber[indexCurrent].current?.focus();
            setIndexFocused(indexCurrent);
        }
        if (index === number - 1 && text) {
            // last input
            let valueFinal = valueInput.map((item, idx) => {
                if (idx === index) {
                    return text;
                }
                return item;
            });
            onComplete && onComplete(valueFinal.map((item) => (item === '' ? format : item)).join(''));
        }
        onChangeInput(text, index);

    }

    const onChangeInput = (text: string, index: number) => {
        setValueInput((prev) => {
            const newValue = [...prev];

            newValue[index] = text;

            onChange(newValue.map((item) => (item === '' ? format : item)).join(''));
            return newValue;
        });

    }

    const handleKeyPress = (key: string, index: number) => {
        if (key === 'Backspace' && index > 0) {
            let indexCurrent = index - 1;
            listINumber[indexCurrent].current?.focus();
            setIndexFocused(indexCurrent);
        }
    }
    const handleFocus = (index: number) => {
        setIndexFocused(index);
    }

    return (
        <View style={styles.container}>
            {Array.from({ length: number }).map((_, index) => (
                <TextInput
                    key={index}
                    ref={listINumber[index]}
                    style={[styles.input, indexFocused === index && { borderColor: '#007AFF', borderWidth: 2, }, { width: width || 40, height: width ? width * 1.2 : 48 }]}
                    keyboardType="number-pad"
                    maxLength={1}
                    onChange={(data) => {
                        handleChange(data.nativeEvent.text, index);
                    }}
                    onKeyPress={(key) => {
                        handleKeyPress(key.nativeEvent.key, index);
                    }}
                    onFocus={() => handleFocus(index)}

                />
            ))}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 8,
        textAlign: 'center',
        fontSize: 16,
        color: '#000',
    },
});

export default InputNumber;