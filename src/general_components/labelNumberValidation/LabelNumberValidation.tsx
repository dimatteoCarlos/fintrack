import { capitalize } from '../../helpers/functions';

type LabelNumberValidationPropType = {
  formDataNumber: { [key: string]: string };
  validationMessages: { [key: string]: string };
  variant: 'form' | 'tracker';
};

function LabelNumberValidation({
  formDataNumber,
  validationMessages,
  variant,
}: LabelNumberValidationPropType) {
  const successColor = variant === 'form' ? '--lightSuccess' : '--success';

  const labelClassName =
    variant === 'form' ? 'label form__title' : 'card--title';

  return (
    <label htmlFor={formDataNumber.keyName} className={labelClassName}>
      {capitalize(formDataNumber.title)}&nbsp;
      <span
        className='validation__errMsg'
        style={{
          color: validationMessages[formDataNumber.keyName]
            ?.toLowerCase()
            .includes('format:')
            ? `var(${successColor})`
            : 'var(--error)',
        }}
      >
        {validationMessages[formDataNumber.keyName]?.replace('Format:', '')}
      </span>
    </label>
  );
}

export default LabelNumberValidation;
