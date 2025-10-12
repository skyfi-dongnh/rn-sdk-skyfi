import { PERMISSIONS, requestMultiple } from "react-native-permissions";

const requestPermission = () => {
    requestMultiple([
        PERMISSIONS.ANDROID.CAMERA,
        PERMISSIONS.ANDROID.RECORD_AUDIO,
    ])
        .then((results) => { })
        .catch((err) => { });
};
export {
    requestPermission
}