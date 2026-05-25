# mitots_ai_solutions

A new Flutter desktop application.

---

# Supported Platforms

This project supports:

- Linux
- Windows
- macOS
- Android
- iOS
- Web

---

# Flutter Installation

Install Flutter SDK from:

https://flutter.dev

Check installation:

```bash
flutter --version
```

---

# Linux Setup

Install required Linux desktop dependencies:

```bash
sudo apt update

sudo apt install -y \
clang \
cmake \
ninja-build \
pkg-config \
libgtk-3-dev \
liblzma-dev \
mesa-utils
```

Enable Linux desktop support:

```bash
flutter config --enable-linux-desktop
```

Verify Flutter environment:

```bash
flutter doctor
```

---

# Project Setup

## Generate Missing Platform Files

```bash
flutter create .
```

This safely creates missing platform folders such as:

- linux/
- web/

without affecting existing project code.

---

# Install Dependencies

```bash
flutter pub get
```

This installs all required Flutter/Dart packages from `pubspec.yaml`.

---

# Run Application

## Linux Desktop

```bash
flutter run -d linux
```

---

## Windows Desktop

```bash
flutter run -d windows
```

---

## macOS Desktop

```bash
flutter run -d macos
```

---

## Android

```bash
flutter run -d android
```

or simply:

```bash
flutter run
```

when an Android device/emulator is connected.

---

## Web (Chrome)

```bash
flutter run -d chrome
```

---

# Build Release Versions

## Linux Build

```bash
flutter build linux
```

Output:

```text
build/linux/x64/release/bundle/
```

---

## Windows Build

```bash
flutter build windows
```

Output:

```text
build/windows/x64/runner/Release/
```

---

## macOS Build

```bash
flutter build macos
```

---

## Android APK

```bash
flutter build apk
```

APK Output:

```text
build/app/outputs/flutter-apk/
```

---

## Android App Bundle

```bash
flutter build appbundle
```

Used for Google Play Store deployment.

---

## Web Build

```bash
flutter build web
```

Output:

```text
build/web/
```

---

# Useful Commands

## Show Connected Devices

```bash
flutter devices
```

---

## Check Flutter Environment

```bash
flutter doctor
```

---

## Clean Build Cache

```bash
flutter clean
```

---

## Upgrade Flutter

```bash
flutter upgrade
```

---

# Recommended IDE

## Visual Studio Code

https://code.visualstudio.com

Recommended Extensions:

- Flutter
- Dart

---

# Flutter Documentation

Official Docs:

https://docs.flutter.dev

Linux Desktop Docs:

https://docs.flutter.dev/platform-integration/linux/building