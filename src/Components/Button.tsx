import React from "react";
import {
	Text,
	TouchableOpacity,
	StyleSheet,
	StyleProp,
	ViewStyle,
	GestureResponderEvent,
	TextStyle,
	ColorPropType,
} from "react-native";

type Props = {
	text: string;
	buttonStyle?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<TextStyle>;
	corner?: "cornered" | "curved" | "rounded" | number;
	type?: "outlined" | "filled";
	buttonColor?: string;
	textColor?: string;
	onPress: (event: GestureResponderEvent) => void;
};

const Button: React.FC<Props> = ({ text, type, buttonColor, textStyle, textColor, corner, buttonStyle, onPress }) => {
	const buttonTypes: Object = {
		borderRadius: corner === "cornered" ? 0 : corner === "curved" ? 5 : corner === "rounded" ? 10 : corner,
		backgroundColor: type === "filled" ? buttonColor : "rgba(0,0,0,0)",
		borderColor: buttonColor,
	};
	return (
		<TouchableOpacity style={[styles.baseContainerStyle, buttonStyle, buttonTypes]} onPress={onPress}>
			<Text style={[styles.baseTextStyle, textStyle, { color: textColor ? textColor : "#000" }]}>{text}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	baseContainerStyle: {
		padding: 5,
		borderWidth: 1,
	},
	baseTextStyle: {
		letterSpacing: 1,
		fontWeight: "500",
	},
});

export default Button;
