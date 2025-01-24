import jwt from "jsonwebtoken";
import prisma from "../config/dbConfig.js";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "access_secret";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "refresh_secret";

interface TokenPayload {
  userId: number;
  email: string;
}

class TokenService {
  // Generate access token
  static generateAccessToken(payload: TokenPayload): string {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
  }

  // Generate refresh token
  static generateRefreshToken(payload: TokenPayload): string {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });
  }

  // Verify access token
  static verifyAccessToken(token: string): TokenPayload | null {
    try {
      return jwt.verify(token, ACCESS_TOKEN_SECRET) as TokenPayload;
    } catch {
      return null;
    }
  }

  // Verify refresh token
  static verifyRefreshToken(token: string): TokenPayload | null {
    try {
      return jwt.verify(token, REFRESH_TOKEN_SECRET) as TokenPayload;
    } catch {
      return null;
    }
  }

  // Store refresh token in database
  static async storeRefreshToken(userId: number, token: string): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: {
        refreshToken: token,
        lastLogin: new Date(),
      },
    });
  }

  // Invalidate refresh token
  static async invalidateRefreshToken(userId: number): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: { refreshToken: "" },
    });
  }

  // Refresh tokens
  static async refreshTokens(refreshToken: string) {
    // Verify refresh token
    const decoded = this.verifyRefreshToken(refreshToken);
    if (!decoded) {
      throw new Error("Invalid refresh token");
    }

    // Check if token exists in database
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
        refreshToken,
      },
    });

    if (!user) {
      throw new Error("Refresh token not found");
    }

    // Generate new tokens
    const newAccessToken = this.generateAccessToken({
      userId: user.id,
      email: user.email,
    });

    const newRefreshToken = this.generateRefreshToken({
      userId: user.id,
      email: user.email,
    });

    // Store new refresh token
    await this.storeRefreshToken(user.id, newRefreshToken);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}

export default TokenService;
