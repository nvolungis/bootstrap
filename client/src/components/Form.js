import elements from '../elements';

export const Form = ({ children, title, onSubmit }) => (
  <elements.FormContainer
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit();
    }}
  >
    <h1>{title}</h1>
    {children}
  </elements.FormContainer>
);

export const FormGroup = ({ value, setValue, label, type="text" }) => (
  <elements.FormElem>
    <label>
      <elements.FormLabel>{label}</elements.FormLabel>
      <elements.FormInput
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </label>
  </elements.FormElem>
);

export const FormSubmit = ({ children, text="Submit" }) => (
  <elements.FormElem>
    <button type="submit">{text}</button>
  </elements.FormElem>
);
