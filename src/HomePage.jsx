import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from "react-router-dom";

function HomePage() {
  const [searchParams] = useSearchParams();
  const username = searchParams.get("username");
  const [showJoinGame, setShowJoinGame] = useState(false);
  const [gameId, setGameId] = useState('');
  const [statusinfo, setstatusinfo] = useState('欢迎');
  const navigate = useNavigate();
  const handleCreateGame = async () => {
    setstatusinfo('正在创建棋局，请稍候...');
    const response = await fetch(`/api/createchess?username=${username}`);
    const data = await response.json();
    if(response.ok){
      alert(`${data.message} 房间号为： ${data.idnum}。`);
      navigate(`/chess/?id=${data.idnum}&typech=creator&username=${username}`)
    }else{
      alert(data.error);
      setstatusinfo(data.error);
    }
  };

  const handleJoinGame = () => {
    setShowJoinGame(true);
    console.log('加入棋局');
  };

  const handleViewHistory = () => {
    // 你可以在这里处理“历史棋局”的逻辑
    console.log('查看历史棋局');
    navigate("/history");
  };

  const handleJoinGameConfirm = async () => {
    if (!gameId || gameId.trim() === '') {
      setstatusinfo('byd你还没输呢。');
  }else{
    setstatusinfo('尝试加入中，请稍候...');
    const response = await fetch(`/api/joinchess?username=${username}&gameid=${gameId}`);
    const data = await response.json();
    if(response.ok){
      alert(data.message);
      navigate(`/chess/?id=${gameId}&typech=partner&username=${username}`)
    }else{
      alert(data.error);
      setstatusinfo(data.error);
    }
  }
};

  return (
    <div className="app">
      <h1>The Strategy Game Online</h1>
      <p>{statusinfo}</p>
      <button onClick={handleCreateGame}>创建棋局</button>
      <button onClick={handleJoinGame}>加入棋局</button>
      {showJoinGame && (
        <div>
          <input 
            type="text" 
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
            placeholder="输入棋局ID"
          />
          <button onClick={handleJoinGameConfirm}>确定</button>
        </div>
      )}
      <button onClick={handleViewHistory}>历史棋局</button>
    </div>
  );
}

export default HomePage;
