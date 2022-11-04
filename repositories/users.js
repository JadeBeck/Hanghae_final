const { Users } = require("../models");   
const { Op } = require("sequelize");

class UsersRepository { 

  // 회원가입을 위한 함수
  signUp = async (id, nickname, password, address, salt) => {

    // create로 회원가입
    const createAccountData = await Users.create({
      id,
      nickname,
      password,
      address,
      salt
    });
    return createAccountData;
  };

  // // 유저 정보 조회 by 아이디와 닉네임을 위한 함수
  // findUserAccount = async (id, nickname) => {

  //   // findOne로 id, nickname으로 이루어진 정보가 있는지 확인
  //   const findUserAccountData = await Users.findOne({
  //     where: {
  //       [Op.or]: [{ id }, { nickname }],
  //     },
  //   });
  //   return findUserAccountData;
  // };

  findUserAccountId = async (id) => {

    // findOne로 id  이루어진 정보가 있는지 확인
    const findUserAccountData = await Users.findOne({
      where: {id},
    });
    return findUserAccountData;
  };

  findUserAccountNick = async (nickname) => {

    // findOne로 id  이루어진 정보가 있는지 확인
    const findUserAccountData = await Users.findOne({
      where: {nickname},
    });
    return findUserAccountData;
  };

  // 로그인을 위한 함수
  login = async (id) => {
    
    // findOne으로 email이 있는지 확인
    const loginData = await Users.findOne({ where: {id} });
    return loginData;
  };

  // refreshToken 업데이트 하는 함수
  updateToken = async (id, refresh_token) => {
    const updateTokenData = await Users.update({ refresh_token : refresh_token }, { where: { id : id } });
    return updateTokenData;
  }
}

module.exports = UsersRepository;