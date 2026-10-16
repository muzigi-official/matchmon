import { useState } from 'react';

import Button from '@/components/common/Button';
import { colors } from '@/styles/colors';
import { radius, shadow, spacing } from '@/styles/tokens';
import { typography } from '@/styles/typography';

/**
 * 디자인 토큰 쇼케이스 (임시)
 * - 로그인/백엔드 없이 /__design 에서 바로 확인
 * - 토큰(colors/typography/tokens)과 공통 컴포넌트를 그대로 사용
 * - 디자인 확정 후 라우트와 함께 제거 가능
 */

const page: React.CSSProperties = {
  fontFamily: typography.fontFamily,
  background: colors.background,
  color: colors.text.basic,
  minHeight: '100vh',
  padding: '40px',
  boxSizing: 'border-box',
};

const section: React.CSSProperties = {
  maxWidth: 960,
  margin: '0 auto 40px',
};

const sectionTitle: React.CSSProperties = {
  fontSize: typography.heading3.fontSize,
  fontWeight: 700,
  marginBottom: spacing.lg,
  paddingBottom: spacing.sm,
  borderBottom: `1px solid ${colors.border.basic}`,
};

const row: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: spacing.md,
  alignItems: 'center',
};

const card: React.CSSProperties = {
  background: colors.white,
  borderRadius: radius.lg,
  boxShadow: shadow.md,
  padding: spacing.xl,
  position: 'relative',
  overflow: 'hidden',
  maxWidth: 420,
};

const badge = (bg: string, fg: string): React.CSSProperties => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  background: bg,
  color: fg,
  borderRadius: radius.full,
  padding: '6px 14px',
  fontSize: typography.caption.fontSize,
  fontWeight: 700,
});

const swatch = (bg: string): React.CSSProperties => ({
  width: 72,
  height: 56,
  borderRadius: radius.md,
  background: bg,
  border: `1px solid ${colors.border.basic}`,
});

const swatchWrap: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
  alignItems: 'center',
  fontSize: 11,
  color: colors.text.sub,
};

export default function DesignShowcase() {
  const [inputValue, setInputValue] = useState('');

  return (
    <div style={page}>
      <div style={section}>
        <h1 style={{ ...typography.heading1, margin: 0 } as React.CSSProperties}>MatchMon 디자인 쇼케이스</h1>
        <p style={{ color: colors.text.sub, marginTop: spacing.sm }}>
          Stadium Blue + Cyan · Pretendard · 임시 페이지(/__design)
        </p>
      </div>

      {/* 타이포그래피 */}
      <div style={section}>
        <div style={sectionTitle}>타이포그래피</div>
        <div style={{ ...typography.heading1 } as React.CSSProperties}>Heading 1 · 대회 목록</div>
        <div style={{ ...typography.heading2 } as React.CSSProperties}>Heading 2 · 참가팀 관리</div>
        <div style={{ ...typography.heading3 } as React.CSSProperties}>Heading 3 · 경기 일정</div>
        <div style={{ ...typography.body, marginTop: spacing.sm } as React.CSSProperties}>
          Body · 전국의 아마추어 풋살 대회를 한눈에 보고 참가 신청할 수 있습니다.
        </div>
        <div style={{ ...typography.caption, color: colors.text.sub } as React.CSSProperties}>
          Caption · 2026.11.01 (금) 서울 OO체육관
        </div>
      </div>

      {/* 색상 팔레트 */}
      <div style={section}>
        <div style={sectionTitle}>색상 팔레트</div>
        <div style={row}>
          <div style={swatchWrap}>
            <div style={swatch(colors.primary)} />
            primary
          </div>
          <div style={swatchWrap}>
            <div style={swatch(colors.primaryDark)} />
            primaryDark
          </div>
          <div style={swatchWrap}>
            <div style={swatch(colors.primaryLight)} />
            primaryLight
          </div>
          <div style={swatchWrap}>
            <div style={swatch(colors.secondary)} />
            secondary
          </div>
          <div style={swatchWrap}>
            <div style={swatch(colors.secondaryLight)} />
            secondaryLight
          </div>
          <div style={swatchWrap}>
            <div style={swatch(colors.success.default)} />
            success
          </div>
          <div style={swatchWrap}>
            <div style={swatch(colors.warning.default)} />
            warning
          </div>
          <div style={swatchWrap}>
            <div style={swatch(colors.error.default)} />
            error
          </div>
          <div style={swatchWrap}>
            <div style={swatch(colors.cancel.default)} />
            neutral
          </div>
        </div>
      </div>

      {/* 버튼 */}
      <div style={section}>
        <div style={sectionTitle}>버튼</div>
        <div style={row}>
          <Button variant="contained">참가 신청</Button>
          <Button variant="contained" color="secondary">
            지금 신청
          </Button>
          <Button variant="outlined">상세 보기</Button>
          <Button variant="text">취소</Button>
          <Button variant="contained" disabled>
            마감
          </Button>
          <Button variant="contained" selected>
            선택됨
          </Button>
        </div>
        <div style={{ ...row, marginTop: spacing.lg, maxWidth: 320 }}>
          <Button variant="contained" block>
            블록 버튼 (전체 너비)
          </Button>
        </div>
      </div>

      {/* 입력 */}
      <div style={section}>
        <div style={sectionTitle}>입력 필드</div>
        <div style={{ maxWidth: 360 }}>
          <label>팀 이름</label>
          <input
            placeholder="팀 이름을 입력하세요"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
          <label>비활성</label>
          <input placeholder="수정 불가" disabled />
        </div>
      </div>

      {/* 카드 + 뱃지 */}
      <div style={section}>
        <div style={sectionTitle}>대회 카드</div>
        <div style={card}>
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: 6,
              background: colors.primary,
            }}
          />
          <div style={{ ...typography.heading3, marginBottom: spacing.xs } as React.CSSProperties}>
            제1회 금요 풋살 리그
          </div>
          <div style={{ color: colors.text.sub, marginBottom: spacing.md }}>2026.11.01 (금) · 서울 OO체육관</div>
          <div style={{ ...row, marginBottom: spacing.lg }}>
            <span style={badge(colors.primaryLight, colors.primaryDark)}>
              <span
                style={{ width: 7, height: 7, borderRadius: '50%', background: colors.primary, display: 'inline-block' }}
              />
              모집중
            </span>
            <span style={badge(colors.success.lighter, colors.success.default)}>확정</span>
            <span style={badge(colors.warning.lighter, colors.warning.default)}>대기</span>
            <span style={badge(colors.secondaryLight, colors.secondaryDark)}>NEW</span>
          </div>
          <div style={row}>
            <Button variant="contained">참가 신청</Button>
            <Button variant="outlined">상세 보기</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
