import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Icon, makeStyles } from '@rneui/themed';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton } from '../../components/common/CustomButton';
import { CustomCheckbox, TextSegment } from '../../components/common/CustomCheckbox';
import Input from '../../components/forms/Input';
import { ShippingAddress } from '../../components/forms/ShippingAddress';
import { SelectedAddress, showAddressSelectModal } from '../../components/modals/AddressSelectModal';
import { showMessage } from '../../components/modals/ModalComfirm';
import { useI18n, useLoading } from '../../hooks';
import useDebounce from '../../hooks/useDebounce';
import { RootStackParamList } from '../../navigation';
import CheckoutService from '../../services/api/checkout.api';
import { useSimCheckoutStore } from '../../store';
import { toCurrency } from '../../utils/format';

type CheckoutNavigationProp = StackNavigationProp<RootStackParamList, 'Checkout'>;

const CheckoutScreen: React.FC = () => {
  const navigation = useNavigation<CheckoutNavigationProp>();
  const styles = useStyles();
  const { data: checkoutProducts } = useSimCheckoutStore();
  const { load, close } = useLoading();
  const { currentLanguage } = useI18n();

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
  const delivery_address = watch('delivery_address');
  const shipping_amount = watch('shipping_amount');

  // Checkbox states
  const [agreeBank, setAgreeBank] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeESim, setAgreeESim] = useState(false);

  // Text segments for checkboxes with clickable links
  const bankTextSegments: TextSegment[] = [
    { text: 'Tôi đồng ý thuê bao này là thuê bao nhận SMS banking từ ' },
    {
      text: 'Vikki Bank',
      isLink: true,
      onPress: () => {
        // Custom function instead of URL - could open a modal, navigate, etc.
        console.log('Vikki Bank clicked');
        showMessage({
          title: 'Vikki Bank',
          description: 'Thông tin về Vikki Bank sẽ được hiển thị ở đây.',
          confirmLabel: 'OK',
        });
      },
      style: { fontWeight: '500' }
    }
  ];

  const termsTextSegments: TextSegment[] = [
    { text: 'Tôi đồng ý với ' },
    {
      text: 'Điều khoản & Điều kiện',
      isLink: true,
      url: 'https://skyfi.vn/terms-and-conditions',
      style: { fontWeight: '500' }
    },
    { text: ' giao dịch chung của SkyFi và ' },
    {
      text: 'chính sách xử lý, bảo vệ dữ liệu cá nhân',
      isLink: true,
      url: 'https://skyfi.vn/privacy-policy',
      style: { fontWeight: '500' }
    }
  ];

  const eSimTextSegments: TextSegment[] = [
    { text: 'Thiết bị của tôi là tương thích với eSIM' },

  ];

  const isFullEsim = useMemo(() => checkoutProducts?.every((item) => item.sim_type != 'USIM'), [checkoutProducts]);
  const hasEsim = useMemo(() => checkoutProducts?.some((item) => item.sim_type != 'USIM'), [checkoutProducts]);

  const subtotal = checkoutProducts.reduce((sum, product) => sum + (product.total_price || 0), 0);
  const total = useMemo(() => {
    return subtotal + (shipping_amount || 0);
  }, [subtotal, shipping_amount]);

  const deliveryAddress: Checkout.ParamDeliveryFee = useMemo(() => {
    if (selectedAddress && delivery_address) {
      return {
        city_id: selectedAddress.cityId,
        district_id: selectedAddress.districtId,
        ward_id: selectedAddress.wardId,
        delivery_address: delivery_address,
      };
    }
  }, [selectedAddress, delivery_address]);

  const ParamDeliveryFee = useDebounce<Checkout.ParamDeliveryFee | {}>(deliveryAddress);

  const fetchDeliveryFee = async () => {
    if (ParamDeliveryFee && Object.keys(ParamDeliveryFee).length > 0) {
      try {
        load();
        const response = await CheckoutService.getDeliveryFee(ParamDeliveryFee as Checkout.ParamDeliveryFee);
        if (response.code === 200 && response.result?.shipping_fee) {
          setValue('shipping_amount', response.result.shipping_fee);

        } else {
          console.log('Failed to fetch delivery fee:', response.message);
        }
      } catch (error) {
        console.error('Error fetching delivery fee:', error);
      } finally { close(); }
    }
  };
  useEffect(() => {
    fetchDeliveryFee();
  }, [ParamDeliveryFee]);

  const handleCheckout = async (data: Checkout.CheckoutInfo) => {
    // Validate checkboxes
    const requiredCheckboxes = !agreeBank || !agreeTerms || (hasEsim && !agreeESim);
    if (requiredCheckboxes) {
      showMessage({
        title: 'Thông báo',
        description: hasEsim && !agreeESim
          ? 'Vui lòng xác nhận thiết bị của bạn tương thích với eSIM'
          : 'Vui lòng đồng ý với các điều khoản',
        confirmLabel: 'OK',
      });
      return;
    }

    // Validate required fields
    const emailValid = data.email;
    const phoneValid = hasEsim || data.contact_phone;
    const addressValid = isFullEsim || selectedAddress;
    const deliveryAddressValid = isFullEsim || data.delivery_address;

    if (!emailValid || !phoneValid || !addressValid || !deliveryAddressValid) {
      let missingFields = [];
      if (!emailValid) missingFields.push('Email');
      if (!phoneValid) missingFields.push('Số điện thoại');
      if (!addressValid) missingFields.push('Địa chỉ nhận hàng');
      if (!deliveryAddressValid) missingFields.push('Địa chỉ chi tiết');

      showMessage({
        title: 'Thông báo',
        description: `Vui lòng điền đầy đủ thông tin: ${missingFields.join(', ')}`,
        confirmLabel: 'OK',
      });
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

    try {
      load();
      // console.log('Processing checkout...', checkoutData);

      const response = await CheckoutService.createOrder(checkoutData);

      if (response.code === 200 && response.result?.order_number) {
        console.log('Order created successfully:', response.result);

        // Get payment link
        const paymentResponse = await CheckoutService.getLinkPayment({
          locale: currentLanguage,
          orderNumber: response.result.order_number,
          paymentMethod: 'GALAXYPAY',
        });


        if (paymentResponse.code === 200 && paymentResponse.result?.redirectUrl) {
          // Navigate to Payment screen with the redirect URL
          navigation.navigate('Payment', { url: paymentResponse.result.redirectUrl });
        } else {
          showMessage({
            title: 'Lỗi',
            description: 'Không thể lấy link thanh toán. Vui lòng thử lại.',
            confirmLabel: 'OK',
          });
        }
      } else {
        showMessage({
          title: 'Lỗi',
          description: response.message || 'Không thể tạo đơn hàng. Vui lòng thử lại.',
          confirmLabel: 'OK',
        });
      }
    } catch (error) {
      console.error('Checkout error:', error);
      showMessage({
        title: 'Lỗi',
        description: 'Đã xảy ra lỗi khi tạo đơn hàng. Vui lòng thử lại.',
        confirmLabel: 'OK',
      });
    }
    finally { close(); }
  };

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
            <Text style={styles.productPrice}>{toCurrency(product.total_price || 0)}</Text>
            <Text style={styles.originalPrice}>{toCurrency(product.base_price)}</Text>
          </View>
        ) : (
          <Text style={styles.productPrice}>{toCurrency(product.total_price || 0)}</Text>
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

            {!hasEsim && <Input
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
            />}

            <Input
              name="customer_name"
              control={control}
              label="Tên"
              placeholder="Nhập tên"
              containerStyle={styles.formGroup}
            />
          </View>

          {/* Shipping Address */}
          {!isFullEsim && (
            <ShippingAddress
              control={control}
              selectedAddress={selectedAddress &&
                selectedAddress.cityId !== undefined &&
                selectedAddress.districtId !== undefined &&
                selectedAddress.wardId !== undefined ? {
                ...selectedAddress,
                address: selectedAddress.address || '',
                cityId: selectedAddress.cityId,
                districtId: selectedAddress.districtId,
                wardId: selectedAddress.wardId
              } : undefined}
              onAddressSelect={handleAddressSelect}
              isRequired={!isFullEsim}
              containerStyle={{
                ...styles.section,
                marginHorizontal: 16,
                marginTop: 8
              }}
            />
          )}

          {/* Order Summary */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Đơn hàng của bạn</Text>

            <View style={styles.orderRow}>
              <Text style={styles.orderLabel}>{checkoutProducts.length} sản phẩm</Text>
              <Text style={styles.orderValue}>{toCurrency(subtotal)}</Text>
            </View>

            <View style={styles.orderRow}>
              <Text style={styles.orderLabel}>Thuế & Phí dịch vụ</Text>
              <Text style={styles.orderValue}>Đã bao gồm</Text>
            </View>
            <View style={styles.orderRow}>
              <Text style={styles.orderLabel}>Phí vân chuyển</Text>
              <Text style={styles.orderValue}>{toCurrency(shipping_amount)}</Text>
            </View>

            <View style={[styles.orderRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Tổng cộng</Text>
              <Text style={styles.totalValue}>{toCurrency(total)}</Text>
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
          {hasEsim && (
            <View style={styles.checkboxContainer}>
              <CustomCheckbox
                checked={agreeESim}
                onPress={() => setAgreeESim(!agreeESim)}
                textSegments={eSimTextSegments}
                containerStyle={styles.customCheckbox}
                size={20}
                checkedColor="#D2008C"
                uncheckedColor="#A1A1A1"
                checkboxBorderColor="#A1A1A1"
              />
            </View>
          )}

          <View style={styles.checkboxContainer}>
            <CustomCheckbox
              checked={agreeBank}
              onPress={() => setAgreeBank(!agreeBank)}
              textSegments={bankTextSegments}
              containerStyle={styles.customCheckbox}
              size={20}
              checkedColor="#D2008C"
              uncheckedColor="#A1A1A1"
              checkboxBorderColor="#A1A1A1"
            />
          </View>

          <View style={styles.checkboxContainer}>
            <CustomCheckbox
              checked={agreeTerms}
              onPress={() => setAgreeTerms(!agreeTerms)}
              textSegments={termsTextSegments}
              containerStyle={styles.customCheckbox}
              size={20}
              checkedColor="#D2008C"
              uncheckedColor="#A1A1A1"
              checkboxBorderColor="#A1A1A1"
            />
          </View>

          <CustomButton
            title="Hoàn tất thanh toán"
            onPress={handleSubmit(handleCheckout)}
            type="primary"
            size="medium"
            disabled={
              !agreeBank ||
              !agreeTerms ||
              (hasEsim && !agreeESim) ||
              !watch('email') ||
              (!hasEsim && !watch('contact_phone')) ||
              (!isFullEsim && !selectedAddress)
            }
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
    paddingBottom: 30,
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
    paddingBottom: 8,
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
  customCheckbox: {
    // Custom styles for the new checkbox component
    // The component handles its own internal styling
  },
}));

export default CheckoutScreen;
