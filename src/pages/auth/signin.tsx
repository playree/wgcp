import { ArrowLeftOnRectangleIcon, WireGuardIcon } from '@/components/Icons'
import { Button } from '@/components/nexkit/ui/Button'
import { Card, CardTitle } from '@/components/nexkit/ui/Card'
import { Input } from '@/components/nexkit/ui/Input'
import { gridStyles } from '@/components/nexkit/ui/styles'
import { jc } from '@/components/nexkit/ui/utils'
import { NextPageCustom } from '@/helpers/client'
import { useLocale } from '@/helpers/locale'
import { TypeSignin, scSignin } from '@/helpers/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const SignIn: NextPageCustom = () => {
  const router = useRouter()
  const { callbackUrl } = router.query
  const { t, fet, et } = useLocale()
  const [isAuthNg, setIsAuthNg] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeSignin>({ resolver: zodResolver(scSignin) })

  const onSubmit: SubmitHandler<TypeSignin> = async (data) => {
    console.debug('SignIn:submit:', data)
    setIsAuthNg(false)
    await signIn('credentials', {
      redirect: false,
      username: data.username,
      password: data.password,
    }).then((res) => {
      console.log('signIn:', res)
      if (res?.ok) {
        router.push(callbackUrl as string)
      } else {
        setIsAuthNg(true)
      }
    })
  }

  return (
    <div className='mx-auto mt-8 max-w-md'>
      <Card>
        <CardTitle>
          <WireGuardIcon className='mr-2 h-8' />
          {t('item_signin')}
        </CardTitle>
        {isAuthNg && (
          <div
            className={jc(
              'mb-4 flex items-center border-t-4 px-4 py-2',
              'border-red-300 bg-red-50 text-red-800 dark:border-red-800 dark:bg-gray-800 dark:text-red-400',
            )}
          >
            <svg
              aria-hidden='true'
              className='mr-3 inline h-5 w-5 flex-shrink-0'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                clip-rule='evenodd'
              ></path>
            </svg>
            {et('@invalid_username_or_password')}
          </div>
        )}
        <form className={gridStyles.default} onSubmit={handleSubmit(onSubmit)}>
          <div className='col-span-12 p-2'>
            <Input id='username' label={t('item_username')} error={fet(errors.username)} {...register('username')} />
          </div>
          <div className='col-span-12 p-2'>
            <Input
              id='password'
              type='password'
              label={t('item_password')}
              error={fet(errors.password)}
              {...register('password')}
            />
          </div>
          <div className='col-span-12 p-2'>
            <Button className='mx-auto' type='submit'>
              <ArrowLeftOnRectangleIcon className='mr-1 h-5' />
              {t('item_signin')}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
export default SignIn
