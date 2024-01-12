export const getKoreanParticle = (
  name: string,
  josaType: '와/과' | '을/를' | '이/가' | '은/는'
) => {
  const lastChar = name.charCodeAt(name.length - 1);

  /**
   * Ref: 한글 유니코드
   * 초성 인덱스 = ((한글 유니코드값 - 0xAC00) / 28) / 21
   * 중성 인덱스 = ((한글 유니코드값 - 0xAC00) / 28) % 21
   * 종성 인덱스 = (한글 유니코드값 - 0xAC00) % 28
   */
  const isThereLastChar = (lastChar - 0xac00) % 28;

  switch (josaType) {
    case '와/과':
      return isThereLastChar ? '과' : '와';

    case '을/를':
      return isThereLastChar ? '을' : '를';

    case '이/가':
      return isThereLastChar ? '이' : '가';

    case '은/는':
      return isThereLastChar ? '은' : '는';

    default:
      return '';
  }
};
