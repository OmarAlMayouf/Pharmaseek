import { Account, Client, Databases, ID } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.ksu.pharmaseek",
  projectId: "67a8f88b00066166aec8",
  databaseID: "67a8fc1f00123f3631b6",
  patientCollectionID: "67a8fc92002ef2b6fb5d",
  storageID: "67a8fee40010aedf2888",
};

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const databases = new Databases(client);

export const createUser = async (email, password, fullname) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      fullname
    );

    if (!newAccount) throw Error;

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseID,
      config.patientCollectionID,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        fullname: fullname,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export async function signIn(email, password) {
  try {
    console.log(account);
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
}