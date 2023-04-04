import styled from "@emotion/styled";
import { colors } from "../styles/index";
import { Button } from "../components/Button";

const WrapperForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  height: auto;
  gap: 8px;
  margin: 16px 0;
`
const StyledLabel = styled.label`
  width: 100%;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: ${colors.gray[400]};
`
const StyledInput = styled.input`
  width: 100%;
  outline: none;
  background: transparent;
  border: none;
  border-bottom: 1px solid ${colors.gray[700]};
  text-transform: capitalize;
`
const StyledTextArea = styled.textarea`
  width: 100%;
  max-height: 190px;
  height: auto;
  outline: none;
  background: transparent;
  border: none;
  border-bottom: 1px solid ${colors.gray[700]};
  resize: vertical;
`

export function Form({name, price, description, category, picture_url, handleChange, handleSubmit, textButton}) {
  return (
    <WrapperForm onSubmit={handleSubmit}>
      <InputGroup>
        <StyledLabel>Name</StyledLabel>
        <StyledInput type="text" name="name" value={name} onChange={handleChange}/>
      </InputGroup>
      <InputGroup>
        <StyledLabel>Price</StyledLabel>
        <StyledInput type="number" name="price" value={price} onChange={handleChange} step="0.01" min="0" max="100.00"/>
      </InputGroup>
      <InputGroup>
        <StyledLabel>Description</StyledLabel>
        <StyledTextArea name="description" value={description} onChange={handleChange}/>
      </InputGroup>
      <InputGroup>
        <StyledLabel>Category</StyledLabel>
        <StyledInput type="text" name="category" value={category} onChange={handleChange}/>
      </InputGroup>
      <InputGroup>
        <StyledLabel>Picture URL</StyledLabel>
        <StyledTextArea name="picture_url" value={picture_url} onChange={handleChange}/>
      </InputGroup>
      <Button type="submit">{textButton}</Button>
    </WrapperForm>
  )
}
