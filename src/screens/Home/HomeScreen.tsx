import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useI18n } from '../../hooks';
import { LanguageSwitcher } from '../../components/common';
import { useTheme } from '@rneui/themed';
import { Button } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { makeStyles } from '@rneui/themed';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation';

interface Props {
  fullWidth?: boolean;
}

const useStyles = makeStyles((theme, props: Props) => ({
  container: {
    flex: 1,
    background: theme.colors.white,
    width: props.fullWidth ? '100%' : 'auto',
  },
  text: {
    color: theme.colors.primary,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    color: theme.colors.primary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 24,
    color: theme.colors.grey0,
    textAlign: 'center',
  },

}));

type NavigationProp = StackNavigationProp<RootStackParamList>;


const HomeScreen: React.FC = ({ }) => {
  const navigation = useNavigation<NavigationProp>();
  const { t } = useI18n();
  const styles = useStyles({ fullWidth: true });

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <LanguageSwitcher />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{t('home.title')}</Text>
        <Text style={styles.subtitle}>{t('home.subtitle')}</Text>

        <Button
          title={t('home.startCall')}
          onPress={() => navigation.navigate('Meeting', { room: '0879999328' })}
        />
        {/* button open Active Sim Flow */}
        <Button
          title={t('home.moveToActiveFlow')}
          onPress={() => navigation.navigate('ShareInfo')}
        />
      </View>
    </SafeAreaView>
  );
};




export default HomeScreen;
