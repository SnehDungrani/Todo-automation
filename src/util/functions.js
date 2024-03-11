export const apiGenerator = (apiObject, exchangePair = {}, join = null) => {
  const apiObj = { ...apiObject };
  console.log(exchangePair);
  if (Object.keys(exchangePair).length) {
    Object.keys(exchangePair).forEach((el) => {
      apiObj.endpoint = apiObj.endpoint.replace(`:${el}`, exchangePair[el]);
    });
  }

  if (join) {
    apiObj.endpoint = `${apiObj.endpoint}${join}`;
  }
  return apiObj;
};
