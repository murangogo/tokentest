import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Strategy Game登录";
  }, []); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 查询密码
   try {
      setErrorMessage('正在登录，请稍候...');
      const response = await fetch(`/api/checkusers?username=${username}`);
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      if (data.password === password) {
        navigate(`/home?username=${username}`);  // 跳转到主页面
      } else {
        setErrorMessage('密码不正确。');
      }
   } catch (error) {
     setErrorMessage(error.message || '登录失败');
   }
  };
  return (
    <div id="loginform">
      <h2 id="headerTitle">登录</h2>
      <div>
          <form onSubmit={handleSubmit}>

          <div class='row'>
          <label>你是？</label>
          <input
              placeholder="输入用户名..." 
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
            
          <div class='row'>
          <label>真的吗？</label>
          <input
              placeholder="输入密码..."
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
            
          <div id="button" class="row">
          <button type="submit">登录</button>
          </div>

          </form>

          <div id="alternativeLogin">
            <label>{errorMessage}</label>
          </div>
      </div>
    </div>
  );
}

export default LoginPage;
