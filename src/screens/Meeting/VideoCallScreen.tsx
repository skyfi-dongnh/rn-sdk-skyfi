import { JitsiMeeting } from '@jitsi/react-native-sdk';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Dimensions, Platform, View } from 'react-native';
import { io } from "socket.io-client";

import { showMessage } from '../../components/modals/ModalComfirm';
import { showRecordVideoModal } from '../../components/modals/ModalRecordVideo';
import { useLoading } from '../../hooks';
import ActivateApi from '../../services/api/activate.api';
import { JitsiFlags } from '../../utils';
import Security from '../../utils/Security';
import { NavigationProp } from '../Home/HomeScreen';
import StartVideoCallScreen from './StartVideoCallScreen';
import WaitingVideoCallScreen from './WaitingVideoCallScreen';

const { width, height } = Dimensions.get('window');

const BASE_URL_SOCKET = "https://socket.skyfi.network/";
const JITSI_MEET_URL = "https://meet.skyfi.network/";

const guidedVideoCallId = `Tất cả các KTV đều đang bận. Vui lòng thực hiện quay Video và làm theo hướng dẫn sau để SkyFi hỗ trợ ĐKTT cho Bạn nhé!
Bước 1: Để khuôn mặt vào giữa khung hình và bấm Bắt đầu quay \nBước 2: Thực hiện quay trái và quay phải \nBước 3: Đọc số thuê bao cần đăng ký \nBước 4: Bấm Gửi Video để hoàn tất`; // ID cuộc gọi hướng dẫn

interface MeetingProps {
  route: any;
}

const Meeting = ({ route }: MeetingProps) => {

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

  const eventListeners = {
    onReadyToClose,
    onEndpointMessageReceived
  };

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
    if (roomRef.current) {
      roomRef.current.close();
    }
  };


  // useEffect(() => {
  //   requestPermission();
  // }, []);

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
      // _onEndButtonPressMoveRecord(2);
      actionNoTeller();
    });

    socket.on("admin-send-registration-form", (data) => {
      setSocketStatus("admin-send-registration-form");
    });
    socket.on("admin-start-recording", (data) => {
      setSocketStatus("admin-start-recording");
      // _onEndButtonPressMoveRecord(2);
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

      {roomStatus == 'connected' && <JitsiMeeting
        config={{
          hideConferenceTimer: false,
          subject: phoneNumber,
          configOverwrite: {
            subject: phoneNumber,
            prejoinPageEnabled: false,
            welcomePageEnabled: false,
            startWithAudioMuted: false,
            startWithVideoMuted: false,
            deeplinking: { disabled: true },
            enableNoisyMicDetection: true,
            prejoinConfig: {
              enabled: false,
            },
            lobby: {
              enableChat: false,
              autoKnock: false,
            },
            securityUi: {
              hideLobbyButton: true,
            },
          },
        }}
        eventListeners={eventListeners as any}
        flags={JitsiFlags}
        room={room}
        token={token}
        ref={roomRef}
        serverURL={jitsiURL}
        style={{
          width: width,
          height: height,
          position: "absolute",
          flex: 1,
        }}
      />}
    </View>
  );
};


// {roomStatus == 'connected' && <WebView
//       // ref={webViewRef}
//       url={`https://skyfi.network/jitsi-meeting?url=${jitsiURL}&token=${token}&roomName=${room}`}
//       onLoadEnd={(e) => console.log('Loaded:', e.nativeEvent.url)}
//       style={{ flex: 1 ,position: 'absolute', top: 0, left: 0, width: width, height: height}}
//     >
//       <Button
//         title="Go Back"
//         onPress={() => _onEndButtonPress("1")}
//       />
//     </WebView>
//     }
export default Meeting;