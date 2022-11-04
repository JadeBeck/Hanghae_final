const { Users } = require("../models");
const { Op } = require("sequelize");

class UsersRepository {
  // 회원가입을 위한 함수
  signUp = async (
    id,
    nickname,
    password,
    address,
    likePlace,
    birth,
    gender,
    likeGame,
    salt
  ) => {
    // create로 회원가입
    const createAccountData = await Users.create({
      id,
      nickname,
      password,
      address,
      likePlace,
      birth,
      gender,
      likeGame,
      salt,
    });
    return createAccountData;
  };

  // 유저 id 찾기
  findUserAccountId = async (id) => {
    const findUserAccountData = await Users.findOne({
      where: { id },
    });
    return findUserAccountData;
  };

  // 유저 nickname 찾기
  findUserAccountNick = async (nickname) => {
    const findUserAccountData = await Users.findOne({
      where: { nickname },
    });
    return findUserAccountData;
  };

  // 유저 정보 조회 by 아이디와 닉네임을 위한 함수
  findUserAccount = async (id, nickname) => {
    // findOne로 id, nickname으로 이루어진 정보가 있는지 확인
    const findUserAccountData = await Users.findOne({
      where: {
        [Op.or]: [{ id }, { nickname }],
      },
    });
    return findUserAccountData;
  };

  // 로그인을 위한 함수
  login = async (id) => {
    // findOne으로 email이 있는지 확인
    const loginData = await Users.findOne({ where: { id } });
    return loginData;
  };

  // refreshToken 업데이트 하는 함수
  updateToken = async (id, refresh_token) => {
    const updateTokenData = await Users.update(
      { refresh_token: refresh_token },
      { where: { id: id } }
    );
    return updateTokenData;
  };

  findUserData = async (id) => {
    const findUserData = await Users.findOne({
      attributes: ["nickname", "likeGame", "birth", "gender", "likePlace"],
    });
    return findUserData;
  };
}

module.exports = UsersRepository;
