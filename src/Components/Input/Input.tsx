import React, { useRef, useState } from "react";
import {
	View,
	TextInput,
	KeyboardType,
	StyleSheet,
	Animated,
	Easing,
	StyleProp,
	ViewStyle,
	TextInputProps,
	Platform,
} from "react-native";

type Props = {
	placeholder: string;
	keyboardType?: KeyboardType;
	autoFocus?: boolean;
	required?: boolean;
	hasError?: boolean;
	corner?: "cornered" | "curved" | "rounded" | "circle" | number;
	type?: "input" | "textarea";
	onTextChanged: Function;
	style?: StyleProp<ViewStyle> | any;
	testID: string;
};

const Input: React.FC<Props> = ({
	placeholder,
	keyboardType,
	autoFocus,
	hasError,
	required,
	corner,
	type,
	onTextChanged,
	testID,
}) => {
	const [inputError, setInputError] = useState(false);
	const placeholderRef = useRef(new Animated.Value(11)).current;
	const inputRef = useRef<TextInput | null>(null);
	const inputContainerStyles: Object = {
		borderRadius:
			corner === "cornered"
				? 0
				: corner === "curved"
				? 5
				: corner === "rounded"
				? 10
				: corner === "circle"
				? "50%"
				: corner,
		borderColor: (required && inputError) || hasError ? "red" : !inputError && "black",
		height: type === "textarea" ? 80 : 40,
	};
	const inputStyles: Object = {};
	const handleInputValue = (text: string | number) => {
		if (!text) {
			setInputError(true);
			Animated.timing(placeholderRef, {
				useNativeDriver: true,
				easing: Easing.bounce,
				duration: 200,
				toValue: 11,
			}).start();
		} else {
			setInputError(false);
			onTextChanged(text);
		}
	};
	return (
		<View
			style={[styles.inputContainer, inputContainerStyles]}
			onTouchEnd={() => inputRef.current?.focus()}
			testID='inputContainer'>
			<Animated.Text style={[styles.placeholder, { transform: [{ translateY: placeholderRef }] }]}>
				{placeholder}
			</Animated.Text>
			<TextInput
				ref={inputRef}
				testID={testID || "textinput"}
				style={[styles.input, inputStyles]}
				keyboardType={keyboardType}
				multiline={type === "textarea" && true}
				onEndEditing={(e) => {
					handleInputValue(e.nativeEvent.text);
				}}
				onFocus={() => {
					Animated.timing(placeholderRef, {
						useNativeDriver: true,
						easing: Easing.ease,
						duration: 200,
						toValue: -20,
					}).start();
				}}
				autoFocus={autoFocus}
			/>
		</View>
	);
};
const styles = StyleSheet.create({
	inputContainer: {
		borderStyle: "solid",
		borderWidth: 1,
		width: "95%",
		marginVertical: 12,
	},
	input: {
		paddingTop: Platform.OS === "ios" ? 8 : 2,
		paddingHorizontal: 8,
		marginTop: 3,
	},
	placeholder: {
		color: "rgba(0,0,0,0.5)",
		position: "absolute",
		marginLeft: 5,
		fontSize: 12,
	},
});
export default Input;
