import { TextInput, Text, Portal, Dialog, Button } from 'react-native-paper';
import { ReactNode, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import theme from '../../assets/theme';

type ModalProps = {
    visible: boolean;
    title: string;
    onDismiss: () => void;
    onConfirm: () => void;
    message?: string;
    children?: ReactNode;
    description?: string;
    isForm?: boolean;
};

export function Modal({ message, onConfirm, onDismiss, title, visible, children, description, isForm }: ModalProps) {
    return (
        <Portal >
            <Dialog visible={visible} onDismiss={onDismiss} dismissable={false} style={styles.dialog}>
                <Dialog.Title style={styles.dialogTitle}>{title}</Dialog.Title>

                <Dialog.Content>
                    { }
                    {message ? (
                        <Text style={styles.messageText}>{message}</Text>
                    ) : (
                        <View style={styles.inputdescription}>
                            {children}
                        </View>
                    )}
                </Dialog.Content>

                <Dialog.Actions style={styles.dialogActions}>
                    <Button onPress={onDismiss} style={styles.cancelButton} labelStyle={styles.buttonText}>Cancelar</Button>

                    <Button
                        onPress={() => {
                            if (isForm) {
                                onConfirm();
                            } else {
                                onConfirm();
                            }
                        }}
                        style={styles.confirmButton}
                        labelStyle={styles.buttonText}
                    >
                        Confirmar
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}

const styles = StyleSheet.create({

    dialog: {
        backgroundColor: '#fafafa',

    },
    dialogTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#27272a',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',

    },
    messageText: {
        fontSize: 14,
        color: '#333333',
        gap: 10,
    },
    inputdescription: {
        marginTop: 5
    },
    dialogActions: {
        gap: 5,
    },
    cancelButton: {
        backgroundColor: 'grey',
        borderRadius: 5,
    },
    confirmButton: {
        backgroundColor: theme.colors.primary,
        borderRadius: 5,
    },
    buttonText: {
        color: '#ffffff',
    },
});

