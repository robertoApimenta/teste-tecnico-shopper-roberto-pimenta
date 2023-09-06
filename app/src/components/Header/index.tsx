import React, { useRef, useState } from 'react';

import axios from 'axios';

import TableDataCsv from '../TableDataCsv';

import {Container} from './styles';

interface ProductData {
  product_code: number;
  new_price: number;
  name: string;
  cost_price: number;
  sales_price: number;
  messages: string[];
}

function Index() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [tableData, setTableData] = useState<ProductData[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleValidationClick = async () => {
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append('file', selectedFile);

        const response = await axios.post('http://localhost:3000/load-csv', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.data) {
          setTableData(response.data);
          setSelectedFile(null);
        } else {
          setTableData([]);
        }
      } catch (error) {
        setTableData([]);
      }
    } else {
      setTableData([]);
    }
  };

  return (
    <>
      <Container>
        {!selectedFile ? (
          <>
            <input
              type="file"
              accept=".csv"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <br />
            <button
              onClick={() => fileInputRef.current?.click()}
            >
            Selecionar Arquivo
            </button>
          </>
        ) : (
          <div>
            <p>Arquivo selecionado: {selectedFile.name}</p>
            <button onClick={handleValidationClick}>
              VALIDAR
            </button>
          </div>
        )}

      </ Container>
      {tableData.length > 0 && (
        <TableDataCsv tableData={tableData}/>
      )}
    </>

  );
}

export default Index;
