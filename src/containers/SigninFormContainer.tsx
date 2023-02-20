import SigninForm from 'components/organisms/SigninForm'
import {useAuthContext} from 'contexts/AuthContext'
import {useGlobalSpinnerActionsContext} from 'contexts/GlobalSpinnerContext'

interface SigninFormContainerProps {
  onSignin: (error?: Error) => void
}

/**
 * サインインフォームコンテナ
 */
const SigninFormContainer = ({
  onSignin,
}: SigninFormContainerProps) => {
  const {signin} = useAuthContext()
  const setGlobalSpinner = useGlobalSpinnerActionsContext()

  // サインインボタンを押された時のイベントハンドラ
  const handleSignin = async (username: string, password: string) => {
    try {
      setGlobalSpinner(true)
      await signin(username, password)
      onSignin && onSignin()
    } catch (err: unknown) {
      if (err instanceof Error) {
        window.alert(err.message)
        onSignin && onSignin(err)
      }
    } finally {
      setGlobalSpinner(false)
    }
  }

  return <SigninForm onSignin={handleSignin} />
}

export default SigninFormContainer