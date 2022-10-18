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

const StyledAnchor = styled.a`
  color: red;
  text-decoration: none;
`;

const Footer = () => {
  return (
    <StyledFooter className="footer">
      <div className="copyright">Copyright &copy; BeSpoked Bikes 2022</div>
      <div className="disclaimer">
        Application built by&nbsp;
        <span>
          <StyledAnchor
            href="https://tracereact.com"
            target="_blank"
            rel="noreferrer"
          >
            Trace React
          </StyledAnchor>
        </span>
      </div>
    </StyledFooter>
  );
};

export default Footer;
