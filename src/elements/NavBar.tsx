import * as React from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { StyleService, useStyleSheet, Icon } from '@ui-kitten/components';
import { HStack } from 'components';
import ThemeLogo from 'elements/App/ThemeLogo';
import { useNavigation } from '@react-navigation/native';

const NavBar = ({ }) => {
  const navigation = useNavigation();
  const styles = useStyleSheet(themedStyles);
  const [activeTab, setActiveTab] = React.useState(0);

  const _onPress = (index: number) => () => {
    setActiveTab(index);
    console.log(index);
    if (index===3){
      navigation.navigate('Search');
    }
  };

  const handleLogoPress = () => {
    
  };

  const data = [
    { icon: 'receipt' },
    { icon: 'user' },
    { icon: 'logo' }, // Added onPress handler for logo
    { icon: 'search' },
    { icon: 'gearsix' },
  ];

  return (
    <HStack style={styles.container} level="1">
      {data.map((item, i) => {
        const isActive = activeTab === i;
        return item.icon === 'logo' ? (
          <TouchableOpacity
            key="logo"
            onPress={handleLogoPress}
            style={styles.logoButton}>
            <ThemeLogo onPress={handleLogoPress} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            key={i}
            style={[
              styles.button,
              isActive && styles.activeButton,
              isActive && { backgroundColor: styles.activeButton.backgroundColor },
            ]}
            onPress={_onPress(i)}
          >
            <Icon
              pack="assets"
              name={item.icon}
              style={[
                styles.icon,
                isActive && styles.activeIcon,
                isActive && { tintColor: styles.activeIcon.tintColor },
              ]}
            />
          </TouchableOpacity>
        );
      })}
    </HStack>
  );
};

export default NavBar;

const themedStyles = StyleService.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
  },
  button: {
    padding: 8,
    borderRadius: 16,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: 'text-platinum-color',
  },
  activeIcon: {
    tintColor: 'text-white-color',
  },
  activeButton: {
    backgroundColor: 'color-primary-default',
  },
  logoButton: {
    padding: 0,
  },
});