import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  text-align: center;
  font-size: 0.875rem;
  padding: 1rem 0;
  background-color: lightgrey;
  opacity: 0.75;
  width: 100%;
`;

const Footer = () => {
  return (
    <StyledFooter className="footer">
      <div className="copyright">Copyright &copy; BeSpoked Bikes</div>
      <div className="disclaimer">
        Web App built by&nbsp;
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
