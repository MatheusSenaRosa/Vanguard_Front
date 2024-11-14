import * as S from "./styles";

export const Skeleton = () => {
  return (
    <>
      {Array(3)
        .fill(null)
        .map((_, index) => (
          <S.Skeleton key={index} />
        ))}
    </>
  );
};
