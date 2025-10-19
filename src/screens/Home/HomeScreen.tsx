import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, makeStyles } from '@rneui/themed';
import React from 'react';
import {
  Text,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LanguageSwitcher } from '../../components/common';
import { showPdfViewerModal } from '../../components/modals/ModalPdfViewer';
import { useI18n } from '../../hooks';
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

export type NavigationProp = StackNavigationProp<RootStackParamList>;


const HomeScreen: React.FC = ({ }) => {
  const navigation = useNavigation<NavigationProp>();
  const { t } = useI18n();
  const styles = useStyles({ fullWidth: true });

  const onMoveVideoCall = () => {
    navigation.navigate('Meeting', {
      "phoneNumber": "84707000354",
      "currentSerial": "25101386848211",
      "detail_id": "250"
    })

    // navigation.navigate('Meeting', { room: '0879999328' });
  };
   const handleContractPress = async () => {
          console.log('Press tại đây');
          // Open PDF viewer modal with contract
          try {
              await showPdfViewerModal({
                  pdfSource: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', // Replace with your contract PDF URL
                  title: 'Hợp đồng dịch vụ',
                  showPageNumbers: true,
                  enablePaging: true,
                  onLoadComplete: (numberOfPages, filePath) => {
                      console.log(`Contract loaded: ${numberOfPages} pages`);
                  },
                  onError: (error) => {
                      console.error('Failed to load contract:', error);
                  },
              });
          } catch (error) {
              console.log('User closed contract viewer', error);
          }
      };

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
          onPress={onMoveVideoCall}
        />
        {/* button open Active Sim Flow */}
        <Button
          title={t('home.moveToActiveFlow')}
          onPress={() => navigation.navigate('ShareInfo')}
        />
        <Button
          title="Modal Examples"
          onPress={() => navigation.navigate('ModalExamples')}
        />
        <Button
          title="Modal Examples PDF"
          onPress={handleContractPress}
        />
      </View>
    </SafeAreaView>
  );
};




export default HomeScreen;
