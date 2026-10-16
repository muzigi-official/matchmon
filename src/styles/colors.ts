// colors.ts
// MatchMon 디자인 토큰 — Stadium Blue(메인) + Cyan(포인트)
// 기존 키 이름은 유지(참조 호환). 값만 리뉴얼.
export const colors = {
  // ===== Primary: Stadium Blue =====
  primary: '#2563EB', // 메인 (blue-600)
  primaryLight: '#DBEAFE', // 연한 배경/선택 (blue-100)
  primaryOpacity: '#2563EB26', // 15% 투명 (선택 하이라이트)
  primaryDark: '#1D4ED8', // hover/강조 (blue-700)

  // ===== Secondary(포인트): Cyan =====
  secondary: '#06B6D4', // 포인트 CTA (cyan-500)
  secondaryLight: '#CFFAFE', // 연한 포인트 배경 (cyan-100)
  secondaryDark: '#0E7490', // 포인트 진하게 (cyan-700)

  background: '#F8FAFC', // 전체 배경 (slate-50)

  hover: '#2563EB0F', // 6% 투명 블루 (리스트 hover)
  disabled: {
    border: '#E2E8F0',
    color: '#94A3B8',
    backgroundColor: '#F1F5F9',
  },

  white: '#FFFFFF',
  black: '#0F172A', // 순검정 대신 slate-900 (덜 딱딱하고 모던)

  border: {
    basic: '#E2E8F0', // slate-200
    darken: '#CBD5E1', // slate-300
    black: '#0F172A',
  },
  text: {
    basic: '#0F172A', // 본문 (slate-900)
    sub: '#475569', // 보조 텍스트 (slate-600)
    placeholder: '#94A3B8', // placeholder (slate-400)
    error: '#EF4444',
  },

  success: {
    default: '#16A34A',
    lighter: '#DCFCE7',
  },
  error: {
    default: '#EF4444',
    lighter: '#FEE2E2',
  },
  warning: {
    default: '#F59E0B',
    lighter: '#FEF3C7',
  },
  info: {
    default: '#2563EB',
    lighter: '#DBEAFE',
  },
  cancel: {
    default: '#64748B',
    lighter: '#F1F5F9',
  },
};
