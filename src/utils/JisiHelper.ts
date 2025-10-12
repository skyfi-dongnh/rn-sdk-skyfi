const JitsiFlags = {
  "add-people.enabled": false,
  "toolbar.enabled": false,
  "chat.enabled": false,
  "invite.enabled": false,
  'tile-view.enabled': true,
  "meeting-name.enabled": true,
  "settings.enabled": false,
  "prejoinpage.hideDisplayName": false,
  "prejoinpage.enabled": false,
  "toolbox.alwaysVisible": true,
  "toolbox.enabled": true,
  "welcomepage.enabled": false,
  "prejoin-screen.enabled": false,
  "video-share.enabled": false,
  "server-url-change.enabled": false,
  "security-options.enabled": false,
  resolution: false,
  "overflow-menu.enabled": false,
  "loppy.enabled": false,
  "help.enabled": false,
  "raise-hand.enabled": false,
  "feedback.enabled": false,
  "stats.enabled": false,
  "shortcuts.enabled": false,
  "filmstrip.enabled": true,
  "notifications.enabled": false,
  "reactions.enabled": false,
  "reactions.menu.enabled": false,
  "lobby-mode.enabled": true,
  "call-integration.enabled": false,
  "subtitles.enabled": true,
  "calendar.enabled": false,
  "car-mode.enabled": false,
};

const shareRoomType = (value: number) => {
  console.log("shareRoomType value", value);
  // value is a number between 0 and 1
  // 1 means always Jitsi
  // 0 means always Twilio
  return Math.random() <= value ? "Jitsi" : "Twilio";
  // return "Jitsi";
};

export { JitsiFlags, shareRoomType };
