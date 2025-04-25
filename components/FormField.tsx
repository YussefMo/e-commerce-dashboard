import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/UI/form';
import { Input } from '@/components/UI/input';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'file';
}

function FormFieldComp({
  control,
  name,
  label,
  placeholder,
  type = 'text'
}: FormFieldProps<FieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="label">{label}</FormLabel>
          <FormControl>
            <Input
              className="input"
              placeholder={placeholder}
              {...field}
              type={type}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default FormFieldComp;
