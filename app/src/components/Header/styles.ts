import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  background: #78909C;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button {
    display: flex;
    margin: 20px auto;
    padding: 20px;
    border: none;
    border: 3px solid #263238;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
    font-weight: bold;
    color: #263238;
    transition: all 0.2s ease-in;

    &:hover {
      border: 3px solid #fff;
      color: #fff;
      background: #263238;
    }
  }
`;
