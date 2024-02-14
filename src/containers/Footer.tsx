import React, { FC } from 'react';
import styled from '@emotion/styled';
import GitHubIcon from '@mui/icons-material/GitHub';
// import EngineeringIcon from '@mui/icons-material/Engineering';

const Footer: FC = () => {
  const GITHUB_URL = 'https://github.com/melonMochiRoll';
  // const DEVBLOG_URL = '';

  const onClickItem = (url: string) => {
    window.open(url, '_blank', 'noopener, noreferrer');
  };

  return (
    <Block>
      {/* <Item onClick={() => onClickItem(DEVBLOG_URL)}>
        <EngineeringIcon fontSize='large' />
        <span>Dev Blog</span>
      </Item> */}
      <Item onClick={() => onClickItem(GITHUB_URL)}>
        <GitHubIcon fontSize='large' />
        <span>GitHub</span>
      </Item>
    </Block>
  );
};

export default Footer;

const Block = styled.footer`
  width: 100%;
  min-height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-color: #292E28;
  gap: 15px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  span {
    font-weight: 600;
  }
`;