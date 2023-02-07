import { ApiContext, User } from "../../types/data"
import { fetcher } from "../../utils"

export type GetUserParams = {
  /**
   * ユーザーID
   */
  id: number
}

/**
 * ユーザーAPI
 * @param context APIコンテキスト
 * @param params パラメータ
 * @returns ユーザー
 */
const getUser = async (
  context: ApiContext,
  { id }: GetUserParams
): Promise<User> => {
  /**
   * サンプルレスポンス
   */
  /*
  {
    "id": "1",
    "username": "taketo",
    "displayDname": "Taketo Yoshida",
    "email": "taketo@example.com",
    "profileImageUrl": "/users/1.png",
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
  }
  */
  return await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, "")}/users/${id}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  )
}

export default getUser
