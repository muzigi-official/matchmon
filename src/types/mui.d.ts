import '@mui/material/styles';

// 테마(src/theme/Theme.tsx)에서 palette.text.info를 실제로 설정하므로,
// MUI 기본 TypeText 타입에 info를 추가해 타입과 런타임 값을 일치시킨다.
declare module '@mui/material/styles' {
  interface TypeText {
    info?: string;
  }
}
