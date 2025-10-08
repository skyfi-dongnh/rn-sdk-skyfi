
# Native Integration

### iOS
- iOS native files are in `ios/RNSkyFiSdk/`.
- Use Swift for new modules.
- Keep `Info.plist` and privacy files updated.

### Android
- Android config files: `build.gradle`, `settings.gradle`, `gradle.properties`.
- Use Kotlin for new modules.

### Cross-Platform Notes
- Match native module names consistently (Swift ↔ Kotlin ↔ JS).
- When exposing native features (e.g. Bluetooth, Camera), create TypeScript wrappers.