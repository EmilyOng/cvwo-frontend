import React from 'react'
import { IconDefinition } from '@fortawesome/fontawesome-common-types'
import clsx from 'clsx'
import Icon from 'components/atoms/Icon'

type Props = {
  name: string
  type: string
  value: string
  label: string
  required?: boolean
  placeholder?: string
  icon?: IconDefinition
  events?: {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any
    onBlur?: () => any
  }
}

const InputField: React.FC<Props> = ({
  name,
  type,
  value,
  label,
  required = true,
  placeholder,
  icon,
  events
}) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className={clsx({ control: true, 'has-icons-left': !!icon })}>
        <input
          className="input is-info"
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          value={value}
          {...events}
        />
        {icon && (
          <span className="icon is-small is-left">
            <Icon icon={icon} />
          </span>
        )}
      </div>
    </div>
  )
}

export default InputField