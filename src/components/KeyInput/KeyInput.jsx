import React, { useState } from 'react';
import styled from 'styled-components';
import { generateKey } from '../../utils/crypto';

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const KeyInputGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin: 0.5rem 0;
`;

const KeyInputField = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const GenerateKeyButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${(props) =>
    props.copied ? '#17a2b8' : '#28a745'};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.copied ? '#138496' : '#218838'};
  }
`;

const CopyMessage = styled.span`
  color: #28a745;
  margin-left: 1rem;
`;

const KeyInput = ({ mode, useKey, setUseKey, keyValue, setKeyValue }) => {
  const [isKeyGenerated, setIsKeyGenerated] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleGenerateKey = () => {
    setKeyValue(generateKey());
    setIsKeyGenerated(true);
    setCopySuccess(false);
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(keyValue);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <>
      <CheckboxContainer>
        <input
          type="checkbox"
          checked={useKey}
          onChange={(e) => setUseKey(e.target.checked)}
        />
        <label>
          Use {mode === 'encrypt' ? 'encryption' : 'decryption'} key
        </label>
      </CheckboxContainer>

      {useKey && (
        <KeyInputGroup>
          <KeyInputField
            type="text"
            value={keyValue}
            onChange={(e) => setKeyValue(e.target.value)}
            placeholder={`Enter ${
              mode === 'encrypt' ? 'encryption' : 'decryption'
            } key`}
          />
          <GenerateKeyButton
            copied={copySuccess}
            onClick={isKeyGenerated ? handleCopyKey : handleGenerateKey}
          >
            {isKeyGenerated ? (copySuccess ? 'Copied!' : 'Copy Key') : 'Generate Key'}
          </GenerateKeyButton>
        </KeyInputGroup>
      )}
    </>
  );
};

export default KeyInput;
