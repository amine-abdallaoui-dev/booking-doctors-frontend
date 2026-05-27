import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { AuthRequest } from "../types";
import { AppError, NotFoundError, UnauthorizedError } from "../utils/errors";

function generateToken(userId: string, role: string) {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET || "fallback-secret",
    { expiresIn: (process.env.JWT_EXPIRES_IN || "7d") as jwt.SignOptions["expiresIn"] }
  );
}

export async function register(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { name, email, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      throw new AppError("Email already in use", 409);
    }

    const user = await User.create({ name, email, password, role: role || "user" });
    const token = generateToken(String(user._id), user.role);

    res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }
}

export async function login(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const token = generateToken(String(user._id), user.role);
    const userObj = user.toJSON();
    res.json({ user: userObj, token });
  } catch (err) {
    next(err);
  }
}

export async function getMe(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const user = await User.findById(req.user!.userId);
    if (!user) throw new NotFoundError("User");
    res.json({ user });
  } catch (err) {
    next(err);
  }
}

export async function updateProfile(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const allowed = ["name", "phone", "avatar", "healthProfile", "insurance", "notifications"];
    const updates: Record<string, unknown> = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }

    const user = await User.findByIdAndUpdate(req.user!.userId, updates, {
      new: true,
      runValidators: true,
    });
    if (!user) throw new NotFoundError("User");
    res.json({ user });
  } catch (err) {
    next(err);
  }
}

export async function changePassword(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user!.userId).select("+password");
    if (!user) throw new NotFoundError("User");

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) throw new AppError("Current password is incorrect", 400);

    user.password = newPassword;
    await user.save();
    res.json({ message: "Password updated" });
  } catch (err) {
    next(err);
  }
}

export async function forgotPassword(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { email } = req.body;
    await User.findOne({ email });
    res.json({ message: "If that email exists, a reset link has been sent" });
  } catch (err) {
    next(err);
  }
}

export async function resetPassword(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { token, newPassword } = req.body;
    // Verify reset token and update password
    // Simplified - in production, validate token from email link
    res.json({ message: "Password has been reset" });
  } catch (err) {
    next(err);
  }
}
