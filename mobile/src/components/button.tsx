import { ComponentProps } from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton, Text, ActivityIndicator } from "react-native-paper";
import theme from '../../assets/theme';

type Props = ComponentProps<typeof PaperButton> & {
    children: string;
    isLoading?: boolean;
    buttonColor?: string;
    textColor?: string;
}

export function Button({ children, isLoading = false, icon, buttonColor = theme.colors.primary, textColor = "white", ...rest }: Props) {
    return (
        <PaperButton 
            mode="contained"
            style={[styles.button, { backgroundColor: buttonColor }]}
            disabled={isLoading} 
            {...rest} 
            icon={isLoading ? undefined : icon}
        >
            {
                isLoading ? (
                    <ActivityIndicator animating={true} color={textColor} />
                ) : (
                    <Text style={[styles.text, { color: textColor }]}>{children}</Text>
                )
            }
        </PaperButton>
    );
}

const styles = StyleSheet.create({
    button: { 
        height: 48,
        justifyContent: 'center',
        borderRadius: 8,
    },
    text: {
        fontWeight: "bold",
    }
});
