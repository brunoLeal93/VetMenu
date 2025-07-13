import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { usuarioSchema } from '@schemas/user'
import type { UsuarioFormData } from '@schemas/user'

export default function UserRegistration() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UsuarioFormData>({
    resolver: zodResolver(usuarioSchema),
    defaultValues: {
      nome: '',
      genero: '',
      termos: false,
      telefones: [{ numero: '' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: 'telefones',
    control,
  })

  const onSubmit = (data: UsuarioFormData) => {
    console.log('Dados enviados:', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Nome */}
      <div>
        <label>Nome:</label>
        <input type="text" {...register('nome')} />
        <p>{errors.nome?.message}</p>
      </div>

      {/* Gênero */}
      <div>
        <label>Gênero:</label>
        <select defaultValue="" {...register('genero')}>
          <option value="" disabled>Selecione...</option>
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
          <option value="outro">Outro</option>
        </select>
        <p>{errors.genero?.message}</p>
      </div>

      {/* Telefones */}
      <div>
        <label>Telefones:</label>
        {fields.map((field, index) => (
          <div key={field.id}>
            <input
              type="text"
              placeholder="(DDD) Número"
              {...register(`telefones.${index}.numero`)}
            />
            <button type="button" onClick={() => remove(index)}>
              Remover
            </button>
            <p>{errors.telefones?.[index]?.numero?.message}</p>
          </div>
        ))}
        <button type="button" onClick={() => append({ numero: '' })}>
          Adicionar Telefone
        </button>
        {typeof errors.telefones?.message === 'string' && (
          <p>{errors.telefones.message}</p>
        )}
      </div>

      {/* Termos */}
      <div>
        <label>
          <input type="checkbox" {...register('termos')} />
          Aceito os termos de uso
        </label>
        <p>{errors.termos?.message}</p>
      </div>

      <button type="submit">Cadastrar</button>
    </form>
  )
}