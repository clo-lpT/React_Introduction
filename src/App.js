import { useState, useEffect, useRef } from "react";
import useScroll from './useScroll'
import "./App.scoped.css";
import Home from "./home";
import Works from "./works";
import About from "./about";
import Timeline from "./timeline";
import more from "./static/images/more.png";

const DIVIDER_HEIGHT = 5;

function App() {
  const outerDivRef = useRef();
  const [scrollIndex, setScrollIndex] = useState('Home');
  const [hamburger, setHamburger] = useState(false);
  const [move, setMove] = useState('');

  //home.js로 버튼 클릭 시 works로 scroll
  const toggleToWork = () => {
    outerDivRef.current.scrollTo({
      top: pageHeight + DIVIDER_HEIGHT,
      left: 0,
      behavior: "smooth",
    });
    setScrollIndex('Works');
  }

  const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같습니다.
  useEffect(() => {
    const wheelHandler = (e) => {
      e.preventDefault();
      const { deltaY } = e;
      const { scrollTop } = outerDivRef.current; // 스크롤 위쪽 끝부분 위치
      // 스크롤 시 위치 지정
      if (deltaY > 0) {
        // 스크롤 내릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 1페이지
          console.log("현재 1페이지, down");
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex('Works');
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 2페이지
          console.log("현재 2페이지, down");
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex('About Me');
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 3) {
          //현재 3페이지
          console.log("현재 3페이지, down");
          outerDivRef.current.scrollTo({
            top: pageHeight * 3 + DIVIDER_HEIGHT * 3,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex('Timeline');
        } else {
          // 현재 4페이지
          console.log("현재 4페이지, down");
          outerDivRef.current.scrollTo({
            top: pageHeight * 3 + DIVIDER_HEIGHT * 3,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex('Timeline');
        }
      } else {
        // 스크롤 올릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 1페이지
          console.log("현재 1페이지, up");
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex('Home');
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 2페이지
          console.log("현재 2페이지, up");
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex('Home');
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 3) {
          //현재 2페이지
          console.log("현재 3페이지, up");
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex('Works');
        } else {
          // 현재 3페이지
          console.log("현재 4페이지, up");
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex('About Me');
        }
      }
    };
    const outerDivRefCurrent = outerDivRef.current;
    outerDivRefCurrent.addEventListener("wheel", wheelHandler);
    return () => {
      outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
    };
  }, []);
  console.log(useScroll, '스크롤')


  // left navigation 클릭시 위치 조정
  const fnc = (val) => {
    console.log('눌림', val)
    switch (val) {
      case 'Home':
        outerDivRef.current.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
        setScrollIndex('Home');
        break;
      case 'Works':
        outerDivRef.current.scrollTo({
          top: pageHeight + DIVIDER_HEIGHT,
          left: 0,
          behavior: "smooth",
        });
        setScrollIndex('Works');
        break;
      case 'About Me':
        outerDivRef.current.scrollTo({
          top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
          left: 0,
          behavior: "smooth",
        });
        setScrollIndex('About Me');
        break;
      case 'Timeline':
        outerDivRef.current.scrollTo({
          top: pageHeight * 3 + DIVIDER_HEIGHT * 3,
          left: 0,
          behavior: "smooth",
        });
        setScrollIndex('Timeline');
        break;
    }
  }
  // dots
  const Dot = ({ num, scrollIndex }) => {
    console.log(num, '넘버', scrollIndex)
    return (
      <div
        style={{
          display: 'flex',
          height: 60,
          alignItems: 'center',
        }}
      >
        <div onClick={() => { fnc(num);setHamburger(false)}} style={{
          cursor: 'pointer',
          fontWeight: "bold",
          color: scrollIndex === num ? "#fff459" : "white",
          fontFamily: "Urbanist",
          fontSize: '17px',
          backgroundColor: 'transparent'
        }}>{num}
        </div>
      </div>
    );
  };
  const Dots = ({ scrollIndex }) => {
    return (

      <div className="left_bar">
        <Dot num={'Home'} scrollIndex={scrollIndex}></Dot>
        <Dot num={'Works'} scrollIndex={scrollIndex}></Dot>
        <Dot num={'About Me'} scrollIndex={scrollIndex}></Dot>
        <Dot num={'Timeline'} scrollIndex={scrollIndex}></Dot>
      </div>
    );
  };
  return (
    <div ref={outerDivRef} className="outer">
      {/* <Dots scrollIndex={scrollIndex} /> */}
      <div style={{ position: "fixed", height: "100%", display: "flex", alignItems: 'center', backgroundColor: 'transparent' }}>

        {Dots({ scrollIndex })}
      </div>
      {hamburger === true ?

        <div className="right_bar">
          <div className="left_bar1" style={{ display: "flex", flexDirection: 'column', justifyContent: 'flex-end' }}>
            <div className="hamburger" style={{ zIndex: 500 }} onClick={() => { setHamburger(!hamburger) }}>
              <img style={{ margin: "40px" }} src={more} />
            </div>
            <div className="ham_list" style={{ height: '100vh' }}>
              <Dot num={'Home'} scrollIndex={scrollIndex}></Dot>
              <Dot num={'Works'} scrollIndex={scrollIndex}></Dot>
              <Dot num={'About Me'} scrollIndex={scrollIndex}></Dot>
              <Dot num={'Timeline'} scrollIndex={scrollIndex}></Dot>
            </div>
          </div>
        </div>
        :
        <div style={{ position: "fixed", width: "130px", height: '130px', right: 0, display: "flex", backgroundColor: 'transparent' }}>
          <div className="left_bar1" style={{ display: "flex", flexDirection: 'column', justifyContent: 'flex-end' }}>
            <div className="hamburger" style={{ zIndex: 500 }} onClick={() => { setHamburger(!hamburger) }}>
              <img style={{ margin: "40px" }} src={more} />
            </div>
          </div>
        </div>
      }

      <div className="">
        <Home toggleToWork={toggleToWork} />
      </div>
      <div className="divider"></div>
      <div className="">
        <Works />
      </div>
      <div className="divider"></div>
      <div className="">
        <About />
      </div>
      <div className="divider"></div>
      <div className="">
        <Timeline />
      </div>
    </div>
  );
}
export default App;