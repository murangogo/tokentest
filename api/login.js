import db from './dbconnect';
import jwt from 'jsonwebtoken';

export default async function getuserpw(request, response) {
  try {
    const inputUsername = request.query.username;
    const inputPassword = request.query.password;

    // 检查是否提供了用户名
    if (!inputUsername || inputUsername.trim() === '' || !inputPassword || inputPassword.trim() === '') {
      throw new Error('需要用户名和密码。');
  }

    // 查询用户名对应的密码
    const result = await db.oneOrNone('SELECT password FROM users WHERE username = $1', [inputUsername]);
    
    // 检查查询结果
    if (result==null) {
      return response.status(404).json({ error: '你不能使用。' });
    }

    // 比较密码
    if (result.password !== inputPassword) {
      return response.status(401).json({ error: '密码错误。' });
    }

    // 用户验证成功，创建JWT令牌
    const token = jwt.sign({ inputUsername }, 'ABCDEF123', {
      expiresIn: '1h' // 设置令牌过期时间
    });

    const cookie = `token=${token}; Max-Age=3600; HttpOnly; Path=/; SameSite=Strict`;
    response.setHeader('Set-Cookie', cookie);

    return response.status(200).json({ message: '登录成功' });

  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}