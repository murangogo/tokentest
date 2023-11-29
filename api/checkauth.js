import jwt from 'jsonwebtoken';

export default async function checkAuth(request, response) {
  try {
    const token = request.cookies.token;
    if (!token) {
      return response.status(401).json({ error: '未授权' });
    }

    const decoded = jwt.verify(token, 'ABCDEF123');
    // 令牌有效，返回用户信息或其他需要的数据
    return response.status(200).json({ username: decoded.username });
  } catch (error) {
    return response.status(401).json({ error: '无效的令牌或令牌已过期' });
  }
}
