import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/checkauth');
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.error || '未授权');
        }else{
          setUsername(data.username);
        }
        
        // 如果用户已登录，可以在这里设置用户状态或执行其他操作
      } catch (error) {
        // 未登录或令牌无效，重定向到登录页面
        navigate('/');
      }
    };
  
    checkAuth();
  }, [navigate]);
  

  return (
    <div>
      <div>
        <h1>欢迎，{username}!</h1>
        <p>自由编辑问卷，收集数据。</p>
        <div>
          <button>
            发布问卷
          </button>
        </div>
        <p>查看问卷列表，可以填写问卷也可以分析数据。</p>
        <div>
          <button>
            查看问卷
            <div></div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
