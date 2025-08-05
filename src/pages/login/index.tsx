import Image from 'next/image';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { LoginSchema, loginSchemaResolver } from '../../schemas/loginSchema';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';

export default function LoginPage() {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: loginSchemaResolver,
  });

  const onSubmit = (data: LoginSchema) => {
    login(data);
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-1/2 h-screen flex items-center justify-center p-20">
        <div>
          <h2 className="text-md font-bold text-gray-800">Bem-vindo de volta!</h2>
          <Image src="/images/logo.png" alt="Logo" width={300} height={300} />
          <p className="text-xs mb-4 text-gray">
            Que bom ter você de volta! É um novo dia para gerenciar seus projetos. Faça login e
            comece agora mesmo.
          </p>

          <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
            <Input
              id="email"
              label="Email"
              type="email"
              registration={register('email', { required: 'Email é obrigatório' })}
              error={errors.email}
            />
            <Input
              id="password"
              label="Senha"
              type="password"
              registration={register('password', { required: 'Senha é obrigatória' })}
              error={errors.password}
            />
            <Button type="submit">Entrar</Button>
          </form>
        </div>
      </div>

      <div className="w-1/2  h-screen relative">
        <Image src="/images/back-login.png" alt="Login background" fill />
      </div>
    </div>
  );
}
