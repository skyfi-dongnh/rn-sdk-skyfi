import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Dimensions, Alert, View } from 'react-native';
import { JitsiMeeting } from '@jitsi/react-native-sdk';
import { useNavigation } from '@react-navigation/native';
import { io } from "socket.io-client";

import StartVideoCallScreen from './StartVideoCallScreen';
import WaitingVideoCallScreen from './WaitingVideoCallScreen';
import { JitsiFlags, requestPermission } from '../../utils';

const { width, height } = Dimensions.get('window');

const BASE_URL_SOCKET = "https://socket.skyfi.network/";
const JITSI_MEET_URL = "https://meet.skyfi.network/";

interface MeetingProps {
  route: any;
}

const Meeting = ({ route }: MeetingProps) => {

  const roomRef = useRef(null);
  const socketRef = useRef<any>(null);

  const jitsiURL = JITSI_MEET_URL;
  const navigation = useNavigation();
  const { phoneNumber, logVideoCallId, currentSerial } = route.params;


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
        Alert.alert("Thành công", "Hồ sơ của Bạn đã được xử lý thành công và sẵn sàng sử dụng. Chi tiết LH 0877087087 (0đ cho TB iTel). Trân trọng.");
      } else {
        Alert.alert("Thất bại!", "TB đăng ký thất bại. Chi tiết LH 0877087087(0đ cho TB iTel). Trân trọng.");
      }
    });

    socket.on("connecting-free-teller", () => {
      setSocketStatus("waiting-accept");
    });

    //admin-reject-client-registration
    socket.on("admin-reject-client-registration", (data) => {
      socketRef.current = "admin-reject-client-registration";
      // ActionSheets.showAlert({
      //   title: "Thông báo",
      //   contentButton: "Chụp lại",
      //   content:
      //     "Đăng ký/Cập nhật thất bại do hồ sơ chưa hợp lệ. Vui lòng kiểm tra và thực hiện lại Bạn nhé!",
      //   onOk: () => {
      //     onResetToInput();
      //   },
      // });
      Alert.alert("Thông báo", "Đăng ký/Cập nhật thất bại do hồ sơ chưa hợp lệ. Vui lòng kiểm tra và thực hiện lại Bạn nhé!");
    });

    return () => {
      socket.disconnect();
    };
  }, []);


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

export default Meeting;