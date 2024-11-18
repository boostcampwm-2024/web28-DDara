import React, { useState } from 'react';
import { Modal } from '@/component/common/modal/Modal';

interface IAuthModalProps {
  /** 모달이 열려 있는지 여부를 나타냅니다. */
  isOpen: boolean;
  /** 모달을 닫는 함수입니다. */
  onClose: () => void;
  /** 모달의 타입을 결정하는 값으로, 'login' 또는 'register'를 가집니다. */
  type: 'login' | 'register';
}

export const AuthModal = (props: IAuthModalProps) => {
  const [loginData, setLoginData] = useState({
    id: '',
    pw: '',
  });

  const [registerData, setRegisterData] = useState({
    id: '',
    email: '',
    name: '',
    pw: '',
    confirmPw: '',
  });

  const [modalType, setModalType] = useState<'login' | 'register'>(props.type);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (modalType === 'login') {
      setLoginData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setRegisterData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleLoginClick = () => {
    console.log('로그인 데이터:', loginData);
  };

  const handleSignUpClick = () => {
    if (registerData.pw !== registerData.confirmPw) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    console.log('회원가입 데이터:', registerData);
  };

  const switchToRegister = () => {
    setModalType('register');
  };

  const switchToLogin = () => {
    setModalType('login');
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      {modalType === 'login' ? (
        <>
          <Modal.Header content="Log In" onClose={props.onClose} />
          <Modal.Input
            title="ID"
            name="id"
            placeholder="ID"
            value={loginData.id}
            onChange={handleChange}
          />
          <Modal.Input
            title="PW"
            name="pw"
            placeholder="PW"
            value={loginData.pw}
            onChange={handleChange}
          />
          <Modal.Footer
            text="로그인"
            onClick={handleLoginClick}
            text2="회원가입"
            onClick2={switchToRegister}
          />
        </>
      ) : (
        <>
          <Modal.Header content="Sign Up" onClose={props.onClose} />
          <Modal.Input
            title="ID"
            name="id"
            placeholder="사용할 ID를 입력해주세요."
            value={registerData.id}
            onChange={handleChange}
          />
          <Modal.Input
            title="Email"
            name="email"
            placeholder="Email 주소를 입력해주세요."
            value={registerData.email}
            onChange={handleChange}
          />
          <Modal.Input
            title="Name"
            name="name"
            placeholder="이름을 입력해주세요."
            value={registerData.name}
            onChange={handleChange}
          />
          <Modal.Input
            title="PW"
            name="pw"
            placeholder="사용할 비밀번호를 입력해주세요."
            value={registerData.pw}
            onChange={handleChange}
          />
          <Modal.Input
            title=""
            name="confirmPw"
            placeholder="비밀번호를 한 번 더 입력해주세요."
            value={registerData.confirmPw}
            onChange={handleChange}
          />
          <Modal.Footer
            text="회원가입"
            onClick={handleSignUpClick}
            text2="로그인"
            onClick2={switchToLogin}
          />
        </>
      )}
    </Modal>
  );
};
