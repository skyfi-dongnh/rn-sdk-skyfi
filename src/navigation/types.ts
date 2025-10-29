import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
    MainTabs: undefined;
    Home: undefined;
    ShareInfo: undefined;
    InputInfoSim: undefined;
    CheckInfo: undefined;
    Signature: undefined;
    StartVideoCall: undefined;
    DoubleCheckInfo: undefined;
    SignTheContract: undefined;
    ModalExamples: undefined;
    SimpleModalTest: undefined;
    Meeting: { phoneNumber: string, currentSerial: string, detail_id: string };
    MeetingBrowser: { phoneNumber: string, currentSerial: string, detail_id: string };
    ResultVideoCall: { status: 'success' | 'error' };
    SimData: undefined;
    Checkout: undefined;
    Payment: { url: string };
    InAppBrowserTest: undefined;
    CustomBrowser: { url: string };

};

export type BottomTabParamList = {
    HomeTab: undefined;
    NotificationTab: undefined;
    SupportTab: undefined;
    ProfileTab: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;