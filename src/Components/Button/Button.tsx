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
	ActivityIndicator,
} from "react-native";

type Props = {
	text: string;
	buttonStyle?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<TextStyle>;
	corner?: "cornered" | "curved" | "rounded" | "circle" | number;
	type?: "none" | "outlined" | "filled";
	buttonColor?: string;
	textColor?: string;
	onPress: (event: GestureResponderEvent) => void;
	loading?: boolean;
	testID: string;
};

const Button: React.FC<Props> = ({
	text,
	type,
	buttonColor,
	textStyle,
	textColor,
	corner,
	buttonStyle,
	onPress,
	loading,
	testID,
}) => {
	const buttonTypes: Object = {
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
		backgroundColor: type === "filled" ? buttonColor : "rgba(0,0,0,0)",
		borderColor: type === "none" ? "rgba(0,0,0,0)" : buttonColor,
		borderWidth: !type || type === "none" ? 0 : 1,
	};
	return (
		<TouchableOpacity style={[styles.baseContainerStyle, buttonStyle, buttonTypes]} onPress={onPress} testID={testID}>
			{loading ? (
				<ActivityIndicator color={textColor} />
			) : (
				<Text style={[styles.baseTextStyle, textStyle, { color: textColor ? textColor : "#000" }]}>{text}</Text>
			)}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	baseContainerStyle: {
		padding: 5,
	},
	baseTextStyle: {
		letterSpacing: 1,
		fontWeight: "500",
	},
});

export default Button;
