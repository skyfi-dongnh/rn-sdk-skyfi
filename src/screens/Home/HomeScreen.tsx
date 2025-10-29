import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, makeStyles } from '@rneui/themed';
import React from 'react';
import {
  Alert,
  ScrollView,
  Text,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LanguageSwitcher } from '../../components/common';
import { showPdfViewerModal } from '../../components/modals/ModalPdfViewer';
import { HomeHeader, HomeMenu, HomePackages, HomeSlider, SimCard } from '../../components/screens/Home';
import { useI18n } from '../../hooks';
import { RootStackParamList } from '../../navigation';
import { buttonGradientColors } from '../../theme/rneui.theme';

interface Props {
  fullWidth?: boolean;
}

const useStyles = makeStyles((theme, props: Props) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    width: props.fullWidth ? '100%' : 'auto',
  },
  headerBackground: {
    paddingTop: 44,
    height: 230,
    position: 'absolute',
    width: '100%',
    borderBottomEndRadius: 24,
    borderBottomStartRadius: 24,
    shadowColor: '#000000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.65,
    elevation: 8,

  },
  headerContainer: {
    position: 'relative',
    width: '100%',
    paddingTop: 44,

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
  cardContainer: {
    paddingHorizontal: 16,
// Account for header height
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


const HomeScreen: React.FC = ({}) => {
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

  const onMoveMeetingBrowser = () => {
    navigation.navigate('MeetingBrowser', {
      "phoneNumber": "84707000354",
      "currentSerial": "25101386848211",
      "detail_id": "250"
    })
  };

  const handleCartPress = () => {
    Alert.alert('Cart', 'Shopping cart pressed!');
  };

  const handleActivatePress = () => {
    navigation.navigate('ShareInfo');
  };

  const handleBuySimPress = () => {
    navigation.navigate('SimData');
  };

  const handleTopUpPress = () => {
    Alert.alert('Top Up', 'Navigate to top up flow');
  };

  const handleChangePackagePress = () => {
    Alert.alert('Change Package', 'Navigate to package change flow');
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
  const slides = [
  {
    id: '1',
    image: require('../../assets/images/banner1.png'),
    onPress: () => {},
  },
  {
    id: '2',
    image: require('../../assets/images/banner1.png'),
    onPress: () => {},
  },
  {
    id: '3',
    image: require('../../assets/images/banner1.png'),
      onPress: () => {},
    },
];

  return (
    <View style={styles.container}>
      <ScrollView>


        {/* Header with gradient background */}
        <View style={styles.headerContainer}>
          <LinearGradient
            colors={buttonGradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerBackground}
          />
          <HomeHeader onCartPress={handleCartPress} />
          <View style={styles.cardContainer}>
            <SimCard
              onActivatePress={handleActivatePress}
              onBuySimPress={handleBuySimPress}
              onTopUpPress={handleTopUpPress}
              onChangePackagePress={handleChangePackagePress}
            />
          </View>
        </View>
      <HomeMenu onBuySimPress={handleBuySimPress} />
        <HomeSlider slides={slides} autoPlay={true} />
        <HomePackages />

        {/* SimCard Component */}

        <SafeAreaView style={{ flex: 1 }}>
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
            <Button
              title="Meeting Browser (RNInBrowserApp)"
              onPress={onMoveMeetingBrowser}
              buttonStyle={{ backgroundColor: '#9C27B0' }}
            />
            {/* button open Active Sim Flow */}
            <Button
              title={t('home.moveToActiveFlow')}
              onPress={() => navigation.navigate('ShareInfo')}
            />
            <Button
              title="InAppBrowser Test"
              onPress={() => navigation.navigate('InAppBrowserTest')}
            />
            <Button
              title="Modal Examples PDF"
              onPress={handleContractPress}
            />
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};




export default HomeScreen;
