const renameKeys = (obj, newKeys) => {
  const keyValues = Object.keys(obj).map((key) => {
    const newKey = newKeys[key] || key;
    return { [newKey]: obj[key] };
  });
  return Object.assign({}, ...keyValues);
};

const apiKeysMap = {
  email: 'email',
  username: 'ten_tai_khoan',
  lastName: 'ten_nhan_vien',
  password: 'mat_khau',
};

const cleanedKeysMap = {
  email: 'email',
  ten_tai_khoan: 'username',
  ten_nhan_vien: 'name',
  mat_khau: 'password',
};

export { renameKeys, apiKeysMap, cleanedKeysMap };