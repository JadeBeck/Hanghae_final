const UsersService = require("../services/users");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class UsersController {
  usersService = new UsersService();

  // 회원가입
  signUp = async (req, res, next) => {
    try {
      const {
        id,
        nickname,
        password,
        confirm,
        address,
        likePlace,
        birth,
        gender,
        likeGame,
      } = req.body;

      await this.usersService.signUp(
        id,
        nickname,
        password,
        confirm,
        address,
        likePlace,
        birth,
        gender,
        likeGame
      );

      res
        .status(201)
        .json({ ok: true, statusCode: 201, message: "회원가입성공" });
    } catch (err) {
      res
        .status(err.status || 400)
        .json({ ok: 0, statusCode: err.status, err: err.message });
    }
  };

  //로그인
  login = async (req, res, next) => {
    try {
      const { id, password } = req.body;

      // 유효성 검사
      const login = await this.usersService.login(id, password);

      if (login === null)
        return res.status(404).send({
          ok: 0,
          statusCode: 404,
          errorMessage: "가입 정보를 찾을 수 없습니다",
        });

      await this.usersService.login(id, password);

      const getNickname = await this.usersService.getNickname(id, password);

      // accesstoken 생성
      const accessToken = jwt.sign({ id: id }, process.env.DB_SECRET_KEY, {
        expiresIn: "15m",
      });

      // refreshtoken 생성
      const refresh_token = jwt.sign({}, process.env.DB_SECRET_KEY, {
        expiresIn: "1d",
      });

      // refreshtoken DB에 업데이트
      await this.usersService.updateToken(id, refresh_token);

      res.status(201).json({
        accessToken: `Bearer ${accessToken}`,
        refresh_token: `Bearer ${refresh_token}`,
        nickname: getNickname.nickname,
      });
    } catch (err) {
      res.status(err.status || 400).json({
        ok: 0,
        statusCode: err.status,
        message: err.message || "로그인 실패",
      });
    }
  };

  // 회원 정보 찾기
  findUser = async (req, res, next) => {
    const { id } = res.locals.user;
    const findUser = await this.usersService.findUserData(id);
    res.status(200).json({ findUser });
  };

  // 회원 정보 변경
  updateUserData = async (req, res, next) => {
    try {
      const { id, nickname } = res.locals.user;
      const { password, confirm, address, likePlace, birth, gender, likeGame } =
        req.body;
      await this.usersService.updateUserData(
        id,
        nickname,
        password,
        confirm,
        address,
        likePlace,
        birth,
        gender,
        likeGame
      );
      res.status(200).json({ ok: 1, statusCode: 200, message: "수정 완료" });
    } catch (err) {
      res.status(err.status || 400).json({
        ok: 0,
        statusCode: err.status,
        message: err.message || "수정 실패",
      });
    }
  };

  // 회원 탈퇴
  deleteUserData = async (req, res, next) => {
    const { userId } = res.locals.user;
    await this.usersService.deleteUserData(userId);
    res.status(200).json({ ok: 1, statusCode: 200, message: "삭제 완료" });
  };
}

module.exports = UsersController;
