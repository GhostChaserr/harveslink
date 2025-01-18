export const getS3UniqueFilePathId = (): string => {
  return new Date().getTime().toString();
};
