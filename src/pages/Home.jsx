import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Nav from "../components/layout/Nav";
import FeedItem from "../components/FeedItem";
import { useNavigate } from "react-router-dom";
import { auth } from './../firebase';
import useSSE from "../hooks/useSSE";

const Home = () => {
  // logic
  const history = useNavigate();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  console.log("🚀 ~ Home ~ API_BASE_URL:", API_BASE_URL)
  
  const currentUser = auth.currentUser;
  console.log("🚀 ~ Home ~ currentUser:", currentUser)

  const [feedList, setFeedList] = useState([]);

  //SSE연결
  const {isConnected} = useSSE();

  const handleEdit = (data) => {
    history(`/edit/${data._id}`); // edit페이지로 이동
  };

  const deletePost = async(id) =>{    
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${id}`,{
        method: "DELETE",
        headers:{
          "Content-Type":"application/json"
        }
        });
        return response;
    } catch (error) {
      console.error("게시글 삭제 에러:", error);    
    }
  }


  const handleDelete = async (selectedItem) => {

    // TODO: 백엔드에 Delete 요청
     try {
      const result = await deletePost(selectedItem._id);
      console.log("🚀 ~ handleDelete ~ result:", result)
      console.log("🚀 ~ handleDelete ~ selectedItem._id:", selectedItem._id)
      // console.log("🚀 ~ handlePost ~ result:", result)
      const filterList = feedList.filter((item) => item._id !== selectedItem._id);
      setFeedList(filterList);
     history("/"); // home화면으로 이동
    } catch (error) {
      console.error("게시글 추가 에러:", error);      
    }
  };

  const handleLike = (selectedId) => {
    console.log("🚀 ~ handleLike ~ selectedId:", selectedId)
  }

  const isLoggedIn = !!currentUser; //return true(logged in) or false
  const handleLogout = async () => {
    //1.firebase 로그아웃기능
    if (isLoggedIn) {
      const ok = window.confirm("Are you sure logout?");
      if (ok) {
        await auth.signOut();
      }else{
        return;
      }
    }
    //2.login page로 redirect
    history('/login')
  }

  useEffect(() => {
    // 페이지 진입시 딱 한번 실행
    // TODO: 백엔드에 Get 요청
    const fetchPosts = async()=>{
        try {
        const response = await fetch(`${API_BASE_URL}/posts`);
        if (!response.ok) {
          throw new Error(`HTTP error, status: ${response.status}`);          
        }
        const result = await response.json();
        setFeedList(result)
        console.log("🚀 ~ fetchPosts ~ result:", result)
      } catch (error) {
        console.log("게시물 조회 실패:", error)
      }
    }
    fetchPosts();
  }, [API_BASE_URL]);

  useEffect(() => {
    // 페이지 진입시 딱 한번 실행
    if (!isLoggedIn) {
      //login page로 redirect
      history('/login');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // view
  return (
    <div className="h-full pt-20 pb-[74px] overflow-hidden">
      {/* START: 헤더 영역 */}
      <Header isLoggedIn={true} onClick={handleLogout}/>
      {/* END: 헤더 영역 */}
      <main className="h-full overflow-auto">
        {/* TODO */}

        <div>
          {/* START: 피드 영역 */}
          <span className="block p-2 text-right text-sm">{isConnected?`✅연결성공` :`🛑연결실패`}</span>
          {!feedList.length ? 
          <p>No Data</p> :
          <ul>
            {feedList.map((feed) => (
              <FeedItem
                key={feed._id}
                data={feed}
                tags={feed.tags}
                isAuthor={feed.userId === currentUser.uid}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onLike={handleLike}
              />
            ))}
          </ul>
          }
          {/* END: 피드 영역 */}
        </div>
      </main>
      {/* START: 네비게이션 영역 */}
      <Nav />
      {/* END: 네비게이션 영역 */}
    </div>
  );
};

export default Home;
