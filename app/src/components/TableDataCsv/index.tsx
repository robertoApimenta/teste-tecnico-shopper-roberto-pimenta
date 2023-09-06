import React, {useState} from 'react';
import axios from 'axios';

import Modal from 'react-modal';

import {
  Container,
  Overlay,
  ModalContainer,
  StyledTable,
  StyledHeader,
  StyledTableCell,
  StyledTableHeader,
  StyledMessages,
  StyledMessageItem } from './styles';

interface ProductData {
  product_code: number;
  new_price: number;
  name: string;
  cost_price: number;
  sales_price: number;
  messages: string[];
}

interface TableDataCsvProps {
  tableData: ProductData[];
}

Modal.setAppElement('#root');

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

const SuccessModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => (
  <Overlay isOpen={isOpen} onRequestClose={onClose}>
    <ModalContainer>
      <h2>Dados Atualizados com Sucesso</h2>
      <button onClick={onClose}>Fechar</button>
    </ModalContainer>

  </Overlay>
);

const index: React.FC<TableDataCsvProps> = ({ tableData }) => {

  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleButtonClick = () => {
    // Verifique se o botão já foi clicado antes de enviar a solicitação novamente.
    if (!isButtonClicked) {
      axios
        .patch('http://localhost:3000/update-products', tableData)
        .then((response) => {
          if (response.status === 200) {
            setIsSuccessModalOpen(true); // Abra o modal em caso de sucesso
          }
          setIsButtonClicked(true);
        })
        .catch((error) => {
          console.error('Erro ao enviar dados:', error);
        });
    }
  };

  const handleCloseModal = () => {
    setIsSuccessModalOpen(false);
    window.location.reload();
  };

  return (
    <Container>
      <StyledHeader>Tabela de Dados Validados</StyledHeader>
      <small>Você só poderá atualizar os valores dos produtos caso a </small>
      <small> coluna <strong>Validações</strong> esteja vazia</small>
      <StyledTable>
        <thead>
          <tr>
            <StyledTableHeader>Código</StyledTableHeader>
            <StyledTableHeader>Nome</StyledTableHeader>
            <StyledTableHeader>Preço atual</StyledTableHeader>
            <StyledTableHeader>Novo preço</StyledTableHeader>
            <StyledTableHeader>Validações</StyledTableHeader>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index}>
              <StyledTableCell>{item.product_code}</StyledTableCell>
              <StyledTableCell>{item.name}</StyledTableCell>
              <StyledTableCell>{formatCurrency(item.sales_price)}</StyledTableCell>
              <StyledTableCell>{formatCurrency(item.new_price)}</StyledTableCell>
              <StyledTableCell>
                <StyledMessages>
                  {item.messages.map((message, msgIndex) => (
                    <StyledMessageItem key={msgIndex}>{message}</StyledMessageItem>
                  ))}
                </StyledMessages>
              </StyledTableCell>
            </tr>
          ))}
        </tbody>
      </StyledTable>
      {tableData.every((item) => item.messages.length === 0) && (
        <button onClick={handleButtonClick}>ATUALIZAR</button>
      )}
      <SuccessModal isOpen={isSuccessModalOpen} onClose={handleCloseModal} />
    </Container>
  );
};

export default index;
