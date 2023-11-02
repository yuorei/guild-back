import express, { NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../domain/user";
import { getUserById } from "../application/user";

// ExpressのRequest型を拡張
declare global {
	namespace Express {
		interface Request {
			user?: User; // ユーザーに関する情報がここに追加されます
		}
	}
}

// JWTトークンを復号する処理
const tokenDecode = (req: express.Request) => {
	// リクエストヘッダーの"authorization"を取得
	const bearerHeader = req.headers.authorization;
	// 認証情報が存在する場合
	if (bearerHeader) {
		// トークンを取得
		const bearer = bearerHeader.split(" ")[1];

		try {
			// トークンを復号
			const decodedToken = jwt.verify(
				bearer,
				!process.env.TOKEN_SECRET_KEY ? "secret" : process.env.TOKEN_SECRET_KEY,
			);

			return decodedToken;
		} catch {
			return false;
		}
	} else {
		return false;
	}
};

// JWTを検証するためのミドルウェア
export const verifyToken = async (
	req: express.Request,
	res: express.Response,
	next: NextFunction
) => {
	// 復号したトークンを取得
	const decodedToken = tokenDecode(req);

	// トークンが存在する場合
	if (decodedToken) {
		// ユーザーを取得（トークンはもともとユーザーのIDから生成したものであるため検索可能）
		const user = await getUserById((decodedToken as jwt.JwtPayload).id);
		// ユーザーが存在しない場合
		if (!user) {
			return res.status(401).json(
				{
					error: "ユーザーが存在しません",
				}
			);
		}

		// リクエスト情報を取得したユーザーで上書き
		req.user = user;
		console.log(req.user.id);
		next();
	} else {
		return res.status(403).json(
			{
				error: "認証情報が存在しません",
			}
		);
	}
};

// JWTの発行関数
export const issueToken = (user: User) => {
	return jwt.sign(
		{
			id: user.id,
		},
		!process.env.TOKEN_SECRET_KEY ? "secret" : process.env.TOKEN_SECRET_KEY,
		{
			expiresIn: "24h",
		}
	);
};