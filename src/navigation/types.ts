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
    ResultVideoCall: { status: 'success' | 'error' };
};

export type BottomTabParamList = {
    HomeTab: undefined;
    NotificationTab: undefined;
    SupportTab: undefined;
    ProfileTab: undefined;
};
