import { useState } from 'react'

export type ValidationRules<T> = {
  [K in keyof T]?: Array<(value: T[K], formValues: T) => string | null>
}

export type FormErrors<T> = Partial<Record<keyof T, string>>

export function useForm<T extends Record<string, any>>(
  initialValues: T,
  rules?: ValidationRules<T>
) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<FormErrors<T>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({})

  const validateField = (name: keyof T, value: T[keyof T]): string | null => {
    const fieldRules = rules?.[name]
    if (!fieldRules) return null
    for (const rule of fieldRules) {
      const error = rule(value, values)
      if (error) return error
    }
    return null
  }

  const setValue = <K extends keyof T>(name: K, value: T[K]) => {
    setValues((prev) => ({ ...prev, [name]: value }))
    if (touched[name]) {
      const error = validateField(name, value)
      setErrors((prev) => ({ ...prev, [name]: error ?? undefined }))
    }
  }

  const setFieldTouched = (name: keyof T) => {
    setTouched((prev) => ({ ...prev, [name]: true }))
    const error = validateField(name, values[name])
    setErrors((prev) => ({ ...prev, [name]: error ?? undefined }))
  }

  const validateAll = (): boolean => {
    if (!rules) return true
    const newErrors: FormErrors<T> = {}
    let valid = true
    for (const name of Object.keys(rules) as Array<keyof T>) {
      const error = validateField(name, values[name])
      if (error) {
        newErrors[name] = error
        valid = false
      }
      console.log("error......", error)
    }
    setErrors(newErrors)
    setTouched(Object.keys(rules).reduce((acc, k) => ({ ...acc, [k]: true }), {}))
    return valid
  }

  const reset = (newValues?: T) => {
    setValues(newValues ?? initialValues)
    setErrors({})
    setTouched({})
  }

  return { values, errors, touched, setValue, setFieldTouched, validateAll, reset, setValues }
}

// ── Common validators ──────────────────────────────────────────────────────────

export const required =
  (message = 'This field is required') =>
  (value: any): string | null => {
    if (value === null || value === undefined) return message
    if (typeof value === 'string' && value.trim() === '') return message
    if (typeof value === 'number' && value === 0) return message
    return null
  }

export const minLength =
  (min: number, message?: string) =>
  (value: string): string | null => {
    if (value && value.length < min) return message ?? `Minimum ${min} characters required`
    return null
  }

export const maxLength =
  (max: number, message?: string) =>
  (value: string): string | null => {
    if (value && value.length > max) return message ?? `Maximum ${max} characters allowed`
    return null
  }
