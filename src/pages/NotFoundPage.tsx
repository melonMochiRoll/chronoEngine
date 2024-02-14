import React, { FC } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: FC = () => {
  const navigate = useNavigate();

  const onClickButton = () => {
    navigate('/');
  };

  return (
    <Block>
      <Box>
        <Not>404</Not>
        <Found>Page Not Found</Found>
      </Box>
      <Button
        onClick={onClickButton}>
        홈으로
      </Button>
    </Block>
  );
};

export default NotFoundPage;

const Block = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  color: #fff;
  background-color: #121711;
  gap: 50px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Not = styled.span`
  font-size: 120px;
  font-weight: 600;
`;

const Found = styled.span`
  font-size: 32px;
  font-weight: 400;
`;

const Button = styled.button`
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  border: 1px solid #fff;
  border-radius: 20px;
  padding: 5px 22px;
  background-color: #121711;
  cursor: pointer;
  transition: all 0.4s;

  &:hover {
    color: #121711;
    background-color: #fff;
  }
`;