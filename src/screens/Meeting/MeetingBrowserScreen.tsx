import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Platform, View } from 'react-native';
import { openInAppBrowser } from 'react-native-in-browser';
import { io } from "socket.io-client";

import { showMessage } from '../../components/modals/ModalComfirm';
import { showRecordVideoModal } from '../../components/modals/ModalRecordVideo';
import { useLoading } from '../../hooks';
import ActivateApi from '../../services/api/activate.api';
import Security from '../../utils/Security';
import { NavigationProp } from '../Home/HomeScreen';
import StartVideoCallScreen from './StartVideoCallScreen';
import WaitingVideoCallScreen from './WaitingVideoCallScreen';

const BASE_URL_SOCKET = "https://socket.skyfi.network/";
const JITSI_MEET_URL = "meet.skyfi.network";

const guidedVideoCallId = `Tất cả các KTV đều đang bận. Vui lòng thực hiện quay Video và làm theo hướng dẫn sau để SkyFi hỗ trợ ĐKTT cho Bạn nhé!
Bước 1: Để khuôn mặt vào giữa khung hình và bấm Bắt đầu quay \nBước 2: Thực hiện quay trái và quay phải \nBước 3: Đọc số thuê bao cần đăng ký \nBước 4: Bấm Gửi Video để hoàn tất`; // ID cuộc gọi hướng dẫn

interface MeetingBrowserProps {
  route: any;
}

