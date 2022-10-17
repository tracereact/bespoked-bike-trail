import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  text-align: center;
  font-size: 0.875rem;
  padding: 1rem 0;
  font-weight: bold;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Footer = () => {
  return (
    <StyledFooter className="footer">
      <div className="copyright">Copyright &copy; BeSpoked Bikes 2022</div>
      <div className="disclaimer">
        Application built by&nbsp;
        <span>
          <a href="https://tracereact.com" target="_blank" rel="noreferrer">
            Trace React
          </a>
        </span>
      </div>
    </StyledFooter>
  );
};

export default Footer;
