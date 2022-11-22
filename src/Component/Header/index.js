import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { HiMicrophone } from 'react-icons/hi';
//import ReactModal from 'react-modal';
import Modal from 'react-awesome-modal';
import '../../scss/component/_modal.scss';
import { useSpeechRecognition } from 'react-speech-kit';

function Header() {
  const value = useContext(AuthContext);
  const setIsCustomerLogin = value.setIsCustomerLogin;
  const [modalOpen, setModalOpen] = useState(false);
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      // 음성인식 결과가 value 상태값으로 할당됩니다.
      setMsg(result);
    },
  });
  const showModal = () => {
    // stop;
    // console.log('listening', listening);
    setModalOpen(true);
    setMsg('');
  };
  const closeModal = () => {
    // stop;
    // console.log('listening', listening);
    setModalOpen(false);
  };

  const [msg, setMsg] = useState('');
  const [dinnerId, setDinnerId] = useState(0);
  const [styleId, setStyleId] = useState(0);
  const [degreeId, setDegreeId] = useState(0);

  // const setCustomerToken = value.setCustomerToken;

  // const handleMikeButtonClick = () => {
  //   console.log(`handleMikeButtonClick`);
  //   setIsVoiceModalOpen(true);
  // };

  const handleLogoutButtonClick = () => {
    localStorage.clear();
    setIsCustomerLogin(false);
    // setCustomerToken(null);
  };

  // const handleMsg = () => {
  //   stop;
  //   console.log('listening', listening);
  //   console.log(msg);
  // };

  useEffect(() => {
    console.log('sg', msg);
    if (dinnerId == 0) {
      if (msg.includes('발렌타인')) setDinnerId(1);
      else if (msg.includes('프렌치')) setDinnerId(2);
      else if (msg.includes('잉글리시')) setDinnerId(3);
      else if (msg.includes('샴페인 축제')) setDinnerId(4);
    }
    if (styleId == 0) {
      if (msg.includes('심플')) setStyleId(1);
      else if (msg.includes('그랜드')) setStyleId(2);
      else if (msg.includes('디럭스')) setStyleId(3);
    }
    if (msg.includes('레어')) setDegreeId(1);
    else if (msg.includes('미디움 레어')) setDegreeId(2);
    else if (msg.includes('미디움 웰')) setDegreeId(4);
    else if (msg.includes('미디움')) setDegreeId(3);
    else if (msg.includes('웰던')) setDegreeId(5);
    console.log(dinnerId, styleId, degreeId);
  }, [msg]);

  const setReset = () => {
    setDinnerId(0);
    setStyleId(0);
    setDegreeId(0);
  };
  return (
    <div className='header-container'>
      {/* {isVoiceModalOpen ? <Modal isOpen={isVoiceModalOpen}></Modal> : null} */}

      <div className='header-inner'>
        <div className='logo-container'>
          <NavLink to='/'>
            <img
              className='mrdaebak-logo'
              alt='mrdaebak-logo'
              src='/img/MrDaebakLogo.png'
            />
          </NavLink>
        </div>
        <div className='user-menu-container'>
          <div className='mike-button-container' onClick={showModal}>
            <HiMicrophone clssName='mike-button' />
          </div>
          {modalOpen && <Modal setModalOpen={showModal} />}
          <Modal
            visible={modalOpen}
            effect='fadeInDown'
            onClickAway={closeModal}
          >
            <div className='modal-container'>
              <div className='top-title'>
                <span className='title-text'>음성 주문</span>
              </div>
              <div className='voice-outer-container'>
                <div className='voice-inner-container'>
                  <div className='text-container'>
                    <div className='introduce-text'>
                      ① 디너 이름 ② 스타일 ③ 스테이크 굽기를
                    </div>
                    <div className='introduce-text'>
                      오른쪽 버튼을 누른 상태로 말씀해주세요
                    </div>
                    <div className='introduce-text-last'>
                      ex) 발렌타인 / 심플 / 미디움레어
                    </div>
                  </div>
                  <div className='voice-button-container'>
                    <button
                      className='voice-button'
                      onMouseDown={listen}
                      onMouseUp={stop}
                      onClick={setReset}
                    >
                      🎤
                    </button>
                    {listening && (
                      <small role='alert' className='listening-alert'>
                        듣고 있어요
                      </small>
                    )}
                    <div className='show-text-container'>
                      <div
                        className='show-text'
                        onChange={(event) => setMsg(event.target.value)}
                      >
                        {msg}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='bottom-container'>
                <button className='cancel-button' onClick={closeModal}>
                  <span>닫기</span>
                </button>
                <button className='order-button'>
                  <span>주문</span>
                </button>
              </div>
            </div>
          </Modal>
          <div className='user-button'>
            <NavLink to='/cart'>Cart</NavLink>
          </div>
          <div className='user-button'>
            <NavLink to='/myorder'>MyOrder</NavLink>
          </div>
          <div className='user-button'>
            <NavLink to='/mypage'>MyPage</NavLink>
          </div>
          <div
            className='user-button logout-button'
            onClick={handleLogoutButtonClick}
          >
            <div>Logout</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
