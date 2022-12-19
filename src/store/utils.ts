export const parseIds = (data: any) => {
  const idKeys = Object.keys(data).filter((key) => key.endsWith('Id'));
  idKeys.forEach((key) => {
    data[key] = parseInt(data[key]);
  });
  return data;
};
