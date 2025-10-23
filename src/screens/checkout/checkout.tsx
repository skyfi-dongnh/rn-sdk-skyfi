import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CheckBox, Icon, makeStyles } from '@rneui/themed';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
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
import Input from '../../components/forms/Input';
import { SelectedAddress, showAddressSelectModal } from '../../components/modals/AddressSelectModal';
import { RootStackParamList } from '../../navigation';
import { useSimCheckoutStore } from '../../store';

type CheckoutNavigationProp = StackNavigationProp<RootStackParamList, 'Checkout'>;

const CheckoutScreen: React.FC = () => {
  const navigation = useNavigation<CheckoutNavigationProp>();
  const styles = useStyles();
  const { data: checkoutProducts } = useSimCheckoutStore();

  // Form with react-hook-form
  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm<Checkout.CheckoutInfo>({
    defaultValues: {
      email: '',
      contact_phone: '',
      customer_name: '',
      delivery_address: '',
      city_id: undefined,
      district_id: undefined,
      ward_id: undefined,
    },
    mode: 'onChange',
  });

  // Additional states
  const [selectedAddress, setSelectedAddress] = useState<SelectedAddress>();
  const [promoCode, setPromoCode] = useState('');

  // Checkbox states
  const [agreeBank, setAgreeBank] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const subtotal = checkoutProducts.reduce((sum, product) => sum + (product.total_price || 0), 0);
  const total = subtotal;

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString('vi-VN')} VND`;
  };

  const handleCheckout = handleSubmit((data) => {
    // Validate checkboxes
    if (!agreeBank || !agreeTerms) {
      Alert.alert('Thông báo', 'Vui lòng đồng ý với các điều khoản');
      return;
    }

    // Validate required fields
    if (!data.email || !data.contact_phone || !selectedAddress) {
      Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    // Process checkout with form data
    const checkoutData: Checkout.CheckoutInfo = {
      ...data,
      city_id: selectedAddress?.cityId,
      district_id: selectedAddress?.districtId,
      ward_id: selectedAddress?.wardId,
      total_amount: total,
      items: checkoutProducts,
    };

    console.log('Processing checkout...', checkoutData);
  });

  const handleAddressSelect = async () => {
    try {
      const address = await showAddressSelectModal({
        onSelect: (address) => {
          setSelectedAddress(address);
          setValue('city_id', address.cityId);
          setValue('district_id', address.districtId);
          setValue('ward_id', address.wardId);
        },
        initialAddress: selectedAddress,
      });
    } catch (error) {
      console.log('Address selection cancelled');
    }
  };

  const renderProductItem = (product: Checkout.ProductCheckout, index: number) => (
    <View key={`${product.product_id}-${index}`} style={styles.productItem}>
      <View style={styles.productImageContainer}>
        {product.sim_type ? (
          <View style={styles.simLogo} />
        ) : (
          <View style={styles.regionLogo} />
        )}
      </View>

      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.product_name || 'Sản phẩm'}</Text>
        <Text style={styles.productDescription}>
          {product.sim_type && `SIM ${product.sim_type}`}
          {product.pack_code && `\nGói ${product.pack_code}`}
          {product.quantity && `\nSố lượng: ${product.quantity}`}
        </Text>
      </View>

      <View style={styles.productPriceContainer}>
        {product.base_price && product.base_price !== product.total_price ? (
          <View style={styles.salePriceContainer}>
            <Text style={styles.productPrice}>{formatCurrency(product.total_price || 0)}</Text>
            <Text style={styles.originalPrice}>{formatCurrency(product.base_price)}</Text>
          </View>
        ) : (
          <Text style={styles.productPrice}>{formatCurrency(product.total_price || 0)}</Text>
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

            <Input
              name="email"
              control={control}
              label="Email"
              required
              placeholder="Nhập email"
              keyboardType="email-address"
              autoCapitalize="none"
              containerStyle={styles.formGroup}
              rules={{
                required: 'Email là bắt buộc',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email không hợp lệ'
                }
              }}
            />

            <Input
              name="contact_phone"
              control={control}
              label="Số điện thoại"
              required
              placeholder="Nhập số điện thoại"
              keyboardType="phone-pad"
              containerStyle={styles.formGroup}
              rules={{
                required: 'Số điện thoại là bắt buộc',
                pattern: {
                  value: /^[0-9]{10,11}$/,
                  message: 'Số điện thoại không hợp lệ'
                }
              }}
            />

            <Input
              name="customer_name"
              control={control}
              label="Tên"
              placeholder="Nhập tên"
              containerStyle={styles.formGroup}
            />
          </View>

          {/* Shipping Address */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Địa chỉ nhận SIM</Text>

            <View style={styles.formGroup}>
              <Text style={styles.label}>
                Tỉnh/Thành phố, Quận/ Huyện, Phường/Xã<Text style={styles.required}>*</Text>
              </Text>
              <TouchableOpacity style={styles.inputWithIcon} onPress={handleAddressSelect}>
                <Text style={[styles.input, styles.inputNoBorder, selectedAddress?.address ? styles.addressText : styles.addressPlaceholder]}>
                  {selectedAddress?.address || 'Chọn địa chỉ'}
                </Text>
                <Icon name="chevron-down" type="ionicon" size={20} color="#333333" />
              </TouchableOpacity>
            </View>

            <Input
              name="delivery_address"
              control={control}
              label="Địa chỉ chi tiết"
              placeholder="Nhập địa chỉ chi tiết"
              rules={{
                required: 'Địa chỉ là bắt buộc',
              }}
              containerStyle={styles.formGroup}
            />
          </View>

          {/* Order Summary */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Đơn hàng của bạn</Text>

            <View style={styles.orderRow}>
              <Text style={styles.orderLabel}>{checkoutProducts.length} sản phẩm</Text>
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
              {checkoutProducts.map((product, index) => renderProductItem(product, index))}
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
            disabled={!agreeBank || !agreeTerms || !watch('email') || !watch('contact_phone') || !selectedAddress}
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
  addressText: {
    color: '#333333',
    fontSize: 16,
  },
  addressPlaceholder: {
    color: '#A1A1A1',
    fontSize: 16,
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
