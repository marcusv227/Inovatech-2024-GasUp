import { View, Image } from "react-native";
import { Text, Appbar, Menu, IconButton } from "react-native-paper";
import { Button } from "../src/components/button";
import SafewaysSvg from "../assets/SafewaysLogo.svg";
import { useState } from "react";
import { styles } from '../assets/styles/stylesProfile';

interface ProfileDataProps {
    onLoginPress: () => void;
    onRegisterPress: () => void;
}

const ProfileData: React.FC<ProfileDataProps> = ({ onLoginPress, onRegisterPress }) => {
    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.header}>
                <SafewaysSvg />
                <Text style={styles.textHeader}>Usuário</Text>
                <Menu visible={visible}
                    onDismiss={closeMenu}
                    contentStyle={{ backgroundColor: '#fafafa', width: 120, }}
                    anchor={
                        <IconButton icon="cog" onPress={openMenu} />
                    }
                    style={styles.menu}>
                    <Menu.Item title='Ajuda' leadingIcon="help" />
                </Menu>
            </Appbar.Header>

            <View style={styles.profileContainer}>
                <View style={styles.intro}>
                    <Image
                        source={require('../assets/Safeways.png')}
                        style={styles.image}
                    />
                </View>
            </View>
            <View style={styles.createButton}>
                <Button
                    children='Login'
                    onPress={onLoginPress}
                    style={styles.button}
                />
                <Button
                    children='Cadastrar'
                    onPress={onRegisterPress}
                    style={styles.button}
                />
            </View>
        </View>
    );
}

export default ProfileData;