const MeetingBrowser = ({ route }: MeetingBrowserProps) => {

  const roomRef = useRef(null);
  const socketRef = useRef<any>(null);
  const { load, close } = useLoading();
  const jitsiURL = JITSI_MEET_URL;
  const navigation = useNavigation<NavigationProp>();
  const { phoneNumber, detail_id, currentSerial } = route.params;


  const [token, setToken] = useState("");
  const [room, setRoom] = useState<string>("");

  const [tellerId, setTellerId] = useState<string>("");
  const [typeStopCall, setTypeStopCall] = useState<string>("1");

  const [roomStatus, setRoomStatus] = useState("disconnected");
  const [socketStatus, setSocketStatus] = useState("disconnected");



  const onReadyToClose = () => {
    _onEndButtonPress("1");

  };

  const onEndpointMessageReceived = useCallback(() => {
    console.log('You got a message!');
  }, []);

  const startCall = () => {
    setSocketStatus("client-start-call");
    socketRef.current.emit("client-start-call", {
      telNumber: phoneNumber,
      serial: currentSerial,
      roomType: "Jitsi",
    });
  }

  const onResetHome = () => {
    setSocketStatus("disconnected");
    setRoomStatus("disconnected");
    // @ts-ignore
    navigation.popToTop();
  }


  const _onEndButtonPress = (typeStopCall: string) => {
    setRoomStatus("disconnected");
    setToken("");
    setRoom("");
    setTellerId("");
    socketRef?.current.emit("client-stop-call", { id: tellerId });
  };

  // Open the Jitsi meeting in the in-app browser
  const openJitsiMeeting = async (roomId: string, meetingToken: string) => {
    try {
      ;
      // /jitsi-meeting?url=meet.itel.vn&token=YOUR_JWT_TOKEN&roomName=YOUR_ROOM_NAME
      const meetingUrl = `https://skyfi.network/jitsi-meeting?url=${jitsiURL}&token=${meetingToken}&roomName=${roomId}`;

      console.log('Opening Jitsi meeting in browser:', meetingUrl);
      // Open in RNInBrowserApp
      const result = await openInAppBrowser(meetingUrl, {
        showCloseButton: true,
        onUrlChange: (url) => {
          console.log('🔄 URL changed to:', url);

        }

      });

      console.log('Browser closed with result:', result);

      // When browser is closed, handle cleanup
      _onEndButtonPress("1");

    } catch (error: any) {
      console.error('Error opening in-app browser:', error);
      Alert.alert('Error', `Failed to open meeting: ${error.message}`);
      _onEndButtonPress("1");
    }
  };


  useEffect(() => {
    const socketURL = BASE_URL_SOCKET;
    const socket = io(socketURL, {
      transports: ["websocket"],
    });

    socketRef.current = socket;

    socket.on("connecting-free-teller", () => {
      setSocketStatus("waiting-accept");
    });

    socket.on("start-call", (data) => {
      setRoom(data.roomId);
      roomRef.current = data.roomId;
      setTellerId(data.id);
      setToken(data.token);
      setSocketStatus("start-call");
      setRoomStatus("connected");

      // Open the meeting in RNInBrowserApp
      openJitsiMeeting(data.roomId, data.token);
    });

    socket.on("admin-stop-call", (data) => {
      setSocketStatus("admin-stop-call");
      setTypeStopCall("2");
      _onEndButtonPress("2");
    });

    socket.on("admin-refuse-call", (data) => {
      setSocketStatus("refuse");
    });

    socket.on("admin-request-sign", (data: string) => {
      setSocketStatus("admin-request-sign");
    });

    socket.on("admin-send-request-capture-image", async (data) => {
      setSocketStatus("admin-send-request-capture-image");
      Alert.alert("Thông báo", `Vui lòng chụp ${data.imageType}`);
    });

    socket.on("no-free-teller", (data) => {
      setSocketStatus("no-teller");
      actionNoTeller();
    });

    socket.on("admin-send-registration-form", (data) => {
      setSocketStatus("admin-send-registration-form");
    });
    socket.on("admin-start-recording", (data) => {
      setSocketStatus("admin-start-recording");
    });

    socket.on("register-result", (data) => {
      setSocketStatus("register-result");
      if (data?.isSuccess) {
        navigation.navigate('ResultVideoCall', { status: 'success' })
      } else {
        navigation.navigate('ResultVideoCall', { status: 'error' })
      }
    });

    socket.on("connecting-free-teller", () => {
      setSocketStatus("waiting-accept");
    });

    //admin-reject-client-registration
    socket.on("admin-reject-client-registration", (data) => {
      socketRef.current = "admin-reject-client-registration";
      adminRejectClientRegistration();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const adminRejectClientRegistration = async () => {

    const status = await showMessage({
      title: 'Gửi yêu cầu thất bại!',
      description: 'Đăng ký/Cập nhật thất bại do hồ sơ chưa hợp lệ. Vui lòng kiểm tra và thực hiện lại Bạn nhé!',
      closeLabel: 'Thực hiện lại',
      confirmLabel: 'Gửi Video',
    });
    if (status) {
      await saveVideo();
      return;
    }
    onResetHome();
  }


  const actionNoTeller = async () => {
    const status = await showMessage({
      title: 'Thông báo',
      description: 'Tất cả các KTV đều đang bận. Nhấn Gọi lại để tiép thực hiện lại cuộc gọi hoặc Đăng ký để Tiếp tục thực hiện ĐKTT thuê bao của Bạn.',
      closeLabel: 'Đăng ký',
      confirmLabel: 'Gọi lại',

    });
    if (status) return;
    const statusRecordVideo = await showMessage({
      title: 'Thông báo',
      description: guidedVideoCallId,
      confirmLabel: 'Bắt đầu quay',
      textAlign: 'left',
    })
    console.log('statusRecordVideo', statusRecordVideo);

    if (!statusRecordVideo) return;
    await saveVideo();
  }

  const saveVideo = async () => {
    const video = await showRecordVideoModal({
      maxDuration: 20, // seconds
      cameraPosition: 'front' // or 'front'
    });
    if (!video) return;

    const dataForm = new FormData();
    dataForm.append('id', detail_id);
    dataForm.append('code', Security.hashSecureCode(detail_id));
    dataForm.append('files', {
      uri: Platform.OS === 'ios' ? video.path.replace('file://', '') : video.path,
      type: 'video/mp4',
      name: `${detail_id}.mp4`,
    });
    load();
    try {
      const response = await ActivateApi.saveVideoNoTeller(dataForm);
      if (response.code === 200) {
        showMessage({
          title: 'Thông báo',
          description: 'Gửi video thành công. Chúng tôi sẽ liên hệ lại với Bạn trong thời gian sớm nhất!',
          confirmLabel: 'Đồng ý',

        })
      } else {
        showMessage({
          title: 'Thông báo',
          description: response.message || 'Gửi video thất bại. Vui lòng thử lại sau!',
          confirmLabel: 'Đồng ý',

        })
      }


    } catch (error) {
      showMessage({
        title: 'Thông báo',
        description: 'Gửi video thất bại. Vui lòng thử lại sau!',
        confirmLabel: 'Đồng ý',

      })
    } finally {
      close();
    }
  }

  return (
    <View style={{ flex: 1 }}>
      {roomStatus == 'disconnected' && socketStatus == 'waiting-accept' ? <WaitingVideoCallScreen
        onStopCall={() => {
          _onEndButtonPress("1");
        }}
      /> :
        <View style={{ backgroundColor: "white", flex: 1 }}>
          <StartVideoCallScreen
            onPressStart={() => startCall()}
            onPressHome={() => onResetHome()}

          />
        </View>}
    </View>
  );
};

export default MeetingBrowser;
