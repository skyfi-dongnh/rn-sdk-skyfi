import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CheckBox, Icon, makeStyles } from '@rneui/themed';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton } from '../../components/common/CustomButton';
import { RootStackParamList } from '../../navigation';

type CheckoutNavigationProp = StackNavigationProp<RootStackParamList, 'Checkout'>;

interface Product {
  id: string;
  name: string;
  type: 'SIM_MVNO' | 'COUNTRY' | 'REGION';
  description: string;
  price: number;
  originalPrice?: number;
  image?: string;
  flag?: string;
  quantity?: number;
}

const CheckoutScreen: React.FC = () => {
  const navigation = useNavigation<CheckoutNavigationProp>();
  const styles = useStyles();

  // Form states
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [province, setProvince] = useState('');
  const [detailedAddress, setDetailedAddress] = useState('');
  const [promoCode, setPromoCode] = useState('');
  
  // Checkbox states
  const [agreeBank, setAgreeBank] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Sample products data
  const products: Product[] = [
    {
      id: '1',
      name: '0707 123 456',
      type: 'SIM_MVNO',
      description: 'SIM vật lý\nGói SF79',
      price: 148000,
      quantity: 1,
    },
    {
      id: '2',
      name: 'Singapore',
      type: 'COUNTRY',
      description: 'Số lượng: 1',
      price: 299000,
      flag: '🇸🇬',
      quantity: 1,
    },
    {
      id: '3',
      name: 'Thailand',
      type: 'COUNTRY',
      description: 'Số lượng: 1',
      price: 398000,
      originalPrice: 100000,
      flag: '🇹🇭',
      quantity: 1,
    },
    {
      id: '4',
      name: 'BẮC MỸ',
      type: 'REGION',
      description: 'Số lượng: 1',
      price: 299000,
      quantity: 1,
    },
    {
      id: '5',
      name: 'TOÀN CẦU',
      type: 'REGION',
      description: 'Số lượng: 1',
      price: 299000,
      quantity: 1,
    },
  ];

  const subtotal = products.reduce((sum, product) => sum + product.price, 0);
  const total = subtotal;

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString('vi-VN')} VND`;
  };

  const handleCheckout = () => {
    // Validate form
    if (!email || !phone || !province || !agreeBank || !agreeTerms) {
      Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin và đồng ý với các điều khoản');
      return;
    }
    // Process checkout
    console.log('Processing checkout...');
  };

  const renderProductItem = (product: Product) => (
    <View key={product.id} style={styles.productItem}>
      <View style={styles.productImageContainer}>
        {product.type === 'SIM_MVNO' ? (
          <View style={styles.simLogo} />
        ) : product.flag ? (
          <Text style={styles.flagEmoji}>{product.flag}</Text>
        ) : (
          <View style={styles.regionLogo} />
        )}
      </View>
      
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
      </View>
      
      <View style={styles.productPriceContainer}>
        {product.originalPrice ? (
          <View style={styles.salePriceContainer}>
            <Text style={styles.productPrice}>{formatCurrency(product.price)}</Text>
            <Text style={styles.originalPrice}>{formatCurrency(product.originalPrice)}</Text>
          </View>
        ) : (
          <Text style={styles.productPrice}>{formatCurrency(product.price)}</Text>
        )}
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={['#FFFFFF', '#FFFDFB', '#FEF8F4', '#FCF1EE', '#F3E8F4', '#E8E5FA']}
      locations={[0, 0.2, 0.4, 0.6, 0.8, 1]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container} edges={['top']}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon name="arrow-back" type="ionicon" size={24} color="#333333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Thanh toán</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Contact Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thông tin liên lạc</Text>
            <Text style={styles.sectionDescription}>
              Chúng tôi sẽ liên hệ và gửi thông tin đến bạn qua thông tin liên hệ dưới đây.
            </Text>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>
                Email<Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Nhập email"
                placeholderTextColor="#A1A1A1"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>
                Số điện thoại<Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Nhập số điện thoại"
                placeholderTextColor="#A1A1A1"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Tên</Text>
              <TextInput
                style={styles.input}
                placeholder="Nhập tên"
                placeholderTextColor="#A1A1A1"
                value={name}
                onChangeText={setName}
              />
            </View>
          </View>

          {/* Shipping Address */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Địa chỉ nhận SIM</Text>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>
                Tỉnh/Thành phố, Quận/ Huyện, Phường/Xã<Text style={styles.required}>*</Text>
              </Text>
              <TouchableOpacity style={styles.inputWithIcon}>
                <TextInput
                  style={[styles.input, styles.inputNoBorder]}
                  placeholder="Nhập Tỉnh/Thành phố"
                  placeholderTextColor="#A1A1A1"
                  value={province}
                  onChangeText={setProvince}
                />
                <Icon name="chevron-down" type="ionicon" size={20} color="#333333" />
              </TouchableOpacity>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Địa chỉ chi tiết</Text>
              <TextInput
                style={styles.input}
                placeholder="Nhập địa chỉ chi tiết"
                placeholderTextColor="#A1A1A1"
                value={detailedAddress}
                onChangeText={setDetailedAddress}
              />
            </View>
          </View>

          {/* Order Summary */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Đơn hàng của bạn</Text>
            
            <View style={styles.orderRow}>
              <Text style={styles.orderLabel}>{products.length} sản phẩm</Text>
              <Text style={styles.orderValue}>{formatCurrency(subtotal)}</Text>
            </View>
            
            <View style={styles.orderRow}>
              <Text style={styles.orderLabel}>Thuế & Phí dịch vụ</Text>
              <Text style={styles.orderValue}>Đã bao gồm</Text>
            </View>
            
            <View style={[styles.orderRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Tổng cộng</Text>
              <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
            </View>

            {/* Promo Code */}
            <View style={styles.promoCodeContainer}>
              <Icon name="ticket-outline" type="ionicon" size={20} color="#333333" />
              <TextInput
                style={styles.promoCodeInput}
                placeholder="Nhập mã giảm giá"
                placeholderTextColor="#A1A1A1"
                value={promoCode}
                onChangeText={setPromoCode}
              />
            </View>

            {/* Products List */}
            <Text style={[styles.sectionTitle, styles.productSectionTitle]}>Sản phẩm</Text>
            <View style={styles.productsContainer}>
              {products.map(renderProductItem)}
            </View>
          </View>
        </ScrollView>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          <View style={styles.checkboxContainer}>
            <CheckBox
              checked={agreeBank}
              onPress={() => setAgreeBank(!agreeBank)}
              containerStyle={styles.checkbox}
              textStyle={styles.checkboxText}
              title="Tôi đồng ý thuê bao này là thuê bao nhận SMS banking từ Vikki Bank"
              uncheckedColor="#A1A1A1"
              checkedColor="#D2008C"
              size={20}
            />
          </View>

          <View style={styles.checkboxContainer}>
            <CheckBox
              checked={agreeTerms}
              onPress={() => setAgreeTerms(!agreeTerms)}
              containerStyle={styles.checkbox}
              textStyle={styles.checkboxText}
              title="Tôi đồng ý với Điều khoản & Điều kiện giao dịch chung của SkyFi và chính sách xử lý, bảo vệ dự liệu cá nhân"
              uncheckedColor="#A1A1A1"
              checkedColor="#D2008C"
              size={20}
            />
          </View>

          <CustomButton
            title="Hoàn tất thanh toán"
            onPress={handleCheckout}
            type="primary"
            size="medium"
            disabled={!agreeBank || !agreeTerms || !email || !phone || !province}
            width="100%"
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const useStyles = makeStyles((theme) => ({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    height: 50,
    backgroundColor: 'transparent',
  },
  backButton: {
    padding: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 48,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#5C5C5C',
    lineHeight: 20,
    marginBottom: 12,
  },
  formGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    color: '#333333',
    marginBottom: 4,
  },
  required: {
    color: '#ED1B2F',
  },
  input: {
    borderWidth: 1,
    borderColor: '#F1F1F1',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333333',
    backgroundColor: '#FFFFFF',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F1F1',
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  inputNoBorder: {
    borderWidth: 0,
    flex: 1,
    paddingHorizontal: 0,
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
  },
  orderLabel: {
    fontSize: 14,
    color: '#333333',
  },
  orderValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
  totalRow: {
    borderBottomWidth: 0,
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  promoCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 16,
    marginBottom: 16,
  },
  promoCodeInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    marginLeft: 8,
  },
  productSectionTitle: {
    marginTop: 8,
    marginBottom: 8,
  },
  productsContainer: {
    marginTop: 8,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
  },
  productImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F1F1',
    marginRight: 12,
  },
  simLogo: {
    width: 20,
    height: 16,
    backgroundColor: '#ED1B2F',
    borderRadius: 4,
  },
  flagEmoji: {
    fontSize: 24,
  },
  regionLogo: {
    width: 26,
    height: 26,
    backgroundColor: '#FAA61A',
    borderRadius: 13,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 2,
  },
  productDescription: {
    fontSize: 14,
    color: '#5C5C5C',
    lineHeight: 20,
  },
  productPriceContainer: {
    alignItems: 'flex-end',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  salePriceContainer: {
    alignItems: 'flex-end',
  },
  originalPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8A8A8A',
    textDecorationLine: 'line-through',
    marginTop: 2,
  },
  bottomSection: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  checkboxContainer: {
    marginBottom: 12,
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    margin: 0,
  },
  checkboxText: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '400',
    marginLeft: 8,
    flex: 1,
  },
}));

export default CheckoutScreen;
