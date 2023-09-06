import styled from 'styled-components';
import Modal from 'react-modal';

export const Container = styled.div`
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 880px;

  button {
    display: flex;
    margin: 20px auto;
    background: #263238;
    padding: 20px;
    border: none;
    border: 3px solid #fff;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
    font-weight: bold;
    color: #fff;

    &:hover {

    border: 3px solid #263238;
    color: #263238;
    background: #fff;
    }
  }
`;

export const StyledTable = styled.table`
  border-collapse: collapse;
  width: 80%;
  max-width: 800px;
  margin-top: 20px;
  border: 1px solid #ccc;
`;

export const StyledHeader = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

export const StyledTableCell = styled.td`
  border: 1px solid #ccc;
  padding: 8px;
`;

export const StyledTableHeader = styled.th`
  border: 1px solid #ccc;
  padding: 8px;
`;

export const StyledMessages = styled.ul`
  list-style: none;
  padding: 0;
`;

export const StyledMessageItem = styled.li`
  margin: 2px 0;
`;

export const Overlay = styled(Modal)`
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContainer = styled.div`
  background: #fff;
  border-radius: 4px;
  padding: 24px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  max-width: 450px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    margin-top: 8px;
    color: #263238;
  }

  button {
    margin-top: 36px;
    color: #263238;
    padding: 8px;
    background: none;
    border: none;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);

    &:hover {
      box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.5);
    }
  }
`;
