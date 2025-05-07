import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/UI/form';
import { Input } from '@/components/UI/input';
import { FieldValues, Path, useFormContext } from 'react-hook-form';

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'file' | 'number' | 'textarea';
}

function FormFieldComp({
  name,
  label,
  placeholder,
  type = 'text'
}: FormFieldProps<FieldValues>) {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="label">{label}</FormLabel>
          <FormControl>
            {type === 'textarea' ? (
              <textarea
                className="input min-h-[120px] rounded-md border p-2"
                placeholder={placeholder}
                {...field}
              />
            ) : (
              <Input
                className="input"
                placeholder={placeholder}
                {...field}
                type={type}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default FormFieldComp;
