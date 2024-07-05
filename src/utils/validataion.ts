export const idValidation = {
  required: '필수 값입니다.',
  minLength: {
    value: 6,
    message: '아이디는 6 자리 이상이어야 합니다.',
  },
};

export const emailValidation = {
  required: '필수 값입니다.',
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: '이메일 형식이 올바르지 않습니다.',
  },
};

export const passwordValidation = {
  required: '필수 값입니다.',
  minLength: {
    value: 8,
    message: '비밀번호는 8자리 이상이어야 합니다.',
  },
  pattern: {
    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
    message: '비밀번호 형식이 맞지 않습니다.',
  },
};
